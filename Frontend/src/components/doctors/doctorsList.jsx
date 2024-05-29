import React from 'react'
import DoctorCard from './DoctorCard'
import { BASE_URL } from '../../../config'
import useFetchData from '../../hooks/useFetchData'
import Loader from '../loader/Loading'
import Error from '../Error/Error'


const DoctorsList = () => {


  const {data:doctors,loading,error} = useFetchData(`${BASE_URL}/doctors`)

console.log('base',BASE_URL);

   


  return (
    <>

    {loading && <Loader/>}
    {error && <Error/>}
    {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
        {doctors.map((doctor)=><DoctorCard key={doctor._id} doctor={doctor}/>)}
      
    </div>}
    </>
  )
}

export default DoctorsList
