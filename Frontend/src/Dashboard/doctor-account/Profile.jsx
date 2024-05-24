import React, { useEffect, useState } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import uploadImageToCloudinary from '../../../utils/uploadCloudinary'
import { BASE_URL,token } from '../../../config.js'
import { toast } from 'react-toastify'


const Profile = ({doctorData}) => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        bio:'',
        gender:'',
        specialization:'',
        numberofSolts:'',
        ticketPrice:'',
        qualifications:[{startingDate:'', endingDate:'',degree:'',university:''}],
        experiences:[{startingDate:'',endingDate:'',position:'',hospital:''}],
        timeSlots:[],
        about:'',
        photo:null,
        certificate:null

    })


    useEffect(()=>{
        setFormData({name:doctorData?.name,ticketPrice:doctorData?.ticketPrice,email:doctorData?.email,photo:doctorData?.photo,gender:doctorData?.gender,qualifications:doctorData?.qualifications,experiences:doctorData?.experiences,timeSlots:doctorData?.timeSlots,about:doctorData?.about,photo:doctorData?.photo,specialization:doctorData?.specialization,certificate:doctorData?.certificate,numberofSolts:doctorData?.numberofSolts})
    },[doctorData])

    console.log("setFormdata",setFormData);

    const handleInputChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }



    const handleFileInputChange = async event=>{

        const file = event.target.files[0]
        const data =  await uploadImageToCloudinary(file)

        console.log(data);

       setFormData({...formData, photo:data?.url})



    }

    const handlecertificateInputChange = async event=>{

        console.log('uploaddd');

        const file = event.target.files[0]
        const data =  await uploadImageToCloudinary(file)

        console.log(data);

       setFormData({...formData, certificate:data?.url})



    }

    const updateProfileHandler = async(e)=>{
        e.preventDefault() 


        try {

            console.log('formData',formData);

            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
                method:'PUT',
                headers:{
                    "content-type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body: JSON.stringify(formData), 
                
            })

            const result = await res.json()

            if(!res.ok){
                throw Error(result.message)
            }

            toast.success(result.message);
            
        } catch (error) {

            toast.error(error.message)
            
        }
        
        

    }

    const addItem = (key,item)=>{
        setFormData(prevFormData=>({
            ...prevFormData,[key]:[...prevFormData[key],item],
        }))
    }

    const handleReusableInputChangeFunc = (key,index,event)=>{
        const {name,value} = event.target

        setFormData(prevFormData=>{
            const updateItems = [...prevFormData[key]]

            updateItems[index][name] = value

            return {
                ...prevFormData,
                [key]:updateItems,
            }
            
        })

    }


    const deleteItem = (key,index)=>{
        setFormData(prevFormData=>({...prevFormData,[key]:prevFormData[key].filter((_,i)=>i!==index)}))
    }
        

    const addExperience = (e)=>{
        e.preventDefault();

        addItem('experiences',{
            startingDate:'',
            endingDate:'',
            position:'',
            hospital:'',
        }) 
    }


    const handleExperienceChange =(event,index)=>{

        handleReusableInputChangeFunc('experiences',index,event)

}

const deleteExperience = (e,index)=>{
    e.preventDefault()
    deleteItem('experiences',index)
}

const addQualification = (e)=>{
    e.preventDefault();

    addItem('qualifications',{
        startingDate:'',
        endingDate:'',
        degree:'',
        university:'',
    }) 
}


const handleQualificationChange =(event,index)=>{

    handleReusableInputChangeFunc('qualifications',index,event)

}

const deleteQualification = (e,index)=>{
e.preventDefault()
deleteItem('qualifications',index)
}





const addtimeSlots = (e)=>{
    e.preventDefault();

    addItem('timeSlots',{day:'Sunday',startingTime:'',endingTime:''}) 
}


const handletimeSlotsChange =(event,index)=>{

    handleReusableInputChangeFunc('timeSlots',index,event)

}

