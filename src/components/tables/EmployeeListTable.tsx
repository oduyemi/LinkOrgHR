import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Avatar,
} from "@chakra-ui/react";

interface EmployeeData {
  key: React.Key;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string; // Format: YYYY-MM-DD
  gender: string;
  profilePicture: string | null;
  hireDate: string;
  position: string;
  department: string;
  lineManager: string;
  employeeNumber: string;
  probationPeriod: string;
  confirmationDate: string;
  salaryAccountBank: string;
  salaryAccountNumber: string;
  pensionRSA: string;
  taxID: string;
  meansOfIdentification: string;
  idCard: string | null;
  hmoNumber: string;
  status: string;
}

// Utility function to calculate age from date of birth
const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  // Adjust age if birth date hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

const columns = [
  { title: "Name", key: "name" },
  { title: "Age", key: "age" },
  { title: "Position", key: "position" },
  { title: "Department", key: "department" },
  { title: "Employee Number", key: "employeeNumber" },
  { title: "Status", key: "status" },
  { title: "Action", key: "action" },
];

const data: EmployeeData[] = [
  {
    key: "1",
    name: "Alice Johnson",
    email: "alice@linkorgnet.com",
    phone: "123-456-7890",
    dateOfBirth: "1994-05-12",
    gender: "Female",
    profilePicture: null,
    hireDate: "2018-06-01",
    position: "Software Engineer",
    department: "Engineering",
    lineManager: "Bob Smith",
    employeeNumber: "035",
    probationPeriod: "6 months",
    confirmationDate: "2019-01-01",
    salaryAccountBank: "Zenith Bank",
    salaryAccountNumber: "123456789",
    pensionRSA: "RSA123456",
    taxID: "TAX987654",
    meansOfIdentification: "National ID",
    idCard: null,
    hmoNumber: "HMO123456",
    status: "Active",
  },
  {
    key: "2",
    name: "Bob Smith",
    email: "bob@linkorgnet.com",
    phone: "987-654-3210",
    dateOfBirth: "1978-08-25",
    gender: "Male",
    profilePicture: "https://example.com/bob.jpg",
    hireDate: "2010-09-15",
    position: "Manager",
    department: "Marketing",
    lineManager: "Alice Johnson",
    employeeNumber: "015",
    probationPeriod: "3 months",
    confirmationDate: "2010-12-15",
    salaryAccountBank: "Guarantee Trust Bank",
    salaryAccountNumber: "987654321",
    pensionRSA: "RSA654321",
    taxID: "TAX123456",
    meansOfIdentification: "Passport",
    idCard: "https://example.com/bob_id.jpg",
    hmoNumber: "HMO654321",
    status: "Active",
  },
  {
    key: "3",
    name: "Charlie Brown",
    email: "charlie@linkorgnet.com",
    phone: "456-789-0123",
    dateOfBirth: "1985-04-10",
    gender: "Male",
    profilePicture: null,
    hireDate: "2015-04-22",
    position: "HR Specialist",
    department: "Human Resources",
    lineManager: "Alice Johnson",
    employeeNumber: "027",
    probationPeriod: "6 months",
    confirmationDate: "2015-10-22",
    salaryAccountBank: "Fidelity Bank",
    salaryAccountNumber: "654321789",
    pensionRSA: "RSA789012",
    taxID: "TAX456789",
    meansOfIdentification: "Driver's License",
    idCard: null,
    hmoNumber: "HMO789012",
    status: "On Leave",
  },
];

const EmployeeTable: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleRowClick = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsOpen(true);
  };

  const handleDeactivate = () => {
    console.log(`Deactivated employee: ${selectedEmployee?.name}`);
    setIsOpen(false);
  };

  return (
    <Box width="full" p={4}>
      <Input
        placeholder="Search by name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        mb={4}
      />
      <Table variant="striped">
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col.key}>{col.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((item) => (
            <Tr key={item.key} className="text-black" onClick={() => handleRowClick(item)}>
              <Td>{item.name}</Td>
              <Td>{calculateAge(item.dateOfBirth)}</Td> {/* Calculate age here */}
              <Td>{item.position}</Td>
              <Td>{item.department}</Td>
              <Td>{item.employeeNumber}</Td>
              <Td>{item.status}</Td>
              <Td>
                <Button size="sm" color="blue.600" variant="outline" mr={2}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={handleDeactivate}>
                  Deactivate
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEmployee?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" alignItems="center" mb={4}>
              {selectedEmployee?.profilePicture ? (
                <Image
                      src={selectedEmployee.idCard}
                      alt="ID Card"
                      borderRadius="md"
                      boxSize="100px"
                      mt={2}
                    />
              ) : (
                <Avatar name={selectedEmployee?.name} size="lg" mr={4} />
              )}
              <Box>
                <Box fontWeight="bold">Email: {selectedEmployee?.email}</Box>
                <Box>Phone: {selectedEmployee?.phone}</Box>
                <Box>Date of Birth: {selectedEmployee?.dateOfBirth}</Box>
                <Box>Age: {calculateAge(selectedEmployee?.dateOfBirth || '')}</Box> {/* Display age in modal */}
                <Box>Gender: {selectedEmployee?.gender}</Box>
                <Box>Hire Date: {selectedEmployee?.hireDate}</Box>
                <Box>Position: {selectedEmployee?.position}</Box>
                <Box>Department: {selectedEmployee?.department}</Box>
                <Box>Line Manager: {selectedEmployee?.lineManager}</Box>
                <Box>Employee Number: {selectedEmployee?.employeeNumber}</Box>
                <Box>Probation Period: {selectedEmployee?.probationPeriod}</Box>
                <Box>Confirmation Date: {selectedEmployee?.confirmationDate}</Box>
                <Box>Salary Account Bank: {selectedEmployee?.salaryAccountBank}</Box>
                <Box>Salary Account Number: {selectedEmployee?.salaryAccountNumber}</Box>
                <Box>Pension RSA: {selectedEmployee?.pensionRSA}</Box>
                <Box>Tax ID: {selectedEmployee?.taxID}</Box>
                <Box>Means of Identification: {selectedEmployee?.meansOfIdentification}</Box>
                <Box>
                  ID Card: {selectedEmployee?.idCard ? (
                    <Image src={selectedEmployee.idCard} alt="ID Card" boxSize="100px" />
                  ) : (
                    <Box color="gray.500">No ID Card Available</Box> // Placeholder text
                  )}
                </Box>
                <Box>HMO Number: {selectedEmployee?.hmoNumber}</Box>
                <Box>Status: {selectedEmployee?.status}</Box>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmployeeTable;
