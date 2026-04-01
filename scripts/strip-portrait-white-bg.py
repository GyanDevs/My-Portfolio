"""Remove solid white / near-white background connected to image corners (PNG)."""
from __future__ import annotations

import sys
from collections import deque

from PIL import Image


def strip_corner_white(
    path_in: str,
    path_out: str,
    *,
    threshold: int = 245,
) -> None:
    img = Image.open(path_in).convert("RGBA")
    px = img.load()
    w, h = img.size

    def is_bg(r: int, g: int, b: int) -> bool:
        return r >= threshold and g >= threshold and b >= threshold

    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()
    for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        r, g, b, _a = px[x, y]
        if is_bg(r, g, b):
            q.append((x, y))

    while q:
        x, y = q.popleft()
        if visited[y][x]:
            continue
        r, g, b, _a = px[x, y]
        if not is_bg(r, g, b):
            continue
        visited[y][x] = True
        px[x, y] = (r, g, b, 0)
        for dx, dy in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                q.append((nx, ny))

    img.save(path_out, "PNG")


if __name__ == "__main__":
    strip_corner_white(sys.argv[1], sys.argv[2])
