"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Josefin_Sans, Poppins } from "next/font/google";
import { ThemeProvider } from "./utils/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <div className="w-full h-full absolute inset-0 bottom-10 bg-center bg-no-repeat bg-hero-light dark:bg-hero-dark duration-300 bg-[length:150rem] z-[-1]"></div>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </Providers>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          closeOnClick
          theme="dark"
        />
      </body>
    </html>
  );
}
