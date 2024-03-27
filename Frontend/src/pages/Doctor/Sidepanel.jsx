import React from 'react'

const Sidepanel = () => {
  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md h-80'>
        <div className='flex items-center justify-between'>
            <p className='text__para mt-0 font-semibold'>Ticket Price</p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                500 BDT
            </span>
        </div>

        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-semibold text-headingColor'>
                Available Time Slots
            </p>
            <ul className='mt-3'>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semiblod'>
                        Sunday
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semiblod'>
                        04:30 pm - 09:30 pm
                    </p>
                </li>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semiblod'>
                        Monday
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semiblod'>
                        04:30 pm - 09:30 pm
                    </p>
                </li>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semiblod'>
                        Wendnesday
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semiblod'>
                        04:30 pm - 09:30 pm
                    </p>
                </li>
            </ul>
            
        </div>
        <button className='btn px-2 w-full rounded-md'>Book appointment</button>
    </div>
  )
}

export default Sidepanel
