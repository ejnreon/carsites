"use server";
import { auth } from "@/auth";
import { FetchWrapper } from "@/lib/FetchWrapper";
import { Auction, PagedResults } from "@/types";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PagedResults<Auction>> {
  return await FetchWrapper.get(`search${query}`);
  // const res = await fetch(`http://localhost:6001/search${query}`);
  // if (!res.ok) throw new Error();
  // return res.json();
}

// export async function getData(pageNumber:number,pageSize:number): Promise<PagedResults<Auction>> {
//     const res = await fetch(`http://localhost:6001/search?pageSize=${pageSize}&pageNumber=${pageNumber}`);
//     if (!res.ok) throw new Error();
//     return res.json()
// }

export async function updateAuctionTest() {
  const data = {
    millage: Math.floor(Math.random() * 1000) + 1,
  };

  return await FetchWrapper.put(
    "auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
    data,
  );
  // const session = await auth();
  // const res = await fetch(
  //   "http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
  //   {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + session?.user.access_token,
  //     },
  //     body: JSON.stringify(data),
  //   },
  // );

  // if (!res.ok) return { status: res.status, message: res.statusText };
  // return res.statusText;
}

export async function createAuction(data: FieldValues) {
  return await FetchWrapper.post("auctions", data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
  return await FetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
  const res = await FetchWrapper.put(`auctions/${id}`, data);
  revalidatePath(`/auctions/${id}`); //czysci cashe
  return res;
}

export async function deleteAuction(id: string) {
  const res = await FetchWrapper.del(`auctions/${id}`);
  revalidatePath(`/auctions/${id}`);
  return res;
}
