"use client";
import { useState, useEffect } from "react";

import { Inter } from "next/font/google";
import Header from "./_components/Header/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { SearchContext, SearchProvider } from "./_Context/SearchContext";
import { BookedProvider } from "./_Context/bookMarkContext";

import { SWRConfig } from "swr";
import { CartContext } from "./_Context/cartContext";
import { BookContext } from "./_Context/bookContext";
import { BookMarkContext } from "./_Context/bookMarkContext";
import { appWithTranslation } from "next-i18next";

import "./globals.css";
import Footer from "./_components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });
function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  const [booked, setBooked] = useState([]);
  const [searchList, setSearchList] = useState([]);
  // Load booked items from localStorage on initial render
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Stop progress when it reaches 100%
          return 100;
        }
        return prev + 10; // Increment progress
      });
    }, 200); // Adjust speed of progress here

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  return (
    <ClerkProvider>
      <SWRConfig
        value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
      >
        <CartContext.Provider value={{ cart, setCart }}>
          <BookContext.Provider value={{ booked, setBooked }}>
            <BookedProvider>
              <SearchContext.Provider value={{ searchList, setSearchList }}>
                <html lang="en">
                  <body className={inter.className}>
                    <div
                      style={{
                        top: "60px", // Position below the menu
                        left: 0,
                        height: "4px",
                        backgroundColor: "#bf0505",
                        width: `${progress}%`,
                        transition: "width 0.2s ease-in-out",
                        zIndex: 999,
                      }}
                    ></div>
                    <Header />
                    {children}
                    <Footer />
                  </body>
                </html>
              </SearchContext.Provider>
            </BookedProvider>
          </BookContext.Provider>
        </CartContext.Provider>
      </SWRConfig>
    </ClerkProvider>
  );
}
export default appWithTranslation(RootLayout);
