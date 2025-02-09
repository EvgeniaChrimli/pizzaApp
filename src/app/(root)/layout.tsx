import type { Metadata } from "next";
import { Header } from "@/components/ui/shared/header";

export const metadata: Metadata = {
  title: "Pizza app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
