import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../../AuctionForm";
import { FetchWrapper } from "@/lib/FetchWrapper";
import { getDetailedViewData } from "@/app/actions/auctionAction";

export default async function Update({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);
  return (
    <div className="mx-auto  shadow-lg max-w-[75%] p-10 bg-white rounded-lg">
      <Heading
        title="Update your auction"
        subtitle="Please update details of your car"
      />
      <AuctionForm auction={data}></AuctionForm>
    </div>
  );
}
