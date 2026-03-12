import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import ApoioPage from "@/pages/ApoioPage";
import ChecklistPage from "@/pages/ChecklistPage";
import FaqPage from "@/pages/FaqPage";
import Home from "@/pages/Home";
import LibraryPage from "@/pages/LibraryPage";
import WeekPage from "@/pages/WeekPage";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function AppRouter() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/semana/:week/dia/:day" component={WeekPage} />
        <Route path="/semana/:week" component={WeekPage} />
        <Route path="/biblioteca" component={LibraryPage} />
        <Route path="/checklist" component={ChecklistPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/apoio" component={ApoioPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
