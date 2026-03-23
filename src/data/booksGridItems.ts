import type { BookGridItem } from "@/src/components/BooksGrid";

/**
 * Book cover grid items.
 *
 * Replace `coverSrc` with exact image paths under `public/` once you add
 * the book cover assets (e.g. `/assets/books/dont-make-me-think.webp`).
 */
export const booksGridItems: BookGridItem[] = [
  {
    id: "dont-make-me-think",
    title: "Don't Make Me Think",
    author: "Steve Krug",
    coverSrc: "/assets/books/dont-make-me-think.webp",
  },
  {
    id: "design-of-everyday-things",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverSrc: "/assets/books/design-of-everyday-things.webp",
  },
  {
    id: "microcopy",
    title: "Microcopy",
    author: "Kinneret Yifrah",
    coverSrc: "/assets/books/microcopy.webp",
  },
  {
    id: "articulating-design-decisions",
    title: "Articulating Design Decisions",
    author: "Tom Greever",
    coverSrc: "/assets/books/articulating-design-decisions.webp",
  },
  {
    id: "sprint",
    title: "Sprint",
    author: "Jake Knapp",
    coverSrc: "/assets/books/sprint.webp",
  },
];

