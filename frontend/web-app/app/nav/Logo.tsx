"use client";
import React from "react";
import { FaCarCrash } from "react-icons/fa";
import { useParamsStore } from "../hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const path = usePathname();
  function doReset() {
    if (path !== "/") {
      router.push("/");
    }
    reset();
  }
  const reset = useParamsStore((state) => state.reset);
  return (
    <div
      onClick={doReset}
      className="cursor-pointer flex items-center text-3xl font-semibold gap-2"
    >
      <FaCarCrash size={32} />
      <div>Carsties</div>
    </div>
  );
}
