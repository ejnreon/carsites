import { getDetailedViewData } from "@/app/actions/auctionAction";
import Heading from "@/app/components/Heading";
import React from "react";
import CountDownTimer from "../../CountDownTimer";
import CarImage from "../../CarImage";
import Head from "next/head";
import DetailedSpecs from "./DetailedSpecs";
import { getCurrentUser } from "@/app/actions/AuthActions";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

// type Params = {
//     id: string
// }

export default async function Details({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);
  const user = await getCurrentUser();
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Heading title={`${data.make} ${data.model}`} subtitle=""></Heading>
          {user?.username === data.seller && (
            <>
              <EditButton id={data.id}></EditButton>
              <DeleteButton id={data.id}></DeleteButton>
            </>
          )}
        </div>
        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time remaining:</h3>
          <CountDownTimer auctionEnd={data.auctionEnd}></CountDownTimer>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-6 mt-3">
        <div className="w-full bg-gray-200 relative aspect-[4/3] rounded-lg overflow-hidden">
          <CarImage auction={data}></CarImage>
        </div>
        <div className="border-2 rounded-lg p-2 bg-gray-100">
          <Heading title="Bids" subtitle=""></Heading>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={data}></DetailedSpecs>
      </div>
    </div>
  );
}
