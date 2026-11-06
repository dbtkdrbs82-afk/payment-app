package kr.co.nxgsoft.payment;

import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.nio.charset.StandardCharsets;
import java.security.KeyStore;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

@CapacitorPlugin(name = "NxgSecureSession")
public class NxgSecureSessionPlugin extends Plugin {

    private static final String KEY_ALIAS = "nxg_merchant_session_key";
    private static final String PREF_NAME = "nxg_secure_session";

    private SecretKey getKey() throws Exception {
        KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);

        if (keyStore.containsAlias(KEY_ALIAS)) {
            return ((KeyStore.SecretKeyEntry)
                keyStore.getEntry(KEY_ALIAS, null)).getSecretKey();
        }

        KeyGenerator generator = KeyGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore"
        );

        generator.init(new KeyGenParameterSpec.Builder(
            KEY_ALIAS,
            KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT
        )
            .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
            .setKeySize(256)
            .build());

        return generator.generateKey();
    }

    @PluginMethod
    public void save(PluginCall call) {
        String token = call.getString("token");

        if (token == null || token.isEmpty()) {
            call.reject("Token is empty");
            return;
        }

        try {
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.ENCRYPT_MODE, getKey());

            byte[] encrypted = cipher.doFinal(
                token.getBytes(StandardCharsets.UTF_8)
            );

            String value = Base64.encodeToString(
                cipher.getIV(), Base64.NO_WRAP
            ) + ":" + Base64.encodeToString(
                encrypted, Base64.NO_WRAP
            );

            getContext().getSharedPreferences(
                PREF_NAME, 0
            ).edit().putString("token", value).apply();

            call.resolve();
        } catch (Exception e) {
            call.reject("Secure save failed", e);
        }
    }

    @PluginMethod
    public void load(PluginCall call) {
        try {
            String value = getContext().getSharedPreferences(
                PREF_NAME, 0
            ).getString("token", null);

            com.getcapacitor.JSObject result =
                new com.getcapacitor.JSObject();

            if (value == null) {
                result.put("token", "");
                call.resolve(result);
                return;
            }

            String[] parts = value.split(":", 2);

            byte[] iv = Base64.decode(parts[0], Base64.NO_WRAP);
            byte[] encrypted = Base64.decode(parts[1], Base64.NO_WRAP);

            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(
                Cipher.DECRYPT_MODE,
                getKey(),
                new GCMParameterSpec(128, iv)
            );

            String token = new String(
                cipher.doFinal(encrypted),
                StandardCharsets.UTF_8
            );

            result.put("token", token);
            call.resolve(result);
        } catch (Exception e) {
            call.reject("Secure load failed", e);
        }
    }

    @PluginMethod
    public void clear(PluginCall call) {
        getContext().getSharedPreferences(
            PREF_NAME, 0
        ).edit().remove("token").apply();

        call.resolve();
    }
}
