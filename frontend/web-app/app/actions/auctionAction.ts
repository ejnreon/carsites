import { Auction, PagedResults } from "@/types";

export async function getData(query:string): Promise<PagedResults<Auction>> {
    const res = await fetch(`http://localhost:6001/search${query}`);
    if (!res.ok) throw new Error();
    return res.json() 
}

// export async function getData(pageNumber:number,pageSize:number): Promise<PagedResults<Auction>> {
//     const res = await fetch(`http://localhost:6001/search?pageSize=${pageSize}&pageNumber=${pageNumber}`);
//     if (!res.ok) throw new Error();
//     return res.json() 
// }
