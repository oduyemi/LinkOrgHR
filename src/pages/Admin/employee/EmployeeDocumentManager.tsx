import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/ui/PageTitle";
import DocumentViewer from "../../../components/DocumentViewer";
import EmployeeSelector from "../../../components/EmployeeSelector ";
import DepartmentSelector from "../../../components/DepartmentSelector";
import AddDocumentForm from "../../../components/forms/AddDocumentForm"; 
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Box, useDisclosure, Stack, Text } from "@chakra-ui/react";

const EmployeeDocumentManager: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All Departments");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch employee data (simulate with a timeout)
  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Replace with actual fetch logic
    } catch (err) {
      setError("Failed to fetch employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [selectedDepartment]);

  return (
    <Box p={4}>
      <PageTitle title="Employee Document Manager" />

      <Stack spacing={6} direction={{ base: "column", md: "row" }}>
        <Box width={{ base: "100%", md: "30%" }} pr={{ base: 0, md: 4 }}>
          <DepartmentSelector
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
          />
          <EmployeeSelector
            selectedDepartment={selectedDepartment}
            onSelectEmployee={setSelectedEmployee}
            mt={4}
          />
        </Box>

        <Box width={{ base: "100%", md: "70%" }} pl={{ base: 0, md: 4 }}>
          {loading ? (
            <Text>Loading documents...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : selectedEmployee ? (
            <Stack spacing={4}>
              <DocumentViewer employeeId={selectedEmployee} />
              <Button colorScheme="teal" onClick={onOpen} mt={4}>
                Add Document
              </Button>
            </Stack>
          ) : (
            <Text>Select an employee to view their documents</Text>
          )}
        </Box>
      </Stack>

      {/* Add Document Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Document</ModalHeader>
          <ModalCloseButton />
          <Box p={4}>
            <AddDocumentForm />
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmployeeDocumentManager;
