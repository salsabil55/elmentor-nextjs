import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

const useSetup = () => {
  const { t } = useTranslation("common");

  // Get saved language and theme from cookies or defaults
  const [lng, setLng] = useState(
    cookies.get("i18next") || i18n.language || "en"
  );
  const [darkmode, setDarkMode] = useState(cookies.get("theme") || "dark");
  const [isChanging, setIsChanging] = useState(false);

  // Handle language direction based on the selected language
  useEffect(() => {
    window.document.dir = i18n.dir(lng);
  }, [lng]);

  // Handle language change and store in cookies
  const handleLanguageChange = (language) => {
    if (lng !== language) {
      setIsChanging(true);
      setLng(language);
      i18n.changeLanguage(language);
      cookies.set("i18next", language, { expires: 365 }); // Store language in cookies for 1 year
      setTimeout(() => {
        setIsChanging(false);
      }, 500);
    }
  };

  useEffect(() => {
    const onLanguageChange = (language) => {
      setLng(language); // Update language state when the language changes
    };

    i18n.on("languageChanged", onLanguageChange);
    return () => {
      i18n.off("languageChanged", onLanguageChange);
    };
  }, []);

  // Handle dark mode toggle and save the preference in cookies
  const toggleMode = (mode) => {
    if (darkmode !== mode) {
      cookies.set("theme", mode, { expires: 365 }); // Store mode in cookies
      setDarkMode(mode); // Update state
      document.documentElement.setAttribute("data-theme", mode);
      window.dispatchEvent(new Event("darkmodeChange"));
    }
  };

  // Initialize theme on page load (when the component mounts)
  useEffect(() => {
    // Apply saved theme on initial load
    const savedTheme = cookies.get("theme");
    if (savedTheme) {
      setDarkMode(savedTheme);
      document.documentElement.setAttribute(
        "data-theme",
        savedTheme === "dark" ? "dark" : "light"
      );
    }
  }, []);

  return {
    lng,
    isChanging,
    darkmode,
    t,
    handleLanguageChange,
    toggleMode,
  };
};

export default useSetup;
