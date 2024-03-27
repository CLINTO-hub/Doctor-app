import React from 'react'
import { formateDate } from '../../../utils/formateDate'

const DoctorAbout = ({name,about,qualifications,experiences}) => {
  return (
    <div>
      <div>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
          About of
          <span className='text-irisBlueColor fonnt-bold text-[24px] leading-9'>
           {name}
          </span>
        </h3>
        <p className="text__para">
          {about? about : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate laborum, ex explicabo minima est possimus rem illo fuga odit error corporis minus alias porro eaque nobis distinctio necessitatibus libero reiciendis!'}
        </p>
      </div>

      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
          Education
        </h3>

      <ul className='pt-4 md:p-5'>
        <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
          <div>
            <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formateDate('12-04-2010')}</span>
            <p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgeon</p>
          </div>
          <p className='text-[14px] leading-5 font-medium text-textColor'>
            New Apollo Hospital, New York
          </p>
         </li>
        </ul>
      </div>

      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
          Experience
        </h3>
        <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
          <li className='p-4 rounded bg-[#fff9ea]'>
            <span className='text-yellow-700 text-center text-[15px] leading-6 font-semibold'>
              {formateDate('07-04-2010')} - {formateDate('08-13-2014')}
            </span>
            <p className='text-[15px] leading-6 font-medium text-textColor'>Sr.Surgeon</p>
            <p className='text-[14px] leading-5 font-medium text-textColor'>
            New Apollo Hospital, New York
          </p>
          </li>
          <li className='p-4 rounded bg-[#fff9ea]'>
            <span className='text-yellow-700 text-center text-[15px] leading-6 font-semibold'>
              {formateDate('07-04-2010')} - {formateDate('08-13-2014')}
            </span>
            <p className='text-[15px] leading-6 font-medium text-textColor'>Sr.Surgeon</p>
            <p className='text-[14px] leading-5 font-medium text-textColor'>
            New Apollo Hospital, New York
          </p>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default DoctorAbout
