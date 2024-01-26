import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import logo from "./logo.svg";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MovieDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <nav className="bg-[#1c2128]">
          <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-3 py-2">
            <Link href="/">
              <Image src={logo} alt="MovieDB" height={24} />
            </Link>

            <div className="space-x-4">
              <Link
                href="/signin"
                className="text-sm uppercase tracking-wider text-[#d8e0e8]"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm uppercase tracking-wider text-[#d8e0e8]"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
