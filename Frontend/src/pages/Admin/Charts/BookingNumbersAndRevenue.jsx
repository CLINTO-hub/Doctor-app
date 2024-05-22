import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const BookingNumbersAndRevenue = ({ data }) => {
  return (
    <div>
      <BarChart width={690} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="specializationName" />
        <YAxis yAxisId="left" label={{ value: 'Appointment Count', angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'Total Ticket Price', angle: 90, position: 'insideRight' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="appointmentCount" fill="#8884d8" yAxisId="left" />
        <Bar dataKey="totalTicketPrice" fill="#82ca9d" yAxisId="right" />
      </BarChart>
    </div>
  );
};

export default BookingNumbersAndRevenue;