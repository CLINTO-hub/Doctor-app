import Error from "../../components/Error/Error"
import Loader from '../../components/loader/Loading'
import useFetchData from "../../hooks/useFetchData"
import { BASE_URL,token } from "../../../config"
import Tabs from "./Tabs"
import { useState } from "react"
import DoctorAbout from '../../pages/Doctor/DoctorAbout.jsx'
import Profile from "./Profile.jsx"



const Dashboard = () => {
  const {data,loading,error} = useFetchData(`${BASE_URL}/doctors/profile/me`,token)

  const[tab,setTab] = useState('overview')
  return (
   <section>
    <div className="max-w-[1170px] px-5 mx-auto">

      {loading && !error && <Loader/>}
     
      {error && !loading && <Error/>}

      {
        !loading && !error &&(
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">

            <Tabs tab={tab} setTab={setTab}/>
            <div className="lg:col-span-2">

              {data.isApproved === 'pending' &&(
                <div className="flex p-4 mb-4 text-yellow-600 bg-yellow-50 rounded-lg">
                  Your profile is under reviewing! Wait for the approval.
            
                  </div>
              )}

              <div className="mt-8">

                {tab==='overview'  && <div>
                  
                  <div className="flex items-center gap-4 mb-10">
                    <figure className="max-w-[200px] max-h-[200px]">
                      <img src={data?.photo} alt="" className="w-full"/>
                    </figure>
                    <div>
                      <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">Surgeon</span>
                     <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">{data?.name}</h3>
                     <p className="text__para font-[15px] lg:max-w-[390px] leading-6">doctor bio</p>
                     
                      </div>
                     </div>


                  <DoctorAbout name={data.name} about={data.about} qualifications={data.qualifications} experiences={data.experiences}  />
                  
                  </div>}
                {tab==='appointments'  && <div>appointments</div>}
                {tab==='settings'  && <Profile/>}

                </div>

              </div>


            </div>
        )
      }
    </div>
   </section>
  )
}

export default Dashboard
