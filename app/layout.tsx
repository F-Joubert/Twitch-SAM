import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "@/app/ui/sidenav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitch SAM",
  description: "Twitch integrated SAM TTS",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} antialiased`}>{children}</body>
//     </html>
//   );
// }
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
              <div className="w-full flex-none md:w-64">
                  <SideNav />
              </div>
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          </div>
        </body>
        </html>
    );
}