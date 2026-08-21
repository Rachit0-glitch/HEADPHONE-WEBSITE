import type { Metadata } from "next";
import { Antonio, Montserrat } from "next/font/google";
import DisclaimerGate from "@/components/DisclaimerGate";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-antonio",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SONIC — Premium Wireless Headphones",
  description: "Block the noise. Own your world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${antonio.variable} ${montserrat.variable}`}>
      <body>
        <DisclaimerGate>
          <LoadingScreen />
          {children}
        </DisclaimerGate>
      </body>
    </html>
  );
}
