import React, { useState, useEffect } from 'react';
import Loading from '../loader/Loading';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../../config.js';
import ChatDoctorComponent from './chatDoctorComponent.jsx';

const ChatDoctor = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientName, setSelectedPatientName] = useState(null);
  const [selectedPatientPhoto, setSelectedPatientPhoto] = useState(null);
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    if (user) {
      fetchBookings(user._id);
    }
  }, [user]);

  const fetchBookings = async (doctorId) => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/allBookings/${doctorId}`);
      const data = await res.json();
      console.log('dataaa',data);
     
      const uniqueBookings = [];
      const patientIds = new Set();

      data.data.forEach(booking => {
        if (!patientIds.has(booking.user)) {
          uniqueBookings.push(booking);
          patientIds.add(booking.user);
        }
      });

      setBookings(uniqueBookings); 
    } catch (error) {
      console.error(error);
    }
  };

  const handlePatientClick = (patientId, patientName, patientPhoto) => {
    setSelectedPatient(patientId);
    setSelectedPatientName(patientName);
    setSelectedPatientPhoto(patientPhoto)
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-4">Patients</h1>
        <ul>
          {bookings.map((booking) => (
            <li
              key={booking.user}
              className="flex items-center cursor-pointer mb-5"
              onClick={() => handlePatientClick(booking.user, booking.userName, booking.userPhoto)}
            >
              <img src={booking.userPhoto} alt={booking.userName} className="w-15 h-10 rounded-full mr-2" /> 
              <span>{booking.userName}</span> 
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4">
        {selectedPatient ? (
          <ChatDoctorComponent
            doctorId={user._id}
            patientId={selectedPatient}
            patientName={selectedPatientName}
          />
        ) : (
          <p className="text-gray-500">Select a patient to view messages</p>
        )}
      </div>
    </div>
  );
};

export default ChatDoctor;
