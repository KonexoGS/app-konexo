import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export interface SessionData {
  userId: string
  email?: string
  expiresAt?: Date
  [key: string]: any // Para compatibilidade com JWTPayload
}

const secretKey = process.env.SESSION_SECRET

if (!secretKey) throw new Error('SESSION_SECRET environment variable is not set');

const algorithm = process.env.JWT_ALGORITHM || 'HS256';
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionData) {
  const { expiresAt, ...jwtPayload } = payload
  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime(expiresAt ? Math.floor(expiresAt.getTime() / 1000) : '7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: [algorithm],
    })
    return payload as SessionData;
  } catch (error) {
    console.log('falha na verificação de sessão')
    return null
  }
}

export async function createSession(userId: string, email?: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, email, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) return null

  const payload = await decrypt(session);

  if (!payload || typeof payload !== 'object' || !payload.userId) {
    return null
  }

  return payload as SessionData;
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}