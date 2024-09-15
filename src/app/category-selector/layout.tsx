"use client";

import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { TRPCReactProvider } from "~/trpc/react";
import Sidebar from "../_components/sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-screen overflow-hidden">
        {/* Wrap your entire app with SessionProvider */}
        <SessionProvider>
          <TRPCReactProvider>
            {/* Wrapper div for layout */}
            <div className="flex h-screen">
              {/* Sidebar should take fixed width on the left */}
              <Sidebar />

              {/* Main content should take the rest of the space */}
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
