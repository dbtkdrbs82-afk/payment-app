package kr.co.nxgsoft.payment;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(NxgTtsPlugin.class);
        registerPlugin(NxgSecureSessionPlugin.class);
        super.onCreate(savedInstanceState);
    }
}