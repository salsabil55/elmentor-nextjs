"use client";
import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../_Context/bookContext";
import Image from "next/image";
import bookMarkApi from "../_Utils/bookMarkApi";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useSetup from "../hooks/useSetup";
import i18n from "../i18n";
import { useBooked } from "../_Context/bookMarkContext";
import bookApi from "../_Utils/bookMarkApi";

function bookMarkPage() {
  const { bookedItems, removeBookedItem } = useBooked();
  const { booked, setBooked } = useContext(BookContext);

  const { user } = useUser();
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

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);

  useEffect(() => {
    user && getBookedItems();
  }, [user]);
  const getBookedItems = () => {
    bookApi
      .getUserBookItems(user.primaryEmailAddress.emailAddress)
      .then((res) => {
        const newItems = res?.data?.data.map((cartItem) => ({
          id: cartItem.id,
          service: cartItem?.attributes?.services?.data[0],
        }));
      })
      .catch((error) => console.log("Error fetching booked items:", error));
  };

  const deleteItem = (id) => {
    bookMarkApi
      .deleteBookItem(id)
      .then((res) => {
        if (res)
          setBooked((oldCart) =>
            oldCart.filter((item) => item.id !== res?.data?.data.id)
          );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section>
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex justify-between flex-wrap">
        <div
          className={`mx-auto w-[100%] lg:w-[80%] border rounded p-2 lg:p-6 overflow-y-auto h-[430px] ${
            !isDarkMode ? "bg-[#0000001a]" : ""
          }`}
        >
          <header className="text-left">
            <h1
              className={`font-bold sm:text-3xl ${
                lng === "ar" ? "text-right" : "text-left"
              } ${!isDarkMode ? "text-black" : "text-white"}`}
            >
              {t("Booked_Marked_Courses")}
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {booked?.map((item) => (
                <li
                  key={item?.id}
                  className={`flex items-center gap-4 rounded p-3 ${
                    !isDarkMode ? "bg-[#797f81]" : "bg-[#1e21214d]"
                  }`}
                >
                  <Image
                    src={
                      item?.service?.attributes?.image?.data?.attributes?.url
                    }
                    width={70}
                    height={70}
                    alt="service Detail Banner"
                    className="object-fill rounded "
                  />

                  <div>
                    <h3 className="text-[16px] text-white">
                      {" "}
                      {lng === "ar"
                        ? item?.service?.attributes?.name_ar // Display Arabic name for Arabic users
                        : item?.service?.attributes?.name}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-white">
                      <div>
                        <dt className="inline">{t("By")}:</dt>
                        <dd className="inline">
                          {" "}
                          {lng === "ar"
                            ? item?.service?.attributes?.Author_ar // Display Arabic name for Arabic users
                            : item?.service?.attributes?.Author}
                        </dd>
                      </div>

                      <div>
                        <dt className="inline">Category:</dt>
                        <dd className="inline">
                          {" "}
                          {item?.service?.attributes?.Category}
                        </dd>
                      </div>
                      <div>
                        <dt className="inline">Price:</dt>
                        <dd className="inline">
                          {" "}
                          {item?.service?.attributes?.price}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2 mr-5">
                    <button
                      className="text-white transition hover:text-red-600"
                      onClick={() => deleteItem(item?.id)}
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {booked.length === 0 && (
            <p
              className={`text-[20px] shadow-lg rounded flex justify-center p-5 h-40 items-center ${
                !isDarkMode
                  ? "text-black bg-white"
                  : "bg-[#1e21214d] text-white"
              }`}
            >
              {t("Your_Booked_List_Empty")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
export default bookMarkPage;
