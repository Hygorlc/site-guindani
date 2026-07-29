import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProdutoPulseiraElos from "./pages/ProdutoPulseiraElos";
import Aneis from "./pages/Aneis";
import Correntes from "./pages/Correntes";
import Gargantilhas from "./pages/Gargantilhas";
import Pulseiras from "./pages/Pulseiras";

/**
 * Guindani — App
 * Design: Guindani Classique (light theme)
 * Paleta: Dourado Champagne #C9A96E | Preto #1A1A1A | Branco #FFFFFF
 */

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/admin"} component={Admin} />
      <Route path="/produto/pulseira-elos-geometricos" component={ProdutoPulseiraElos} />
      <Route path="/categoria/aneis" component={Aneis} />
        <Route path="/categoria/correntes" component={Correntes} />
        <Route path="/categoria/gargantilhas" component={Gargantilhas} />
        <Route path="/categoria/pulseiras" component={Pulseiras} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
