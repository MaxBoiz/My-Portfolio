import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "MaxBoy",
  description:
    "Software engineer crafting thoughtful web and mobile products from Vietnam.",
  openGraph: {
    title: "MaxBoy — Software Engineer",
    description: "From Vietnam, building for the world.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MaxBoy — Software Engineer from Vietnam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MaxBoy — Software Engineer",
    description: "From Vietnam, building for the world.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
