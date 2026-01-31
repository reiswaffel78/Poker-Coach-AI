import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/CookieConsent";
import Landing from "@/pages/Landing";
import PokerApp from "@/pages/App";
import Guide from "@/pages/Guide";
import ExtensionGuide from "@/pages/ExtensionGuide";
import Privacy from "@/pages/Datenschutz";
import Terms from "@/pages/Nutzungsbedingungen";
import HandsOfTheDay from "@/pages/HandsOfTheDay";
import HandDetail from "@/pages/HandDetail";
import Wiki from "@/pages/Wiki";
import WikiDetail from "@/pages/WikiDetail";
import FamousHands from "@/pages/FamousHands";
import FamousHandDetail from "@/pages/FamousHandDetail";
import Quiz from "@/pages/Quiz";
import Ranges from "@/pages/Ranges";
import Spots from "@/pages/Spots";
import SpotDetail from "@/pages/SpotDetail";
import Support from "@/pages/Support";
import FAQ from "@/pages/FAQ";
import NotFound from "@/pages/not-found";
import "./lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/app" component={PokerApp} />
      <Route path="/guide" component={Guide} />
      <Route path="/extension-guide" component={ExtensionGuide} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/hands" component={HandsOfTheDay} />
      <Route path="/hands/:slug" component={HandDetail} />
      <Route path="/wiki" component={Wiki} />
      <Route path="/wiki/:slug" component={WikiDetail} />
      <Route path="/famous-hands" component={FamousHands} />
      <Route path="/famous-hands/:slug" component={FamousHandDetail} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/ranges" component={Ranges} />
      <Route path="/spots" component={Spots} />
      <Route path="/spots/:slug" component={SpotDetail} />
      <Route path="/support" component={Support} />
      <Route path="/faq" component={FAQ} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router />
            <CookieConsent />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
