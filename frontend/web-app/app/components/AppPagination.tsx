'use client';
import React, { useState } from 'react'
import { Button, Pagination, PaginationButtonProps } from "flowbite-react";

type Props = {
    currentPage: number,
    totalPages: number,
    pageChanged: (pageNumber: number) => void
}

export default function AppPagination({currentPage,totalPages, pageChanged}:Props) {
    // const [pageNumber, setPageNumber] = useState(currentPage);

    // const onPageChange = (page: number) => setCurrentPage(page);

    return (
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            
            onPageChange={(e)=>{pageChanged(e)}}
            layout='pagination'
            showIcons={true}
            className='text-blue-500 mb-5' />
      </div>
    );
}
