import React from 'react';
import heroImg01 from '../assets/images/hero-img01.png';
import heroImg02 from '../assets/images/hero-img02.png';
import heroImg03 from '../assets/images/hero-img03.png';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import featureImg from '../assets/images/feature-img.png';
import vedioIcon from '../assets/images/video-icon.png';
import faqImg from '../assets/images/faq-img.png';
import avatarIcon from '../assets/images/avatar-icon.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import About from '../components/about/About';
import ServiceList from '../components/Services/ServicesList';
import DoctorsList from '../components/doctors/DoctorsList.jsx';
import FaqList from '../components/faq/FaqList.jsx';
import Counter from './Counter.jsx'; 
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate()
  const redirect = async ()=>{
    navigate('/doctors')
  }

  return (
    <>
      <section className='hero__section pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[40px] md:leading-[70px]'>
                  We help patients live a healthy, longer life
                </h1>
                <p className='text_para text-headingColor text-gray-500'>
                  Explore the open road with top-notch car and bike rentals, and capture every moment in stunning detail with our high-quality camera equipment. Elevate your experiences, hassle-free.
                </p>
                <button onClick={redirect} className='btn bg-blue-600 hover:bg-blue-800'>Request an Appointment</button>
              </div>
              <div className="mt-[-30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div className='flex '>
                <div className="flex space-x-8 justify-between  mt-12 lg:mt-05">
                  <div>
                  
                    <Counter target={30} duration={2} />
                    <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-07px]'></span>
                    <p className='text__para'>Years of Experience</p>
                  </div>
                  <div>
                    <Counter target={15} duration={2} />
                    <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-07px]'></span>
                    <p className='text__para'>Clinic Location</p>
                  </div>
                  <div>
                    <Counter target={100} duration={2} />
                    <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-07px]'></span>
                    <p className='text__para'>Patient Satisfaction</p>
                  </div>
                  
                </div>
                </div>
                
              </div>
            </div>
            
            <div className='flex gap-[30px] justify-end'>
              <div>
                <img className='w-full' src={heroImg01} alt='' />
              </div>
              <div className='mt-[30px]'>
                <img src={heroImg02} alt='' className='w-full mb-[30px]' />
                <img src={heroImg03} alt='' className='w-full mb-[30px]' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <About />
      <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>
              Our Medical Services
            </h2>
            <p className='text__para text-center'>
              World-Class care for every patient. Our health system offers unmatched, expert healthcare.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='flex items-center justify-between flex-col lg:flex-row'>
            <div className='xl:w-[670px]'>
              <h2 className='heading'>
                Get Virtual Treatment Anytime
              </h2>
              <ul className='pl-4'>
                <li className='text__para'>
                  1. Schedule the appointment directly
                </li>
                <li className='text__para'>
                  2. Get consultation virtual, because we value your time
                </li>
                <li className='text__para'>
                  3. View our physicians who are accepting new patients. Use the online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to='/'>
                <button className='btn'>Learn more</button>
              </Link>
            </div>
            <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
              <img src={featureImg} className='w-3/4' alt='' />
              <div className='w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]'>
                <div className='flex flex-col gap-[6px] lg:gap-3'>
                  <div className='flex items-center gap-[6px] lg:gap-3'>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]'>
                      Tue, 25
                    </p>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]'>
                      10:00AM
                    </p>
                    <span className='w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px] ml-auto'>
                      <img src={vedioIcon} alt='' />
                    </span>
                  </div>
                  <div className='w-[65px] lg:w-[96px] bg-[#ccf0f3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full'>
                    Consultation
                  </div>
                  <div className='flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]'>
                    <img src={avatarIcon} alt='' />
                    <h4 className='text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor'>
                      Wayne Collins
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>
              Our Great Doctors
            </h2>
            <p className='text__para text-center'>
              World-Class care for every patient. Our health system offers unmatched, expert healthcare.
            </p>
          </div>
          <DoctorsList />
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='flex justify-between gap-[50px] lg:gap-0'>
            <div className='w-1/2 hidden md:block'>
              <img src={faqImg} alt='' />
            </div>
            <div className='w-full md:w-1/2'>
              <h2 className='heading'>
                Most Questions by Our Beloved Patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>What Our Patients Say</h2>
            <p className='text__para text-center'>
              World-class care for everyone. Our health system offers unmatched, expert healthcare.
            </p>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
