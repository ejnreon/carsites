'use client'
import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { Auction } from '@/types';
import { getData } from '../actions/auctionAction';


export default function Listings() {
  const [auctions,setAuctions] = useState<Auction[]>([]);
  const [pageCount,setPageCount] = useState(0);
  const [pageNumber,setPageNumber] = useState(1);

  useEffect(() => {
    getData(pageNumber).then(data => {
      setAuctions(data.results);
      setPageCount(data.pageCount);
    })
  },[pageNumber])


  if (auctions.length === 0) return <h3>Loading...</h3>

  // const data = await getData();
  return (
    <>
    <div className='grid grid-cols-4 gap-6'>
        {auctions.map((x) => (
            <AuctionCard auction={x} key={x.id}></AuctionCard>
        ))}
    </div>
    <AppPagination currentPage={pageNumber} totalPages={pageCount} pageChanged={setPageNumber}></AppPagination>
    </>
  )
}
