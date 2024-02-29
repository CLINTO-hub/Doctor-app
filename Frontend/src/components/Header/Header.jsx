import React from 'react';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/avatar.jpg';
import { NavLink, Link } from 'react-router-dom';
import {BiMenu} from 'react-icons/bi'
import { TERipple } from 'tw-elements-react';



const navLinks = [
  {
    path: '/Home',
    display: 'Home'
  },
  {
    path: '/Cart',
    display: 'Cart'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
  {
    path: '/Suppliersignup',
    display: 'Become a Seller'
  },
];






function Header() {

  

  return (

    

    <header className='header flex items-center'>
      <div className='container'>
        <div className='flex items-center justify-between'>
        
          <div>
            <img src={logo} alt="Logo" style={{ width: '110px', height: 'auto' }} />
          </div>

          <div className='navigation'>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {navLinks.map((link, index) => (
                <li key={index}>  
                  <NavLink
                    to={link.path}
                    activeClassName="text-blue-600 font-bold"
                    className="text-black-500 text-base leading-7 font-medium hover:text-blue-600"
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mb-3 xl:w-96">
    <input
        type="search"
        className="relative m-0 block w-full min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        id="exampleSearch"
        placeholder="Search"
    />
    
    <button
        className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
        type="button"
        id="button-addon3">
        Search
    </button>
</div>
                        
                        
          

          <div className='flex items-center gap-4'>
            <Link to='/'>
              <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                <img src={userImg} className='w-full rounded-full' alt=""/>
              </figure>
            </Link>

            <Link to='/login'>
              <button className='bg-primaryColor py-2 px-4 text-white font-[600] h-[35px] flex items-center justify-center rounded-[50px]'>Login</button>
            </Link>

           <span >
            <BiMenu className='w-6 h-6 cursor-pointer'/>
           </span>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
