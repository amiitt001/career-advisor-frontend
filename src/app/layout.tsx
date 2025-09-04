import type { Metadata } from "next";
import { Geist } from "next/font/google"; 
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { UserProvider } from '@/context/UserContext';

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Career & Skills Advisor",
  description: "AI-Powered Career Guidance by Byte Busters",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode; }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={geist.className}>
        <UserProvider>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <main style={{ flex: 1, overflowY: 'auto' }}>
            <div className="page-container">
              {children}
            </div>
          </main>
        </div>
        </UserProvider>
      </body>
    </html>
  );
}