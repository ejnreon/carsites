'use client'
import React, { useState } from 'react'
import { Auction } from '@/types'
import Image from 'next/image'

type Props = {
    auction : Auction
}

export default function CarImage({auction}: Props) {
    const [isLoading,setLoading] = useState(true);
  return (
    <Image
    src={auction.imageUrl}
    onLoad={() => setLoading(false)}
    alt={`Image of ${auction.make} ${auction.model} `}
    fill 
    priority
    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
    className={`
        object-cover group-hover:opacity-75 duration-700 ease-in-out
        ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-none scale-100'}
        `} >
    </Image>
  )
}
