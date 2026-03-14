import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'hospital' | 'ambulance' | 'patient' | 'family';

interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  canEdit: (module: string) => boolean;
  canView: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const rolePermissions: Record<UserRole, { edit: string[]; view: string[] }> = {
  hospital: {
    edit: ['facility', 'team-status'],
    view: ['incoming-patients', 'statistics', 'hospital', 'tracking'],
  },
  ambulance: {
    edit: ['patient-data', 'vitals'],
    view: ['hospital', 'command', 'tracking', 'paramedic'],
  },
  patient: {
    edit: ['sos', 'health-profile', 'appointments'],
    view: ['ambulance', 'hospital', 'paramedic', 'tracking', 'family'],
  },
  family: {
    edit: [],
    view: ['tracking', 'hospital', 'ambulance', 'paramedic', 'family'],
  },
};

const roleUsers: Record<UserRole, User> = {
  hospital: { id: '1', name: 'Dr. Sarah Chen', role: 'hospital' },
  ambulance: { id: '2', name: 'Paramedic James', role: 'ambulance' },
  patient: { id: '3', name: 'Alex Thompson', role: 'patient' },
  family: { id: '4', name: 'Maria Thompson', role: 'family' },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: UserRole) => {
    setUser(roleUsers[role]);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const canEdit = useCallback((module: string) => {
    if (!user) return false;
    return rolePermissions[user.role].edit.includes(module);
  }, [user]);

  const canView = useCallback((module: string) => {
    if (!user) return false;
    return rolePermissions[user.role].view.includes(module);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, canEdit, canView }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
