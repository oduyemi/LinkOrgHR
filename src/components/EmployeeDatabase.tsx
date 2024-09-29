import React from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Button, Heading,
} from '@chakra-ui/react';

const EmployeeDatabase = ({ employeeData }: { employeeData: any[] }) => {
  return (
    <Box p={6} bg="white" boxShadow="md" borderRadius="md">
      <Heading mb={4} color="#010156">Employee Database</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Position</Th>
            <Th>Department</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employeeData.map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.id}</Td>
              <Td>{employee.name}</Td>
              <Td>{employee.position}</Td>
              <Td>{employee.department}</Td>
              <Td>{employee.email}</Td>
              <Td>{employee.phone}</Td>
              <Td>
                <Button size="sm" colorScheme="blue" mr={2}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EmployeeDatabase;
