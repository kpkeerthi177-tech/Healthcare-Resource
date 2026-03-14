import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import CommandCenter from "@/pages/CommandCenter";
import HospitalDashboard from "@/pages/HospitalDashboard";
import AmbulanceDashboard from "@/pages/AmbulanceDashboard";
import ParamedicPatient from "@/pages/ParamedicPatient";
import TrackingPage from "@/pages/TrackingPage";
import SOSPage from "@/pages/SOSPage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import HealthProfile from "@/pages/HealthProfile";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/command" replace />} />
        <Route path="/command" element={<CommandCenter />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/ambulance" element={<AmbulanceDashboard />} />
        <Route path="/paramedic" element={<ParamedicPatient />} />
        <Route path="/tracking/:id" element={<TrackingPage />} />
        <Route path="/sos" element={<SOSPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/profile" element={<HealthProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
