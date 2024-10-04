import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface SalaryRecord {
  id: number;
  employeeNumber: string;
  employeeName: string;
  jobTitle: string;
  department: string;
  baseSalary: number;
  netSalary: number;
  grossSalary: number;
  deductions: number;
  bonus: number;
  taxPayable: number;
  pension: number;
  effectiveDate: string;
  adjustmentType: string;
  adjustmentAmount: number;
  reason: string;
}

const SalaryCalculations: React.FC = () => {
  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<SalaryRecord | null>(null);

  useEffect(() => {
    const savedRecords = localStorage.getItem("salaryRecords");
    if (savedRecords) {
      setSalaryRecords(JSON.parse(savedRecords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("salaryRecords", JSON.stringify(salaryRecords));
  }, [salaryRecords]);

  const handleShowModal = (record: SalaryRecord | null) => {
    setCurrentRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRecord(null);
  };

  const formik = useFormik({
    initialValues: {
      employeeNumber: currentRecord?.employeeNumber || "",
      employeeName: currentRecord?.employeeName || "",
      jobTitle: currentRecord?.jobTitle || "",
      department: currentRecord?.department || "",
      baseSalary: currentRecord?.baseSalary || 0,
      netSalary: currentRecord?.netSalary || 0,
      grossSalary: currentRecord?.grossSalary || 0,
      deductions: currentRecord?.deductions || 0,
      bonus: currentRecord?.bonus || 0,
      taxPayable: currentRecord?.taxPayable || 0,
      pension: currentRecord?.pension || 0,
      effectiveDate: currentRecord?.effectiveDate || "",
      adjustmentType: currentRecord?.adjustmentType || "Initial",
      adjustmentAmount: currentRecord?.adjustmentAmount || 0,
      reason: currentRecord?.reason || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      employeeNumber: Yup.string().required("Employee Number is required"),
      employeeName: Yup.string().required("Employee Name is required"),
      jobTitle: Yup.string().required("Job Title is required"),
      department: Yup.string().required("Department is required"),
      baseSalary: Yup.number()
        .required("Base Salary is required")
        .min(0, "Must be positive"),
      netSalary: Yup.number()
        .required("Net Salary is required")
        .min(0, "Must be positive"),
      grossSalary: Yup.number()
        .required("Gross Salary is required")
        .min(0, "Must be positive"),
      deductions: Yup.number()
        .required("Deductions are required")
        .min(0, "Must be positive"),
      bonus: Yup.number()
        .required("Bonus is required")
        .min(0, "Must be positive"),
      taxPayable: Yup.number()
        .required("Tax Payable is required")
        .min(0, "Must be positive"),
      pension: Yup.number()
        .required("Pension is required")
        .min(0, "Must be positive"),
      effectiveDate: Yup.string(),
      adjustmentType: Yup.string().required("Adjustment Type is required"),
      adjustmentAmount: Yup.number()
        .required("Adjustment Amount is required")
        .min(0, "Must be positive"),
      reason: Yup.string().required("Reason is required"),
    }),
    onSubmit: (values) => {
      const newRecord: SalaryRecord = {
        id: currentRecord?.id || Date.now(),
        ...values,
      };

      if (currentRecord) {
        setSalaryRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.id === currentRecord.id ? newRecord : record
          )
        );
      } else {
        setSalaryRecords((prevRecords) => [...prevRecords, newRecord]);
      }
      handleCloseModal();
    },
  });

  const handleDeleteRecord = (id: number) => {
    setSalaryRecords((prevRecords) =>
      prevRecords.filter((record) => record.id !== id)
    );
  };

  return (
    <Box p={6}>
      <Button onClick={() => handleShowModal(null)} colorScheme="orange">
        Add Salary Record
      </Button>
      <Box mt={4}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Employee Number</Th>
              <Th>Employee Name</Th>
              <Th>Job Title</Th>
              <Th>Department</Th>
              <Th>Net Salary</Th>
              <Th>Gross Salary</Th>
              <Th>Deductions</Th>
              <Th>Bonus</Th>
              <Th>Tax Payable</Th>
              <Th>Pension</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {salaryRecords.map((record) => (
              <Tr key={record.id}>
                <Td>{record.employeeNumber}</Td>
                <Td>{record.employeeName}</Td>
                <Td>{record.jobTitle}</Td>
                <Td>{record.department}</Td>
                <Td>${record.netSalary.toFixed(2)}</Td>
                <Td>${record.grossSalary.toFixed(2)}</Td>
                <Td>${record.deductions.toFixed(2)}</Td>
                <Td>${record.bonus.toFixed(2)}</Td>
                <Td>${record.taxPayable.toFixed(2)}</Td>
                <Td>${record.pension.toFixed(2)}</Td>
                <Td>
                  <Button
                    colorScheme="orange"
                    onClick={() => handleShowModal(record)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteRecord(record.id)}
                    ml={2}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentRecord ? "Adjust Salary" : "Add New Salary Record"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={!!formik.errors.employeeNumber}>
                <FormLabel>Employee Number</FormLabel>
                <Input
                  name="employeeNumber"
                  value={formik.values.employeeNumber}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isInvalid={!!formik.errors.employeeName} mt={4}>
                <FormLabel>Employee Name</FormLabel>
                <Input
                  name="employeeName"
                  value={formik.values.employeeName}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isInvalid={!!formik.errors.jobTitle} mt={4}>
                <FormLabel>Job Title</FormLabel>
                <Input
                  name="jobTitle"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isInvalid={!!formik.errors.department} mt={4}>
                <FormLabel>Department</FormLabel>
                <Input
                  name="department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isInvalid={!!formik.errors.baseSalary} mt={4}>
                <FormLabel>Base Salary</FormLabel>
                <Input
                  name="baseSalary"
                  type="number"
                  value={formik.values.baseSalary}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isInvalid={!!formik.errors.netSalary} mt={4}>
                <FormLabel>Net Salary</FormLabel>
                <Input
                  name="netSalary"
                  type="number"
                  value={formik.values.netSalary}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isInvalid={!!formik.errors.grossSalary} mt={4}>
                <FormLabel>Gross Salary</FormLabel>
                <Input
                  name="grossSalary"
                  type="number"
                  value={formik.values.grossSalary}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isInvalid={!!formik.errors.deductions} mt={4}>
                <FormLabel>Deductions</FormLabel>
                <Input
                  name="deductions"
                  type="number"
                  value={formik.values.deductions} onChange={formik.handleChange} /> </FormControl>
                            <FormControl isInvalid={!!formik.errors.bonus} mt={4}>
            <FormLabel>Bonus</FormLabel>
            <Input
              name="bonus"
              type="number"
              value={formik.values.bonus}
              onChange={formik.handleChange}
            />
          </FormControl>

          <FormControl isInvalid={!!formik.errors.taxPayable} mt={4}>
            <FormLabel>Tax Payable</FormLabel>
            <Input
              name="taxPayable"
              type="number"
              value={formik.values.taxPayable}
              onChange={formik.handleChange}
            />
          </FormControl>

          <FormControl isInvalid={!!formik.errors.pension} mt={4}>
            <FormLabel>Pension</FormLabel>
            <Input
              name="pension"
              type="number"
              value={formik.values.pension}
              onChange={formik.handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Effective Date</FormLabel>
            <Input
              name="effectiveDate"
              type="date"
              value={formik.values.effectiveDate}
              onChange={formik.handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Adjustment Type</FormLabel>
            <Select
              name="adjustmentType"
              value={formik.values.adjustmentType}
              onChange={formik.handleChange}
            >
              <option value="Initial">Initial</option>
              <option value="Increase">Increase</option>
              <option value="Decrease">Decrease</option>
            </Select>
          </FormControl>

          <FormControl mt={4} isInvalid={!!formik.errors.adjustmentAmount}>
            <FormLabel>Adjustment Amount</FormLabel>
            <Input
              name="adjustmentAmount"
              type="number"
              value={formik.values.adjustmentAmount}
              onChange={formik.handleChange}
            />
          </FormControl>

          <FormControl mt={4} isInvalid={!!formik.errors.reason}>
            <FormLabel>Reason for Adjustment</FormLabel>
            <Textarea
              name="reason"
              value={formik.values.reason}
              onChange={formik.handleChange}
            />
          </FormControl>

          <Button mt={4} colorScheme="orange" type="submit">
            {currentRecord ? "Update Record" : "Add Record"}
          </Button>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="gray" onClick={handleCloseModal}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</Box>
  )
}


export default SalaryCalculations;