import React, { useEffect, useState } from 'react'
import { doctors } from '../../assets/data/doctors'
import DoctorCard from '../../components/doctors/DoctorCard'
import { BASE_URL,token } from '../../../config'
import useFetchData from '../../hooks/useFetchData'
import Loader from '../../components/loader/Loading'
import Error from '../../components/Error/Error'

const Doctor = () => {
  const [query,setQuery] = useState('')
  const [debounceQuery, setdebounceQuery] = useState('')
  const {data:doctors,loading,error} = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`,token)

  console.log('setQueryyyyy',setQuery);



  const handleChange = ()=>{
    setQuery(query.trim())
  }

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setdebounceQuery(query)
    },700)
    return ()=> clearTimeout(timeout)
  },[query])



  return (
    <>
     <section className='bg-[#fff9ea]'>
        <div className='conatiner text-center'>
            <h2 className='heading'>Find a Doctor</h2>
            <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
                <input type='search' className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' placeholder='Search doctor by name or specification' value={query} onChange={e=>setQuery(e.target.value)}/>
                <button onClick={handleChange} className='btn mt-0 rounded-[0px] rounded-r-md'>Search</button>

            </div>
        </div>

     </section>

     <section>
        <div className="container">

        {loading && <Loader/>}
        {error && <Error/>}

       {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {doctors.map((doctor)=><DoctorCard key={doctor.id} doctor={doctor}/>)}
      
    </div>}

        </div>
     </section>


    </>
  )
}

export default Doctor
