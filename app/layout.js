import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SessionProviders from "@/components/providers/sessionProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Providers from "./StoreProvider";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export const metadata = {
  title: "SemanticChat | AI-Powered Emotional Intelligence",
  description:
    "SemanticChat uses emotional AI to analyze conversations in real time, helping you communicate more effectively.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body
          className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
        >
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SessionProviders>
                {children}
                <SidebarTrigger />
              </SessionProviders>
            </ThemeProvider>
          </SidebarProvider>
        </body>
      </Providers>
    </html>
  );
}
