import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Index from "./pages/Index";
import Listen from "./pages/Listen";
import AlbumDetail from "./pages/AlbumDetail";
import DAYDMedia from "./pages/DAYDMedia";
import Videos from "./pages/Videos";
import Contact from "./pages/Contact";
import Predictions from "./pages/Predictions";
import SimpleCinematicPage from "./pages/SimpleCinematicPage";
import NotFound from "./pages/NotFound";
import SparklesCursor from "./components/SparklesCursor";
import ConcertPopup from "./components/ConcertPopup";

const queryClient = new QueryClient();

function AppRoutes() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      {!isHome ? <SiteHeader variant="page" /> : null}
      <div
        className={
          isHome
            ? ""
            : "pt-[max(4.25rem,calc(3.5rem+env(safe-area-inset-top,0px)))] md:pt-[max(5rem,calc(4rem+env(safe-area-inset-top,0px)))]"
        }
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/album/:slug" element={<AlbumDetail />} />
          <Route path="/dayd-media" element={<DAYDMedia />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/music" element={<Listen />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route
            path="/about"
            element={<SimpleCinematicPage title="About" subtitle="The story behind the sound—coming soon." />}
          />
          <Route
            path="/lyrics"
            element={<SimpleCinematicPage title="Lyrics" subtitle="Words from Things I Shouldn't Say—coming soon." />}
          />
          <Route
            path="/merch"
            element={<SimpleCinematicPage title="Merch" subtitle="Wear the velvet night—coming soon." />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SparklesCursor />
      <ConcertPopup />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