const deletetimeSlots = (e,index)=>{
e.preventDefault()
deleteItem('timeSlots',index)
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

               <div >
                    <p className='form__label'>Specialization*</p>
                    <select name='specialization' value={formData.specialization} onChange={handleInputChange} className='form__input py-3.5'>
                    <option value=''>Select</option>
                    <option value='surgeon'>Surgeon</option>
                     <option value='neurologist'>Neurologist</option>
                    <option value='dermatologist'>Dermatologist</option>
                    
                    </select>
                </div>

                <div>
                    <p className='form__label'>Ticket Price*</p>
                    <input type='number' placeholder='100' name='ticketPrice' value={formData.ticketPrice} className='form__input' onChange={handleInputChange} />
                </div>

                <div className='mb-5'>
    <p className='form__label'>Qualifications*</p>
    {formData.qualifications?.map((item, index) => (
        <div key={index}>
            <div className='flex gap-5'>
                <div>
                    <p className='form__label'>Starting Date*</p>
                    <input type='date' name='startingDate' value={item.startingDate} className='form__input' onChange={e=>handleQualificationChange(e,index)}/>
                </div>
                <div>
                    <p className='form__label'>Ending Date*</p>
                    <input type='date' name='endingDate' value={item.endingDate} className='form__input' onChange={e=>handleQualificationChange(e,index)}/>
                </div>
            </div>
            
            <div className='flex gap-5'>
                <div>
                    <p className='form__label'>Degree*</p>
                    <input type='text' name='degree' value={item.degree} className='form__input w-full md:w-48 lg:w-64' onChange={e=>handleQualificationChange(e,index)}/>
                </div>
                <div>
                    <p className='form__label'>University*</p>
                    <input type='text' name='university' value={item.university} className='form__input w-full w-48 lg:w-64' onChange={e=>handleQualificationChange(e,index)}/>
                </div>
            </div>

            <button onClick={e=>deleteQualification(e,index)} className='bg-red-600 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete/></button>
            </div>
        
    ))}

    <button onClick={addQualification} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
        Add Qualification
    </button>
</div>   
            </div>
            
        </div>
            
                <div className='mb-5'>
    <p className='form__label'>Experience*</p>
    {formData.experiences?.map((item, index) => (
        <div key={index}>
            <div className='flex gap-5'>
                <div>
                    <p className='form__label'>Starting Date*</p>
                    <input type='date' name='startingDate' value={item.startingDate} className='form__input' onChange={e=>handleExperienceChange(e,index)}/>
                </div>
                <div>
                    <p className='form__label'>Ending Date*</p>
                    <input type='date' name='endingDate' value={item.endingDate} className='form__input' onChange={e=>handleExperienceChange(e,index)}/>
                </div>
            </div>
            
            <div className='flex gap-5'>
                <div>
                    <p className='form__label'>Position*</p>
                    <input type='text' name='position' value={item.position} className='form__input w-full md:w-48 lg:w-64' onChange={e=>handleExperienceChange(e,index)}/>
                </div>
                <div>
                    <p className='form__label'>Hospital*</p>
                    <input type='text' name='hospital' value={item.hospital} className='form__input w-full w-48 lg:w-64' onChange={e=>handleExperienceChange(e,index)}/>
                </div>
            </div>

            <button onClick={e=>deleteExperience(e,index)} className='bg-red-600 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete/></button>
            </div>
        
    ))}

    <button onClick={addExperience} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
        Add Experience
    </button>
</div>


<div className='mb-5'>
                    <p className='form__label'>Number of Slots*</p>
                    <input type='number' placeholder='12' name='Numberofslots'  className='form__input' onChange={handleInputChange} />
                </div>

<div className='mb-5'>
    <p className='form__label'>Timeslots*</p>
    {formData.timeSlots?.map((item, index) => (
        <div key={index}>
            <div className='grid grid-cols-3 gap-5 mb-[30px]'>

            <div>
                    <p className='form__label'>Day*</p>
                    <select name='day' value={formData.day} onChange={e=>handletimeSlotsChange(e,index)} className='form__input py-3.5'>
                    <option value='select'>Select</option>
                     <option value='monday'>Monday</option>
                    <option value='tuesday'>Tuesday</option>
                    <option value='wednesday'>Wednesday</option>
                    <option value='thursday'>Thursday</option>
                    <option value='friday'>Friday</option>
                    <option value='saturday'>Saturday</option>
                    <option value='sunday'>Sunday</option>
                    </select>
                </div>


                <div className='flex gap-5'>
                <div>
                    <p className='form__label'>Starting time*</p>
                    <input type='time' name='startingTime' value={item.startingTime} className='form__input' onChange={e=>handletimeSlotsChange(e,index)}/>
                </div>
                
                <div>
                    <p className='form__label'>Ending time*</p>
                    <input type='time' name='endingTime' value={item.endingTime} className='form__input' onChange={e=>handletimeSlotsChange(e,index)}/>
                    
                </div>

                <button  onClick={e=>deletetimeSlots(e,index)}className='bg-red-600 rounded-full text-white text-[18px] mt-12 mb-[30px] cursor-pointer'><AiOutlineDelete/></button>
                
                
            </div>
            </div>
            
            </div>
        
    ))}

    <button  onClick={addtimeSlots}className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
        
        Add Timeslot
    </button>
</div>

        

<div className='mb-5 flex items-center gap-3'>
              {formData.certificate &&
              <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                <img src={formData.certificate} alt='' className='w-full rounded-full'/>
              </figure>}

              <div className='relative w-[160px] h-[50px]'>
                <input type='file' name='certificate' id='customFile' onChange={handlecertificateInputChange} accept='.jpg, .png' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'/>
                <label htmlFor='customFile' className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate  cursor-pointer'>
                  Upload Certificate
                </label> 
                </div> 
            </div>



<div className='mb-5'>
    <p className='form__label'>About</p>
    <textarea name='about' rows={5} value={formData.about} placeholder='Write about you' onChange={handleInputChange} className='form__input'></textarea>
</div>


            <div className='mb-5 flex items-center gap-3'>
  {formData.photo &&
  <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
    <img src={formData.photo} alt='' className='w-full rounded-full'/>
  </figure>}

  <div className='relative w-[160px] h-[50px]'>
    <input type='file' name='photo' id='photoFile' onChange={handleFileInputChange} accept='.jpg, .png' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'/>
    <label htmlFor='photoFile' className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate  cursor-pointer'>
      Upload Photo
    </label>  
  </div>
</div>

            <div className='mt-7'>
                <button type='submit' onClick={updateProfileHandler} className='bg-irisBlueColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>
                    Update Profile
                </button>
            </div>
                
     </form>
    </div>
  )
              }
              

export default Profile
