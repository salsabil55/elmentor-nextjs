"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Bookmark, Moon, Search, Globe } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import Cart from "../Cart/Cart";
import { useRouter } from "next/navigation";
import { CartContext } from "../../_Context/cartContext";
import { usePathname } from "next/navigation";
import cartApi from "../../_Utils/cartApi";
import bookApi from "../../_Utils/bookMarkApi";
// import { SearchContext } from "../../_Context/SearchContext";
import { BookContext } from "../../_Context/bookContext";
import { slide as Menu } from "react-burger-menu";
import useSetup from "../../hooks/useSetup";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import classNames from "classnames";

function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { user } = useUser();
  const router = useRouter();
  // Default to dark mode
  const { cart, setCart } = useContext(CartContext);
  const { booked, setBooked } = useContext(BookContext);
  // const { searchList, setSearchList } = useContext(SearchContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState(""); // State for the search query
  // const [lng, setLng] = useState(cookies.get("i18next") || i18n.language); // Track current language
  const [isUserInitiated, setIsUserInitiated] = useState(false); // Track user action
  const { lng, handleLanguageChange, toggleMode, darkmode } = useSetup();
  const [isDarkMode, setIsDarkMode] = useState(darkmode === "dark");
  // useEffect(() => {
  //   setIsDarkMode(darkmode === "dark");
  // }, [darkmode]);
  // useEffect(() => {
  //   // On initial load, check cookies for the user's preference
  //   const savedTheme = cookies.get("theme");
  //   if (savedTheme) {
  //     const isDark = savedTheme === "dark";
  //     setIsDarkMode(isDark);
  //     // Apply the saved theme
  //     document.documentElement.setAttribute(
  //       "data-theme",
  //       isDark ? "dark" : "light"
  //     );
  //   }
  // }, []);
  useEffect(() => {
    setIsDarkMode(darkmode === "dark");
    document.documentElement.setAttribute("data-theme", darkmode); // Apply theme globally
  }, [darkmode]);

  const handleToggleMode = () => {
    const newMode = isDarkMode ? "light" : "dark";
    toggleMode(newMode); // Update global theme in useSetup
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsUserInitiated(true); // Mark as user-initiated

    router.push(
      `/search?query=${encodeURIComponent(value)}&lng=${lng}`,
      undefined,
      { shallow: true }
    );
  };
  useEffect(() => {
    setQuery("");
    if (isUserInitiated && pathname === "/search") {
      const currentQuery =
        new URLSearchParams(window.location.search).get("query") || "";
      router.push(
        `/search?query=${encodeURIComponent(currentQuery)}&lng=${lng}`,
        undefined,
        { shallow: true }
      );
    } else {
      setIsUserInitiated(false);
    } // Reset after handling user action
  }, [lng]);

  const [openCart, setOpenCart] = useState(false);

  const showSettings = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.document.dir = i18n.dir();
    if (router.pathname === "/search") {
      const currentQuery =
        new URLSearchParams(window.location.search).get("query") || "";
      router.push(
        `/search?query=${encodeURIComponent(currentQuery)}&lng=${lnges}`,
        undefined,
        { shallow: true }
      );
    }
  }, [lng]);
  useEffect(() => {
    user && getCartItems();
    user && getBookedItems();
  }, [user]);
  const getCartItems = () => {
    cartApi
      .getUserCartItems(user.primaryEmailAddress.emailAddress)
      .then((res) => {
        const newItems = res?.data?.data.map((cartItem) => ({
          id: cartItem.id,
          serviceDetail: cartItem?.attributes?.services?.data[0],
        }));
        setCart((oldCart) => [
          ...oldCart.filter(
            (oldItem) => !newItems.some((newItem) => newItem.id === oldItem.id)
          ),
          ...newItems,
        ]);
      });
  };
  const getBookedItems = () => {
    bookApi
      .getUserBookItems(user.primaryEmailAddress.emailAddress)
      .then((res) => {
        const newItems = res?.data?.data.map((cartItem) => ({
          id: cartItem.id,
          service: cartItem?.attributes?.services?.data[0],
        }));
        setBooked((oldCart) => [
          ...oldCart.filter(
            (oldItem) => !newItems.some((newItem) => newItem.id === oldItem.id)
          ),
          ...newItems,
        ]);
      });
    console.log("test", booked);
  };
  const styles = {
    container: {
      width: "40px", // Adjust size as needed
      height: "40px",
      borderRadius: "50%", // Makes the shape circular
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "3px",
      marginLeft: "3px",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Optional shadow
      cursor: "pointer", // Pointer on hover
    },
    icon: {
      width: "23px", // Adjust icon size
      height: "23px",
      color: "white", // Icon color
    },
    whiteIcon: {
      color: "#2a2e2e66",
      width: "23px", // Adjust icon size
      height: "23px",
    },
    gryIcon: {
      color: "#88969c",
      width: "23px", // Adjust icon size
      height: "23px",
    },
  };
  const encodedURL = encodeURIComponent(
    "https://res.cloudinary.com/dahptqhed/image/upload/v1729065938/almentor_logo_2x_cfebb8e613.png"
  );
  const encodededURL = encodeURIComponent(
    "https://res.cloudinary.com/dahptqhed/image/upload/v1733161852/almentor_owler_20210531_111400_original_7a0a6accc9.png"
  );
  return (
    <div>
      <header
        className={
          isDarkMode
            ? "bg-[#1e2121] dark:[#1e2121] overflow-hidden"
            : "bg-[#e5e5e5] justify-center items-center"
        }
      >
        <div className="mx-auto relative flex h-16 items-center gap-2 lg:gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="xl:hidden md:block lg:hidden rtl:right-0 rounded  p-1 text-gray-600 transition hover:text-gray-600/75 overflow-hidden dark:text-white dark:hover:text-white/75"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link className="block text-teal-600 dark:text-teal-300 " href="/">
            <span className="sr-only">Home</span>
            {isDarkMode ? (
              <Image
                src="https://res.cloudinary.com/dahptqhed/image/upload/v1729065938/almentor_logo_2x_cfebb8e613.png"
                width={124}
                height={24}
                alt="logo"
              />
            ) : (
              <Image
                src="https://res.cloudinary.com/dahptqhed/image/upload/v1733161852/almentor_owler_20210531_111400_original_7a0a6accc9.png"
                width={150}
                height={50}
                alt="logo"
              />
            )}
          </Link>
          {mobileMenu && (
            <Menu
              className={`text-white top-[11%] w-[100%] overflow-hidden ${
                lng === "ar" ? "rtl right-0 left-0 " : "left-0 right-0 "
              }${!isDarkMode ? "bg-[#dbdbdb]" : "bg-[#141717]"}`}
            >
              <nav
                aria-label="Global"
                className="rtl:text-right text-left rtl:mr-4 mt-[9%]"
              >
                <ul className="flex items-center gap-6 text-sm ml-5 flex-col">
                  <li className="mt-1 mb-1">
                    <Link
                      className={`text-[16px] transition hover:text-gray-500/75 ${
                        !isDarkMode ? "text-[#141717]" : "text-white"
                      }
                    }`}
                      href="/courses"
                      onClick={() => setMobileMenu(!mobileMenu)}
                    >
                      <span>{t("Courses")}</span>
                    </Link>
                  </li>
                  <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                  <li className="mt-1 mb-1">
                    <Link
                      className={`text-[16px] transition hover:text-gray-500/75 ${
                        !isDarkMode ? "text-[#141717]" : "text-white"
                      }
}`}
                      href="/instructor"
                      onClick={() => setMobileMenu(!mobileMenu)}
                    >
                      {t("Instructors")}
                    </Link>
                  </li>

                  <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                  {!user ? (
                    <>
                      <li className="mt-2 mb-2 flex items-center">
                        <Link
                          className={classNames(
                            "rounded-md border mr-3 pl-7 pr-7 pt-2 pb-2 text-[15px] font-medium transition text-white sm:block",
                            {
                              "text-white": isDarkMode,
                              "text-[#2a2e2e]": !isDarkMode,
                            }
                          )}
                          href="http://localhost:3000/sign-in"
                          onClick={() => setMobileMenu(!mobileMenu)}
                        >
                          <span>{t("Login")}</span>
                        </Link>
                        <Link
                          className={`rounded-md border pl-7 pr-7 pt-2 pb-2 text-[15px] font-medium ${
                            !isDarkMode
                              ? "text-[#141717]"
                              : "text-white transition"
                          }
                    }`}
                          href="http://localhost:3000/sign-up"
                          onClick={() => setMobileMenu(!mobileMenu)}
                        >
                          <span>{t("SignUp")}</span>
                        </Link>
                      </li>

                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                      <li className="mt-1 mb-1">
                        <Link
                          className="text-[16px] text-white pt-2 pb-2 pl-20 pr-20 bg-[#bd2130] transition rounded hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                          href="/subscribe"
                          onClick={() => setMobileMenu(!mobileMenu)}
                        >
                          {t("Subscribe")}
                        </Link>
                      </li>
                      <li className="mt-1 mb-1 flex ">
                        <div className="flex">
                          <button
                            className={`bold font-[cairo] text-center mr-5 ml-10 text-[15px] height-[inherit] ${
                              !isDarkMode
                                ? "text-[#141717]"
                                : "text-white transition"
                            }
                    }`}
                            onClick={() => handleLanguageChange("ar")}
                          >
                            اللغه العربية
                          </button>

                          <button
                            className={`bold text-center text-[15px] ${
                              !isDarkMode
                                ? "text-[#141717]"
                                : "text-white transition"
                            }
                    }`}
                            onClick={() => handleLanguageChange("en")}
                          >
                            EN
                          </button>
                        </div>
                      </li>
                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />
                      <li className="mt-1 mb-1 flex ">
                        <div className="flex">
                          <div
                            style={styles.container}
                            className={
                              isDarkMode
                                ? "bg-[#2a2e2e] justify-center items-center"
                                : "bg-[#f2f2f2] justify-center items-center"
                            }
                          >
                            <button
                              onClick={handleToggleMode}
                              className="outline-none border-none"
                            >
                              <Moon
                                style={
                                  isDarkMode ? styles.icon : styles.whiteIcon
                                }
                                className={isDarkMode ? "" : "fill-black"}
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="mt-1 mb-1 flex items-center">
                        <Link
                          href="/bookmark"
                          onClick={() => setMobileMenu(!mobileMenu)}
                          className={`flex items-center text-[16px] ${
                            !isDarkMode ? "text-[#141717]" : "text-white"
                          }
    }`}
                        >
                          {" "}
                          <Bookmark
                            width={15}
                            height={15}
                            className="ml-2 mr-2"
                          />
                          {t("Saved_Courses")}
                          <p className="ml-2"></p>
                        </Link>
                      </li>
                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                      <li className="mt-1 mb-1 flex items-center">
                        <Link
                          href="/cart"
                          onClick={() => setMobileMenu(!mobileMenu)}
                          className={`flex items-center text-[16px] ${
                            !isDarkMode ? "text-[#141717]" : "text-white"
                          }
    }`}
                        >
                          <ShoppingCart
                            width={15}
                            height={15}
                            className="ml-2 mr-2"
                          />
                          {t("Subscribtion_Courses")}
                          <p className="ml-2"></p>
                          <span className="ml-2">({cart.length})</span>
                        </Link>
                      </li>
                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                      <li className="mt-1 mb-1 flex ">
                        <div className="flex">
                          <button
                            className={`bold font-[cairo] text-center mr-5 ml-10 text-[15px] height-[inherit] ${
                              !isDarkMode ? "text-[#141717]" : "text-white"
                            }
      }`}
                            onClick={() => handleLanguageChange("ar")}
                          >
                            اللغه العربية
                          </button>

                          <button
                            className="text-white bold text-center text-[15px] "
                            onClick={() => handleLanguageChange("en")}
                          >
                            <Globe />
                          </button>
                        </div>
                      </li>
                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                      <li className="mt-1 mb-1 flex ">
                        <div className="flex">
                          <div
                            style={styles.container}
                            className={
                              isDarkMode
                                ? "bg-[#2a2e2e] justify-center items-center"
                                : "bg-[#f2f2f2] justify-center items-center"
                            }
                          >
                            <button
                              onClick={handleToggleMode}
                              // () =>
                              // toggleMode(
                              //   darkmode === "dark" ? "light" : "dark"
                              // )

                              className="outline-none border-none"
                            >
                              <Moon
                                style={
                                  isDarkMode ? styles.icon : styles.whiteIcon
                                }
                                className={isDarkMode ? "" : "fill-black"}
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />
                      <li className="mt-1 mb-1">
                        <Link
                          className="text-[16px] text-white pt-2 pb-2 pl-20 pr-20 bg-[#bd2130] transition rounded hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                          href="/subscribe"
                          onClick={() => setMobileMenu(!mobileMenu)}
                        >
                          {t("Subscribe")}
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </Menu>
          )}

          <div className="flex flex-1 items-center justify-end lg:justify-between md:justify-end relative">
            <nav
              aria-label="Global"
              className="xl:flex md:hidden lg:flex hidden "
            >
              <ul className="flex items-center gap-2 xl:gap-6  text-sm">
                <li>
                  <Link
                    className={
                      isDarkMode
                        ? "text-[15px] text-white"
                        : "text-[15px] text-black"
                    }
                    href="/courses"
                  >
                    <span>{t("Courses")}</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      isDarkMode
                        ? "text-[15px] text-white"
                        : "text-[15px] text-black"
                    }
                    href="/instructor"
                  >
                    <span>{t("Instructors")}</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      isDarkMode
                        ? "text-[15px] text-white  border border-solid rounded pl-5 pr-5 pt-2 pb-2 hover:bg-[#bd2130]"
                        : "text-[15px] text-white bg-[#bd2130]  rounded pl-5 pr-5 pt-2 pb-2"
                    }
                    href="/subscribe"
                  >
                    <span>{t("Subscribe")}</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-2">
                  <div
                    className={`lg:flex items-center justify-center relative ${
                      lng === "ar" ? "rtl" : ""
                    }`}
                  >
                    <form onSubmit={(e) => e.preventDefault()} className="flex">
                      {/* Prevent form submission */}
                      <input
                        type="text"
                        placeholder={
                          lng === "ar"
                            ? "ابحث عن دورات تدريبية"
                            : "Search Courses"
                        } // Placeholder based on language
                        value={query}
                        onChange={handleInputChange} // Update query and URL
                        className={
                          isDarkMode
                            ? " focus:border-none outline-none bg-[#1e2121] rounded pl-3 pr-3 pt-2 pb-2 md:mr-5 md:ml-5 md:pl-7 md:pr-7 text-white"
                            : "focus:border-none outline-none rounded pl-3 pr-3 pt-2 pb-2 bg-[#d3d3d399] text-black md:mr-5 md:ml-5 md:pl-7 md:pr-7"
                        }
                      />
                      <button
                        type="submit"
                        className="lg:flex items-center align-center justify-center flex"
                      >
                        <Search
                          style={isDarkMode ? styles.icon : styles.gryIcon}
                          className={`absolute cursor-pointer;
                             ${lng === "ar" ? "left-[13%]" : "right-[10%]"}`}
                        />
                      </button>
                    </form>
                    <hr className="hidden lg:block h-[40px] bg-slate-400 w-[0.5px] mr-3 ml-3" />
                  </div>

                  <div className="xl:flex md:hidden lg:flex hidden">
                    <div
                      style={styles.container}
                      className={
                        isDarkMode
                          ? "bg-[#2a2e2e] justify-center items-center"
                          : "bg-[#f2f2f2] justify-center items-center"
                      }
                    >
                      <button
                        onClick={handleToggleMode}
                        // onClick={() =>
                        //   toggleMode(darkmode === "dark" ? "light" : "dark")
                        // }
                        className="outline-none border-none"
                      >
                        <Moon
                          style={isDarkMode ? styles.icon : styles.whiteIcon}
                          className={isDarkMode ? "" : "fill-black"}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="xl:flex md:hidden lg:flex hidden">
                    <div
                      style={styles.container}
                      className={classNames("justify-center items-center", {
                        "bg-[#2a2e2e]": isDarkMode,
                        "bg-white": !isDarkMode,
                      })}
                    >
                      <button
                        className={classNames(
                          "bold text-center items-center text-[20px] height-[inherit] outline-none border-none",
                          {
                            "text-white": isDarkMode,
                            "text-[#2a2e2e]": !isDarkMode,
                          }
                        )}
                        onClick={() =>
                          handleLanguageChange(lng === "ar" ? "en" : "ar")
                        }
                      >
                        {lng === "ar" ? "EN" : "AR"}
                      </button>
                    </div>
                  </div>

                  <Link
                    className={classNames(
                      "hidden md:block underline rounded-md px-2 py-2.5 text-[16px] font-medium transitionsm:block",
                      {
                        "text-white": isDarkMode,
                        "text-[#2a2e2e]": !isDarkMode,
                      }
                    )}
                    href="http://localhost:3000/sign-in"
                  >
                    <span>{t("Login")}</span>
                  </Link>
                  <Link
                    className="hidden md:block rounded-md bg-[#bd2130] px-3 py-2.5 text-[16px] font-medium text-white transition hover:bg-[#1e2121] hover:border"
                    href="http://localhost:3000/sign-up"
                  >
                    <span>{t("SignUp")}</span>
                  </Link>
                </div>
              ) : (
                <div className="flex test-white">
                  <div
                    className={
                      lng === "ar"
                        ? "lg:flex items-center justify-center relative rtl"
                        : "lg:flex items-center justify-center relative"
                    }
                  >
                    <form onSubmit={(e) => e.preventDefault()} className="flex">
                      {" "}
                      {/* Prevent form submission */}
                      <input
                        type="text"
                        placeholder={
                          lng === "ar"
                            ? "ابحث عن دورات تدريبية"
                            : "Search Courses"
                        } // Placeholder based on language
                        value={query}
                        onChange={handleInputChange} // Update query and URL
                        className={
                          isDarkMode
                            ? " focus:border-none bg-[#1e2121] rounded pl-3 pr-3 pt-2 pb-2 md:mr-5 md:ml-5 md:pl-7 md:pr-7 text-white"
                            : "focus:border-none rounded pl-3 pr-3 pt-2 pb-2 bg-[#d3d3d399] text-black md:mr-5 md:ml-5 md:pl-7 md:pr-7"
                        }
                      />
                      <button
                        type="submit"
                        className="lg:flex items-center align-center flex justify-center"
                      >
                        {" "}
                        <Search
                          style={isDarkMode ? styles.icon : styles.gryIcon}
                          className={`absolute cursor-pointer;
                               ${
                                 lng === "ar"
                                   ? "mr-2 absolute cursor-pointer right-[70%]"
                                   : "mr-2 absolute cursor-pointer left-[60%]"
                               }`}
                        />{" "}
                      </button>
                    </form>
                    <hr className="hidden lg:block h-[40px] bg-slate-400 w-[0.5px] mr-3 ml-3" />
                  </div>
                  <div className="xl:flex md:hidden lg:flex hidden">
                    <div
                      style={styles.container}
                      className={classNames("justify-center items-center", {
                        "bg-[#2a2e2e]": isDarkMode,
                        "bg-white": !isDarkMode,
                      })}
                    >
                      <button
                        className={classNames(
                          "bold text-center items-center text-[20px] height-[inherit] outline-none border-none",
                          {
                            "text-white": isDarkMode,
                            "text-[#2a2e2e]": !isDarkMode,
                          }
                        )}
                        onClick={() =>
                          handleLanguageChange(lng === "ar" ? "en" : "ar")
                        }
                      >
                        {lng === "ar" ? "EN" : "AR"}
                      </button>
                    </div>
                  </div>
                  <div className="xl:flex md:hidden lg:flex hidden">
                    <div
                      style={styles.container}
                      className={
                        isDarkMode
                          ? "bg-[#2a2e2e] justify-center items-center"
                          : "bg-[#f2f2f2] justify-center items-center"
                      }
                    >
                      <button
                        onClick={handleToggleMode}
                        // onClick={() => {
                        //   // Toggle the mode between 'dark' and 'light'
                        //   const newMode = isDarkMode ? "light" : "dark";
                        //   toggleMode(newMode); // Update the mode via the toggleMode function from useSetup
                        // }}
                        className="outline-none border-none"
                      >
                        <Moon
                          style={isDarkMode ? styles.icon : styles.whiteIcon}
                          className={isDarkMode ? "" : "fill-black"}
                        />
                      </button>
                    </div>
                  </div>
                  <div className=" xl:flex md:hidden lg:flex hidden">
                    <div className="relative flex ">
                      <div
                        style={styles.container}
                        className={
                          isDarkMode
                            ? "bg-[#2a2e2e] justify-center items-center"
                            : "bg-[#f2f2f2] justify-center items-center"
                        }
                      >
                        <Link href="/bookmark">
                          {" "}
                          <Bookmark
                            style={isDarkMode ? styles.icon : styles.whiteIcon}
                            className={isDarkMode ? "" : "fill-black"}
                          />
                        </Link>
                      </div>
                      {booked.length > 0 && (
                        <div className="cartIndex absolute top-1 -mt-3 left-6 bg-[#a5030580] w-6 h-6 flex items-center justify-center text-center rounded-full">
                          <span className="text-white text-[12px]">
                            {booked.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="xl:flex md:hidden lg:flex hidden relative  mr-2">
                    <div style={styles.container}>
                      <ShoppingCart
                        style={isDarkMode ? styles.icon : styles.whiteIcon}
                        className={isDarkMode ? "" : "fill-black"}
                        onClick={() => setOpenCart(!openCart)}
                      />
                    </div>
                    {cart.length > 0 && (
                      <div className="cartIndex absolute top-1 -mt-3 left-6 bg-[#a5030580] w-6 h-6 flex items-center justify-center text-center rounded-full">
                        <span className="text-white text-[12px]">
                          {cart.length}
                        </span>
                      </div>
                    )}
                  </div>

                  <UserButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {openCart && <Cart />}
    </div>
  );
}

export default Header;
