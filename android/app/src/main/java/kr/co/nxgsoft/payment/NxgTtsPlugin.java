package kr.co.nxgsoft.payment;

import android.media.AudioAttributes;
import android.speech.tts.TextToSpeech;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.Locale;

@CapacitorPlugin(name = "NxgTts")
public class NxgTtsPlugin extends Plugin {

    private TextToSpeech tts;
    private volatile boolean ready = false;

    @Override
    public void load() {
        tts = new TextToSpeech(getContext(), status -> {
            if (status == TextToSpeech.SUCCESS && tts != null) {
                int result = tts.setLanguage(Locale.KOREAN);

                ready =
                    result != TextToSpeech.LANG_MISSING_DATA &&
                    result != TextToSpeech.LANG_NOT_SUPPORTED;

                tts.setSpeechRate(0.95f);

                tts.setAudioAttributes(
                    new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                        .build()
                );
            }
        });
    }

    @PluginMethod
    public void speak(PluginCall call) {
        String message = call.getString("text");

        if (message == null || message.trim().isEmpty()) {
            call.reject("Empty speech message");
            return;
        }

        if (!ready || tts == null) {
            call.reject("Android TTS not ready");
            return;
        }

        getActivity().runOnUiThread(() -> {
            int result = tts.speak(
                message,
                TextToSpeech.QUEUE_FLUSH,
                null,
                "nxg-" + System.currentTimeMillis()
            );

            if (result == TextToSpeech.SUCCESS) {
                call.resolve();
            } else {
                call.reject("Android TTS failed");
            }
        });
    }

    @Override
    protected void handleOnDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }

        super.handleOnDestroy();
    }
}