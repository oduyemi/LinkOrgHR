import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Heading,
  Stack,
  TableContainer,
  useBreakpointValue,
  useMediaQuery,
  Text,
  Flex,
} from '@chakra-ui/react';

const EmployeeList = ({ employees, onUpdateEmployee, onDeleteEmployee }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});
  
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setEditedEmployee(employee);
  };

  const handleSave = () => {
    onUpdateEmployee(editedEmployee);
    setEditingId(null);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Box p={{ base: 4, md: 5 }} shadow="md" borderWidth="1px" borderRadius="md">
      <Heading as="h5" size="md" mb={4} textAlign={{ base: 'center', md: 'left' }}>
        Employee List
      </Heading>

      {isMobile ? (
        // Render a card layout for mobile view
        employees.map((employee) => (
          <Box
            key={employee.id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            mb={4}
            shadow="sm"
          >
            <Flex direction="column" mb={2}>
              <Text fontWeight="bold">Name:</Text>
              {editingId === employee.id ? (
                <Input
                  type="text"
                  name="name"
                  value={editedEmployee.name || ''}
                  onChange={(e) => handleChange(e, employee.id)}
                />
              ) : (
                <Text>{employee.name}</Text>
              )}
            </Flex>

            {/* Add similar layout for Position, Department, Email, and Phone */}
            <Flex direction="column" mb={2}>
              <Text fontWeight="bold">Position:</Text>
              {editingId === employee.id ? (
                <Input
                  type="text"
                  name="position"
                  value={editedEmployee.position || ''}
                  onChange={(e) => handleChange(e, employee.id)}
                />
              ) : (
                <Text>{employee.position}</Text>
              )}
            </Flex>

            <Flex direction="column" mb={2}>
              <Text fontWeight="bold">Department:</Text>
              {editingId === employee.id ? (
                <Input
                  type="text"
                  name="department"
                  value={editedEmployee.department || ''}
                  onChange={(e) => handleChange(e, employee.id)}
                />
              ) : (
                <Text>{employee.department}</Text>
              )}
            </Flex>

            <Flex direction="column" mb={2}>
              <Text fontWeight="bold">Email:</Text>
              {editingId === employee.id ? (
                <Input
                  type="email"
                  name="email"
                  value={editedEmployee.email || ''}
                  onChange={(e) => handleChange(e, employee.id)}
                />
              ) : (
                <Text>{employee.email}</Text>
              )}
            </Flex>

            <Flex direction="column" mb={2}>
              <Text fontWeight="bold">Phone:</Text>
              {editingId === employee.id ? (
                <Input
                  type="text"
                  name="phone"
                  value={editedEmployee.phone || ''}
                  onChange={(e) => handleChange(e, employee.id)}
                />
              ) : (
                <Text>{employee.phone}</Text>
              )}
            </Flex>

            <Stack direction={stackDirection} spacing={2}>
              {editingId === employee.id ? (
                <>
                  <Button size="sm" colorScheme="green" onClick={handleSave}>
                    Save
                  </Button>
                  <Button size="sm" colorScheme="gray" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" colorScheme="blue" onClick={() => handleEdit(employee)}>
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => onDeleteEmployee(employee.id)}>
                    Delete
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        ))
      ) : (
        // Render a table layout for desktop view
        <TableContainer overflowX="auto">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Position</Th>
                <Th>Department</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee) => (
                <Tr key={employee.id}>
                  <Td>
                    {editingId === employee.id ? (
                      <Input
                        type="text"
                        name="name"
                        value={editedEmployee.name || ''}
                        onChange={(e) => handleChange(e, employee.id)}
                      />
                    ) : (
                      employee.name
                    )}
                  </Td>
                  <Td>
                    {editingId === employee.id ? (
                      <Input
                        type="text"
                        name="position"
                        value={editedEmployee.position || ''}
                        onChange={(e) => handleChange(e, employee.id)}
                      />
                    ) : (
                      employee.position
                    )}
                  </Td>
                  <Td>
                    {editingId === employee.id ? (
                      <Input
                        type="text"
                        name="department"
                        value={editedEmployee.department || ''}
                        onChange={(e) => handleChange(e, employee.id)}
                      />
                    ) : (
                      employee.department
                    )}
                  </Td>
                  <Td>
                    {editingId === employee.id ? (
                      <Input
                        type="email"
                        name="email"
                        value={editedEmployee.email || ''}
                        onChange={(e) => handleChange(e, employee.id)}
                      />
                    ) : (
                      employee.email
                    )}
                  </Td>
                  <Td>
                    {editingId === employee.id ? (
                      <Input
                        type="text"
                        name="phone"
                        value={editedEmployee.phone || ''}
                        onChange={(e) => handleChange(e, employee.id)}
                      />
                    ) : (
                      employee.phone
                    )}
                  </Td>
                  <Td>
                    <Stack direction={stackDirection} spacing={2}>
                      {editingId === employee.id ? (
                        <>
                          <Button size="sm" colorScheme="green" onClick={handleSave}>
                            Save
                          </Button>
                          <Button size="sm" colorScheme="gray" onClick={() => setEditingId(null)}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" colorScheme="blue" onClick={() => handleEdit(employee)}>
                            Edit
                          </Button>
                          <Button size="sm" colorScheme="red" onClick={() => onDeleteEmployee(employee.id)}>
                            Delete
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EmployeeList;
