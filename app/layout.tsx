import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Tik tok clone",
  description: "Tik tok clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
