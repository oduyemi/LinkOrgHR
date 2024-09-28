import React from "react";
import { Card } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Define your chart data and options
// const chartData = {
//   labels: ["Department A", "Department B", "Department C"],
//   datasets: [
//     {
//       data: [30, 40, 30],
//       backgroundColor: ["#FF6384", "#010156", "#FFCE56"],
//     },
//   ],
// };

const chartData = {
  labels: ["Department A", "Department B", "Department C"],
  datasets: [
    {
      data: [30, 40, 30],
      backgroundColor: ["#FF6384", "#010156", "#FFCE56"],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const DepartmentDistribution: React.FC = () => {
  return (
    <div className="col-12 col-lg-6 mb-3 mb-lg-0">
      <Card
        title="Department Distribution"
        bordered={true}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ height: "400px", width: "100%" }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DepartmentDistribution;
