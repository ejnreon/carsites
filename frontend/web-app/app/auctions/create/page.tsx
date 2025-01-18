import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../AuctionForm";

export default function Create() {
  return (
    <div className="mx-auto mx-w-[75%] shadow-lg bg-white rounded-lg">
      <Heading
        title="Sell your car!"
        subtitle="Please enter the datails of your car"
      ></Heading>
      <AuctionForm />
    </div>
  );
}
