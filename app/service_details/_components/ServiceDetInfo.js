import React, { useState, useEffect } from "react";
import {
  Calendar,
  Columns2,
  Globe,
  CircleUserRound,
  Clock,
} from "lucide-react";
import useSetup from "../../hooks/useSetup";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import Image from "next/image";

function ServiceDetInfo({ serviceDetail }) {
  // const lng = cookies.get("i18next") || "en";
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
  const dateTimeString = serviceDetail?.attributes?.publishedAt;
  const dateObject = new Date(dateTimeString);

  // Extract date components
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = dateObject.getDate().toString().padStart(2, "0");

  console.log(lng);
  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1">
      <div className="">
        <div className="">
          <p
            className={`text-[30px] font-bold ${
              !isDarkMode ? "text-black" : "text-white "
            }`}
          >
            {t("Course_details")}
          </p>
          <div
            className={`flex mt-3 ${
              !isDarkMode ? "text-black" : "text-white "
            }`}
          >
            <CircleUserRound className="w-5 mr-2" />
            <span className="mr-2">{t("By")} : </span>
            <h2 className="text-[18px] text-[#bd2130]">
              {lng === "ar"
                ? serviceDetail?.attributes?.Author_ar // Display Arabic name for Arabic users
                : serviceDetail?.attributes?.Author}
            </h2>
          </div>
          <div
            className={`flex mt-3 ${
              !isDarkMode ? "text-black" : "text-white "
            }`}
          >
            <Globe className="w-4 mr-2" />
            <span className="mr-2">{t("courseLanguage")} : </span>
            <h2 className="text-[18px]">
              {serviceDetail?.attributes?.courseLanguage}
            </h2>
          </div>
          <div
            className={`flex mt-3 ${
              !isDarkMode ? "text-black" : "text-white "
            }`}
          >
            <Clock className="w-4 mr-2" />
            <span>{t("Duration")}:</span>
            {serviceDetail?.attributes?.Duration}
          </div>

          <div
            className={`flex mt-3 ${
              !isDarkMode ? "text-black" : "text-white "
            }`}
          >
            <Calendar className="w-4 mr-2" />
            <span className="mr-2">{t("Published At")} : </span>
            <h2 className="text-[18px]">{`${year}-${month}-${day}`}</h2>
          </div>
          <div
            className={`flex mt-3 ${
              !isDarkMode ? "text-black" : "text-white "
            }`}
          >
            <Columns2 className="w-4 mr-2" />
            <span className="mr-2">Categories : </span>
            <h2 className="text-[18px]">
              {serviceDetail?.attributes?.Category}
            </h2>
          </div>
        </div>

        <div className=" mt-16 w-[90%]">
          <p
            className={`text-[30px] font-bold ${
              !isDarkMode ? "text-black" : "text-white "
            }`}
          >
            {t("About_this_course")}
          </p>
          <p
            className={`mt-1.5 line-clamp-4 ${
              !isDarkMode ? "text-black" : "text-white "
            }`}
          >
            {/* {serviceDetail?.attributes?.description[0]?.children[0].text} */}
            {lng === "ar"
              ? serviceDetail?.attributes?.description_ar // Display Arabic name for Arabic users
              : serviceDetail?.attributes?.description[0]?.children[0].text}
          </p>
        </div>
      </div>
      {/* <ServiceInfo serviceDetail={serviceDetail} />
       */}
      <div className="mt-12 flex items-end text-right border-stone-400 border rounded ml-10 p-5 shadow-lg shadow-[#001c25] mr-12">
        <Image
          src="https://res.cloudinary.com/dahptqhed/image/upload/v1740401275/poster2_bba6a73d71.jpg"
          width={500}
          height={450}
          className="object-cover"
          alt="course info"
        ></Image>
      </div>
    </div>
  );
}

export default ServiceDetInfo;
