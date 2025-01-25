import React from "react";
import { FaReact } from "react-icons/fa";
export default function Footer() {
  return (
    <>
    <footer className=" text-xs md:text-lg absolute bottom-0 w-full flex justify-between px-8 border backdrop-blur-[2px] ">
      <div>Master</div>
      <div className="flex">
        <li className="flex list-none px-2 items-center justify-center" >Ln 9,Col 51</li>
        <li className="flex list-none px-2 items-center justify-center" >Spaces: 2</li>
        <li className="flex list-none px-2 items-center justify-center" >UTF <span>-8</span></li>
        <li className="flex list-none px-2 items-center justify-center gap-1" > <FaReact className="text-sky-600"/>React</li>
      </div>
    </footer>
    </>
  );
}
