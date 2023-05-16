import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ch.planetgo',
  appName: 'planetgo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
