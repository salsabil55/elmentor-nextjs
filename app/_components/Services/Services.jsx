"use client";
import React, { useEffect, useState } from "react";
import ServicesList from "./ServicesList";
// import servicesApi from "@/app/_Utils/servicesApi";
import servicesApi from "../../_Utils/servicesApi";
import i18n from "../../i18n";
import cookies from "js-cookie";

function Services() {
  const [serviceList, setServiceList] = useState([]);
  const [translate, setTranslate] = useState(false);
  const lng = cookies.get("i18next") || "en";

  // const [loading, setLoading] = useState(true);

  // Fetch the product when the component mounts

  useEffect(() => {
    getService();
  }, [lng]);
  // Define the function to get the product data
  const getService = async () => {
    const lng = cookies.get("i18next") || "en";

    try {
      // Await the API call to get the latest services

      const response = await servicesApi.getLatestServices();
      const data = response.data;
      const service = data.slice(0, 3);
      setServiceList(service);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return <ServicesList serviceList={serviceList} />;
}

export default Services;
