import React from "react";

const SkeletonService = () => {
  return (
    <div className="mt-10 p-10 bg-[#1e2121] animate-pulse">
      <div className="mt-3 flex justify-center">
        <div className="h-8 w-[250px] bg-slate-200 rounded"></div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="pt-3 pb-3 w-[60%] border bg-slate-200 rounded pl-4"></div>
        <div className="rounded bg-[#bd2130] h-10 w-[100px] ml-3"></div>
      </div>
      <div className="bg-[#141717] w-full p-5 hover:shadow-md overflow-hidden mb-8 rounded mt-10">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 p-10">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-[#141717] w-full p-5 hover:shadow-md overflow-hidden mb-8 rounded"
            >
              <div className="bg-[#141717] w-[300px] m-auto relative block overflow-hidden rounded-lg shadow-sm shadow-indigo-100">
                <div className="h-56 w-[320px] bg-slate-200"></div>
                <div className="relative bg-[#141717] p-2 border rounded mt-4">
                  <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 w-20 bg-slate-200 rounded mb-2"></div>
                  <div className="h-5 w-28 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonService;
