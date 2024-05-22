import React, { useState } from 'react';
import Loading from '../loader/Loading';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL, token } from '../../../config.js';
import ChatComponent from './chatComponet.jsx';

const Chat = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`, token);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patientId, setPatientId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setPatientId(user._id);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-4">Doctors</h1>
        {loading && !error && <Loading />}
        {error && !loading && <p>Error: {error}</p>}
        {!loading && !error && (
          <ul>
            {appointments.map((appointment) => (
              <li
                key={appointment._id}
                className={`flex items-center cursor-pointer mb-5 ${
                  selectedAppointment && selectedAppointment._id === appointment._id ? 'bg-blue-200' : ''
                }`}
                onClick={() => handleAppointmentClick(appointment)}
              >
                <img src={appointment.photo} alt={appointment.name} className="w-10 h-10 rounded-full mr-2" /> 
                <span>{appointment.name}</span> 
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && appointments.length === 0 && (
          <p className="text-gray-500">No appointments yet!</p>
        )}
      </div>
      <div className="w-3/4 p-4">
        {selectedAppointment && <ChatComponent appointment={selectedAppointment} patientId={patientId} />}
        {!selectedAppointment && <p className="text-gray-500">Select a doctor to start chat</p>}
      </div>
    </div>
  );
};

export default Chat;
