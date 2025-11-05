import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAdminContent, fetchUserProfile } from "@/lib/api";

interface User {
  id: string;
  username: string;
  role: "admin" | "user";
  name: string;
  password?: string; // Only for mock purposes
}

interface SignupPayload {
  fullName?: string;
  username: string;
  password: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  signup: (payload: SignupPayload) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("apb_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async ({
    fullName,
    username,
    password,
    role,
  }: SignupPayload): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate API

    if (password.length >= 4 && username) {
      // load existing users
      const users: User[] = JSON.parse(
        localStorage.getItem("apb_users") || "[]"
      );

      // check if username already exists
      if (users.find((u) => u.username === username)) {
        return false; // duplicate
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        password, // store password for mock auth
        role,
        name: fullName || username.charAt(0).toUpperCase() + username.slice(1),
      };

      users.push(newUser);
      localStorage.setItem("apb_users", JSON.stringify(users));

      // set current session without password
      const { password: _, ...sessionUser } = newUser;
      setUser(sessionUser);
      localStorage.setItem("apb_user", JSON.stringify(sessionUser));

      return true;
    }
    return false;
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Determine which API to call based on username
      const isUser = username === "user";
      const isAdmin = username === "admin";
      let data;
      if (isUser) {
        data = await fetchUserProfile(username, password);
      } else if (isAdmin) {
        data = await fetchAdminContent(username, password);
      } else {
        // Fallback for other mock users
        const users: User[] = JSON.parse(localStorage.getItem("apb_users") || "[]");
        const found = users.find((u) => u.username === username && u.password === password);
        if (!found) return false;
      }
      
      const sessionUser: User = { id: Math.random().toString(), username, role: isAdmin ? 'admin' : 'user', name: username, password };
      setUser(sessionUser);
      localStorage.setItem("apb_user", JSON.stringify(sessionUser));
      return true; // Successful login
    } catch (error) {
      console.error("Login failed:", error);
      return false; // Failed login
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apb_user');
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
