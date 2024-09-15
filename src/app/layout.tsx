"use client";

import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./_components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import necessary components

// Create a QueryClient instance
const queryClient = new QueryClient();

const metadata = { title: "Fintrack", icon: "/favicon.ico" };

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        {/* Set the title dynamically */}
        <title>{metadata.title}</title>
        {/* Set the favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-screen overflow-hidden">
        {/* Wrap everything in QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          {/* Wrap everything in SessionProvider */}
          <SessionProvider>
            <div className="flex h-screen">
              {/* Sidebar that uses session */}
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
