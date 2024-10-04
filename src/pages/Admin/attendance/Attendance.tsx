import React, { useState, useEffect } from "react";
import { 
  Table, 
  Spinner, 
  Box, 
  Text, 
  Input, 
  Select, 
  Button, 
  HStack, 
  FormLabel, 
  Tbody, 
  Th, 
  Thead, 
  Tr, 
  Td 
} from "@chakra-ui/react";
import { dashboardData } from "../../../data/mockData";
import PageTitle from "../../../components/ui/PageTitle"; 

const Attendance: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [showLate, setShowLate] = useState(false);
  const [showOvertime, setShowOvertime] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setAttendanceData([
        {
            id: 1,
            date: "2023-09-25",
            employeeId: 1,
            employeeName: "John Doe",
            department: "IT",
            resumptionTime: "08:00 AM",
            signoutTime: "09:00 PM",
          },
          {
            id: 2,
            date: "2023-09-25",
            employeeId: 2,
            employeeName: "Jane Smith",
            department: "HR",
            resumptionTime: "09:30 AM",
            signoutTime: "05:30 PM",
          },
          {
            id: 3,
            date: "2023-09-26",
            employeeId: 3,
            employeeName: "Mike Johnson",
            department: "Finance",
            resumptionTime: "08:50 AM",
            signoutTime: "05:10 PM",
          },
          {
            id: 4,
            date: "2023-09-25",
            employeeId: 35,
            employeeName: "Alice John",
            department: "Engineering",
            resumptionTime: "07:56 AM",
            signoutTime: "04:30 PM",
          },
          {
            id: 5,
            date: "2023-09-25",
            employeeId: 15,
            employeeName: "Bob Smith",
            department: "IT",
            resumptionTime: "07:20 AM",
            signoutTime: "04:30 PM",
          },
          {
            id: 6,
            date: "2023-09-26",
            employeeId: 3,
            employeeName: "Charlie Brown",
            department: "HR",
            resumptionTime: "07:50 AM",
            signoutTime: "04:30 PM",
          },
          {
              id: 7,
              date: "2023-09-26",
              employeeId: 3,
              employeeName: "Emily Brown",
              department: "Marketing",
              resumptionTime: "07:02 AM",
              signoutTime: "04:30 PM",
          },
          {
          id: 6,
          date: "2023-09-26",
          employeeId: 8,
          employeeName: "David Lee",
          department: "Operations",
          resumptionTime: "07:43 AM",
          signoutTime: "04:30 PM",
          },
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = attendanceData.filter((record) => {
      const matchesEmployee =
        !employeeFilter || record.employeeName.includes(employeeFilter);
      const matchesDate =
        (!startDateFilter && !endDateFilter) ||
        (record.date >= startDateFilter && record.date <= endDateFilter);
      
      const isLate = record.resumptionTime >= "08:00 AM";
      const workedOvertime = record.signoutTime >= "05:30 PM";
      const matchesLate = !showLate || isLate;
      const matchesOvertime = !showOvertime || workedOvertime;

      return matchesEmployee && matchesDate && matchesLate && matchesOvertime;
    });

    setFilteredData(filtered);
  }, [employeeFilter, startDateFilter, endDateFilter, showLate, showOvertime, attendanceData]);

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["Date", "Employee Name", "Department", "Resumption Time", "Sign-out Time", "Late Arrival", "Worked Overtime"];
    csvRows.push(headers.join(","));

    filteredData.forEach((record) => {
      const isLate = record.resumptionTime > "08:00 AM" ? "Yes" : "No";
      const workedOvertime = record.signoutTime >= "05:30 PM" ? "Yes" : "No";
      const values = [
        record.date,
        record.employeeName,
        record.department,
        record.resumptionTime,
        record.signoutTime,
        isLate,
        workedOvertime
      ];
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "attendance_data.csv");
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box p={5}>
      <PageTitle title="Attendance"  />

      {/* Filters */}
      <Box mb={5} className="text-black">
        <HStack spacing={5}>
          <Box>
            <FormLabel htmlFor="employee">Employee</FormLabel>
            <Select
              id="employee"
              placeholder="Select employee"
              onChange={(e) => setEmployeeFilter(e.target.value)}
            >
              {dashboardData.employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box>
            <FormLabel htmlFor="startDate">Start Date</FormLabel>
            <Input
              id="startDate"
              type="date"
              onChange={(e) => setStartDateFilter(e.target.value)}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="endDate">End Date</FormLabel>
            <Input
              id="endDate"
              type="date"
              onChange={(e) => setEndDateFilter(e.target.value)}
            />
          </Box>

          <Box>
            <FormLabel>
              <Input
                type="checkbox"
                onChange={(e) => setShowLate(e.target.checked)}
              /> Show Late Arrivals
            </FormLabel>
          </Box>

          <Box>
            <FormLabel>
              <Input
                type="checkbox"
                onChange={(e) => setShowOvertime(e.target.checked)}
              /> Show Overtime
            </FormLabel>
          </Box>

          <Button
            onClick={() => {
              setEmployeeFilter("");
              setStartDateFilter("");
              setEndDateFilter("");
              setShowLate(false);
              setShowOvertime(false);
            }}
          >
            Clear Filters
          </Button>
          <Button onClick={exportToCSV} colorScheme="orange">
            Export Data
          </Button>
        </HStack>
      </Box>

      {loading ? (
        <Spinner size="xl" />
      ) : filteredData.length === 0 ? (
        <Text>No records found</Text>
      ) : (
        <Table variant="striped" colorScheme="gray" mt={5} size="sm">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Employee Name</Th>
              <Th>Department</Th>
              <Th>Resumption Time</Th>
              <Th>Sign-out Time</Th>
              <Th>Late Arrival</Th>
              <Th>Worked Overtime</Th>
            </Tr>
          </Thead>
          <Tbody className="text-black">
            {filteredData.map((record) => {
              const isLate = record.resumptionTime > "08:00 AM";
              const workedOvertime = record.signoutTime >= "05:30 PM";
              return (
                <Tr key={record.id}>
                  <Td>{record.date}</Td>
                  <Td>{record.employeeName}</Td>
                  <Td>{record.department}</Td>
                  <Td>{record.resumptionTime}</Td>
                  <Td>{record.signoutTime}</Td>
                  <Td>{isLate ? "Yes" : "No"}</Td>
                  <Td>{workedOvertime ? "Yes" : "No"}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Attendance;
