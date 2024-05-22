import React, { useEffect, useState } from 'react';
import './DashboardManagment.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BASE_URL } from '../../../config.js';

const DashboardManagment = () => {
    const [totalPatients, setTotalPatients] = useState(0); 
    const [totalBookings,setTotalBookings] = useState(0)
    const [totalRevenue,setTotalRevenue] = useState(0)
    const [totalCancel,setTotalCancel] = useState(0)
    const data = [
        {
          
          Bookings: 4000,
          Cancelations: 2400,
          amt: 2400,
        },
        {
         
          Bookings: 3000,
          Cancelations: 1398,
          amt: 2210,
        },
        {
          
          Bookings: 2000,
          Cancelations: 9800,
          amt: 2290,
        },
        {
        
          Bookings: 2780,
          Cancelations: 3908,
          amt: 2000,
        },
        {
          
          Bookings: 1890,
          Cancelations: 4800,
          amt: 2181,
        },
        {
          
          Bookings: 2390,
          Cancelations: 3800,
          amt: 2500,
        },
        {
          Bookings: 3490,
          Cancelations: 4300,
          amt: 2100,
        },
    ];

    useEffect(() => {
        const fetchTotalPatients = async () => {
            try {
                const response = await fetch(`${BASE_URL}/users/analytics/total-patients`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTotalPatients(data.data);
            } catch (error) {
                console.error('Error fetching total patients:', error);
            }
        };

        fetchTotalPatients();
    }, []);

    useEffect(() => {
      const fetchTotalBookings = async () => {
          try {
              const response = await fetch(`${BASE_URL}/bookings/analytics/total-bookings`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                  },
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              console.log('bookings',data);
              setTotalBookings(data.data);
          } catch (error) {
              console.error('Error fetching total patients:', error);
          }
      };

      fetchTotalBookings();
  }, []);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
        try {
            const response = await fetch(`${BASE_URL}/bookings/analytics/total-revenue`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('revune',data);
            setTotalRevenue(data.data);
        } catch (error) {
            console.error('Error fetching total patients:', error);
        }
    };

    fetchTotalRevenue();
}, []);
useEffect(() => {
    const fetchTotalCancel = async () => {
        try {
            const response = await fetch(`${BASE_URL}/bookings/getTotalCancelBookings`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('cancel',data);
            setTotalCancel(data.data);
        } catch (error) {
            console.error('Error fetching total patients:', error);
        }
    };

    fetchTotalCancel();
}, []);



    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='dashboard_main-cards'>
                <div className='dashboard_card'>
                    <div className='dashboard_card-inner'>
                        <h3>PATIENTS</h3>
                        <BsFillArchiveFill className='dashboard-card_icon' />
                    </div>
                    <h1>{totalPatients}</h1>
                </div>
                <div className='dashboard_card'>
                    <div className='dashboard_card-inner'>
                        <h3>BOOKINGS</h3>
                        <BsFillGrid3X3GapFill className='dashboard-card_icon' />
                    </div>
                    <h1>{totalBookings}</h1>
                </div>
                <div className='dashboard_card'>
                    <div className='dashboard_card-inner'>
                        <h3>CANCELATIONS</h3>
                        <BsPeopleFill className='dashboard_card_icon' />
                    </div>
                    <h1>{totalCancel}</h1>
                </div>
                <div className='dashboard_card'>
                    <div className='dashboard_card-inner'>
                        <h3>REVENUE</h3>
                        <BsFillBellFill className='dashboard_card_icon' />
                    </div>
                    <h1>{totalRevenue} ₹</h1>
                </div>
            </div>

            <div className='dashboard_charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Bookings" fill="#8884d8" />
                        <Bar dataKey="Cancelations" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Bookings" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Cancelations" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'Bookings' },
                            { id: 1, value: 15, label: 'Cancelations' },
                            { id: 2, value: 20, label: 'Re-Bookings' },
                        ],
                    },
                ]}
                width={600}
                height={400}
            />
        </main>
    );
}

export default DashboardManagment;
