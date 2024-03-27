import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../config.js'
import { toast } from 'react-toastify'
import {authContext} from '../../context/AuthContext.jsx'
import HashLoader from 'react-spinners/HashLoader.js'

const AdminLogin = () => {

  const [formData,setFormData] = useState({
    email:'',
    password:''
  })

  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {dispatch} = useContext(authContext)

  const handleInputChange = e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }





  const submitHandler = async(event)=>{
    event.preventDefault();
    setLoading(true)


    try {
      const res = await fetch(`${BASE_URL}/admins/Admin/Login`,{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const result = await res.json()

      if(!res.ok){
        throw new Error(result.message)
      }

      dispatch({
        type:'LOGIN_SUCCESS',
        payload:{
          user: result.data,
          token:result.token,
          role:result.role,
        }
      })

      setLoading(false)
      toast.success(result.message)
      navigate('/Admin/Dashboard')

      
    } catch (error) {

      toast.error(error.message)
      setLoading(false)
      console.log(error);
      
    }

  }
  return (
    <section className='px-5 lg:px-0 mt-24'>
    <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
      <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
        <span className='text-primaryColor '>Admin</span> Login
      </h3>
      
      <form className='py-4 md:py-0'>
        <div className='mb-5'>
          <input type='email' placeholder='Enter your Email' name='email' value={formData.email} onChange={handleInputChange}
          className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
          required
          />
        </div>
        <div className='mb-5'>
          <input type='password' placeholder='Password' name='password' value={formData.password}  onChange={handleInputChange}
          className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
          required
          />
        </div>
        <div className='mt-7'>
          <button onClick={submitHandler} type='sumbit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
          {loading?<HashLoader size={25} color='#fff'/>:'Login'}
          </button>
        </div>

      
      </form>

    </div>
  </section>
  )
}

export default AdminLogin
