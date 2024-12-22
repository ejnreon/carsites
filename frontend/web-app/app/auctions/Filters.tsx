import { Dropdown } from 'flowbite-react';
import React, { useEffect } from 'react'
import { useParamsStore } from '../hooks/useParamsStore';
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs';
import { GiFinishLine, GiFlame } from 'react-icons/gi';


const PageSizeFilter = [4,8,12];
const OrderButtons = [
  {
    label: "Alfabetycznie",
    icon: AiOutlineSortAscending,
    value: "make"
  },
  {
    label: "Data zakończenia",
    icon: AiOutlineClockCircle,
    value: "endingsoon"
  },
  {
    label: "Ostatnio dodane",
    icon: BsFillStopCircleFill,
    value: "new"
  }
]
const FilterButtons = [
  {
    label: "Trwające",
    icon: GiFlame,
    value: "live"
  },
  {
    label: "Koniec za 6 godzin",
    icon: GiFinishLine,
    value: "endingSoon"
  },
  {
    label: "Zakończone",
    icon: BsStopwatchFill ,
    value: "finished"
  }
]

export default function Filters() {

  const pageSize = useParamsStore(state => state.pageSize);
  const setParams = useParamsStore(state => state.setParams);
  const orderBy = useParamsStore(state => state.orderBy);
  const filterBy = useParamsStore(state => state.filterBy);

  return (
    <div className='flex justify-between items-center mb-4'>
      <div className='inline-flex'>
      <span className='uppercase mr-2 inline'>Filtruj:</span>
      <Dropdown label={FilterButtons.find(x=>x.value===filterBy)?.label} inline>
            {FilterButtons.map(({label,icon,value}) => (
                // <Dropdown.Item key={i} onClick={() => setPageSize(value)}>{value}</Dropdown.Item>
                <Dropdown.Item key={value} icon={icon} onClick={() => setParams(
                  {filterBy:value})
                }>{label}</Dropdown.Item>
            ))}
        </Dropdown>
      </div>
      <div className='inline-flex'>
      <span className='uppercase mr-2 inline'>Sortuj:</span>
      <Dropdown label={OrderButtons.find(x=>x.value===orderBy)?.label} inline>
            {OrderButtons.map(({label,icon,value}) => (
                // <Dropdown.Item key={i} onClick={() => setPageSize(value)}>{value}</Dropdown.Item>
                <Dropdown.Item key={value} icon={icon} onClick={() => setParams(
                  {orderBy:value})
                }>{label}</Dropdown.Item>
            ))}
        </Dropdown>
      </div>
      <div className='inline-flex'>
        <span className='uppercase mr-2'>Page size:</span>
   
        <Dropdown label={pageSize} inline style={{borderColor:'gray',border:'2px solid'}}>
            {PageSizeFilter.map((value,i) => (
                // <Dropdown.Item key={i} onClick={() => setPageSize(value)}>{value}</Dropdown.Item>
                <Dropdown.Item key={i} onClick={() => setParams({pageSize:value})}>{value}</Dropdown.Item>
            ))}
        </Dropdown>
        </div>
  </div>
  )
}
