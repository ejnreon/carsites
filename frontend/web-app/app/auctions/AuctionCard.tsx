import React from 'react'
import CountDownTimer from './CountDownTimer'
import CarImage from './CarImage'
import { Auction } from '@/types'

type Props = {
    auction: Auction
}


export default function AuctionCard({auction} : Props) {
    
  return (
    <a href='#' className='group'>
        <div className='relative w-full bg-gray-200 aspect-video rounded-lg overflow-hidden'>
                <CarImage auction={auction}></CarImage>
                <div className='absolute bottom-2 left-2
                '>
                <CountDownTimer auctionEnd={auction.auctionEnd}></CountDownTimer>
                </div>
        </div>
        <div className='flex justify-between items-center mt-4'>
            <h3 className='text-gray-700'>{auction.make} {auction.model}</h3>
            <p className='font-semibold text-sm'>{auction.year}</p>
            <p className='font-semibold text-sm'>{new Date(auction.auctionEnd).toDateString()}</p>
        </div>
        
        </a>
  )
}
