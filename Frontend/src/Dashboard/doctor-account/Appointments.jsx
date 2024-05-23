import React, { useState } from 'react';
import { formateDate } from '../../../utils/formateDate.js';

const Appointments = ({ appointments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className='w-full text-left text-sm text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Payment
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              BookedOn
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {currentAppointments.map((item) => (
            <tr key={item._id}>
              <th
                scope='row'
                className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'
              >
                {item.user ? (
                  <>
                    <img
                      src={item.userPhoto}
                      className='w-10 h-10 rounded-full'
                      alt=''
                    />
                    <div className='pl-3'>
                      <div className='text-base font-semibold'>{item.userName}</div>
                      <div className='text-normal text-gray-500'>{item.userEmail}</div>
                    </div>
                  </>
                ) : (
                  <div className='pl-3'>
                    <div className='text-base font-semibold'>{item.userName}</div>
                  </div>
                )}
              </th>
              <td className='px-6 py-4'>
                {item.isPaid ? (
                  <div className='flex items-center'>
                    <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
                    Paid
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div>
                    Unpaid
                  </div>
                )}
              </td>
              <td className='px-6 py-4'>{item.ticketPrice}</td>
              <td className='px-6 py-4'>{formateDate(item.createdAt)}</td>
              <td className='px-6 py-4'>{item.status} by Patient</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index + 1)}
            className={`px-4 py-2 border rounded focus:outline-none ${
              currentPage === index + 1 ? 'bg-textColor text-white' : 'text-blue-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
