"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import servicesApi from "../_Utils/servicesApi";
import SkeletonService from "../courses/skeletonService";
import Image from "next/image";
import Link from "next/link";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import useSetup from "../hooks/useSetup";

// Normalize text (removing diacritics for Arabic and ensuring consistent comparison)
const normalizeText = (text) => {
  if (!text) return "";
  return text
    .normalize("NFKD") // Normalize Unicode
    .replace(/[\u064B-\u065F]/g, "") // Remove Arabic diacritics
    .toLowerCase(); // Case-insensitive
};

const SearchPage = () => {
  const router = useRouter();
  const { pathname } = router;

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; // Get the query from the URL
  const [services, setServices] = useState([]); // All fetched services
  const [filteredServices, setFilteredServices] = useState([]); // Filtered results
  const [loading, setLoading] = useState(true);
  const [lnges, setlnges] = useState(cookies.get("i18next") || i18n.language); // Track current language
  const [isChanging, setIsChanging] = useState(false); // Track language change
  const { lng, darkmode } = useSetup();
  const [isDarkMode, setIsDarkMode] = useState(darkmode === "dark");
  const { t } = useTranslation();

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
  // Fetch services from the API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesApi.getLatestServices(); // Fetch all services
      setServices(response.data); // Store all services
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  // Filter services based on query
  const filterServices = (query) => {
    const normalizedQuery = normalizeText(query); // Normalize user input
    const results = services.filter((service) => {
      const name = normalizeText(service?.attributes?.name || ""); // Normalize English name
      const nameAr = normalizeText(service?.attributes?.name_ar || ""); // Normalize Arabic name

      // Match query against both name and name_ar fields
      return name.includes(normalizedQuery) || nameAr.includes(normalizedQuery);
    });

    setFilteredServices(results); // Update filtered services
  };
  const filterLength = filteredServices.length;

  // Fetch services when the component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  // Apply filtering when the query or services change
  useEffect(() => {
    if (query) {
      filterServices(query); // Filter services based on query
    } else {
      setFilteredServices(services); // Show all services if no query
    }
  }, [query, services]);
  // Listen for language changes
  const isOnSearchPage = pathname === "/search";

  const handleLanguageChange = (language) => {
    setIsChanging(true); // Start animation
    setlnges(language); // Update language state

    setTimeout(() => {
      setIsChanging(false); // End animation
    }, 500); //
  };
  i18n.on("languageChanged", handleLanguageChange); // Listen for language changes

  return (
    <div
      className={`mt-10 p-10 ${
        !isDarkMode ? "bg-[#e5e0e0] text-[#1e21214d]" : " bg-[#1e2121]"
      }`}
    >
      {!loading && (
        <div>
          <h2
            className={`text-[25px] lg-text-[30px] font-extrabold text-center ${
              !isDarkMode ? "text-[#1e2121]" : "text-white"
            }`}
          >
            {t("Discover_All_Courses")}
          </h2>
        </div>
      )}

      <div className=" w-full p-5overflow-hidden mb-8 rounded mt-10 m-[auto]">
        {loading ? (
          <SkeletonService />
        ) : (
          <div
            className={`page-container ${isChanging ? "fade-out" : "fade-in"}`}
          >
            <div className=" grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-1 lg:gap-3 lg:p-10">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className={`flex-wrap flex lg:flex xl:flex-nowrap lg:flex-nowrap md:flex-nowrap w-full m-[auto] lg:p-5 hover:shadow-md overflow-hidden mb-8 rounded${
                    !isDarkMode ? "bg-[#141717] " : ""
                  }`}
                >
                  <div>
                    <Image
                      src={service?.attributes?.image?.data?.attributes?.url}
                      lg-width={300}
                      width={500}
                      height={300}
                      alt="Service Image"
                      className="h-70 w-[500px] sm:w-[320px] lg:w-[300px] object-cover  rounded transition duration-500 group-hover:scale-105 sm:h-60 bg-black"
                    />
                  </div>
                  <div className="">
                    <Link href={`/service_details/${service?.id}`}>
                      <div
                        className={`relative p-2 ${
                          !isDarkMode
                            ? "bg-white text-[#141717]"
                            : "bg-[#141717]"
                        }`}
                        data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                      >
                        <h3
                          className={`mt-1.5 text-lg  line-clamp-1 ltr:ml-1 ${
                            !isDarkMode ? "text-[#141717]" : "text-white"
                          }`}
                        >
                          {lng === "ar"
                            ? service?.attributes?.name_ar // Display Arabic name for Arabic users
                            : service?.attributes?.name}
                        </h3>

                        <p
                          className={`text-[13px] mt-1.5 ${
                            !isDarkMode ? "text-[#141717]" : "text-[#a1a1a1]"
                          }`}
                        >
                          {t("By")}
                          <span className="ml-2 mr-2 text-[#bd2130]">
                            {lng === "ar"
                              ? service?.attributes?.Author_ar // Display Arabic name for Arabic users
                              : service?.attributes?.Author}
                          </span>
                        </p>

                        <p
                          className={`mt-4 text-[13px] ${
                            !isDarkMode ? "text-[#141717]" : "text-[#ffffff99]"
                          }`}
                        >
                          {t("searchText")}{" "}
                          {lng === "ar"
                            ? service?.attributes?.name_ar // Display Arabic name for Arabic users
                            : service?.attributes?.name}
                        </p>

                        <div
                          className={`flex mt-5 text-[14px] ${
                            !isDarkMode ? "text-[#141717]" : "text-[#ffffff99]"
                          }`}
                        >
                          <p>
                            {t("courseLanguage")} :{" "}
                            {service?.attributes?.courseLanguage}
                          </p>
                          <p className="ml-4 mr-4">
                            {t("Duration")} : {service?.attributes?.Duration}{" "}
                          </p>
                        </div>
                        <div className="border rounded mt-8 mr-2 ml-2 w-[300px] mb-7 bg-[#bd2130]">
                          <p
                            className={` mr-2 ml-2 rounded ${
                              !isDarkMode ? "text-white" : "text-[#ffffff99]"
                            }`}
                          >
                            {lng === "ar" ? (
                              <div dir="ltr" className="text-right">
                                <span className=" line-through mr-2 ml-2">
                                  8000 SAR /mo
                                </span>
                                {service?.attributes?.price} SAR /mo
                              </div>
                            ) : (
                              <>
                                <span className="line-through mr-2 ml-2 ">
                                  8000 SAR /mo
                                </span>
                                ${service?.attributes?.price} SAR /mo
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {filterLength == 0 && (
          <div className="flex justify-center items-center flex-col">
            <Image
              src="https://res.cloudinary.com/dahptqhed/image/upload/v1732441788/not_found_1c68268de7.png"
              alt="no found"
              width={170}
              height={160}
            />
            <h2
              className={`mb-20 text-[28px] font-semibold
                     ${!isDarkMode ? "text-[#141717]" : "text-white"}`}
            >
              {" "}
              {t("We couldn't find any search results")}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
