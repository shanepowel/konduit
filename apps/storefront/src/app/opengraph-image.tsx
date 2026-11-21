import { ImageResponse } from "next/og"

export const alt =
  "Konduit: Secure the technology your business runs on"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5ead8",
          padding: "72px 80px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#c67139",
            }}
          />
          <div
            style={{
              fontSize: 36,
              color: "#201e1d",
              letterSpacing: "-0.02em",
            }}
          >
            Konduit
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.08,
              color: "#201e1d",
              maxWidth: 920,
              letterSpacing: "-0.03em",
            }}
          >
            Secure the technology your business runs on.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#5c5348",
              maxWidth: 860,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            UK · USA · China suppliers, cleared into Zimbabwe and Southern
            Africa.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "system-ui, sans-serif",
            fontSize: 22,
            color: "#8c491a",
          }}
        >
          <div>Up to 30 days · quote to doorstep</div>
          <div>konduit.co.zw</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
