import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { getAdminUserByEmail } from '@dataconnect/generated';
import { dataconnect } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // 1. Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (!decodedToken.email) {
      return NextResponse.json({ error: 'No email in token' }, { status: 400 });
    }
    
    // 2. Query the Data Connect DB directly to check if the user is an admin
    const { data } = await getAdminUserByEmail(dataconnect, { email: decodedToken.email });
    
    if (!data.users || data.users.length === 0 || !data.users[0].isAdmin) {
      console.warn(`Admin access denied for email: ${decodedToken.email} (Not found or isAdmin=false in DB)`);
      return NextResponse.json({ error: 'Forbidden: User is not an admin in DB' }, { status: 403 });
    }

    // 3. Set custom user claims for admin access
    await adminAuth.setCustomUserClaims(decodedToken.uid, { admin: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in set-admin API:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
