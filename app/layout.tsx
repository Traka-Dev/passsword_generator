import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "4M PASS GENERATOR",
  description: "Secure passwords for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
