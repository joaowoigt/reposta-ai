import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "RepostAI — Transforme 1 conteúdo em 10 posts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 6,
            backgroundColor: "#f25c3a",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: "#f25c3a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 800,
              marginRight: 12,
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#171717",
              letterSpacing: -1,
              display: "flex",
            }}
          >
            RepostAI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 800,
            color: "#171717",
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: -1,
          }}
        >
          Transforme 1 conteúdo em 10 posts
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#737373",
            textAlign: "center",
            marginTop: 20,
            maxWidth: 600,
            lineHeight: 1.4,
          }}
        >
          Repurposing de conteúdo com IA para X, LinkedIn, Instagram e
          Newsletter.
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              borderRadius: 8,
              backgroundColor: "#f5f5f5",
              color: "#525252",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            X
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              borderRadius: 8,
              backgroundColor: "#f5f5f5",
              color: "#525252",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            LinkedIn
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              borderRadius: 8,
              backgroundColor: "#f5f5f5",
              color: "#525252",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Instagram
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              borderRadius: 8,
              backgroundColor: "#f5f5f5",
              color: "#525252",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Newsletter
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
