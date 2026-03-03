"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthUser, CandidateProfile } from "./types";
import { mockCandidate } from "./mock-data";

interface AuthContextType {
  user: AuthUser | null;
  profile: CandidateProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<CandidateProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "together_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setProfile(parsed.profile);
      }
    } catch {
      // ignore parse errors
    }
    setIsLoading(false);
  }, []);

  const persist = useCallback(
    (u: AuthUser | null, p: CandidateProfile | null) => {
      if (u) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ user: u, profile: p })
        );
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    []
  );

  const login = useCallback(
    async (email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 600));
      const u: AuthUser = {
        id: mockCandidate.id,
        email,
        name: mockCandidate.name,
        hasProfile: true,
      };
      setUser(u);
      setProfile(mockCandidate);
      persist(u, mockCandidate);
      return true;
    },
    [persist]
  );

  const signup = useCallback(
    async (name: string, email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 600));
      const u: AuthUser = {
        id: `cand-${Date.now()}`,
        email,
        name,
        hasProfile: false,
      };
      const p: CandidateProfile = {
        id: u.id,
        email,
        name,
        location: "",
        experienceLevel: "mid",
        rolePreferences: [],
        skills: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(u);
      setProfile(p);
      persist(u, p);
      return true;
    },
    [persist]
  );

  const logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = useCallback(
    (data: Partial<CandidateProfile>) => {
      setProfile((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...data, updatedAt: new Date().toISOString() };
        if (user) {
          const updatedUser = { ...user, hasProfile: true };
          setUser(updatedUser);
          persist(updatedUser, updated);
        }
        return updated;
      });
    },
    [user, persist]
  );

  return (
    <AuthContext.Provider
      value={{ user, profile, isLoading, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
