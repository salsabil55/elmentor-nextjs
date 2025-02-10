"use client";
import React, { useState, useEffect, Fragment } from "react";
import ServiceItem from "./ServiceItem";
import Link from "next/link";
import useSetup from "../../hooks/useSetup";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

function ServicesList({ serviceList }) {
  const { t } = useTranslation();
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
    <Fragment>
      <div className="mt-10 p-10 flex justify-center">
        <h2 className="text-center text-3xl lg:text-4xl font-bold tracking-tight text-white-900 dark:text-white light:text-black">
          {t("Explore_inspiring_courses_online")}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 p-2 lg:p-10">
        {serviceList.map((list) => (
          <ServiceItem service={list} key={list.id} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link href="/courses">
          <button
            className={`border text-white pl-7 pr-7 pt-3 pb-3 rounded shadow-lg ${
              !isDarkMode ? "bg-[#bd2130] text-black" : "bg-[#1e2121]"
            }`}
          >
            {t("See_All_Courses")}
          </button>
        </Link>
      </div>
    </Fragment>
  );
}

export default ServicesList;
