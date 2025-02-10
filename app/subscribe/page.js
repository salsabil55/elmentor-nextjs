"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

import useSetup from "../hooks/useSetup";

function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useUser();

  const { lng, darkmode } = useSetup();
  const [isDarkMode, setIsDarkMode] = useState(darkmode === "dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleDarkModeChange = () => {
        setIsDarkMode(
          document.documentElement.getAttribute("data-theme") === "dark"
        );
      };

      window.addEventListener("darkmodeChange", handleDarkModeChange);

      return () => {
        window.removeEventListener("darkmodeChange", handleDarkModeChange);
      };
    }
  }, []);
  const getTotalAmount = () => {
    let totalAmount = 1000;

    return totalAmount;
  };

  return (
    <>
      <div className="flex m-2 lg:m-10 items-center justify-center flex-col">
        <h2
          className={`text-[28px] font-bold ${
            !isDarkMode ? "text-black" : "text-white"
          }`}
        >
          {t("Invest_in_yourself")}
        </h2>
      </div>
      <div className="flex justify-between w-[80%] m-[auto] items-center text-center max-[767px]:flex-wrap">
        <div
          className={`m-2 lg:m-10 p-8 shadow-lg rounded ${
            !isDarkMode
              ? "bg-[#808080] text-white"
              : "bg-[#1e21214d] text-white"
          }`}
        >
          <h2 className="text-white text-[25px] font-bold text-center mb-3">
            {t("MonthlyPlan")}
          </h2>
          <p>
            <span className="text-[#bd2130] mr-2">*</span>
            {t("More_than_1,000_video_courses_in_Arabic")}
          </p>
          <p>
            <span className="text-[#bd2130] mr-2">*</span>
            {t("Taught_by_renowned_experts_in_the_Arab_world")}
          </p>
          <div className="border rounded text-center p-4 mt-5">
            <p>
              only
              <span dir={`${lng === "ar" ? "rtl" : "ltr"}`}>89 SAR/month</span>
            </p>
            <p>{t("Chargedmonthly")}</p>
          </div>
          {!user && (
            <Link href="/sign-up">
              <button
                className={`mt-6 border rounded p-3 hover:bg-[#bd2130] ${
                  !isDarkMode ? "bg-white text-[#6f6d6d]" : ""
                }`}
              >
                {t("Subscribe_Now")}
              </button>
            </Link>
          )}
          {user && (
            <button
              onClick={() =>
                router.push(`/checkout?amount=${getTotalAmount()}`)
              }
              className={`mt-6 border rounded p-3 hover:bg-[#bd2130] ${
                !isDarkMode ? "bg-white text-[#6f6d6d]" : ""
              }`}
            >
              {t("Subscribe_Now")}
            </button>
          )}
        </div>

        <div
          className={`m-2 lg:m-10 p-8 shadow-lg rounded relative ${
            !isDarkMode
              ? "bg-[#808080] text-white"
              : "bg-[#1e21214d] text-white"
          }`}
        >
          <div className="absolute bg-[#bd2130] w-[50px] h-[50px] rounded text-[12px] flex items-center right-0 -top-6 rounded-[50%]">
            <span>Save 56%</span>
          </div>
          <h2 className="text-white text-[25px] font-bold  mb-3">
            {t("YearlyPlan")}
          </h2>
          <p>
            <span className="text-[#bd2130] mr-2">*</span>
            {t("Unlimited_access_to_all_courses_on_web_and_Android_app")}
          </p>
          <p>
            <span className="text-[#bd2130] mr-2">*</span>
            {t("Certificates_upon_courses_completion")}
          </p>
          <div className="border rounded text-center p-4 mt-5">
            <p className="line-through" dir={`${lng === "ar" ? "ltr" : ""}`}>
              89 SAR
            </p>
            <p>
              Only{" "}
              <span className={`${lng === "ar" ? "rtl" : "ltr"}`}>
                39 SAR/month
              </span>
            </p>
          </div>
          {!user && (
            <Link href="/sign-up">
              <button className="mt-6 bg-[#bd2130] text-white rounded p-3">
                {t("Subscribe_Now")}
              </button>
            </Link>
          )}

          {user && (
            <button
              onClick={() =>
                router.push(`/checkout?amount=${getTotalAmount()}`)
              }
              className="mt-6 bg-[#bd2130] text-white rounded p-3"
            >
              {t("Subscribe_Now")}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
