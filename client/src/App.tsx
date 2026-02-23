import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";

import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";

// Pages
import Home from "@/pages/Home";
import FileComplaint from "@/pages/FileComplaint";
import Awareness from "@/pages/Awareness";
import Impact from "@/pages/Impact";
import GovResources from "@/pages/GovResources";

function Router() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/file-complaint" component={FileComplaint} />
          <Route path="/awareness" component={Awareness} />
          <Route path="/impact" component={Impact} />
          <Route path="/gov-resources" component={GovResources} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-slate-900 py-8 text-center text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} NyayAI - Smart Consumer Justice Platform. Developed for National Competition.</p>
          <p className="mt-2 text-xs opacity-60">This platform uses AI to generate analysis and drafts. Not a substitute for official legal counsel.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
