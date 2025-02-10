import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative opacity-90 lg:opacity-77 bg-[url(https://res.cloudinary.com/dahptqhed/image/upload/v1729084961/bg_mentor3_7d7964bde7.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-80 bg-black/40 lg:bg-black/77 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center flex ltr:sm:text-center rtl:sm:text-right relative">
          {/* <div className="absolute w-36 h-40 shadow-lg shadow-[#001c25] bg-red-700 top-0 right-0 -left-36 rounded border-b-4 text-white flex  justify-end items-center ">
            <p className="transform  rotate-90 text-[18px] -mr-8 cursor-pointer">
              Subscribe Now
            </p> */}
          {/* <Link
              href="http://localhost:3000/sign-in"
              className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Get Started
            </Link> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;
