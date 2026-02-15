import type { AppUser } from './securityPolicy';

interface AuthApiResponse {
  user?: AppUser;
  csrfToken?: string;
}

export interface AuthResult {
  user: AppUser | null;
  csrfToken: string | null;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '');
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;
const REQUEST_TIMEOUT_MS = 10000;

async function requestAuth(
  path: string,
  init: RequestInit = {},
  csrfToken?: string | null,
): Promise<AuthApiResponse | null> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const headers = new Headers(init.headers);
    headers.set('Content-Type', 'application/json');
    if (csrfToken) {
      headers.set('X-CSRF-Token', csrfToken);
    }

    const response = await fetch(`${AUTH_BASE_URL}${path}`, {
      ...init,
      headers,
      credentials: 'include',
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as AuthApiResponse;
    return data;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

function toAuthResult(payload: AuthApiResponse | null): AuthResult {
  return {
    user: payload?.user ?? null,
    csrfToken: payload?.csrfToken ?? null,
  };
}

export async function fetchServerSession(csrfToken?: string | null): Promise<AuthResult> {
  return toAuthResult(await requestAuth('/session', { method: 'GET' }, csrfToken));
}

export async function loginWithApi(
  email: string,
  password: string,
  csrfToken?: string | null,
): Promise<AuthResult> {
  return toAuthResult(
    await requestAuth(
      '/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
      csrfToken,
    ),
  );
}

export async function registerWithApi(
  email: string,
  password: string,
  name: string,
  csrfToken?: string | null,
): Promise<AuthResult> {
  return toAuthResult(
    await requestAuth(
      '/register',
      {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      },
      csrfToken,
    ),
  );
}

export async function logoutWithApi(csrfToken?: string | null): Promise<void> {
  await requestAuth('/logout', { method: 'POST' }, csrfToken);
}
