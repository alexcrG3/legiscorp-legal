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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/clientes" element={<Clientes />} />
          <Route path="/dashboard/asuntos" element={<Asuntos />} />
          <Route path="/dashboard/documentos" element={<Documentos />} />
          <Route path="/dashboard/plantillas" element={<Plantillas />} />
          <Route path="/dashboard/calendario" element={<Calendario />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
