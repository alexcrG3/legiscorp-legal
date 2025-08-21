import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/dashboard/Clientes";
import Asuntos from "./pages/dashboard/Asuntos";
import Documentos from "./pages/dashboard/Documentos";
import Plantillas from "./pages/dashboard/Plantillas";
import Calendario from "./pages/dashboard/Calendario";
import Jurisprudencia from "./pages/dashboard/Jurisprudencia";
import Historial from "./pages/dashboard/Historial";
import Estadisticas from "./pages/dashboard/Estadisticas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="clientes" element={<Clientes />} />
            <Route path="asuntos" element={<Asuntos />} />
            <Route path="documentos" element={<Documentos />} />
            <Route path="plantillas" element={<Plantillas />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="jurisprudencia" element={<Jurisprudencia />} />
            <Route path="historial" element={<Historial />} />
            <Route path="estadisticas" element={<Estadisticas />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
