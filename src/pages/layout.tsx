import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-[#eee] p-4 lg:p-8 ${inter.className}`}
    >
      {children}
    </main>
  );
}
