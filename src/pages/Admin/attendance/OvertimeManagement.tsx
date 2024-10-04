import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Badge,
  Table,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { FaClock, FaCheck, FaTimes } from "react-icons/fa";
import InputField from "../../../components/ui/InputField"; 
import TextAreaField from "../../../components/ui/TextAreaField"; 
import PageTitle from "../../../components/ui/PageTitle"; 

interface OvertimeRequest {
  id: number;
  employeeId: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const validationSchema = Yup.object({
  employeeId: Yup.string().required("Employee ID is required"),
  employeeName: Yup.string().required("Employee Name is required"),
  date: Yup.date().required("Date is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  reason: Yup.string().required("Reason is required"),
});


const OvertimeManagement: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [overtimeRequests, setOvertimeRequests] = useState<OvertimeRequest[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<OvertimeRequest | null>(null);

  useEffect(() => {
    const savedRequests = localStorage.getItem("overtimeRequests");
    if (savedRequests) {
      setOvertimeRequests(JSON.parse(savedRequests));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("overtimeRequests", JSON.stringify(overtimeRequests));
  }, [overtimeRequests]);

  const formik = useFormik({
    initialValues: {
      employeeId: currentRequest?.employeeId || "",
      employeeName: currentRequest?.employeeName || "",
      date: currentRequest?.date || "",
      startTime: currentRequest?.startTime || "",
      endTime: currentRequest?.endTime || "",
      reason: currentRequest?.reason || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newRequest: OvertimeRequest = {
        id: currentRequest?.id || Date.now(),
        ...values,
        duration: calculateDuration(values.startTime, values.endTime),
        status: currentRequest?.status || "Pending",
      };

      if (currentRequest) {
        setOvertimeRequests(
          overtimeRequests.map((request) =>
            request.id === currentRequest.id ? newRequest : request
          )
        );
      } else {
        setOvertimeRequests([...overtimeRequests, newRequest]);
      }
      setShowModal(false);
      setCurrentRequest(null);
    },
  });


  const columns = [
    {
      title: "Employee",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Duration",
      key: "duration",
      render: (_: any, record: OvertimeRequest) =>
        `${formatDuration(record.duration)}`,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          colorScheme={
            status === "Approved"
              ? "green"
              : status === "Rejected"
              ? "red"
              : "yellow"
          }
        >
          {status}
        </Badge>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: OvertimeRequest) => (
        <Flex>
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => handleShowModal(record)}
          >
            View
          </Button>
          {record.status === "Pending" && (
            <>
              <Button
                variant="link"
                colorScheme="green"
                onClick={() => handleApproveReject(record.id, "Approved")}
              >
                <FaCheck /> Approve
              </Button>
              <Button
                variant="link"
                colorScheme="red"
                onClick={() => handleApproveReject(record.id, "Rejected")}
              >
                <FaTimes /> Reject
              </Button>
            </>
          )}
        </Flex>
      ),
    },
  ];


  const handleShowModal = (request: OvertimeRequest | null) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const handleApproveReject = (id: number, status: "Approved" | "Rejected") => {
    setOvertimeRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };


  const calculateDuration = (startTime: string, endTime: string): number => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    return (end.getTime() - start.getTime()) / 60000;
  };


  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };


  return (
    <Box p={5}>
      <PageTitle title="Overtime Management" />
      <Stack spacing={5}>
        <Box p={6} borderWidth={1} borderRadius="xl" shadow="md" bg="white">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Manage Overtime Requests</Heading>
            <Button
              onClick={() => handleShowModal(null)}
              colorScheme="orange"
              leftIcon={<FaClock />}
            >
              Log Overtime
            </Button>
          </Flex>

          <Table variant="striped" colorScheme="teal" mt={4}>
            <Thead>
              <Tr>
                {columns.map((col) => (
                  <Th key={col.key}>{col.title}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {overtimeRequests.map((request) => (
                <Tr key={request.id} _hover={{ bg: "gray.100" }}>
                  {columns.map((col) => (
                    <Td key={col.key}>{col.render ? col.render(null, request) : request[col.dataIndex]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {currentRequest ? "View Overtime Request" : "Log Overtime"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={formik.handleSubmit}>
                  <InputField
                    label="Employee ID"
                    id="employeeId"
                    name="employeeId"
                    value={formik.values.employeeId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.employeeId}
                  />
                  <InputField
                    label="Employee Name"
                    id="employeeName"
                    name="employeeName"
                    value={formik.values.employeeName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.employeeName}
                  />
                  <InputField
                    label="Date"
                    id="date"
                    name="date"
                    type="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.date}
                  />
                  <InputField
                    label="Start Time"
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={formik.values.startTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.startTime}
                  />
                  <InputField
                    label="End Time"
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={formik.values.endTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.endTime}
                  />
                  <TextAreaField
                    label="Reason"
                    id="reason"
                    name="reason"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.reason}
                  />
                  <ModalFooter>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      type="submit"
                      isLoading={formik.isSubmitting}
                    >
                      {currentRequest ? "Update" : "Log Overtime"}
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Stack>
    </Box>
  );
};

export default OvertimeManagement;
