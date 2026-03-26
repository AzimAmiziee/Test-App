import { Sora, DM_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

// metadata stays the same, just remove TypeScript typing
export const metadata = {
  title: "Azim Amizie — Software Developer",
  description:
    "Full-stack developer focused on building reliable web applications, scalable enterprise systems, and practical internal tools.",
};

// remove type from props
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  );
}