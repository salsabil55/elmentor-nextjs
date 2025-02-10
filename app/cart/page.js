"use client";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../_Context/cartContext";
import Image from "next/image";
import cartApi from "../_Utils/cartApi";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import useSetup from "../hooks/useSetup";

function cartPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const [code, setCode] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [codeError, setCodeError] = useState(false);
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
  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount =
        totalAmount + Number(item?.serviceDetail?.attributes?.price);
    });
    return totalAmount;
  };
  const deleteItem = (id) => {
    cartApi
      .deleteCartItem(id)
      .then((res) => {
        if (res)
          setCart((oldCart) =>
            oldCart.filter((item) => item.id !== res?.data?.data.id)
          );
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  const applyCoupon = () => {
    if (code.toLowerCase() === "mentor24") {
      setCodeSuccess(true);
    } else {
      setCodeError(true);
    }
    setShowButton(false); // Hide button after clicking
  };
  return (
    <section>
      <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex justify-between flex-wrap">
        <div
          className={`mx-auto lg:w-[60%] w-[100%] mb-3 border rounded p-6 overflow-y-auto h-[430px] 
         ${!isDarkMode ? "bg-[#d9d9d9]" : "bg-[#1e2121e6]"}`}
        >
          <header
            className={`
         ${lng === "ar" ? "text-right font-light" : "text-left"}`}
          >
            <h1
              className={`sm:text-3xl
         ${
           !isDarkMode
             ? "text-black font-light text-xl"
             : "text-white font-bold "
         }`}
            >
              {t("Courses_Cart_List")}
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart?.map((item) => (
                <li
                  key={item?.id}
                  className={`flex items-center gap-4 rounded p-3 ${
                    !isDarkMode ? "bg-white text-black" : "bg-[#3c41414d]"
                  }`}
                >
                  <Image
                    src={
                      item?.serviceDetail?.attributes?.image?.data?.attributes
                        ?.url
                    }
                    width={70}
                    height={70}
                    alt="service Detail Banner"
                    className="object-fill rounded "
                  />

                  <div>
                    <h3
                      className={`text-[16px] ${
                        !isDarkMode ? "text-black" : "text-white"
                      }`}
                    >
                      {" "}
                      {lng === "ar"
                        ? item?.serviceDetail?.attributes?.name_ar // Display Arabic name for Arabic users
                        : item?.serviceDetail?.attributes?.name}
                    </h3>

                    <dl
                      className={`mt-0.5 space-y-px text-[10px] ${
                        !isDarkMode ? "text-black" : "text-white"
                      }`}
                    >
                      <div>
                        <dt className="inline">{t("By")}:</dt>
                        <dd className="inline">
                          {" "}
                          {lng === "ar"
                            ? item?.serviceDetail?.attributes?.Author_ar // Display Arabic name for Arabic users
                            : item?.serviceDetail?.attributes?.Author}
                        </dd>
                      </div>

                      <div>
                        <dt className="inline">Category:</dt>
                        <dd className="inline">
                          {" "}
                          {item?.serviceDetail?.attributes?.Category}
                        </dd>
                      </div>
                      <div>
                        <dt className="inline">Price:</dt>
                        <dd className="inline">
                          {" "}
                          {item?.serviceDetail?.attributes?.price}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2 mr-5">
                    <button
                      className={`transition hover:text-red-600 ${
                        !isDarkMode ? "text-black" : "text-white"
                      }`}
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
          {cart.length == 0 && (
            <div className="flex text-center justify-center items-center mt-40">
              <p>{t("Your_Cart_List_Is_Empty")}</p>
            </div>
          )}
        </div>
        <div
          className={`border w-[100%] lg:w-[30%] rounded p-6 h-[100%] overflow-hidden ${
            !isDarkMode ? "bg-white text-black" : "text-white"
          }`}
        >
          <p>{t("OrderSummary")}</p>
          <div className="mt-8 flex lg:justify-end justify-start">
            <div className="w-screen max-w-lg space-y-4">
              <dl
                className={`space-y-0.5 text-sm ${
                  !isDarkMode ? " text-black" : "text-white"
                }`}
              >
                <div className="flex mb-5 flex-col">
                  <input
                    onChange={handleInputChange}
                    value={code}
                    placeholder={
                      lng === "ar"
                        ? "ادخل كود الخصم mentor24" // Display Arabic name for Arabic users
                        : "Apply Coupon Code mentor24"
                    }
                    className={`text-[13px] rounded w-[100%] p-3 mr-3 ml-3 outline-none ${
                      !isDarkMode
                        ? "text-black bg-[#e5e5e5]"
                        : "bg-[#090a0ae6] text-white"
                    }`}
                  />

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
                <div className="flex justify-between mb-2 pb-2 pt-2">
                  <dt>{t("Subtotal")}</dt>

                  <dd>{getTotalAmount()} SAR</dd>
                </div>
                <div className="flex justify-between pb-2 pt-2">
                  <dt>VAT</dt>
                  <dd>25 SAR</dd>
                </div>
                <div className="flex justify-between pb-3 pt-2 mb-5">
                  <dt>{t("Discount")}</dt>
                  <dd>-20 SAR</dd>
                </div>
                <div className="flex justify-between pb-3 pt-2 mb-5">
                  <dt>{t("Discount")}</dt>
                  <dd className="">-20 SAR</dd>
                </div>
                <div className="flex justify-between text-[17px] font-semibold border-t pt-5 border-gray-100">
                  <dt>{t("Total_Inclusive_of_VAT")}</dt>
                  <dd>{getTotalAmount()} SAR </dd>
                </div>
              </dl>

              <div className="flex w-[100%] items-center">
                <button
                  onClick={() =>
                    router.push(`/checkout?amount=${getTotalAmount()}`)
                  }
                  className="block w-[100%] text-center rounded bg-[#fd0000] px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  {t("Checkout")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default cartPage;
