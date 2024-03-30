import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Finances",
  description: "Track your expenses, set budgets and help you stay within your spending plan",
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen")}>
        <div className="grid h-full lg:grid-cols-5">
          <Sidebar />
          <main className="col-span-3 lg:col-span-4 lg:border-l">{children}</main>
        </div>
        <div>{modal}</div>
      </body>
    </html>
  );
}
