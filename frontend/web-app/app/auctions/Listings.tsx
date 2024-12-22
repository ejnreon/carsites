'use client'
import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { Auction, PagedResults } from '@/types';
import { getData } from '../actions/auctionAction';
import Filters from './Filters';
import { useParamsStore } from '../hooks/useParamsStore';
import { useShallow } from 'zustand/shallow';
import qs from 'query-string';
import EmptyFilter from '../components/EmptyFilter';


export default function Listings() {
  const [data,setData] = useState<PagedResults<Auction>>();
  const params = useParamsStore(useShallow(state=>({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    pageCount: state.pageCount,
    orderBy: state.orderBy,
    filterBy: state.filterBy
  })));
  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({url:'',query:params})

  function setPageNumber(pageNumber:number) {
    setParams({pageNumber})
    // setParams({pageNumber:pageNumber})
  }


    // const [auctions,setAuctions] = useState<Auction[]>([]);
    // const [pageCount,setPageCount] = useState(0);
    // const [pageNumber,setPageNumber] = useState(1);
    // const [pageSize,setPageSize] = useState(4);

  useEffect(() => {
    getData(url).then(data => {
      setData(data);
      // setParams({pageCount:data.pageCount});
      // setAuctions(data.results);
      // setPageCount(data.pageCount);
    })
  },[url])

  // },[pageNumber,pageSize])


  // if (auctions.length === 0) return <h3>Loading...</h3>
  if (!data) return <h3>Loading...</h3>

  // if (data.totalCount === 0) return(
  //   <EmptyFilter showResetButton></EmptyFilter>
  // )

  // const data = await getData();
  return (
    <>
    <Filters/>
    {/* <Filters pageSize={pageSize} setPageSize={setPageSize} /> */}
    {data.totalCount === 0 ?
     (
    <EmptyFilter showResetButton></EmptyFilter>
    ) : (
    
    <div className='grid grid-cols-4 gap-6 mb-5'>
        {data.results.map((x) => (
            <AuctionCard auction={x} key={x.id}></AuctionCard>
        ))}
    </div>
    )

}
    <AppPagination
      currentPage={params.pageNumber}
      totalPages={data.pageCount}
      pageChanged={setPageNumber}></AppPagination>
    </>
  )
}
