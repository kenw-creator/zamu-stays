import type { Metadata } from "next";
import { Bitter, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Zamu Stays — Kamakis | Comfortable Airbnb on the Eastern Bypass, Ruiru",
  description:
    "A cosy 1-bedroom Airbnb along the Eastern Bypass in Kamakis, Ruiru — near Greenspot. 4.9 rated, 83 reviews. Book directly or message on WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bitter.variable} ${workSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
