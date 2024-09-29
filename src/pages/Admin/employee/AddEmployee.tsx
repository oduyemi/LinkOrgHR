import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Stack, Heading, Select, Flex, Text, useToast,
} from '@chakra-ui/react';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    profilePicture: null,
    hireDate: '',
    position: '',
    department: '',
    lineManager: '',
    employeeNumber: '',
    probationPeriod: '',
    confirmationDate: '',
    salaryAccountBank: '',
    salaryAccountNumber: '',
    pensionRSA: '',
    taxID: '',
    meansOfIdentification: '',
    idCard: null,
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === 'file') {
      setEmployeeData({ ...employeeData, [name]: e.target.files[0] });
    } else {
      setEmployeeData({
        ...employeeData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    const { name, email, phone } = employeeData;
    if (!name || !email || !phone) {
      toast({
        title: "Error.",
        description: "Name, email, and phone are required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    console.log('Employee data submitted:', employeeData);
    // Add your submission logic here

    // Show success message
    toast({
      title: "Success!",
      description: "Employee data has been submitted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Reset the form
    setEmployeeData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      profilePicture: null,
      hireDate: '',
      position: '',
      department: '',
      lineManager: '',
      employeeNumber: '',
      probationPeriod: '',
      confirmationDate: '',
      salaryAccountBank: '',
      salaryAccountNumber: '',
      pensionRSA: '',
      taxID: '',
      meansOfIdentification: '',
      idCard: null,
    });
  };

  return (
    <Flex justify="center" mt={8}>
      <Box width="100%" maxW="800px" p={6} bg="white" boxShadow="md" borderRadius="md">
        <Heading mb={6} color="#010156">Add New Employee</Heading>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel color="black">Full Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              placeholder="Enter employee's full name"
              color="black"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="black">Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              placeholder="Enter employee's email"
              color="black"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="black">Phone Number</FormLabel>
            <Input
              type="tel"
              name="phone"
              value={employeeData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Date of Birth</FormLabel>
            <Input
              type="date"
              name="dateOfBirth"
              value={employeeData.dateOfBirth}
              onChange={handleChange}
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Gender</FormLabel>
            <Select
              name="gender"
              value={employeeData.gender}
              onChange={handleChange}
              placeholder="Select gender"
              color="black"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel color="black">Profile Picture</FormLabel>
            <Input
              type="file"
              name="profilePicture"
              onChange={handleChange}
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Hire Date</FormLabel>
            <Input
              type="date"
              name="hireDate"
              value={employeeData.hireDate}
              onChange={handleChange}
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Position</FormLabel>
            <Input
              type="text"
              name="position"
              value={employeeData.position}
              onChange={handleChange}
              placeholder="Enter position"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Department</FormLabel>
            <Select
              name="department"
              value={employeeData.department}
              onChange={handleChange}
              placeholder="Select department"
              color="black"
            >
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Engineering">Engineering</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel color="black">Line Manager</FormLabel>
            <Input
              type="text"
              name="lineManager"
              value={employeeData.lineManager}
              onChange={handleChange}
              placeholder="Enter line manager's name"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Employee Number</FormLabel>
            <Input
              type="text"
              name="employeeNumber"
              value={employeeData.employeeNumber}
              onChange={handleChange}
              placeholder="Enter employee number"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Probationary Period (in months)</FormLabel>
            <Input
              type="number"
              name="probationPeriod"
              value={employeeData.probationPeriod}
              onChange={handleChange}
              placeholder="Enter probation period"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Expected Confirmation Date</FormLabel>
            <Input
              type="date"
              name="confirmationDate"
              value={employeeData.confirmationDate}
              onChange={handleChange}
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Salary Account Bank</FormLabel>
            <Input
              type="text"
              name="salaryAccountBank"
              value={employeeData.salaryAccountBank}
              onChange={handleChange}
              placeholder="Enter salary account bank"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Salary Account Number</FormLabel>
            <Input
              type="text"
              name="salaryAccountNumber"
              value={employeeData.salaryAccountNumber}
              onChange={handleChange}
              placeholder="Enter salary account number"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Pension RSA Number</FormLabel>
            <Input
              type="text"
              name="pensionRSA"
              value={employeeData.pensionRSA}
              onChange={handleChange}
              placeholder="Enter pension RSA number"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Tax ID</FormLabel>
            <Input
              type="text"
              name="taxID"
              value={employeeData.taxID}
              onChange={handleChange}
              placeholder="Enter tax ID"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Means of Identification</FormLabel>
            <Input
              type="text"
              name="meansOfIdentification"
              value={employeeData.meansOfIdentification}
              onChange={handleChange}
              placeholder="Enter means of identification"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Upload ID Card</FormLabel>
            <Input
              type="file"
              name="idCard"
              onChange={handleChange}
              color="black"
            />
          </FormControl>

          <Button color="#010156" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default AddEmployee;
