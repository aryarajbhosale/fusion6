import React, { createContext, useContext, useReducer, useMemo, ReactNode, useEffect } from "react";

// --- Types ---
export interface User {
  id: string;
  name: string;
  email: string;
}

// FIX #1: The context type now expects a `state` object.
interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

type AuthState = {
  user: User | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

// --- Storage logic (This part is fine, no changes needed) ---
const authStorage = {
  getUsers: (): (User & { passwordHash: string })[] => {
    try {
      const users = localStorage.getItem("users");
      return users ? JSON.parse(users) : [];
    } catch (e) {
      return [];
    }
  },
  saveUsers: (users: (User & { passwordHash: string })[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  },
  getCurrentUser: (): User | null => {
    try {
      const user = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },
  setCurrentUser: (user: User | null, remember: boolean = true) => {
    if (user) {
      if (remember) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        sessionStorage.removeItem("currentUser");
      } else {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.removeItem("currentUser");
      }
    } else {
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("currentUser");
    }
  },
  hashPassword: (password: string) => {
    return btoa(password);
  },
};

// --- Reducer ---
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// --- Context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: authStorage.getCurrentUser(),
  });

  useEffect(() => {
    if (state.user) {
      authStorage.setCurrentUser(state.user);
    }
  }, [state.user]);

  const login = async (email: string, password: string, remember: boolean = true): Promise<{ success: boolean; error?: string }> => {
    const users = authStorage.getUsers();
    const passwordHash = authStorage.hashPassword(password);
    const userAccount = users.find((u) => u.email === email && u.passwordHash === passwordHash);

    if (!userAccount) return { success: false, error: "Invalid email or password." };

    const { passwordHash: _, ...userToStore } = userAccount;
    authStorage.setCurrentUser(userToStore, remember);
    dispatch({ type: "LOGIN", payload: userToStore });

    return { success: true };
  };

  const signup = async (name: string, email: string, password: string, remember: boolean = true): Promise<{ success: boolean; error?: string }> => {
    const users = authStorage.getUsers();
    if (users.some((u) => u.email === email)) return { success: false, error: "Email already exists." };

    const newUserAccount = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash: authStorage.hashPassword(password),
    };

    authStorage.saveUsers([...users, newUserAccount]);

    const { passwordHash: _, ...userToStore } = newUserAccount;
    authStorage.setCurrentUser(userToStore, remember);
    dispatch({ type: "LOGIN", payload: userToStore });

    return { success: true };
  };

  const logout = () => {
    authStorage.setCurrentUser(null, false);
    dispatch({ type: "LOGOUT" });
  };

  // FIX #2: The provided value now includes the `state` object, matching what the pages expect.
  const value = useMemo(() => ({ state, login, signup, logout }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- Hook ---
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};