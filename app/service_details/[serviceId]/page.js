"use client";
// import ServicesList from "@/app/_components/Services/ServicesList";
import React, { useEffect, useState } from "react";
import servicesApi from "../../_Utils/servicesApi";
import { usePathname } from "next/navigation";
import ServiceBanner from "../_components/ServiceBanner";
import ServiceDetInfo from "../_components/ServiceDetInfo";
import ServiceInfo from "../_components/ServiceInfo";
import i18n from "../../i18n";
import useSetup from "../../hooks/useSetup";
import cookies from "js-cookie";
function ServiceDetail({ params }) {
  // const lng = cookies.get("i18next") || "en";
  // const [lnges, setlnges] = useState(i18n.language); // Track current language
  // const [isChanging, setIsChanging] = useState(false); // Track language change
  const path = usePathname();

  const [serviceDetail, setServiceDetail] = useState({});
  const [serviceList, setServiceList] = useState([]);
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
  useEffect(() => {
    getServicesById_();
  }, [params?.serviceId, lng]);
  const getServicesById_ = () => {
    servicesApi.getServicesById(params?.serviceId).then((res) => {
      setServiceDetail(res.data);
      console.log(res.data);
      console.log(lng);
    });
  };

  return (
    <div
      className={`px-10 py-10 md:px-28 ${
        !isDarkMode ? "bg-[#d1cfcf]" : "bg-[#141717] "
      }`}
    >
      {/* <Breadcrumb path={path} /> */}
      <div className="mt-10 flex flex-col md:flex-row justify-items-center justify-evenly items-start">
        <div
          className={`w-480 h-450 mb-12 ${
            !isDarkMode ? "bg-[#d1cfcf]" : "bg-[#141717] "
          }`}
        >
          <ServiceBanner serviceDetail={serviceDetail} />
        </div>
        <ServiceInfo serviceDetail={serviceDetail} lng={lng} />
      </div>

      <ServiceDetInfo serviceDetail={serviceDetail} lng={lng} />
    </div>
  );
}

export default ServiceDetail;
