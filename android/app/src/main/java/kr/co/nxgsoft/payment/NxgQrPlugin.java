package kr.co.nxgsoft.payment;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.pdf.PdfDocument;
import android.net.Uri;
import android.os.Build;
import android.os.CancellationSignal;
import android.os.Environment;
import android.os.ParcelFileDescriptor;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintDocumentInfo;
import android.print.PrintManager;
import android.print.PageRange;
import android.print.pdf.PrintedPdfDocument;
import android.provider.MediaStore;
import android.util.Base64;

import androidx.core.content.FileProvider;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@CapacitorPlugin(name = "NxgQr")
public class NxgQrPlugin extends Plugin {
    private byte[] imageBytes(PluginCall call) {
        String source = call.getString("dataUrl", "");
        int pos = source.indexOf(',');
        String content = pos >= 0 ? source.substring(pos + 1) : source;
        return Base64.decode(content, Base64.DEFAULT);
    }

    private String safeFileName(String raw) {
        String result = (raw == null ? "NXG_PICK_QR.png" : raw).replaceAll("[^a-zA-Z0-9가-힣._-]", "_");
        if (!result.toLowerCase().endsWith(".png")) result += ".png";
        return result;
    }

    @PluginMethod
    public void saveImage(PluginCall call) {
        try {
            byte[] data = imageBytes(call);
            if (data.length == 0) { call.reject("빈 QR 이미지입니다."); return; }
            String name = safeFileName(call.getString("fileName", "NXG_PICK_QR.png"));
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ContentValues values = new ContentValues();
                values.put(MediaStore.Images.Media.DISPLAY_NAME, name);
                values.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
                values.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/NXG_PICK");
                ContentResolver resolver = getContext().getContentResolver();
                Uri uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
                if (uri == null) { call.reject("이미지 저장 위치를 만들 수 없습니다."); return; }
                try (OutputStream stream = resolver.openOutputStream(uri)) {
                    if (stream == null) throw new IOException("저장 스트림이 없습니다.");
                    stream.write(data);
                } catch (Exception e) {
                    resolver.delete(uri, null, null);
                    throw e;
                }
            } else {
                // Android 9 and older: app-specific external Pictures folder (no global storage permission).
                File folder = getContext().getExternalFilesDir(Environment.DIRECTORY_PICTURES);
                if (folder == null) {call.reject("이미지 저장 폴더를 찾을 수 없습니다.");return;}
                if (!folder.exists() && !folder.mkdirs()) throw new IOException("이미지 폴더 생성 실패");
                try (FileOutputStream out = new FileOutputStream(new File(folder, name))) {out.write(data);}
            }
            JSObject result = new JSObject();
            result.put("saved", true);
            call.resolve(result);
        } catch (Exception e) {call.reject("QR 이미지 저장 실패: " + e.getMessage());}
    }

    @PluginMethod
    public void shareImage(PluginCall call) {
        try {
            byte[] data = imageBytes(call);
            if (data.length == 0) {call.reject("빈 QR 이미지입니다.");return;}
            File item = new File(getContext().getCacheDir(), "NXG_PICK_QR_" + System.currentTimeMillis() + ".png");
            try (FileOutputStream out = new FileOutputStream(item)) {out.write(data);}
            Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", item);
            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType("image/png");
            intent.putExtra(Intent.EXTRA_STREAM, uri);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            getActivity().runOnUiThread(() -> {
                try {
                    getActivity().startActivity(Intent.createChooser(intent, "QR 이미지 공유"));
                    call.resolve();
                } catch (Exception e) {call.reject("공유창 실행 실패: " + e.getMessage());}
            });
        } catch (Exception e) {call.reject("QR 이미지 공유 실패: " + e.getMessage());}
    }

    @PluginMethod
    public void printImage(PluginCall call) {
        try {
            byte[] data = imageBytes(call);
            Bitmap bitmap = BitmapFactory.decodeByteArray(data, 0, data.length);
            if (bitmap == null) {call.reject("QR 이미지를 읽을 수 없습니다.");return;}
            getActivity().runOnUiThread(() -> {
                PrintManager manager = (PrintManager) getContext().getSystemService(Context.PRINT_SERVICE);
                if (manager == null) {call.reject("이 기기의 인쇄 시스템을 찾을 수 없습니다.");return;}
                PrintDocumentAdapter adapter = new PrintDocumentAdapter() {
                    private PrintAttributes attributes;
                    @Override public void onLayout(PrintAttributes oldAttributes, PrintAttributes newAttributes,
                      CancellationSignal cancellation, LayoutResultCallback callback, android.os.Bundle extras) {
                        attributes = newAttributes;
                        if (cancellation.isCanceled()) {callback.onLayoutCancelled();return;}
                        PrintDocumentInfo info = new PrintDocumentInfo.Builder("NXG_PICK_QR.pdf")
                          .setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT).setPageCount(1).build();
                        callback.onLayoutFinished(info, true);
                    }
                    @Override public void onWrite(PageRange[] pageRanges, ParcelFileDescriptor destination,
                      CancellationSignal cancellation, WriteResultCallback callback) {
                        if (cancellation.isCanceled()) {callback.onWriteCancelled();return;}
                        PrintedPdfDocument document = null;
                        try {
                            document = new PrintedPdfDocument(getContext(), attributes);
                            PdfDocument.Page page = document.startPage(1);
                            Canvas canvas = page.getCanvas();
                            canvas.drawColor(android.graphics.Color.WHITE);
                            Rect printArea = page.getInfo().getContentRect();
                            float fit = Math.min(printArea.width() / (float) bitmap.getWidth(),
                                                 printArea.height() / (float) bitmap.getHeight());
                            float width = bitmap.getWidth() * fit;
                            float height = bitmap.getHeight() * fit;
                            float left = printArea.left + (printArea.width() - width) / 2f;
                            float top = printArea.top + (printArea.height() - height) / 2f;
                            canvas.drawBitmap(bitmap, null, new RectF(left, top, left + width, top + height),
                                              new Paint(Paint.ANTI_ALIAS_FLAG | Paint.FILTER_BITMAP_FLAG));
                            document.finishPage(page);
                            try (FileOutputStream out = new FileOutputStream(destination.getFileDescriptor())) {
                                document.writeTo(out);
                            }
                            callback.onWriteFinished(new PageRange[] {PageRange.ALL_PAGES});
                        } catch (Exception e) {callback.onWriteFailed("QR 인쇄 파일 생성에 실패했습니다.");}
                        finally {if (document != null) document.close();}
                    }
                    @Override public void onFinish() {bitmap.recycle();}
                };
                try {
                    // Deliberately no fixed media size. Android print dialog owns paper size and printer choice.
                    PrintAttributes attrs = new PrintAttributes.Builder()
                      .setColorMode(PrintAttributes.COLOR_MODE_COLOR).build();
                    manager.print("NXG PICK QR", adapter, attrs);
                    call.resolve();
                } catch (Exception e) {bitmap.recycle();call.reject("인쇄창 실행 실패: " + e.getMessage());}
            });
        } catch (Exception e) {call.reject("QR 인쇄 준비 실패: " + e.getMessage());}
    }
}
