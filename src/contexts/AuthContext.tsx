import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('smove_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials (demo purposes - in production use real API)
    const storedUsers = JSON.parse(localStorage.getItem('smove_users') || '[]');
    const foundUser = storedUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    // Default admin account (development only)
    if (import.meta.env.DEV && email === 'admin@smove.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        email: 'admin@smove.com',
        name: 'Admin SMOVE',
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem('smove_user', JSON.stringify(adminUser));
      return true;
    }

    if (foundUser) {
      const loggedUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role || 'editor',
      };
      setUser(loggedUser);
      localStorage.setItem('smove_user', JSON.stringify(loggedUser));
      return true;
    }

    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('smove_users') || '[]');
    const userExists = storedUsers.find((u: any) => u.email === email);

    if (userExists) {
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role: 'editor',
    };

    storedUsers.push(newUser);
    localStorage.setItem('smove_users', JSON.stringify(storedUsers));

    // Auto login after registration
    const registeredUser: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: 'editor',
    };
    setUser(registeredUser);
    localStorage.setItem('smove_user', JSON.stringify(registeredUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smove_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
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
