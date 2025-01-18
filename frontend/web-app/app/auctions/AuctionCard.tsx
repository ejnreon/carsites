import React from "react";
import CountDownTimer from "./CountDownTimer";
import CarImage from "./CarImage";
import { Auction } from "@/types";
import Link from "next/link";

type Props = {
  auction: Auction;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="group">
      <div className="relative w-full bg-gray-200 aspect-video rounded-lg overflow-hidden">
        <CarImage auction={auction}></CarImage>

        <div className="absolute bottom-2 left-2">
          <CountDownTimer auctionEnd={auction.auctionEnd}></CountDownTimer>
        </div>
        <div className="absolute float-right bottom-2 right-2">
          <span className="border-2 bg-gray-700 border-white text-white py-1 px-2 rounded-lg flex justify-center ">
            {" "}
            {auction.reservePrice}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {auction.make} {auction.model}
        </h3>
        <p className="font-semibold text-sm">{auction.year}</p>
        <p className="font-semibold text-sm">
          {new Date(auction.auctionEnd).toDateString()}
        </p>
      </div>
    </Link>
  );
}
