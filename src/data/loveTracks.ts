export type LoveTrack = {
  id: string;
  title: string;
  artist: string;
  /** MP3/OGG URL — local file under `public/audio/` or absolute URL. */
  audioSrc?: string;
  /** Square artwork on the vinyl label — path under `public/` or absolute URL. */
  coverSrc?: string;
};

/** Served from `public/assets/love-track-covers/` (WebP; same-origin). */
const COVER_ZNMD_SOUNDTRACK = "/assets/love-track-covers/znmd-soundtrack.webp";

const COVER_LOSE_MY_MIND = "/assets/love-track-covers/lose-my-mind.webp";

const COVER_MEHRO_SKY_ON_FIRE = "/assets/love-track-covers/mehro-sky-on-fire.webp";

const COVER_CHRIS_ISAAK_WICKED_GAME =
  "/assets/love-track-covers/chris-isaak-wicked-game.webp";

const COVER_INIKO_JERICHO = "/assets/love-track-covers/iniko-jericho.webp";

/**
 * Tracks: local audio under `public/audio/`; covers as WebP under `public/assets/love-track-covers/`.
 */
export const loveTracks: LoveTrack[] = [
  {
    id: "znmd-khwabon-ke-parindey",
    title: "Khwabon Ke Parindey",
    artist: "Alyssa Mendonsa, Mohit Chauhan · Zindagi Na Milegi Dobara",
    audioSrc: "/audio/khwabon-ke-parindey.mp3",
    coverSrc: COVER_ZNMD_SOUNDTRACK,
  },
  {
    id: "don-toliver-lose-my-mind",
    title: "Lose My Mind",
    artist: "Don Toliver ft. Doja Cat",
    audioSrc: "/audio/lose-my-mind.mp3",
    coverSrc: COVER_LOSE_MY_MIND,
  },
  {
    id: "mehro-chance-with-you",
    title: "chance with you",
    artist: "mehro · SKY ON FIRE",
    audioSrc: "/audio/mehro-chance-with-you.mp3",
    coverSrc: COVER_MEHRO_SKY_ON_FIRE,
  },
  {
    id: "wicked-game-serious-whisper-dc",
    title: "Wicked Game",
    artist: "Chris Isaak feat. David Bowie",
    audioSrc: "/audio/wicked-game-serious-whisper-dc.mp3",
    coverSrc: COVER_CHRIS_ISAAK_WICKED_GAME,
  },
  {
    id: "iniko-jericho",
    title: "Jericho",
    artist: "Iniko",
    audioSrc: "/audio/iniko-jericho.mp3",
    coverSrc: COVER_INIKO_JERICHO,
  },
];
