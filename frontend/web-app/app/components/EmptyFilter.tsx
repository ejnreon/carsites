import React, { useSyncExternalStore } from 'react'
import { useParamsStore } from '../hooks/useParamsStore'
import Heading from './Heading';
import { Button } from 'flowbite-react';

type Props = {
    title?: string,
    subtitle?: string,
    showResetButton?: boolean
}


export default function EmptyFilter({
    title = "No matches for this filter",
    subtitle = "try changin or reset the filter",
    showResetButton
}:Props) {
    const reset = useParamsStore(state => state.reset);
  return (
    <div className='h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg'>
        <Heading title={title} subtitle={subtitle} center></Heading>
        <div className='mt-4'>
            {showResetButton? <Button outline onClick={() => reset()}>Remove filter</Button>:<></>}
        </div>
    </div>

  )
}
