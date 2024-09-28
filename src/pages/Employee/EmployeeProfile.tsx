import React from "react";
import { Card, List, Tag } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import PageTitle from "../../components/ui/PageTitle";
import { employeesprofileData } from "../../data/mockData";

const EmployeeProfile: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageTitle title="Employee Profile" />
      <div className="pt-10 p-6 space-y-6">

        {/* Flex container for two cards in a row */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Personal Information Card */}
          <Card title="Personal Information" bordered={true} className="mb-4 md:w-1/2">
            <div className="space-y-2">
              <p><strong>Name:</strong> {employeesprofileData.name}</p>
              <p><strong>Position:</strong> {employeesprofileData.position}</p>
              <p><strong>Department:</strong> {employeesprofileData.department}</p>
              <p><strong>Email:</strong> <MailOutlined /> {employeesprofileData.email}</p>
              <p><strong>Phone:</strong> <PhoneOutlined /> {employeesprofileData.phone}</p>
              <p><strong>Date of Birth:</strong> {employeesprofileData.dob}</p>
              <p><strong>Date of Joining:</strong> {employeesprofileData.joiningDate}</p>
              <p><strong>Employee ID:</strong> {employeesprofileData.employeeID}</p>
            </div>
          </Card>

          {/* Employment Details */}
          <Card title="Employment Details" bordered={true} className="mb-4 md:w-1/2">
            <div className="space-y-2">
              <p><strong>Position:</strong> {employeesprofileData.position}</p>
              <p><strong>Department:</strong> {employeesprofileData.department}</p>
              <p><strong>Manager:</strong> {employeesprofileData.manager}</p>
              <p><strong>Work Location:</strong> {employeesprofileData.location}</p>
              <p><strong>Employment Type:</strong> {employeesprofileData.employmentType}</p>
              <p><strong>Shift:</strong> {employeesprofileData.shift}</p>
            </div>
          </Card>
        </div>

        {/* Flex container for Skills and Additional Notes */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Skills and Achievements */}
          <Card title="Skills & Achievements" bordered={true} className="mb-4 md:w-1/2">
            <div className="space-y-2">
              <p><strong>Skills:</strong></p>
              <List
                dataSource={employeesprofileData.skills}
                renderItem={(skill) => (
                  <Tag color="blue" key={skill}>{skill}</Tag>
                )}
              />
              <p><strong>Certifications:</strong> {employeesprofileData.certifications}</p>
              <p><strong>Awards:</strong> {employeesprofileData.awards}</p>
            </div>
          </Card>

          {/* Additional Notes */}
          <Card title="Additional Notes" bordered={true} className="mb-4 md:w-1/2">
            <p>{employeesprofileData.notes}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
