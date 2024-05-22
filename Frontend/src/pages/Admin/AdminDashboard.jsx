import React, { useState,useContext, useEffect } from 'react';
import { BASE_URL, token } from '../../../config.js';

import useFetchData from '../../hooks/useFetchData.jsx'


import { authContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserMangement.jsx';
import { toast } from 'react-toastify';
import SpecialistManagement from './SpecialistManagement.jsx';
import BookingStatus from './BookingStatus.jsx';
import DashboardManagment from './DashboardManagment.jsx';



const AdminDashboard = () => {
  const {dispatch}=useContext(authContext)
  const [activeTab, setActiveTab] = useState('users');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  const navigate = useNavigate();

console.log('Hi');

  const {data:doctorData,load,err} = useFetchData(`${BASE_URL}/admin/users`,token)

  const {data:BookingData,loader,errr} = useFetchData(`${BASE_URL}/admin/bookings`,token)

  console.log('doctor',doctorData);



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL, token]);

  

  


  const handleLogout=()=>{
    dispatch({type:'LOGOUT'});
    navigate('/Admin/Login')
    
}

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <div className="space-x-4 flex items-center">
          <button
            onClick={() => setActiveTab('users')}
            className={`${
              activeTab === 'users' ? 'bg-gray-500 text-white' : ''
            } px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
            <span role="img" aria-label="Users" className="mr-2">
              👥
            </span>
            Users
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`${
              activeTab === 'doctors' ? 'bg-gray-500 text-white' : ''
            } px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
            <span role="img" aria-label="Doctors" className="mr-2">
              👨‍⚕️
            </span>
            Doctors
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`${
              activeTab === 'bookings' ? 'bg-gray-500 text-white' : ''
            } px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
            <span role="img" aria-label="Bookings" className="mr-2">
              📅
            </span>
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`${
              activeTab === 'analytics' ? 'bg-gray-500 text-white' : ''
            } px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
           <span role="img" aria-label="Analytics" className="mr-2">
           📊
            </span>
          Analytics
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="border-t">
      
        {activeTab === 'doctors' && <SpecialistManagement specialists={doctorData} loading={load} error={err}/>}
        {activeTab === 'bookings' && <BookingStatus bookings={BookingData} />}
        {activeTab === 'analytics' && <DashboardManagment />}
        {activeTab === 'users' && <UserManagement users={userData} loading={loading} error={error}/>}


      </div>
    </div>
  );
};

export default AdminDashboard;