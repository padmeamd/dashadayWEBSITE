import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { SERIES_ANCHOR_ID } from "@/data/series";

/**
 * `/things-i-shouldnt-say` is the shareable address for the series. The series
 * lives on the homepage, so this route hands visitors straight to that section
 * rather than duplicating it as a second page.
 */
const SeriesRedirect = () => {
  useEffect(() => {
    // Runs after the homepage mounts and the section exists.
    const id = window.setTimeout(() => {
      document.getElementById(SERIES_ANCHOR_ID)?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 120);
    return () => window.clearTimeout(id);
  }, []);

  return <Navigate to={`/#${SERIES_ANCHOR_ID}`} replace />;
};

export default SeriesRedirect;
