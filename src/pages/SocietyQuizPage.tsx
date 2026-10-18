import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Seo from "@/components/Seo";
import SocietyQuiz from "@/components/alderwick/SocietyQuiz";
import { SERIES_ROUTE } from "@/data/series";
import "@/styles/alderwick.css";

/** The sorting, on its own page so a result can be linked to and shared. */
const SocietyQuizPage = () => (
  <main className="alderwick relative min-h-screen overflow-x-hidden">
    <Seo />
    <span className="aw-dust" aria-hidden />

    <div className="relative px-5 pt-14 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          to={SERIES_ROUTE}
          className="aw-label inline-flex items-center gap-2 no-underline opacity-75 transition-opacity hover:opacity-100"
        >
          <ArrowLeft size={13} aria-hidden /> The Alderwick archive
        </Link>
      </div>
    </div>

    <div className="relative py-10 sm:py-14">
      <SocietyQuiz />
    </div>
  </main>
);

export default SocietyQuizPage;
