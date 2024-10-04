import React, { useState, useEffect } from 'react';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Select } from '@chakra-ui/react';
import axios from 'axios';
import PageTitle from '../../../components/ui/PageTitle';

const PayrollCompliance = () => {
  const [complianceRecords, setComplianceRecords] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchComplianceRecords = async () => {
      const response = await axios.get('/api/compliance-records');
      setComplianceRecords(response.data);
    };

    fetchComplianceRecords();
  }, []);

  const handleFilterChange = async (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    
    const response = await axios.get(`/api/compliance-records?filter=${selectedFilter}`);
    setComplianceRecords(response.data);
  };

  return (
    <Box p={5}>
      <PageTitle title="Payroll Compliance" />
      <Select placeholder="Filter by Status" onChange={handleFilterChange} mb={4}>
        <option value="all">All</option>
        <option value="compliant">Compliant</option>
        <option value="non-compliant">Non-Compliant</option>
      </Select>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Employee Name</Th>
            <Th>Department</Th>
            <Th>Status</Th>
            <Th>Last Audit Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {complianceRecords.map((record) => (
            <Tr key={record.id}>
              <Td>{record.employeeName}</Td>
              <Td>{record.department}</Td>
              <Td>{record.status}</Td>
              <Td>{record.lastAuditDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PayrollCompliance;
