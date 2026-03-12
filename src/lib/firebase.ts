import { initializeApp, getApps } from 'firebase/app';
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const dataconnect = getDataConnect(app, connectorConfig);

// 로컬 테스트 시 에뮬레이터 연결
if (process.env.NODE_ENV === 'development') {
  const host = process.env.NEXT_PUBLIC_DATA_CONNECT_EMULATOR_HOST || 'localhost';
  const port = Number(process.env.NEXT_PUBLIC_DATA_CONNECT_EMULATOR_PORT) || 9399;
  connectDataConnectEmulator(dataconnect, host, port);
}
