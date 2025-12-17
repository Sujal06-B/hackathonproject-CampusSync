import React, { createContext, useContext, useState, useEffect } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { auth } from "../services/firebase";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOutUser,
  onAuthStateChange,
} from "../services/auth";
import { getUserProfile } from "../services/firestore";
import { User } from "../types";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: User | null;
  signup: (
    email: string,
    password: string,
    additionalData: {
      displayName: string;
      university?: string;
      department?: string;
      role?: "student" | "faculty";
    }
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auth) {
      // Real Firebase mode
      console.log("✅ AuthContext: Running in Firebase mode");

      const unsubscribe = onAuthStateChange(async (user) => {
        setCurrentUser(user);

        if (user) {
          try {
            // Fetch user profile from Firestore
            const profile = await getUserProfile(user.uid);
            setUserProfile(profile);
            console.log("✅ User profile loaded:", profile?.displayName);
          } catch (error) {
            console.error("❌ Error loading user profile:", error);
            // Fallback to basic Firebase user data
            setUserProfile({
              uid: user.uid,
              email: user.email || "",
              displayName: user.displayName || "User",
              photoURL: user.photoURL || "",
              role: "student",
              university: "",
              department: "",
              courses: [],
              createdAt: new Date(),
              lastLogin: new Date(),
            });
          }
        } else {
          setUserProfile(null);
        }

        setLoading(false);
      });

      return unsubscribe;
    } else {
      // MOCK MODE: Simulate logged in user
      console.log("⚠️ AuthContext: Running in Mock Mode");

      const mockFirebaseUser = {
        uid: "mock-user-123",
        email: "demo@campussync.edu",
        displayName: "Priya Sharma",
        photoURL:
          "https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff",
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: "",
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => "mock-token",
        getIdTokenResult: async () => ({
          token: "mock-token",
          signInProvider: "password",
          claims: {},
          authTime: new Date().toISOString(),
          issuedAtTime: new Date().toISOString(),
          expirationTime: new Date().toISOString(),
        }),
        reload: async () => {},
        toJSON: () => ({}),
      } as unknown as FirebaseUser;

      const mockUserProfile: User = {
        uid: "mock-user-123",
        email: "demo@campussync.edu",
        role: "student",
        displayName: "Priya Sharma",
        university: "IIT Bombay",
        department: "Computer Science",
        courses: ["CS301", "CS101", "MATH201"],
        photoURL:
          "https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff",
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      // Check if user "logged out" in this session
      const isLoggedOut = localStorage.getItem("mockLoggedOut") === "true";

      if (!isLoggedOut) {
        setCurrentUser(mockFirebaseUser);
        setUserProfile(mockUserProfile);
        console.log("✅ Mock user logged in:", mockUserProfile.displayName);
      } else {
        console.log("ℹ️ Mock user logged out");
      }

      setLoading(false);
    }
  }, []);

  const signup = async (
    email: string,
    password: string,
    additionalData: {
      displayName: string;
      university?: string;
      department?: string;
      role?: "student" | "faculty";
    }
  ) => {
    try {
      setError(null);
      setLoading(true);

      if (auth) {
        const profile = await signUpWithEmail(email, password, additionalData);
        setUserProfile(profile);
        console.log("✅ Sign up successful");
      } else {
        // Mock mode
        localStorage.removeItem("mockLoggedOut");
        const mockUser = {
          uid: "new-mock-user",
          email,
          displayName: additionalData.displayName,
          photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            additionalData.displayName
          )}&background=10b981&color=fff`,
        } as unknown as FirebaseUser;

        const mockProfile: User = {
          uid: mockUser.uid,
          email,
          displayName: additionalData.displayName,
          photoURL: mockUser.photoURL || "",
          role: additionalData.role || "student",
          university: additionalData.university || "IIT Bombay",
          department: additionalData.department || "Computer Science",
          courses: [],
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        setCurrentUser(mockUser);
        setUserProfile(mockProfile);
        console.log("✅ Mock sign up successful");
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      if (auth) {
        const profile = await signInWithEmail(email, password);
        setUserProfile(profile);
        console.log("✅ Login successful");
      } else {
        // Mock mode
        localStorage.removeItem("mockLoggedOut");
        const mockUser = {
          uid: "mock-login-user",
          email,
          displayName: "Demo User",
          photoURL:
            "https://ui-avatars.com/api/?name=Demo+User&background=10b981&color=fff",
        } as unknown as FirebaseUser;

        const mockProfile: User = {
          uid: mockUser.uid,
          email,
          displayName: "Demo User",
          photoURL: mockUser.photoURL || "",
          role: "student",
          university: "IIT Bombay",
          department: "Computer Science",
          courses: ["CS301", "CS101"],
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        setCurrentUser(mockUser);
        setUserProfile(mockProfile);
        console.log("✅ Mock login successful");
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);

      if (auth) {
        await signOutUser();
        setCurrentUser(null);
        setUserProfile(null);
        console.log("✅ Logout successful");
      } else {
        // Mock mode
        localStorage.setItem("mockLoggedOut", "true");
        setCurrentUser(null);
        setUserProfile(null);
        console.log("✅ Mock logout successful");
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const googleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);

      if (auth) {
        const profile = await signInWithGoogle();
        setUserProfile(profile);
        console.log("✅ Google sign in successful");
      } else {
        // Mock mode
        localStorage.removeItem("mockLoggedOut");
        const mockUser = {
          uid: "google-mock-user",
          email: "google@demo.com",
          displayName: "Google User",
          photoURL:
            "https://ui-avatars.com/api/?name=Google+User&background=10b981&color=fff",
        } as unknown as FirebaseUser;

        const mockProfile: User = {
          uid: mockUser.uid,
          email: "google@demo.com",
          displayName: "Google User",
          photoURL: mockUser.photoURL || "",
          role: "student",
          university: "IIT Bombay",
          department: "Computer Science",
          courses: ["CS301"],
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        setCurrentUser(mockUser);
        setUserProfile(mockProfile);
        console.log("✅ Mock Google sign in successful");
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    googleSignIn,
    loading,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
