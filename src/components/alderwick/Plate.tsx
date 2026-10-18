import { useState } from "react";

/**
 * A picture frame that is never broken.
 *
 * Asset slots on this page point at files that may not exist yet. Rather than
 * a browser's torn-image icon, a missing file leaves a composed frame with the
 * subject's name engraved in it — so the page reads as deliberately unfinished
 * rather than faulty. Drop the file in and the photograph simply appears.
 */
type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
};

const Plate = ({ src, alt, caption, className = "", imgClassName = "", eager }: Props) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`aw-empty-frame flex items-center justify-center ${className}`}>
        <span className="aw-label px-4 text-center leading-relaxed opacity-70">
          {caption ?? alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className} ${imgClassName}`}
    />
  );
};

export default Plate;
