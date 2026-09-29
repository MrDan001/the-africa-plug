import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://the-africa-plug-five.vercel.app";
const siteTitle = "The Africa Plug | Your Connection to Africa";
const siteDescription = "THE AFRICA PLUG 🌍 Your connection to Africa. Business • Investment • Culture • Travel • Lifestyle • Opportunity. Go beyond the headlines. Discover businesses being built, markets moving, people to know, places to go, experiences to have and opportunities worth knowing about.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | The Africa Plug"
  },
  description: siteDescription,
  keywords: [
    "Africa",
    "African business",
    "African investment",
    "Africa travel",
    "African culture",
    "Africa lifestyle",
    "African markets",
    "business opportunities in Africa",
    "The Africa Plug"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "The Africa Plug",
    title: siteTitle,
    description: siteDescription,
    locale: "en_NG",
    images: [
      {
        url: "/header-logo-symbol.png",
        width: 320,
        height: 320,
        alt: "The Africa Plug globe and plug logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/header-logo-symbol.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: { icon: "/header-logo-symbol.svg" }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
