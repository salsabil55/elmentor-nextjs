"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  ShoppingCart,
  CircleOff,
  TicketPercent,
  Globe,
  Clock,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useSetup from "../../hooks/useSetup";
import SkeletonInfo from "./SkeletonInfo";
import cartApi from "../../_Utils/cartApi";
import { CartContext } from "../../_Context/cartContext";
import AOS from "aos";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ServiceInfo({ serviceDetail, lng }) {
  const { user } = useUser();
  const [lnges, setlnges] = useState(i18n.language); // Track current language
  const { t } = useTranslation();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const [code, setCode] = useState("");
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { darkmode } = useSetup();
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
  // Capture the input value on change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCode(value);

    // Show button only when there's input
    setShowButton(value.trim() !== "");

    // Clear message when code is cleared
    if (value.trim() === "") {
      setCodeSuccess(false);
      setCodeError(false);
    }
  };
  const notify = () => {
    toast.error("You Must Be Logged in");
  };

  const applyCoupon = () => {
    if (code.toLowerCase() === "mentor24") {
      setCodeSuccess(true);
    } else {
      setCodeError(true);
    }
    setShowButton(false); // Hide button after clicking
  };

  const handleAddToCart = () => {
    // Check if the service is already in the cart
    const isServiceInCart = cart.some(
      (item) => item?.serviceDetail?.id === serviceDetail?.id
    );

    if (isServiceInCart) {
      toast.info("This Course is already added to your cart.");
      return; // Exit the function to prevent adding it again
    }

    const data = {
      data: {
        username: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        services: [serviceDetail?.id],
      },
    };

    console.log(data);

    // Ensure cartApi.addToCart exists and is a function
    cartApi
      .addToCart(data)
      .then((res) => {
        console.log("cart created successfully", res.data.data);
        console.log(serviceDetail);
        setCart((oldCart) => [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            serviceDetail,
          },
        ]);
      })
      .catch((error) => {
        console.log("error", error);
      });
    toast.success("Item added to cart");
  };
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  return (
    <>
      <div className="">
        <div className="flex-wrap lg:h-screen">
          {serviceDetail?.id ? (
            <div
              className={`rounded p-6 pb-2 ml-12 mb-7 border-stone-400 border  shadow-lg shadow-[#001c25] ${
                !isDarkMode
                  ? "bg-[#d1cfcf] text-black"
                  : "bg-[#0c0e0e] text-white "
              }`}
              data-aos="fade-left"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <h2 className="text-[22px] mb-6">
                {lng === "ar"
                  ? serviceDetail?.attributes?.name_ar // Display Arabic name for Arabic users
                  : serviceDetail?.attributes?.name}{" "}
              </h2>

              {/* <h2 className="text-[15px] mt-5">
            {serviceDetail?.attributes?.description[0]?.children[0].text}
          </h2> */}
              <p className="flex  mb-2">
                <span className="mr-3 ml-3">{t("By")} : </span>
                <span className="text-[#bd2130]">
                  {lng === "ar"
                    ? serviceDetail?.attributes?.Author_ar // Display Arabic name for Arabic users
                    : serviceDetail?.attributes?.Author}{" "}
                </span>
              </p>
              <p className="flex mb-2">
                <Clock className="w-4 mr-3 ml-3" />
                <span className="mr-3 ml-3">{t("Duration")}:</span>
                {serviceDetail?.attributes?.Duration}
              </p>
              <p className="flex mb-2">
                <Globe className="w-4 mr-3 ml-3" />
                <span className="mr-3 ml-3"> {t("courseLanguage")}</span>
                {serviceDetail?.attributes?.courseLanguage}
              </p>
              <h2 className="text-white-500 text-[15px] flex-col items-center gap-2">
                {serviceDetail?.attributes?.AvailableDiscount ? (
                  <>
                    <div className="flex">
                      <TicketPercent className="text-white-700 text-[15px] w-4 mr-3 ml-3" />
                      <p className="ml-3 mr-3 text-green-800">
                        {t("Available_Discount_Now")}
                      </p>
                    </div>
                    <div className="coupon flex-col block">
                      <input
                        className="coupon-text mt-3 border bg-[#e2e8f01a] w-[100%] text-center border-solid rounded pl-10 pr-10 h-11 text-[12px] border-gray-200"
                        type="text"
                        placeholder={
                          lng === "ar"
                            ? " ادخل كود الخصم mentor24"
                            : "Enter Your Coupoun code mentor24"
                        }
                        value={code}
                        onChange={handleInputChange}
                      />
                      {/* {!codeSuccess && (
                        <button
                          className="mt-3 bg-white text-[#0c0e0e]  font-medium rounded w-[100%] text-center border-solid pl-10 pr-10 h-11 text-[15px] border-gray-200"
                          onClick={handleButtonClick}
                        >
                          Apply Code
                        </button>
                      )} */}

                      {codeSuccess && (
                        <p className="bg-[#2aae38] border-green-800 rounded mt-4 text-white text-center p-3 font-normal">
                          {" "}
                          {t("Code_Applied_Succefully")}
                        </p>
                      )}
                      {codeError && (
                        <p className="bg-[#a00006] border-red-800 rounded mt-4 text-white text-center p-3 font-normal">
                          {" "}
                          {t("CodeFailed")}
                        </p>
                      )}

                      {showButton && (
                        <button
                          className="mt-3 bg-white text-[#0c0e0e]  font-medium rounded w-[100%] text-center border-solid pl-10 pr-10 h-11 text-[15px] border-gray-200"
                          onClick={applyCoupon}
                        >
                          Apply Coupon
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex">
                    <CircleOff className="w-3" />
                    <p className="ml-3">{t("Not Available Discount Now")}</p>
                  </div>
                )}
              </h2>
              <h2 className="text-[15px] text-white-950 mt-7 mb-9">
                <span className="text-gray-500">
                  {t("Get_access_to_all_courses_only_for")}
                  {serviceDetail?.attributes?.price} SAR /mo
                </span>{" "}
              </h2>
              {!user ? (
                <button
                  onClick={notify}
                  className="flex gap-2 mb-9 justify-center items-center text-center text-[13px] bg-[#eb2027] rounded-lg text-white w-[100%] pt-2 pb-2"
                >
                  <ShoppingCart className="w-4" />
                  {t("Subscribe")}{" "}
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart()}
                  className="flex gap-2 mb-9 justify-center items-center text-center text-[13px] bg-[#eb2027] rounded-lg text-white w-[100%] pt-2 pb-2"
                >
                  <ShoppingCart className="w-4" />
                  {t("Subscribe")}
                </button>
              )}
            </div>
          ) : (
            <SkeletonInfo />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ServiceInfo;
