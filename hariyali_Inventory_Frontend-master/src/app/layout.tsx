
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import ClientProviders from "./ClientProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`  ${inter.className}`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
