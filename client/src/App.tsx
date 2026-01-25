import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/CookieConsent";
import Home from "@/pages/Home";
import Guide from "@/pages/Guide";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import Nutzungsbedingungen from "@/pages/Nutzungsbedingungen";
import NotFound from "@/pages/not-found";
import "./lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/anleitung" component={Guide} />
      <Route path="/guide" component={Guide} />
      <Route path="/impressum" component={Impressum} />
      <Route path="/datenschutz" component={Datenschutz} />
      <Route path="/privacy" component={Datenschutz} />
      <Route path="/nutzungsbedingungen" component={Nutzungsbedingungen} />
      <Route path="/terms" component={Nutzungsbedingungen} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieConsent />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
