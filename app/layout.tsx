import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"The Africa Plug — Your Connection to Africa", description:"Discover the businesses being built, markets moving, people to know, places to go, things to experience and opportunities worth knowing about.", icons:{icon:"/favicon.svg"} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}