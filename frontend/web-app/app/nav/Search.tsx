"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useParamsStore } from "../hooks/useParamsStore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchTerm = useParamsStore((state) => state.searchTerm);
  const setParams = useParamsStore((state) => state.setParams);
  const value = useParamsStore((state) => state.searchValue);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  // const [value,setValue] = useState('')

  function search() {
    if (pathname !== "./") router.push("/");
    setParams({ searchTerm: value });
  }

  function setValue(e: any) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="flex items-center w-[50%] border-2 rounded-full py-2 shadow-sm">
      <input
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        value={value}
        className="
        bg-transparent
        flex-grow
        pl-5
        focus:outline-none
        border-transparent
        focus:border-transparent
        focus:ring-0
        text-sm
        text-gray-600
        "
        // onChange={(e) => {setParams({searchValue:e.target.value})}}
        onChange={setValue}
        placeholder="Search for a car by make,model"
        // onChange={(e) => {setParams({searchTerm:e.target.value})}}
      ></input>
      <button>
        <FaSearch
          size={34}
          className="bg-orange-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
}
