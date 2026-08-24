"use client";

import {
  careerPageIntro,
  type CareerLeadSegment,
} from "@/src/data/careerStory";
import { ProfilePhotoDecode } from "@/src/components/ProfilePhotoDecode";

/** Headline: orange → green → violet */
const TITLE_MARKER_TONES = [
  "about-marker--orange",
  "about-marker--green",
  "about-marker--violet",
] as const;

/** Body copy: sky → rose → yellow (distinct from headline) */
const BODY_MARKER_TONES = [
  "about-marker--sky",
  "about-marker--rose",
  "about-marker--yellow",
] as const;

function StoryParagraph({
  segments,
  toneOffset,
}: {
  segments: CareerLeadSegment[];
  toneOffset: number;
}) {
  let highlightIndex = 0;
  return (
    <p className="max-w-[54ch] text-[16px] text-[var(--foreground)]">
      {segments.map((seg, i) => {
        if (!seg.highlight) {
          return <span key={i}>{seg.text}</span>;
        }
        const tone =
          BODY_MARKER_TONES[
            (toneOffset + highlightIndex) % BODY_MARKER_TONES.length
          ];
        highlightIndex += 1;
        return (
          <span key={i} className={`about-marker ${tone}`}>
            {seg.text}
          </span>
        );
      })}
    </p>
  );
}

/**
 * About intro: portrait + story as one centered cluster.
 */
export function AboutMeVisitingCard() {
  return (
    <div className="relative w-full">
      <div className="relative flex w-full justify-center">
        <div className="relative z-[1] grid w-full max-w-[640px] grid-cols-1 gap-8 md:w-auto md:max-w-none md:grid-cols-[auto_minmax(0,54ch)] md:items-start md:gap-10">
          <div className="flex flex-col items-center gap-5 md:items-start">
            <ProfilePhotoDecode
              compact
              imageSrc="/assets/cv-profile-illust-base.png"
              colorImageSrc="/assets/cv-profile-illust-hover-v4.png"
              imageAlt="Illustrated portrait of Gyan Prakash"
            />
          </div>

          <div className="min-w-0 text-left">
            <h1 className="font-['Helvetica'] text-[26px] font-black leading-[1.15] tracking-tighter text-[var(--foreground)] sm:text-[30px] md:text-[34px]">
              I am Gyan,{" "}
              <span className={`about-marker ${TITLE_MARKER_TONES[0]}`}>
                curious
              </span>{" "}
              by{" "}
              <span className={`about-marker ${TITLE_MARKER_TONES[1]}`}>
                nature
              </span>
              ,{" "}
              <span className={`about-marker ${TITLE_MARKER_TONES[2]}`}>
                rigorous
              </span>{" "}
              by{" "}
              <span className={`about-marker ${TITLE_MARKER_TONES[0]}`}>
                choice
              </span>
              .
            </h1>
            <div className="mt-5 flex flex-col gap-4 md:mt-6 md:gap-5">
              {careerPageIntro.storyParagraphs.map((segments, i) => {
                const toneOffset = careerPageIntro.storyParagraphs
                  .slice(0, i)
                  .reduce(
                    (n, p) => n + p.filter((s) => s.highlight).length,
                    0,
                  );
                return (
                  <StoryParagraph
                    key={i}
                    segments={segments}
                    toneOffset={toneOffset}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
