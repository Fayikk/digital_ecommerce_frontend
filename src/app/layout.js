'use client';
import { Inter, Roboto_Mono } from 'next/font/google';
import ReduxProvider from "../components/ReduxProvider";
import Navbar from './Components/Navbar';
import { Toaster } from 'react-hot-toast';

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <Toaster position='top-right' />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}