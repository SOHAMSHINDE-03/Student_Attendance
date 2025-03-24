import React from 'react'

function Card({icon,title,value}) {
  return (
    <div className='flex items-center gap-5 p-5 bg-gray-950 rounded-xl shadow-red-900 shadow-sm'>
        <div className='p-2 h-[10 w-10 rounded-full text-primary bg-gray-900 ]'>
            {icon}
        </div>
        <div>
            <h2 className='font-bold'>{title }</h2>
            <h2 className='text-lg'>{value}</h2>
        </div>
    </div>
  )
}

export default Card