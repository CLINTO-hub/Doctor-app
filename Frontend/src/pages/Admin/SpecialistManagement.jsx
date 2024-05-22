import React, { useState } from "react";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";

const SpecialistManagement = ({ specialists }) => {
  const [updatedUsers, setUpdatedUsers] = useState(specialists);

  const handleBlock = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/blockDoctor/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      // Update the local user's is_Blocked status
      setUpdatedUsers(prevUsers => {
        return prevUsers.map(user =>
          user._id === id ? { ...user, is_Blocked: !user.is_Blocked } : user
        );
      });

      toast.success(message);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const approveDoc = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/updateDoc/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

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
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qualification
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Specialization
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Certificate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Approving options
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {updatedUsers && updatedUsers.length > 0 ? (
                  updatedUsers.map((specialist, index) => (
                    <tr
                      className="bg-white border-b hover:bg-[#e8e8ff]"
                      key={specialist._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{`${specialist.name}`}</td>
                      <td className="px-6 py-4">{specialist.email}</td>
                      {specialist.qualifications && specialist.qualifications.length > 0 ? (
                        <td className="px-6 py-4">
                          {specialist.qualifications[0].degree}
                        </td>
                      ) : (
                        <td className="px-6 py-4">none</td>
                      )}
                      {specialist.experiences && specialist.experiences.length > 0 ? (
                        <td className="px-6 py-4">
                          {specialist.experiences[0].position}
                        </td>
                      ) : (
                        <td className="px-6 py-4">none</td>
                      )}
                      {specialist.certificate ? (
                        <td className="px-6 py-4">
                          {specialist.certificate && (
                            <img
                              src={specialist.certificate}
                              alt="Certificate"
                              className="w-[60px] h-[60px] object-cover transition-transform transform hover:scale-110"
                            />
                          )}
                        </td>
                      ) : (
                        <td className="px-6 py-4">none</td>
                      )}
                      <td className="px-6 py-4">
                        <button onClick={() => approveDoc(specialist._id)} className="px-4 py-2 font-semibold text-white bg-green-500 border border-red-500 rounded hover:bg-red-800 hover:text-white hover:border-transparent">
                          Approve
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleBlock(specialist._id)} className={`px-4 py-2 font-semibold text-white ${specialist.is_Blocked ? "bg-red-500 border border-yellow-500":"bg-green-500 border border-yellow-500"} rounded hover:bg-yellow-500 hover:text-white hover:border-transparent`}>
                          {specialist.is_Blocked ? 'Unblock' : 'Block'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b hover:bg-gray-100">
                    <td
                      colSpan={8}
                      className="px-6 py-4 font-medium text-center text-gray-900"
                    >
                      No specialists Found
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

export default SpecialistManagement;
