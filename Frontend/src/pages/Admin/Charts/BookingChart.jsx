import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";


const BookingChart = ({data}) => {
    
  return (
    <div>
      <LineChart 
        width={850}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="totalBookings" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey='_id' />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  ); 
};

export default BookingChart;