import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import "./globals.css";

const lilitaOne = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "MaxBoiz | Portfolio",
  description: "Welcome to my personal portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${lilitaOne.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}