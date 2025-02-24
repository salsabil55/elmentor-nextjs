"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import servicesApi from "../_Utils/servicesApi";
import SkeletonService from "./skeletonService";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useBooked } from "../_Context/bookMarkContext";
import { BookContext } from "../_Context/bookContext";
import bookMarkApi from "../_Utils/bookMarkApi";
import "react-toastify/dist/ReactToastify.css";

import AOS from "aos";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import useSetup from "../hooks/useSetup";

function Page() {
  const [serviceList, setServiceList] = useState([]);
  const [filter, setFilter] = useState(""); // Initialize filter state
  const [filteredServices, setFilteredServices] = useState([]); // Filtered results

  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const [bookedColor, setBookedColor] = useState(false);
  // const [booked, setBooked] = useState(false);
  const { user } = useUser();
  const { bookedItems, addBookedItem, removeBookedItem } = useBooked();
  const { booked, setBooked } = useContext(BookContext);
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
  // Check if the service is already booked
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false,
    });
  }, []);

  const handleToggleBook = async (serviceList) => {
    if (!user) {
      toast.error("You Must Be Logged in");
      return;
    }

    const isServiceBooked = booked.some(
      (item) => item?.serviceList?.id === serviceList?.id
    );

    if (isServiceBooked) {
      // Find the ID of the booked item
      const bookedItem = booked.find(
        (item) => item?.serviceList?.id === serviceList?.id
      );

      if (!bookedItem) return;

      bookMarkApi
        .deleteBookItem(bookedItem.id) // ✅ Call API to delete item
        .then(() => {
          removeBookedItem(serviceList.id);
          setBooked((oldBooked) =>
            oldBooked.filter(
              (item) => item?.serviceList?.id !== serviceList?.id
            )
          );
          toast.info("Item removed from Booked");
        })
        .catch((error) => {
          console.error("Error removing bookmark:", error);
        });
    } else {
      const data = {
        data: {
          username: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          services: [serviceList?.id],
        },
      };

      bookMarkApi
        .addToBook(data)
        .then((res) => {
          const newBookedItem = {
            id: res?.data?.data?.id,
            serviceList, // ✅ Make sure this is correct
          };

          addBookedItem(newBookedItem);
          setBooked((oldBooked) => [...oldBooked, newBookedItem]);
          toast.success("Item added to Booked");
        })
        .catch((error) => {
          console.error("Error adding bookmark:", error);
        });
    }
  };

  const notify = () => {
    toast.error("You Must Be Logged in");
  };

  useEffect(() => {
    getService();

    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false,
    });
  }, [lng]);
  const getService = async () => {
    try {
      // Await the API call to get the latest services
      // const response = await servicesApi.getLatestServices(lng);
      const response = await servicesApi.getLatestServices();
      const data = response.data;
      setServiceList(data);
      setLoading(false);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setFilter(value); // Update the search query
  };

  const normalizeText = (text) => {
    if (!text) return "";
    return text
      .normalize("NFKD") // Normalize Unicode
      .replace(/[\u064B-\u065F]/g, "") // Remove Arabic diacritics
      .toLowerCase(); // Case-insensitive
  };

  useEffect(() => {
    const normalizedQuery = normalizeText(filter); // Normalize user input

    // Filter services based on normalized query
    const results = serviceList.filter((service) => {
      const name = normalizeText(service?.attributes?.name || ""); // Normalize English name
      const nameAr = normalizeText(service?.attributes?.name_ar || ""); // Normalize Arabic name
      const author = normalizeText(service?.attributes?.Author || "");
      const authorAr = normalizeText(service?.attributes?.Author_ar || "");

      return (
        name.includes(normalizedQuery) ||
        nameAr.includes(normalizedQuery) ||
        author.includes(normalizedQuery) ||
        authorAr.includes(normalizedQuery)
      );
    });

    // Update filtered services
    setFilteredServices(results);
  }, [filter, serviceList]); // Dependencies: Run effect only when filter or serviceList changes

  const filterLength = filteredServices.length;

  return (
    <div
      className={`mt-10 p-10 
    ${!isDarkMode ? "bg-[#d1cfcf] text-black" : "bg-[#1e2121]"}`}
    >
      {!loading && (
        <>
          <div className="mt-3 flex justify-center">
            <h2
              className={`text-[25px] lg-text-[30px]
         ${
           !isDarkMode
             ? "text-[#141717] font-weight: 400"
             : "text-white font-extrabold "
         }`}
            >
              {t("Discover_All_Courses")}
            </h2>
          </div>

          <div className="flex justify-center mt-5 flex-col lg:flex-row items-center">
            <input
              placeholder={
                lng === "ar" ? "ابحث عن دورات تدريبية" : "Search Courses"
              }
              value={filter}
              onChange={handleSearchChange} // Update search input
              className={`pr-4 pt-3 pb-3 w-[100%] mb-2 lg:w-[60%] border rounded pl-4 outline-none
         ${
           !isDarkMode
             ? "text-[#141717] bg-[#dbdbdb]"
             : "text-white bg-[#1e2121]"
         }`}
            />
          </div>
        </>
      )}

      <div
        className={`w-[full] p-5 hover:shadow-md overflow-hidden mb-8 rounded mt-10
         ${!isDarkMode ? "bg-[#9e9e9e80]" : "bg-[#141717]"}`}
      >
        {!loading ? (
          <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 lg:p-10">
            {/* Display filtered list */}
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className={`w-full lg:p-5 hover:shadow-md overflow-hidden mb-8 rounded
         ${!isDarkMode ? "bg-[#dbdbdb]" : "bg-[#141717]"}`}
              >
                <div
                  id={service.id}
                  className={`group w-[220px] lg:w-[320px] m-auto relative block overflow-hidden rounded-lg shadow-sm shadow-indigo-100
                  ${!isDarkMode ? "bg-[#d1cfcf]" : "bg-[#141717]"}`}
                  data-aos="fade-up"
                  data-aos-anchor-placement="center-bottom"
                >
                  {!user ? (
                    <button
                      onClick={notify}
                      className="absolute end-4 top-3 z-20 rounded-full bg-[#252a2a] p-1 text-white border-gray-400 transition"
                    >
                      <Bookmark />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleBook(service)}
                      className="absolute end-4 top-3 z-20 border rounded-full bg-[#252a2a] p-1 text-white border-gray-400 transition"
                    >
                      {booked.some(
                        (item) => item?.serviceList?.id === service.id
                      ) ? (
                        <BookmarkCheck />
                      ) : (
                        <Bookmark />
                      )}
                    </button>
                  )}
                  <Image
                    src={service?.attributes?.image?.data?.attributes?.url}
                    lg-width={320}
                    width={220}
                    height={200}
                    alt="Service Image"
                    className="h-56 w-[260px] sm:w-[320px] lg:w-[360px] object-cover transition duration-500 group-hover:scale-105 sm:h-60 bg-black"
                  />
                  <Link href={`/service_details/${service?.id}`}>
                    <div
                      className={`relative p-2 border rounded
                     ${!isDarkMode ? "bg-[#d1cfcf]" : "bg-[#141717]"}`}
                      data-aos="fade-zoom-in"
                      data-aos-easing="ease-in-back"
                    >
                      <h3
                        className={`mt-1.5 text-lg line-clamp-1 ltr:ml-1
                     ${!isDarkMode ? "text-[#141717]" : "text-white"}`}
                      >
                        {lng === "ar"
                          ? service?.attributes?.name_ar // Display Arabic name for Arabic users
                          : service?.attributes?.name}
                      </h3>
                      <p
                        className={`mt-1.5 text-[13px]
                     ${!isDarkMode ? "text-[#141717]" : "text-[#a1a1a1]"}`}
                      >
                        {t("By")}

                        <span className="ml-2 mr-2">
                          {" "}
                          {lng === "ar"
                            ? service?.attributes?.Author_ar // Display Arabic name for Arabic users
                            : service?.attributes?.Author}
                        </span>
                      </p>
                      <p
                        className={`mt-4
                     ${!isDarkMode ? "text-[#141717]" : "text-white"}`}
                      >
                        {lng === "ar" ? (
                          <div dir="ltr" className="text-end">
                            <span
                              className={`line-through mr-2 ml-2
                     ${!isDarkMode ? "text-[#141717]" : "text-white"}`}
                            >
                              8000 SAR /mo
                            </span>
                            {service?.attributes?.price} SAR /mo
                          </div>
                        ) : (
                          <>
                            <span
                              className={`line-through mr-2 ml-2
                     ${!isDarkMode ? "text-[#141717]" : "text-white"}`}
                            >
                              8000 SAR /mo
                            </span>
                            ${service?.attributes?.price} SAR /mo
                          </>
                        )}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SkeletonService />
        )}
        {filterLength == 0 && (
          <div className="flex justify-center items-center flex-col">
            <Image
              src="https://res.cloudinary.com/dahptqhed/image/upload/v1740401273/not_found_c098f22238.png"
              alt="no found"
              width={170}
              height={160}
            />
            <h2
              className={`mb-20 text-[28px] font-semibold
                     ${!isDarkMode ? "text-[#141717]" : "text-white"}`}
            >
              {" "}
              We couldn't find any search results
            </h2>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Page;
