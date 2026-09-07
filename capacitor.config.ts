import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kr.co.nxgsoft.payment',
  appName: 'NXG PICK',
  webDir: 'dist',

  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
