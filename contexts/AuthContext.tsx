import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  loading: boolean;
  userProfile: any; // Add flexible profile type for mock mode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        if (user) {
             // Basic mock profile for firebase users if firestore isn't connected
             setUserProfile({
                 displayName: user.displayName || 'Student',
                 email: user.email,
                 role: 'student'
             });
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // MOCK MODE: Simulate logged in user
      console.log("AuthContext: Running in Mock Mode");
      const mockUser = {
        uid: 'mock-user-123',
        email: 'demo@campussync.edu',
        displayName: 'Priya Sharma',
        photoURL: null,
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => 'mock-token',
        getIdTokenResult: async () => ({
            token: 'mock-token',
            signInProvider: 'password',
            claims: {},
            authTime: new Date().toISOString(),
            issuedAtTime: new Date().toISOString(),
            expirationTime: new Date().toISOString(),
        }),
        reload: async () => {},
        toJSON: () => ({})
      } as unknown as User;

      // Check if user "logged out" in this session
      const isLoggedOut = localStorage.getItem('mockLoggedOut') === 'true';
      
      if (!isLoggedOut) {
          setCurrentUser(mockUser);
          setUserProfile({
            uid: mockUser.uid,
            email: mockUser.email,
            role: 'student',
            displayName: 'Priya Sharma',
            university: 'IIT Bombay',
            department: 'Computer Science'
          });
      }
      
      setLoading(false);
    }
  }, []);

  const signup = async (email: string, password: string) => {
    if (auth) {
        await createUserWithEmailAndPassword(auth, email, password);
    } else {
        localStorage.removeItem('mockLoggedOut');
        const user = { uid: 'new-mock', email, displayName: 'New Student' } as unknown as User;
        setCurrentUser(user);
    }
  };

  const login = async (email: string, password: string) => {
    if (auth) {
        await signInWithEmailAndPassword(auth, email, password);
    } else {
        localStorage.removeItem('mockLoggedOut');
         const user = { uid: 'mock-login', email, displayName: 'Demo User' } as unknown as User;
        setCurrentUser(user);
    }
  };

  const logout = async () => {
    if (auth) {
        return signOut(auth);
    } else {
        localStorage.setItem('mockLoggedOut', 'true');
        setCurrentUser(null);
        setUserProfile(null);
    }
  };

  const googleSignIn = async () => {
    if (auth) {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    } else {
        localStorage.removeItem('mockLoggedOut');
        const user = { uid: 'google-mock', email: 'google@demo.com', displayName: 'Google User' } as unknown as User;
        setCurrentUser(user);
    }
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    googleSignIn,
    loading,
    userProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};