import React from "react";
import ReactPlayer from "react-player";

export default function Test() {
  return (
    <div className="grid grid-cols-11 grid-rows-[auto_1fr_auto] gap-2">
      <div className=" bg-amber-500 col-span-11 h-[10vh]" >title</div>
      <div className=" bg-amber-700 col-span-7 aspect-video ">content</div>
      <div className=" bg-amber-300 col-span-2 row-span-2">chat</div>
      <div className=" col-span-2 flex flex-col gap-2">
        <div className="h-[20vh] bg-blue-500 ">1</div>
        <div className="h-[20vh] bg-blue-500 ">2</div>
      </div>
    </div>
  );
}
