import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 60;

export default async function OgImage() {
  const site = await getSiteConfig();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#10151C",
          color: "#E7EAEE",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#55C8B8", fontFamily: "monospace" }}>
          {site.shortRole}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 64,
            fontWeight: 700,
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          {site.name}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#8B93A1", maxWidth: 820 }}>
          React Native · Flutter · Next.js · Firebase
        </div>
      </div>
    ),
    { ...size }
  );
}
