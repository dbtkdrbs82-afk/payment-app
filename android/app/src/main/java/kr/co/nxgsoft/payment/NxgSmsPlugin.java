package kr.co.nxgsoft.payment;

import android.content.Intent;
import android.net.Uri;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/** Opens the user's SMS app with a prefilled message. Never sends SMS directly. */
@CapacitorPlugin(name = "NxgSms")
public class NxgSmsPlugin extends Plugin {
    @PluginMethod
    public void compose(PluginCall call) {
        final String phone = call.getString("phone", "").trim();
        final String message = call.getString("message", "");
        if (!phone.matches("[0-9]{10,11}")) {
            call.reject("고객 휴대폰번호를 확인해주세요.");
            return;
        }
        if (message.trim().isEmpty()) {
            call.reject("문자 내용이 없습니다.");
            return;
        }
        getActivity().runOnUiThread(() -> {
            try {
                Intent intent = new Intent(Intent.ACTION_SENDTO);
                intent.setData(Uri.fromParts("smsto", phone, null));
                intent.putExtra("sms_body", message);
                getActivity().startActivity(intent);
                call.resolve();
            } catch (Exception error) {
                call.reject("문자 앱을 열 수 없습니다.", error);
            }
        });
    }
}
