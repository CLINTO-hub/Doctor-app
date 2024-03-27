import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { authContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

import { NavLink, Link } from 'react-router-dom';
import {BiMenu} from 'react-icons/bi'
import { useRef } from 'react';




const navLinks = [
  {
    path: '/Home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a doctor'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
  {
    path: '/Services',
    display: 'Services'
  },
];






function Header() {

  const headerRef = useRef(null)
  const menuRef = useRef(null) 
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const {user,role,token} = useContext(authContext)
  const {dispatch} = useContext(authContext)
  const navigate = useNavigate();



  const handleLogout = ()=>{
    dispatch({type:'LOGOUT'});
    navigate('/login')
}




  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 80);
    setPrevScrollPos(currentScrollPos);
  };

  const handleStickyHeader = ()=>{
    window.addEventListener("scroll",()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add("sticky__header")

      }else{
        headerRef.current.classList.remove("sticky__header")
      }
    })
  }

  useEffect(()=>{
    handleStickyHeader()

    return()=> window.removeEventListener('scroll',handleStickyHeader)
  })

  const toggleMenu = () => {
    console.log(menuRef.current.classList);
    if (menuRef.current) {
      menuRef.current.classList.toggle("show__menu");
      console.log("After toggling:", menuRef.current.classList);
    } else {
      console.error("menuRef is not properly initialized.");
    }
  }
  
  

  return (

    

    <header className={`header flex items-center ${visible ? '' : 'hidden'}`}>
      <div className='container'>
        <div className='flex items-center justify-between'>
        
          <div>
            <img src={logo} alt="Logo" style={{ width: '110px', height: 'auto' }} />
          </div>
  
          <div className='navigation hidden md:block' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {navLinks.map((link, index) => (
                <li key={index}>  
                  <NavLink
                    to={link.path}
                    activeClassName="text-blue-600 font-bold"
                    className="text-black-500 text-base leading-7 font-medium hover:text-blue-600 whitespace-nowrap"
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

            {
              token && user ? 
              <div className="flex items-center justify-between">
              <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
                <figure className='w-[35px] h-[35px] rounded-full cursor-pointer mr-2'>
                  <img src={user?.photo} className='w-full rounded-full' alt=""/>
                </figure>
              </Link>
              
              <button onClick={handleLogout} className='bg-primaryColor py-1 px-2 text-white text-sm font-[600] rounded-[50px]'>
                Logout
              </button>
            </div>
            :

            <Link to='/login'>
              <button className='bg-primaryColor py-4 px-7 text-white font-[600] h-[35px] flex items-center justify-center rounded-[50px]'>Login</button>
            </Link>
}


            <span className='md:hidden' onClick={toggleMenu}>
            <BiMenu className='w-6 h-6 cursor-pointer'/>
            </span>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
