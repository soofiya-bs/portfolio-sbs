import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#faf8f3",
          backgroundImage: "radial-gradient(circle at 20% 0%, rgba(201,160,80,0.30), transparent 55%)",
          color: "#16171b",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#8f6b25", fontFamily: "monospace" }}>
          IIT MADRAS · APPLIED AI ENGINEERING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 38, marginTop: 20, color: "#8f6b25", fontStyle: "italic" }}>{site.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#55565c" }}>{site.tagline}</div>
      </div>
    ),
    size
  );
}
