import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify'



const useFetchData = (url,authToken) => {

 

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    useEffect(()=>{

    const fetchData= async ()=>{
        setLoading(true)
       try {
       
            const res = await fetch(url,{
                headers:{Authorization: `Bearer ${authToken}`}
            });

            const result = await res.json()
            console.log(result);

         

            if(!res.ok){
                return toast.error(result.message)
            }
            setData(result.data)
            setLoading(false)
        
        
       } catch(error) {

        setLoading(false)
        setError(error.message)
        console.log(error.message);

        
       }
    }
       fetchData()
    },[url,authToken])

    console.log("SetData",setData);

  return{
    data, loading, error
    
  }
}

export default useFetchData
