import { PieChart, Pie, Tooltip, Cell } from "recharts";

const BookingPerSpecialization = ({ data }) => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]; // Add more colors as needed

  return (
    <div className="w-full max-w-screen-xl mx-auto text-center">
      <PieChart width={630} height={400} className="mx-auto inline-block">
        <Pie
          data={data}
          dataKey="appointmentCount"
          nameKey="specializationName"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={(entry) => entry.name} // Show the name on the segment
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default BookingPerSpecialization;