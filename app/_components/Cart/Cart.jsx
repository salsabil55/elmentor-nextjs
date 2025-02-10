"use client";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../_Context/cartContext";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import useSetup from "../../hooks/useSetup";

function Cart() {
  const { t } = useTranslation();
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(true);
  const { lng, darkmode } = useSetup();
  const [isDarkMode, setIsDarkMode] = useState(darkmode === "dark");

  useEffect(() => {
    const handleDarkModeChange = () => {
      setIsDarkMode(
        document.documentElement.getAttribute("data-theme") === "dark"
      );
    };

    window.addEventListener("darkmodeChange", handleDarkModeChange);

    return () => {
      window.removeEventListener("darkmodeChange", handleDarkModeChange);
    };
  }, []);
  return (
    openCart && (
      <div
        className={`absolute z-10 overflow-y-auto overflow-x-hidden ${
          lng === "ar" ? "lg:left-0" : "lg:right-0"
        }`}
      >
        <div
          className={`relative w-screen max-w-sm max-h-[500px] overflow-y-auto mr-0 lg:mr-10 shadow-lg rounded px-4 py-8 sm:px-6 lg:px-8 
         ${!isDarkMode ? "bg-[#dbdbdb]" : "bg-[#1e2121e6]"}`}
          aria-modal="true"
          role="dialog"
          tabIndex="-1"
        >
          <div className="space-y-6">
            <h2
              className={`rounded p-4 bold 
         ${
           !isDarkMode
             ? "bg-[#8080804d] text-[#141717]"
             : "bg-[#1e2121] text-white"
         }`}
            >
              {t("Courses_in_Your_Cart")}
            </h2>
            {cart && (
              <ul className="space-y-4">
                {cart?.map((item) => (
                  <Link href={`/service_details/${item?.serviceDetail?.id}`}>
                    <li
                      key={item?.id}
                      className={`flex items-center mb-1 gap-4 border rounded p-3 cursor-pointer text-white
                      ${!isDarkMode ? "bg-[#808080]" : "bg-[#1e2121]"}`}
                    >
                      {item?.serviceDetail?.attributes?.image?.data?.attributes
                        ?.url ? (
                        <Image
                          src={
                            item?.serviceDetail?.attributes?.image?.data
                              ?.attributes?.url || "deful.jpg"
                          }
                          width={70}
                          height={70}
                          alt="service Detail Banner"
                          className="object-fill rounded "
                        />
                      ) : (
                        <div
                          className={`object-cover w-[70px] h-[70px] bg-slate-200 rounded-lg animate-pulse`}
                        ></div>
                      )}

                      <div>
                        <h3 className="text-sm text-white line-clamp-1">
                          {lng === "ar"
                            ? item?.serviceDetail?.attributes?.name_ar // Display Arabic name for Arabic users
                            : item?.serviceDetail?.attributes?.name}
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-white">
                          <div>
                            <dt className="inline">
                              {"By:"}{" "}
                              {lng === "ar"
                                ? item?.serviceDetail?.attributes?.Author_ar // Display Arabic name for Arabic users
                                : item?.serviceDetail?.attributes?.Author}
                            </dt>
                          </div>

                          <div>
                            <dt className="inline">
                              Price : {item?.serviceDetail?.attributes?.price} /
                              SAR
                            </dt>
                            <dd className="inline">White</dd>
                          </div>
                        </dl>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            {!cart && <p>{"No_courses_in_Cart"}</p>}

            <div className="space-y-4 text-center">
              <Link
                href="/cart"
                className="block rounded bg-[#a50305] px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                onClick={() => setOpenCart(!openCart)}
              >
                {t("View_my_cart")} ({cart.length})
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Cart;
