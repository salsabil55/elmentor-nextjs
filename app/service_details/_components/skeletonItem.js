import React from "react";

const SkeletonItem = () => {
  return (
    // <div className="mt-10 p-10 bg-[#1e2121] animate-pulse">
    //   <div className="bg-[#141717] w-full p-5 hover:shadow-md overflow-hidden mb-8 rounded mt-10">
    // <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 p-10">
    //   <div className="bg-[#141717] w-full p-5 hover:shadow-md overflow-hidden mb-8 rounded">
    <div className="bg-[#141717] w-[260px] sm:w-[320px]  md:w-[280px] lg:w-[320px] animate-pulse m-auto relative block overflow-hidden rounded-lg shadow-sm shadow-indigo-100">
      <div className="h-56 w-[320px] bg-slate-200"></div>
      <div className="relative bg-[#141717] p-2 border rounded mt-4">
        <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
        <div className="h-4 w-20 bg-slate-200 rounded mb-2"></div>
        <div className="h-5 w-28 bg-slate-200 rounded"></div>
      </div>
    </div>
    //   </div>
    // </div>
    //   </div>
    // </div>
  );
};

export default SkeletonItem;
