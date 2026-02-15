export type UserRole = 'admin' | 'editor' | 'viewer';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type CmsAccessDecision = 'allow' | 'disabled' | 'unauthenticated' | 'forbidden';

export interface CmsAccessInput {
  cmsEnabled: boolean;
  isAuthenticated: boolean;
  user: Pick<AppUser, 'role'> | null;
}

function parseBooleanFlag(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) {
    return defaultValue;
  }
  return value === 'true';
}

export const SECURITY_FLAGS = {
  // CMS is enabled in development by default, disabled in production unless explicitly enabled.
  cmsEnabled: parseBooleanFlag(import.meta.env.VITE_ENABLE_CMS, import.meta.env.DEV),
  // Public self-registration is disabled by default in every environment.
  registrationEnabled: parseBooleanFlag(import.meta.env.VITE_ENABLE_REGISTRATION, false),
  // Dev fallback admin login is enabled only in development unless explicitly disabled.
  devAdminFallbackEnabled:
    import.meta.env.DEV && parseBooleanFlag(import.meta.env.VITE_ENABLE_DEV_ADMIN, true),
} as const;

export function evaluateCmsAccess(input: CmsAccessInput): CmsAccessDecision {
  if (!input.cmsEnabled) {
    return 'disabled';
  }
  if (!input.isAuthenticated || !input.user) {
    return 'unauthenticated';
  }
  if (input.user.role !== 'admin') {
    return 'forbidden';
  }
  return 'allow';
}

// Explicitly reject trust in browser-persisted identities to prevent local tampering.
export function resolveTrustedSessionUser(serverUser: AppUser | null, _clientStoredUser?: unknown): AppUser | null {
  return serverUser;
}
