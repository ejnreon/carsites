// 'use client'

import React from 'react'
import { FaCarCrash } from 'react-icons/fa'

export default function Navbar() {
  // console.log('client component');
  return (
    <header className='sticky top-0 z-50 justify-between flex bg-white shadow-md p-5 items-center text-gray-800'>
      <div className='flex items-center text-3xl font-semibold gap-2'>
        <FaCarCrash size={32} />
        <div>Carsties</div>
      </div>
      <div>
        Search
      </div>
      <div>
        Login
      </div>
    </header>
  )
}
