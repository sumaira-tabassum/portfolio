import type { Metadata } from "next";
import { Geist_Mono, Parkinsans } from "next/font/google";
import "./globals.css";
import { BackgroundLab } from "@/components/BackgroundLab";

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sumaira Tabassum · Automation Engineer & Full-Stack Developer",
  description:
    "Automation engineer (GoHighLevel, n8n, AI agents) and full-stack developer (MERN, Next.js, React Native) based in Lahore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${parkinsans.variable} ${geistMono.variable} antialiased`}>
        <BackgroundLab />
        {children}
      </body>
    </html>
  );
}
