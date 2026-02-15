import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  fetchServerSession,
  loginWithApi,
  logoutWithApi,
  registerWithApi,
} from '../utils/authApi';
import {
  evaluateCmsAccess,
  resolveTrustedSessionUser,
  SECURITY_FLAGS,
  type AppUser,
} from '../utils/securityPolicy';

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  cmsEnabled: boolean;
  registrationEnabled: boolean;
  canAccessCMS: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function clearLegacyClientAuthArtifacts() {
  // Legacy keys contained credentials/session data and must no longer be trusted.
  localStorage.removeItem('smove_user');
  localStorage.removeItem('smove_users');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const cmsEnabled = SECURITY_FLAGS.cmsEnabled;
  const registrationEnabled = SECURITY_FLAGS.registrationEnabled;
  const isAuthenticated = !!user;

  const canAccessCMS =
    evaluateCmsAccess({
      cmsEnabled,
      isAuthenticated,
      user,
    }) === 'allow';

  useEffect(() => {
    let isActive = true;
    clearLegacyClientAuthArtifacts();

    const bootstrapAuth = async () => {
      if (!cmsEnabled) {
        if (!isActive) {
          return;
        }
        setUser(null);
        setIsAuthReady(true);
        return;
      }

      const session = await fetchServerSession();
      if (!isActive) {
        return;
      }

      setCsrfToken(session.csrfToken);
      setUser(resolveTrustedSessionUser(session.user));
      setIsAuthReady(true);
    };

    bootstrapAuth();

    return () => {
      isActive = false;
    };
  }, [cmsEnabled]);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!cmsEnabled) {
      return false;
    }

    const devAdminEmail = import.meta.env.VITE_DEV_ADMIN_EMAIL;
    const devAdminPassword = import.meta.env.VITE_DEV_ADMIN_PASSWORD;
    const devAdminName = import.meta.env.VITE_DEV_ADMIN_NAME || 'Dev Administrator';

    if (
      SECURITY_FLAGS.devAdminFallbackEnabled &&
      devAdminEmail &&
      devAdminPassword &&
      email === devAdminEmail &&
      password === devAdminPassword
    ) {
      setUser({
        id: 'dev-admin',
        email: devAdminEmail,
        name: devAdminName,
        role: 'admin',
      });
      return true;
    }

    const result = await loginWithApi(email, password, csrfToken);
    setCsrfToken(result.csrfToken);
    setUser(result.user);
    return !!result.user;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    if (!registrationEnabled || !cmsEnabled) {
      return false;
    }

    const result = await registerWithApi(email, password, name, csrfToken);
    setCsrfToken(result.csrfToken);
    setUser(result.user);
    return !!result.user;
  };

  const logout = async () => {
    await logoutWithApi(csrfToken);
    setUser(null);
    setCsrfToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        isAuthReady,
        cmsEnabled,
        registrationEnabled,
        canAccessCMS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
