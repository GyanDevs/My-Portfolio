import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const EMBED_HEADER = "x-gyan-resume-embed";

/**
 * Marks `/resume?embed=1` so the root layout can skip the global loading screen
 * and theme switch (iframe preview should feel instant and inherit parent chrome).
 */
export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    if (url.pathname === "/resume" && url.searchParams.get("embed") === "1") {
        const res = NextResponse.next();
        res.headers.set(EMBED_HEADER, "1");
        return res;
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/resume",
};
