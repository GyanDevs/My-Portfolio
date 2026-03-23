import { loveTracks } from "@/src/data/loveTracks";

const COVER_PRELOAD_HREFS = [
  ...new Set(
    loveTracks
      .map((t) => t.coverSrc)
      .filter((href): href is string => Boolean(href)),
  ),
];

export default function AboutMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {COVER_PRELOAD_HREFS.map((href) => (
        <link key={href} rel="preload" as="image" href={href} />
      ))}
      {children}
    </>
  );
}

