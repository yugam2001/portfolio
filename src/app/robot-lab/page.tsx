import Link from "next/link";
import type { Metadata } from "next";
import { EyeTrackingStudy } from "@/components/eye-tracking-study";
import "./robot-lab.css";

export const metadata: Metadata = { title: "Robot motion study | Yugam Kakkar", robots: { index: false, follow: false } };
export default function RobotLab() {
  return <main className="robot-lab"><Link href="/#home" className="text-link">Back to portfolio</Link><p className="section-kicker">ROBOT LAB / 02</p><h1>A little more alive.</h1><p className="lab-intro">Move your pointer around the robot. Test the direction buttons to compare each gaze. The head stays still while the eyes smoothly follow your pointer. Watch for an occasional subtle smile.</p><EyeTrackingStudy /><p className="lab-note">Layered eye tracking with a gentle mouth-corner lift. The original face and shoulders remain still.</p></main>;
}
