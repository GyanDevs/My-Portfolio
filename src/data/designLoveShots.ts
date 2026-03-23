export type DesignLoveShot = {
  id: string;
  alt: string;
  /** Add files under `public/` (e.g. `/images/design/shot-1.png`) when ready */
  src?: string;
};

/** Six slots for rendered shots — replace `src` when assets are ready */
export const designLoveShots: DesignLoveShot[] = [
  {
    id: "1",
    alt: "3D character with headphones on a purple stage",
    src: "/assets/design-love/design-love-01.webp",
  },
  {
    id: "2",
    alt: "Original reel, shot 2",
    src: "/assets/design-love/design-love-02.mp4",
  },
  {
    id: "3",
    alt: "Low-poly golden city diorama with tilt-shift depth of field",
    // Cache-bust the updated asset so Vercel/Next image optimization/CDN doesn't keep showing the old file.
    src: "/assets/design-love/design-love-03.webp?v=F197AC2C",
  },
  {
    id: "4",
    alt: "Original reel, shot 4",
    src: "/assets/design-love/design-love-04.mp4",
  },
  {
    id: "5",
    alt: "Original reel, shot 5",
    src: "/assets/design-love/design-love-05.mp4",
  },
  {
    id: "6",
    alt: "Original reel, shot 6",
    src: "/assets/design-love/design-love-06.mp4",
  },
];
