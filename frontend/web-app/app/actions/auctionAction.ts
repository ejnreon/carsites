import { Auction, PagedResults } from "@/types";

export async function getData(pageNumber:number): Promise<PagedResults<Auction>> {
    const res = await fetch(`http://localhost:6001/search?pageSize=4&pageNumber=${pageNumber}`);
    if (!res.ok) throw new Error();
    return res.json() 
}
