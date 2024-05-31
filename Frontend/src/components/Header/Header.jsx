import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { MdNotificationsActive } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import MarkUnreadChatAltSharpIcon from '@mui/icons-material/MarkUnreadChatAltSharp';
import logo from '../../assets/images/logo.png';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../../config.js';
import { io } from 'socket.io-client';

const socket = io("https://www.medicare.clintoegeorge.live");

console.log('socket', socket);

const navLinks = [
  { path: '/Home', display: 'Home' },
  { path: '/doctors', display: 'Find a doctor' },
  { path: '/contact', display: 'Contact' },
  { path: '/Services', display: 'Services' },
];

function Header() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, role, token, dispatch } = useContext(authContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  console.log('user', user);

  const handleSearch = () => {
    navigate(`/doctors?query=${searchQuery}`);
  };

  useEffect(() => {
    if (token && user) {
      const socket = io("https://www.medicare.clintoegeorge.live");

      socket.on('connect', () => {
        console.log('Connected to socket.io server');
        socket.emit('join', user);
      });

      const fetchNotifications = async () => {
        try {
          const response = await fetch(`${BASE_URL}/notification/getNotifications/${user._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch notifications');
          }
          const data = await response.json();
          const unseenNotifications = data.result.filter(notification => !notification.is_Seen);
          setNotifications(unseenNotifications);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();

      socket.on('notification', (newNotification) => {
        if (newNotification.doctorId === user._id) {
          setNotifications(prev => [...prev, newNotification]);
        }
      });

      return () => {
        socket.off('notification');
        socket.disconnect();
      };
    }
  }, [token, user]);

  const chatPass = () => {
    navigate(role === 'doctor' ? '/chatDoctor' : '/chat');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 80);
    setPrevScrollPos(currentScrollPos);
  };

  const handleStickyHeader = () => {
    window.addEventListener('scroll', handleScroll);
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('translate-x-0');
      menuRef.current.classList.toggle('translate-x-full');
    } else {
      console.error('menuRef is not properly initialized.');
    }
  };

  const markNotificationsAsSeen = async () => {
    try {
      const response = await fetch(`${BASE_URL}/notification/markAsSeen/${user._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to mark notifications as seen');
      }
      setNotifications([]);
      setDropdownOpen(false);
    } catch (error) {
      console.error('Error marking notifications as seen:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
    setTimeout(() => {
      markNotificationsAsSeen();
    }, 4000);
  };

  return (
    <header className={`header flex items-center ${visible ? '' : 'hidden'}`} ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="Logo" style={{ width: '110px', height: 'auto' }} />
          </div>
          <div className="navigation hidden md:block">
            <ul className="menu flex items-center gap-10">
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
          <div className="hidden md:flex items-center mb-3 xl:w-96">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative m-0 block w-full min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              id="exampleSearch"
              placeholder="Search"
            />
            <button onClick={handleSearch}
              className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              type="button"
              id="button-addon3"
            >
              Search
            </button>
          </div>
          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="flex items-center justify-between">
                <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer mr-2">
                    <img src={user?.photo} className="w-full rounded-full" alt="" />
                  </figure>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-primaryColor py-1 px-2 text-white text-sm font-[600] rounded-[50px]"
                >
                  Logout
                </button>
                <div className="p-5 hover:text-blue-500" onClick={chatPass}>
                  <MarkUnreadChatAltSharpIcon />
                </div>
                {role === 'doctor' && (
                  <div className="relative">
                    <MdNotificationsActive className="w-6 h-6 hover:text-blue-500" onClick={toggleDropdown} />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {notifications.length}
                      </span>
                    )}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-1 w-48 bg-white border-gray-300 rounded shadow-lg">
                        <ul>
                          {notifications.map((notification, index) => (
                            <li key={index} className="p-2 border-b border-gray-200 hover:bg-gray-100 text-sm">
                              {notification.message}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-blue-700 hover:bg-blue-800 py-4 px-7 text-white font-[600] h-[35px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
        <div
          ref={menuRef}
          className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform translate-x-full transition-transform duration-300 md:hidden"
        >
          <ul className="menu flex flex-col p-4">
            <li className="mb-4 flex justify-between items-center">
              <NavLink
                to="/Home"
                activeClassName="text-blue-600 font-bold"
                className="text-black-500 text-base leading-4 font-medium hover:text-blue-600 whitespace-nowrap"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
              <IoClose className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
            </li>
            {navLinks.slice(1).map((link, index) => (
              <li key={index} className="mb-4">
                <NavLink
                  to={link.path}
                  activeClassName="text-blue-600 font-bold"
                  className="text-black-500 text-base leading-4 font-medium hover:text-blue-600 whitespace-nowrap"
                  onClick={toggleMenu}
                >
                  {link.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
