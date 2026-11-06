import { Manrope, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import { siteUrl } from "./seo";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "DumbbellDore", template: "%s | DumbbellDore" },
  verification: {
    google: "VCBmtD7GlhFh-NGe_74Lz9iO0vcnGW3AXmlqJtr9aYY",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${manrope.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
