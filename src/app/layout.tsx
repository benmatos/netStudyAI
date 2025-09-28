import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AI Quiz Generator",
  description: "Gerador de Questionários com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("antialiased font-sans bg-background", inter.variable)}>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
