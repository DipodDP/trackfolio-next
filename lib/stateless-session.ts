import 'server-only';

import type { SessionPayload } from '@/validation/index';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SIGN_IN } from "@/constants/routes";
// import { cache } from 'react';

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(accessToken: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ accessToken, expiresAt });
  const cookie_action = await cookies()

  cookie_action.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  redirect('/');
}

export async function verifySession() {
  const cookie_action = await cookies()
  const cookie = cookie_action.get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.accessToken) {
    redirect(SIGN_IN);
  }

  return { isAuth: true, accessToken: session.accessToken };
}

export async function updateSession() {
  const cookie_action = await cookies()
  const session = cookie_action.get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookie_action.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookie_action = await cookies()
  cookie_action.delete('session');
  redirect(SIGN_IN);
}

// export const getAccessToken = cache(async () => {
//   const session = await verifySession();
//   if (!session) return null;

//   return session?.accessToken
// });
