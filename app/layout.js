import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Azim Amizie | Software Developer",
  description: "Full stack software developer portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}