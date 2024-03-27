import React, { useState } from 'react'

const Profile = () => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        bio:'',
        gender:'',
        ticketPrice:0,
        qualifications:[{startingDate:'', endingDate:''}],
        experiences:[],
        timeSlots:[]

    })

    const handleInputChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }
  return (
    <div>
     <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>Profile Infromation</h2> 
     <form>
        <div className='mb-5'>
            <p className='form_label'>
                Name*
            </p>
            <input type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder='Full Name' className='form__input '/>
            

        </div>
        <div className='mb-5'>
            <p className='form_label'>
                Email*
            </p>
            <input type='text' name='email' value={formData.email} onChange={handleInputChange} placeholder='Email Address' className='form__input' readOnly aria-readonly disabled='true'/>

        </div>
        <div className='mb-5'>
            <p className='form_label'>
                Phone*
            </p>
            <input type='text' name='phone' value={formData.phone} onChange={handleInputChange} placeholder='Phone Number' className='form__input'/>

        </div>
        <div className='mb-5'>
            <p className='form_label'>
                Bio*
            </p>
            <input type='text' name='bio' value={formData.bio} onChange={handleInputChange} placeholder='Bio' className='form__input'/>

        </div>

        <div className='mb-5'>
            <div className='grid grid-cols-3 gap-5 mb-[30px]'>
                <div>
                    <p className='form__label'>Gender*</p>
                    <select name='gender' value={formData.gender} onChange={handleInputChange} className='form__input py-3.5'>
                    <option value=''>Select Option</option>
                     <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Others</option>
                    </select>
                </div>

                <div>
                    <p className='form__label'>Specialization*</p>
                    <select name='gender' value={formData.specialization} onChange={handleInputChange} className='form__input py-3.5'>
                    <option value=''>Select</option>
                    <option value='surgeon'>Surgeon</option>
                     <option value='neurologist'>Neurologist</option>
                    <option value='dermatologist'>Dermatologist</option>
                    
                    </select>
                </div>

                <div>
                    <p className='form__label'>Ticket Price*</p>
                    <input type='number' placeholder='100' name='ticketPrice' value={formData.ticketPrice} className='form__input'/>
                </div>

                <div className='mb-5'>
                    <p className='form__label'>Qualifications*</p>
                    {formData.qualifications?.map((item,index)=>(
                        <div key={index} className='flex gap-5'>
                           
                           <div>
                                <p className='form__label'>Starting Date*</p>
                                <input type='date' name='startingDate' value={item.startingDate} className='form__input'/>
                                </div>

                            <div>
                                <p className='form__label'>Ending Date*</p>
                                <input type='date' name='startingDate' value={item.endingDate} className='form__input'/>
                                </div>
                            
                            </div>  
                            ))}
                    
                </div>
                
            </div>
            
        </div>
     </form>
    </div>
  )
}

export default Profile
