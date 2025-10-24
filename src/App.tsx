import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/dashboard/Clientes";
import Asuntos from "./pages/dashboard/Asuntos";
import Consultas from "./pages/dashboard/Consultas";
import Documentos from "./pages/dashboard/Documentos";
import Plantillas from "./pages/dashboard/Plantillas";
import Calendario from "./pages/dashboard/Calendario";
import Citas from "./pages/dashboard/Citas";
import Jurisprudencia from "./pages/dashboard/Jurisprudencia";
import Historial from "./pages/dashboard/Historial";
import Estadisticas from "./pages/dashboard/Estadisticas";
import Automatizaciones from "./pages/dashboard/Automatizaciones";
import ConsultorIA from "./pages/dashboard/ConsultorIA";
import Usuarios from "./pages/dashboard/Usuarios";
import NotFound from "./pages/NotFound";
import PublicFirma from "./pages/PublicFirma";
import FloatingChat from "./components/FloatingChat";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:subdominio/inicio" element={<PublicFirma />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path="clientes" element={<Clientes />} />
            <Route path="asuntos" element={<Asuntos />} />
            <Route path="consultas" element={<Consultas />} />
            <Route path="documentos" element={<Documentos />} />
            <Route path="plantillas" element={<Plantillas />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="citas" element={<Citas />} />
            <Route path="jurisprudencia" element={<Jurisprudencia />} />
            <Route path="historial" element={<Historial />} />
            <Route path="estadisticas" element={<Estadisticas />} />
            <Route path="automatizaciones" element={<Automatizaciones />} />
            <Route path="consultor-ia" element={<ConsultorIA />} />
            <Route path="usuarios" element={<Usuarios />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
