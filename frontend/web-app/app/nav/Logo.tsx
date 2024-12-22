'use client'
import React from 'react'
import { FaCarCrash } from 'react-icons/fa'
import { useParamsStore } from '../hooks/useParamsStore'

export default function Logo() {
    const reset = useParamsStore(state => state.reset)
  return (
    <div onClick={reset} className='cursor-pointer flex items-center text-3xl font-semibold gap-2'>
            <FaCarCrash size={32} />
            <div>Carsties</div>
        </div>
  )
}
