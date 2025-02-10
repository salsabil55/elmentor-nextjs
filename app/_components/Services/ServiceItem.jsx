"use client";
import React, { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import bookMarkApi from "../../_Utils/bookMarkApi";
import SkeletonItem from "../../service_details/_components/skeletonItem";
import { useTranslation } from "react-i18next";
import useSetup from "../../hooks/useSetup";
import { BookContext } from "../../_Context/bookContext";
import { useBooked } from "../../_Context/bookMarkContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ServiceItem({ service, itemId }) {
  const { bookedItems, addBookedItem, removeBookedItem } = useBooked();
  const { booked, setBooked } = useContext(BookContext);
  const { t } = useTranslation();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { lng, darkmode } = useSetup();
  const [isDarkMode, setIsDarkMode] = useState(darkmode === "dark");
  const [bookItem, setBookedItem] = useState();

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
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false,
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (service) {
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [service]);

  // const handleToggleBook = () => {
  //   if (!user) {
  //     toast.error("You Must Be Logged in");
  //     return;
  //   }

  //   const isServiceBooked = booked.some(
  //     (item) => item?.service?.id === service?.id
  //   );

  //   if (isServiceBooked) {
  //     // Remove item from booked list
  //     removeBookedItem(service.id);
  //     console.log(booked.id);
  //     setBooked((oldBooked) =>
  //       oldBooked.filter((item) => item?.service?.id !== service?.id)
  //     );
  //     const data = {
  //       data: {
  //         username: user?.fullName,
  //         email: user?.primaryEmailAddress?.emailAddress,
  //         services: [service?.id],
  //       },
  //     };
  //     console.log(service.id);
  //     bookMarkApi
  //       .deleteBookItem(services)
  //       .then((res) => {
  //         toast.info("Item removed from Booked");
  //         console.log("inside");
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   } else {
  //     // Add item to booked list
  //     const data = {
  //       data: {
  //         username: user?.fullName,
  //         email: user?.primaryEmailAddress?.emailAddress,
  //         services: [service?.id],
  //       },
  //     };

  //     bookMarkApi
  //       .addToBook(data)
  //       .then((res) => {
  //         const newBookedItem = {
  //           id: res?.data?.data?.id,
  //           service,
  //         };
  //         addBookedItem(newBookedItem);
  //         setBooked((oldBooked) => [...oldBooked, newBookedItem]);
  //         toast.success("Item added to Booked");
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   }
  // };
  const handleToggleBook = async () => {
    if (!user) {
      toast.error("You Must Be Logged in");
      return;
    }

    const isServiceBooked = booked.some(
      (item) => item?.service?.id === service?.id
    );

    if (isServiceBooked) {
      // Find the ID of the booked item
      const bookedItem = booked.find(
        (item) => item?.service?.id === service?.id
      );

      if (!bookedItem) return;

      bookMarkApi
        .deleteBookItem(bookedItem.id) // ✅ Call API to delete item
        .then(() => {
          removeBookedItem(service.id);
          setBooked((oldBooked) =>
            oldBooked.filter((item) => item?.service?.id !== service?.id)
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
          services: [service?.id],
        },
      };

      bookMarkApi
        .addToBook(data)
        .then((res) => {
          const newBookedItem = {
            id: res?.data?.data?.id,
            service,
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

  return (
    <div
      className={`w-[360px] lg:w-[360px] m-auto p-5 hover:shadow-md overflow-hidden mb-8 rounded ${
        !isDarkMode ? "bg-[#d1cfcf]" : "bg-[#141717] "
      }`}
    >
      {!loading ? (
        <div
          id={service?.id}
          className="group bg-[#141717] w-[260px] sm:w-[320px] md:w-[280px] lg:w-[300px] m-auto relative block overflow-hidden rounded-lg shadow-sm shadow-indigo-100"
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
              onClick={handleToggleBook}
              className="absolute end-4 top-3 z-20 border rounded-full bg-[#252a2a] p-1 text-white border-gray-400 transition"
            >
              {booked.some((item) => item?.service?.id === service?.id) ? (
                <BookmarkCheck />
              ) : (
                <Bookmark />
              )}
            </button>
          )}

          <Image
            src={
              service?.attributes?.image?.data?.attributes?.url ||
              "/fallback.jpg"
            }
            width={280}
            height={200}
            alt={service?.attributes?.name || "Service Image"}
            className="h-56 w-[260px] sm:w-[320px] lg:w-[300px] transition duration-500 group-hover:scale-105"
          />

          <Link href={`/service_details/${service?.id}`}>
            <div
              className={`relative  p-2 border rounded ${
                !isDarkMode ? "bg-[#e5e5e5]" : "bg-[#141717]"
              }`}
            >
              <h3
                className={`mt-1.5 text-[12px] lg:text-[15px] line-clamp-1 ${
                  !isDarkMode ? "text-black font-bold" : "text-white"
                }`}
              >
                {lng === "ar"
                  ? service?.attributes?.name_ar // Display Arabic name for Arabic users
                  : service?.attributes?.name}
              </h3>
              <p
                className={`mt-1.5 text-[13px] line-clamp-1${
                  !isDarkMode ? "text-black" : "text-[#a1a1a1]"
                }`}
              >
                {t("By")}
                <span
                  className={`mr-2 ml-2 ${
                    !isDarkMode ? "text-black" : "text-white"
                  }`}
                >
                  {lng === "ar"
                    ? service?.attributes?.Author_ar // Display Arabic name for Arabic users
                    : service?.attributes?.Author}{" "}
                </span>
              </p>
              <p
                className={`mt-4 ${!isDarkMode ? "text-black" : "text-white"} ${
                  lng === "ar" ? "text-right" : ""
                }`}
                dir={lng === "ar" ? "ltr" : ""}
              >
                <span
                  className={`line-through mr-5 ${
                    !isDarkMode ? "text-black" : "text-white"
                  }`}
                >
                  8000 SAR /mo
                </span>
                {service?.attributes?.price} SAR /mo
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <SkeletonItem />
      )}
    </div>
  );
}

export default ServiceItem;
