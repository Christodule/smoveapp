import { describe, expect, it } from 'vitest';
import {
  evaluateCmsAccess,
  resolveTrustedSessionUser,
  type AppUser,
} from './securityPolicy';

describe('evaluateCmsAccess', () => {
  it('denies access when cms feature is disabled', () => {
    const decision = evaluateCmsAccess({
      cmsEnabled: false,
      isAuthenticated: true,
      user: { role: 'admin' },
    });

    expect(decision).toBe('disabled');
  });

  it('denies access for unauthenticated users', () => {
    const decision = evaluateCmsAccess({
      cmsEnabled: true,
      isAuthenticated: false,
      user: null,
    });

    expect(decision).toBe('unauthenticated');
  });

  it('denies access for authenticated non-admin users', () => {
    const decision = evaluateCmsAccess({
      cmsEnabled: true,
      isAuthenticated: true,
      user: { role: 'editor' },
    });

    expect(decision).toBe('forbidden');
  });

  it('allows access for authenticated admin users', () => {
    const decision = evaluateCmsAccess({
      cmsEnabled: true,
      isAuthenticated: true,
      user: { role: 'admin' },
    });

    expect(decision).toBe('allow');
  });
});

describe('resolveTrustedSessionUser', () => {
  it('ignores client-side session objects when server session is missing', () => {
    const forgedClientUser = {
      id: 'forged',
      email: 'attacker@fake.local',
      name: 'Attacker',
      role: 'admin',
    };

    expect(resolveTrustedSessionUser(null, forgedClientUser)).toBeNull();
  });

  it('returns server-validated session user', () => {
    const serverUser: AppUser = {
      id: '1',
      email: 'admin@company.test',
      name: 'Company Admin',
      role: 'admin',
    };

    expect(resolveTrustedSessionUser(serverUser, null)).toEqual(serverUser);
  });
});
