import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "@/components/effects/LoadingScreen";
import ClickSpark from "@/components/effects/ClickSpark";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Discover from "@/pages/Discover";
import CraftsmanProfile from "@/pages/CraftsmanProfile";
import Archive from "@/pages/Archive";
import BookingPage from "@/pages/BookingPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
        {!loading && (
          <ClickSpark>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/craftsman/:id" element={<CraftsmanProfile />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/book/:id" element={<BookingPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </ClickSpark>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
