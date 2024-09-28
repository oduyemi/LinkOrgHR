import React, { useEffect, useState } from "react";
import { AppstoreAddOutlined, TeamOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, List, Tag } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import DashboardCard from "../../components/cards/DashboardCard";
import PageTitle from "../../components/ui/PageTitle";
import { employeesData } from "../../data/mockData";
import TaskDistribution from "../../components/charts/TaskDistribution";
import EmployeeMetrics from "../../components/charts/EmployeeMetrics";




const EmployeeDashboard: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageTitle title="Employee Dashboard" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
          <DashboardCard
            count={`${employeesData.attendance}%`}
            title="Attendance Rate"
            icon={TeamOutlined}
            color="#B7EB8F"
            isMoney={false}
          />
          <DashboardCard
            count={employeesData.leaveBalance}
            title="Leave Balance"
            icon={CalendarOutlined}
            color="#FFC106"
            isMoney={false}
          />
          <DashboardCard
            count={employeesData.upcomingReviews}
            title="Upcoming Reviews"
            icon={ClockCircleOutlined}
            color="#010156"
            isMoney={false}
          />
          <DashboardCard
            count={employeesData.completedTrainings}
            title="Completed Trainings"
            icon={AppstoreAddOutlined}
            color="#FF6384"
            isMoney={false}
          />
        </div>
        <Card title="Personal Information" bordered={true} className="mb-4">
          <div className="space-y-2">
            <p><strong>Name:</strong> {employeesData.name}</p>
            <p><strong>Position:</strong> {employeesData.position}</p>
            <p><strong>Department:</strong> {employeesData.department}</p>
          </div>
        </Card>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
          <TaskDistribution />
          <EmployeeMetrics />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;