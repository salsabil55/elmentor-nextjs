import React from "react";

function SkeletonInfo() {
  return (
    <>
      {/* <div className=" w-[600px] h-[450px] bg-slate-200 rounded-lg animate-pulse"></div> */}
      <div className="flex flex-col gap-5">
        <div
          className="h-[20px]
		w-[400px] bg-slate-200
		animate-pulse"
        ></div>
        <div
          className="h-[20px]
		w-[70px] bg-slate-200
		animate-pulse"
        ></div>
        <div
          className="h-[20px]
		w-[400px] bg-slate-200
		animate-pulse"
        ></div>
        <div
          className="h-[20px]
		w-[400px] bg-slate-200
		animate-pulse"
        ></div>
        <div
          className="h-[20px]
		w-[400px] bg-slate-200
		animate-pulse"
        ></div>
        <div
          className="h-[20px]
		w-[100px] bg-slate-200
		animate-pulse"
        ></div>
      </div>
    </>
  );
}

export default SkeletonInfo;
