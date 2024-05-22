import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";
import useFetchData from "../../hooks/useFetchData";

const UserManagement = ({ users }) => {
  const [updatedUsers, setUpdatedUsers] = useState(users);

  useEffect(() => {
    setUpdatedUsers(users);
  }, [users]);


  console.log('use',users);
  console.log('up',updatedUsers);



  const [query,setQuery] = useState('')
  const [debounceQuery,setdebounceQuery] = useState('')

  


  const handleChange = ()=>{
    setQuery(query.trim())

    
  }




  const handleBlock = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/blockUser/${id}`, {
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
      const updatedUsersList = updatedUsers.map((user) =>
        user._id === id ? { ...user, is_Blocked: !user.is_Blocked } : user
      );
      setUpdatedUsers(updatedUsersList);

      toast.success(message);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };



  return (
    <div className="flex flex-col items-center">
      {/* Search Input */}
      <div className="mt-4 mb-2 ml-auto">
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-2 border rounded"
          value={query}
          onChange={e=>setQuery(e.target.value)}
        />
        <button onClick={handleChange} className='btn bg-cyan-700 mt-12 rounded-[0px] rounded-r-md text-sm py-3 px-5'>Search</button>
      </div>

      {/* Table and Pagination */}
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
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {updatedUsers && updatedUsers.length > 0 ? (
                  updatedUsers.map((user, index) => (
                    <tr
                      className="bg-white border-b hover:bg-[#e8e8ff]"
                      key={user._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{`${user.name}`}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleBlock(user._id)}
                          className={`px-4 py-2 font-semibold text-white ${
                            user.is_Blocked
                              ? "bg-green-500 border border-yellow-500"
                              : "bg-red-500 border border-yellow-500"
                          } rounded hover:bg-yellow-500 hover:text-white hover:border-transparent`}
                        >
                          {user.is_Blocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b hover:bg-gray-100">
                    <td
                      colSpan={4}
                      className="px-6 py-4 font-medium text-center text-gray-900"
                    >
                      No users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center items-center">
              <button className="page-link disabled mr-5" disabled>
                {"<<"}
              </button>
              <ul className="pagination flex space-x-2">
                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>
              </ul>
              <button className="page-link disabled ml-5" disabled>
                {">>"}
              </button>
            </div>
            {/* Pagination end */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserManagement;
