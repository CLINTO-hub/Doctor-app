// About.jsx
import React from 'react';
import aboutImg from '../../assets/images/about.png';
import aboutCarding from '../../assets/images/about-card.png';
import { Link } from 'react-router-dom';

function About() {
  return (
    <section>
      <div className='container'>
        <div className='flex flex-col lg:flex-row-reverse gap-[50px] lg:gap-[130px] items-center'>
          <div className='w-full lg:w-1/2 xl:w-[770px]'>
            <h2 className='heading text-center lg:text-left'>
              Proud to be one of the nation's best
            </h2>
            <p className='text__para text-center lg:text-left'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt reiciendis nostrum error excepturi, rem ducimus iste corporis quaerat minima obcaecati at commodi accusamus qui tenetur quis aut harum, dolor aliquam.
            </p>
            <p className='text__para mt-4 text-center lg:text-left'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt reiciendis nostrum error excepturi, rem ducimus iste corporis quaerat minima obcaecati at commodi accusamus qui tenetur quis aut harum, dolor aliquam.
            </p>
            <Link to='/'>
              <button className='btn mt-4 mx-auto lg:mx-0 lg:mt-6 block'>Learn More</button>
            </Link>
          </div>
          <div className='relative w-full lg:w-1/2'>
            <img src={aboutImg} alt='' className='w-full' />
            <div className='absolute bottom-0 right-0 mb-4 mr-4 md:mb-0 md:mr-0 lg:mr-4 lg:mb-10'>
              <img src={aboutCarding} alt='' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
