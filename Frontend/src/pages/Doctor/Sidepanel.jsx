import { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL, token } from '../../../config.js';
import convertTime from '../../../utils/convertTime.js';

const Sidepanel = ({ doctorId, ticketPrice, timeSlots }) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const bookingHandler = async () => {
        try {
            if (!selectedTimeSlot) {
                throw new Error('Please select a time slot before booking');
            }

            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ timeSlot: selectedTimeSlot }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message + ' Please try again');
            }

            if (data.session.url) {
                window.location.href = data.session.url;
            }
        } catch (error) {
            toast.error(error.message);
            console.log('error', error.message);
        }
    };

    const handleTimeSlot = (selectedSlot) => {
        setSelectedTimeSlot(selectedSlot);
        console.log('selected', selectedSlot);
    };

    return (
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md h-80'>
            <div className='flex items-center justify-between'>
                <p className='text__para mt-0 font-semibold'>Ticket Price</p>
                <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                    {ticketPrice} BDT
                </span>
            </div>

            <div className='mt-[30px]'>
                <p className='text__para mt-0 font-semibold text-headingColor'>Available Time Slots</p>
                <ul className='mt-3'>
                    {timeSlots?.map((item, index) => (
                        <li
                            key={index}
                            className={`flex items-center justify-between mb-2 ${selectedTimeSlot === item ? 'bg-blue-200' : ''} ${item.isBooked ? 'bg-gray-200 cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => !item.isBooked && handleTimeSlot(item)}
                        >
                            <p className='text-[15px] leading-6 text-textColor font-semibold'>
                                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                            </p>
                            <p className='text-[15px] leading-6 text-textColor font-semibold'>
                                {convertTime(item.startingTime)} - {convertTime(item.endingTime)} {item.isBooked && '(Booked)'}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={bookingHandler} className='btn px-2 w-full rounded-md' disabled={!selectedTimeSlot}>
                Book appointment
            </button>
        </div>
    );
};

export default Sidepanel;
