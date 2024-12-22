// 'use client'

import React from 'react'
import Search from './Search'
import Logo from './Logo'

export default function Navbar() {
  // console.log('client component');
  return (
    <header className='sticky top-0 z-50 justify-between flex bg-white shadow-md p-5 items-center text-gray-800'>
      <Logo />
      <Search/>
      <div>
        Login
      </div>
    </header>
  )
}
