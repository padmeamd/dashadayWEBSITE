import { useEffect } from "react";
import { SITE_URL } from "@/config/site";
import {
  EPISODES,
  SERIES,
  SERIES_ANCHOR_ID,
  SERIES_LINKS,
  SERIES_STILLS,
  getPublishedEpisodes,
} from "@/data/series";

const SCRIPT_ID = "series-structured-data";

/**
 * Describes the series to search engines as schema.org TVSeries.
 *
 * Built from EPISODES rather than hand-written JSON, so adding a chapter keeps
 * the markup correct automatically. Only episodes already released in public
 * are listed — an unreleased one would be advertised as available.
 */
const SeriesStructuredData = () => {
  useEffect(() => {
    const published = getPublishedEpisodes();

    const data = {
      "@context": "https://schema.org",
      "@type": "TVSeries",
      name: SERIES.title,
      alternateName: "Things I Shouldn't Say — the series",
      url: `${SITE_URL}/#${SERIES_ANCHOR_ID}`,
      description: `${SERIES.intro.lead} ${SERIES.intro.body}`,
      image: [SERIES_STILLS.hall, SERIES_STILLS.arrival, SERIES_STILLS.encounter].map(
        (still) => `${SITE_URL}${still.src}`
      ),
      genre: [...SERIES.genre, "Period Drama", "Supernatural Mystery"],
      inLanguage: "en",
      creator: {
        "@type": "Person",
        name: "Dasha Day",
        url: SITE_URL,
      },
      productionCompany: {
        "@type": "Organization",
        name: "DAYD Media",
        url: `${SITE_URL}/dayd-media`,
      },
      contentLocation: {
        "@type": "Place",
        name: "Alderwick University, England",
      },
      numberOfEpisodes: EPISODES.length,
      sameAs: [SERIES_LINKS.telegram],
      episode: published.map(({ episode, datePublished }) => ({
        "@type": "TVEpisode",
        episodeNumber: Number(episode.number),
        ...(episode.title ? { name: episode.title } : {}),
        ...(episode.description ? { description: episode.description } : {}),
        datePublished,
        url: SERIES_LINKS.telegram,
      })),
    };

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, []);

  return null;
};

export default SeriesStructuredData;
