import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthenticationProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const googleClientId = process.env.NEXT_PUBLIC_DRF_CLIENT_ID

export default function RootLayout({ children }) {
  console.log(googleClientId)
  return (
    <html lang="en" className='dark'>
      <body className='container mx-auto'>
        <Navbar />
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthenticationProvider>
            {children}
          </AuthenticationProvider>
        </GoogleOAuthProvider>

      </body>
    </html>
  );
}
