import { ImageResponse } from "next/og";
export const alt = "Yugam Kakkar — Software engineering meets artificial intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px", background: "#050910", color: "#e2eaff" }}>
    <div style={{ display: "flex", fontSize: 22, color: "#a3b3ff", letterSpacing: 5 }}>SOFTWARE × INTELLIGENCE</div>
    <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 88, fontWeight: 700 }}>Yugam Kakkar</div><div style={{ fontSize: 30, marginTop: 20, color: "#a4b5cd" }}>Software engineer. Curious builder.</div></div>
    <div style={{ display: "flex", fontSize: 20, color: "#96a7c3", borderTop: "1px solid #2b3850", paddingTop: 24 }}>Experience · Projects · AI Journey</div>
  </div>, size);
}
