import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface EmployeeData {
  key: React.Key;
  name: string;
  age: number;
  position: string;
  department: string;
  address: string;
  hireDate: string;
  status: string;
}

const columns: TableColumnsType<EmployeeData> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      { text: "Alice Johnson", value: "Alice Johnson" },
      { text: "Bob Smith", value: "Bob Smith" },
      { text: "Charlie Brown", value: "Charlie Brown" },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value as string),
    width: "20%",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
    width: "10%",
  },
  {
    title: "Position",
    dataIndex: "position",
    filters: [
      { text: "Manager", value: "Manager" },
      { text: "Software Engineer", value: "Software Engineer" },
      { text: "HR Specialist", value: "HR Specialist" },
    ],
    onFilter: (value, record) => record.position.includes(value as string),
    filterSearch: true,
    width: "15%",
  },
  {
    title: "Department",
    dataIndex: "department",
    filters: [
      { text: "Engineering", value: "Engineering" },
      { text: "Human Resources", value: "Human Resources" },
      { text: "Marketing", value: "Marketing" },
    ],
    onFilter: (value, record) => record.department.includes(value as string),
    width: "15%",
  },

  {
    title: "Hire Date",
    dataIndex: "hireDate",
    sorter: (a, b) =>
      new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime(),
    width: "10%",
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      { text: "Active", value: "Active" },
      { text: "On Leave", value: "On Leave" },
      { text: "Resigned", value: "Resigned" },
    ],
    onFilter: (value, record) => record.status.includes(value as string),
    width: "10%",
  },
];

const data: EmployeeData[] = [
  {
    key: "1",
    name: "Alice Johnson",
    age: 29,
    position: "Software Engineer",
    department: "Engineering",
    address: "San Francisco, CA",
    hireDate: "2018-06-01",
    status: "Active",
  },
  {
    key: "2",
    name: "Bob Smith",
    age: 45,
    position: "Manager",
    department: "Marketing",
    address: "New York, NY",
    hireDate: "2010-09-15",
    status: "Active",
  },
  {
    key: "3",
    name: "Charlie Brown",
    age: 37,
    position: "HR Specialist",
    department: "Human Resources",
    address: "London, UK",
    hireDate: "2015-04-22",
    status: "On Leave",
  },
];

const onChange: TableProps<EmployeeData>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
};

const App: React.FC = () => (
  <div className="w-full">
    <Table
      scroll={{ x: 600 }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />
  </div>
);

export default App;
