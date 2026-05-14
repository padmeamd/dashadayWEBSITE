import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Listen from "./pages/Listen";
import AlbumDetail from "./pages/AlbumDetail";
import DAYDMedia from "./pages/DAYDMedia";
import Videos from "./pages/Videos";
import Contact from "./pages/Contact";
import SimpleCinematicPage from "./pages/SimpleCinematicPage";
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
          <Route path="/listen" element={<Listen />} />
          <Route path="/album/:slug" element={<AlbumDetail />} />
          <Route path="/dayd-media" element={<DAYDMedia />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/music" element={<Listen />} />
          <Route path="/videos" element={<Videos />} />
          <Route
            path="/about"
            element={<SimpleCinematicPage title="About" subtitle="The story behind the sound—coming soon." />}
          />
          <Route
            path="/lyrics"
            element={<SimpleCinematicPage title="Lyrics" subtitle="Words from after midnight—coming soon." />}
          />
          <Route
            path="/merch"
            element={<SimpleCinematicPage title="Merch" subtitle="Wear the velvet night—coming soon." />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
