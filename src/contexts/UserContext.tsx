
import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type UserContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('health-assistant-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, we'll create a mock user
    const mockUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0], // Extract name from email
      email
    };
    
    // Store in localStorage for persistence
    localStorage.setItem('health-assistant-user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser = {
      id: `user-${Date.now()}`,
      name,
      email
    };
    
    localStorage.setItem('health-assistant-user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('health-assistant-user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
