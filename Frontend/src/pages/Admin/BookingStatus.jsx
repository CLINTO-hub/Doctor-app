  import { useState } from "react";
  import { formateDate } from "../../../utils/formateDate.js";

  const BookingStatus = ({ bookings }) => {
    const [updatedUsers, setUpdatedUsers] = useState(bookings);

    console.log('Bookings',bookings);
    

    return (
      <div className="flex flex-col items-center">
        <div className="col-span-3">
          <section className="container">
            <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sl.No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Patient Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Doctor Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Appointment Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Appointment Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fee
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fee Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Session Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cancelled By
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {updatedUsers && updatedUsers.length > 0 ? (
                    updatedUsers.map((booking, index) => (
                      <tr
                        className="bg-white border-b hover:bg-[#e8e8ff]"
                        key={booking._id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{booking.userName}</td>
                        <td className="px-6 py-4">{booking.doctorName}</td>
                        <td className="px-6 py-4">{formateDate(booking.createdAt)}</td>
                        <td className="px-6 py-4">
                          {booking.timeSlots.map((slot,slotIndex) => (
                            <div key={slotIndex}>
                              {`${slot.startingTime} - ${slot.endingTime}`}
                            </div>
                          ))}
                        </td>
                        <td className="px-6 py-4">{booking.ticketPrice}</td>
                        <td className="px-6 py-4">{booking.isPaid ? "Paid" : "Unpaid"}</td>
                        <td className="px-6 py-4">{booking.status}</td>
                        <td className="px-6 py-4">{booking.status ==="Canceled" ? "Patient":"" }</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white border-b hover:bg-gray-100">
                      <td
                        colSpan={8}
                        className="px-6 py-4 font-medium text-center text-gray-900"
                      >
                        No Bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  };

  export default BookingStatus;
