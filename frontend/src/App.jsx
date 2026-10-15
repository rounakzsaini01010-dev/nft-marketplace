import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/app/ThemeProvider";
import { Web3Provider } from "@/app/Web3Provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AppRoutes } from "@/routes/AppRoutes";

export default function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <TooltipProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}
