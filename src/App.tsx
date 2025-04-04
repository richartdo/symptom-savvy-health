
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
