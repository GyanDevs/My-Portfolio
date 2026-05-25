import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "I am Gyan — Lead Product Designer";
export const size = { width: 1200, height: 1200 };
export const contentType = "image/png";

export default async function Image() {
  const fontsDir = join(process.cwd(), "public", "fonts");
  const [libreBodoni, jetbrainsBold, jetbrainsRegular] = await Promise.all([
    readFile(join(fontsDir, "libre-bodoni-latin-500-italic.woff")),
    readFile(join(fontsDir, "jetbrains-mono-latin-700-normal.woff")),
    readFile(join(fontsDir, "jetbrains-mono-latin-400-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "#fffdf5",
          backgroundImage: `
            linear-gradient(to right, #ece9dc 1px, transparent 1px),
            linear-gradient(to bottom, #ece9dc 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          padding: "80px 80px 320px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              fontFamily: "LibreBodoni",
              fontSize: 160,
              fontStyle: "italic",
              fontWeight: 500,
              color: "#100f0c",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginBottom: 56,
            }}
          >
            Gyan
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#100f0c",
                color: "#fffdf5",
                padding: "12px 16px",
                fontFamily: "JetBrainsMono",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "0.14em",
              }}
            >
              LEAD PRODUCT DESIGNER
            </div>

            <div
              style={{
                fontFamily: "JetBrainsMono",
                fontSize: 22,
                fontWeight: 400,
                letterSpacing: "0.06em",
                color: "#100f0c",
                lineHeight: 1.35,
              }}
            >
              HEWLETT PACKARD ENTERPRISE // BENGALURU
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "LibreBodoni",
          data: libreBodoni,
          style: "italic",
          weight: 500,
        },
        {
          name: "JetBrainsMono",
          data: jetbrainsBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "JetBrainsMono",
          data: jetbrainsRegular,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
