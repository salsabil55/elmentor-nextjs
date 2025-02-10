"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useSetup from "../../hooks/useSetup";

function OfferPage() {
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
    <div className="flex justify-around items-center shadow-xl mt-16 flex-wrap mb-10 overflow-hidden">
      <div
        className={`rounded w-[240px] lg:w-[550px] h-[400px] mt-10  text-center ${
          !isDarkMode ? "text-black" : " text-white bg-black "
        }`}
        data-aos="fade-right"
      >
        <h2 className="text-[25px] lg:text-[32px] font-bold mb-7">
          {t("Start_your_learning_journey_today")}
        </h2>
        <p className="text-[15px] lg:text-[20px] ">
          {t("Unlimited_access")}

          <span className="text-[25px] font-extrabold">39 SAR</span>
        </p>
        <p className="mt-5 font-thin">{t("Enjoy_All_Subscribtion")}</p>
        <button
          className={`bg-[#a50305] rounded pt-3 pb-3 pr-5 pl-5 mt-11 text-center ${
            !isDarkMode ? "text-white" : " "
          }`}
        >
          {t("Subscribe_Now")}
        </button>
      </div>

      <div
        className="bg-white rounded-lg shadow-2xl relative overflow-hidden"
        data-aos="fade-left"
        data-aos-anchor-placement="center-bottom"
      >
        <div className="bg-white w-[270px] lg:w-[500px] h-[400px] rounded-2xl shadow-2xl">
          <img src="https://img.freepik.com/premium-vector/black-friday-lettering-white_946532-7698.jpg?w=300" />
        </div>
        <div className="absolute top-40 lg:top-32 text-center right-0 left-0">
          <h1 className="text-[70px] lg:text-[120px] text-[#a50305] font-black relative shadow-inner text-center">
            50%{" "}
            <span className="absolute text-[20px] top-0 bottom-0 right-11 lg:right-25">
              off
            </span>
          </h1>
          <p className="shadow-2xl m-[auto] border mt-2 rounded-2xl lg:rounded-3xl text-[17px] lg:text-[20px] bg-black text-white font-medium pt-2 pb-2 pl-4 pr-4 text-center w-[200px] lg:w-[300px] overflow-hidden">
            {t("USE THE CODE")}

            <span className=" bg-[#a50305] text-white pt-1 lg:pt-3 rounded mt-1 pb-1 lg:pb-3 pr-3 pl-3 ml-4 mr-4 shadow-2xl">
              WF24
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OfferPage;
