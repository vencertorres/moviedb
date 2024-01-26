import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { auth, signOut } from "./lib/auth";
import logo from "./logo.svg";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "%s | MovieDB",
    default: "MovieDB",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.variable}>
        <nav className="bg-[#1c2128]">
          <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-3 py-2">
            <Link href="/">
              <Image src={logo} alt="MovieDB" height={24} />
            </Link>

            {session ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="text-sm uppercase tracking-wider text-[#d8e0e8] hover:text-white">
                  Log out
                </button>
              </form>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/login"
                  className="text-sm uppercase tracking-wider text-[#d8e0e8] hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-sm uppercase tracking-wider text-[#d8e0e8] hover:text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
