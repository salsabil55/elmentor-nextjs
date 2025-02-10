import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import SkeletonInfo from "./SkeletonInfo";
function ServiceBanner({ serviceDetail }) {
  const imageUrl = serviceDetail?.attributes?.image?.data?.attributes?.url;
  const pathname = usePathname();
  const firstImg = pathname === "/service_details/1";
  const imageWidth = firstImg ? 480 : 500; // Set a larger size for the first image
  const imageHeight = firstImg ? 430 : 430;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  return (
    <>
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={imageWidth}
          height={imageHeight}
          alt="service Detail Banner"
          className="transition duration-500 group-hover:scale-105 rounded-lg "
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="mb-12"
        />
      ) : (
        <div
          className={`object-cover w-[${imageWidth}px] h-[${imageHeight}px] bg-slate-200 rounded-lg animate-pulse`}
        ></div>
      )}
    </>
  );
}

export default ServiceBanner;
