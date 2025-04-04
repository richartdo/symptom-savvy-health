
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DiagnosisPage from "./pages/DiagnosisPage";
import TrackingPage from "./pages/TrackingPage";
import FirstAidPage from "./pages/FirstAidPage";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

// Page theme manager component
const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Remove all theme classes first
    document.body.classList.remove(
      'theme-home',
      'theme-dashboard',
      'theme-diagnosis',
      'theme-tracking',
      'theme-first-aid',
      'theme-map'
    );
    
    // Add appropriate theme class based on current route
    if (location.pathname === '/') {
      document.body.classList.add('theme-home');
    } else if (location.pathname === '/dashboard') {
      document.body.classList.add('theme-dashboard');
    } else if (location.pathname === '/diagnosis') {
      document.body.classList.add('theme-diagnosis');
    } else if (location.pathname === '/tracking') {
      document.body.classList.add('theme-tracking');
    } else if (location.pathname === '/first-aid') {
      document.body.classList.add('theme-first-aid');
    } else if (location.pathname === '/map') {
      document.body.classList.add('theme-map');
    }
  }, [location]);
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ThemeManager>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/diagnosis" element={
                <ProtectedRoute>
                  <DiagnosisPage />
                </ProtectedRoute>
              } />
              <Route path="/tracking" element={
                <ProtectedRoute>
                  <TrackingPage />
                </ProtectedRoute>
              } />
              <Route path="/first-aid" element={
                <ProtectedRoute>
                  <FirstAidPage />
                </ProtectedRoute>
              } />
              <Route path="/map" element={
                <ProtectedRoute>
                  <MapPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThemeManager>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
