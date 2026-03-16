import { initializeApp, getApps } from 'firebase/app';
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { getStorage } from 'firebase/storage';
import { connectorConfig } from '@dataconnect/generated';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const dataconnect = getDataConnect(app, connectorConfig);
export const storage = getStorage(app);

// 로컬 테스트 시 에뮬레이터 연결 (필요한 경우에만 주석 해제하여 사용)
/*
if (process.env.NODE_ENV === 'development') {
  const host = process.env.NEXT_PUBLIC_DATA_CONNECT_EMULATOR_HOST || 'localhost';
  const port = Number(process.env.NEXT_PUBLIC_DATA_CONNECT_EMULATOR_PORT) || 9399;
  connectDataConnectEmulator(dataconnect, host, port);
}
*/
