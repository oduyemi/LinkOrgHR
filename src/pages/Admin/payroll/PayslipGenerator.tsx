import React, { useState } from 'react';
import { Button, Select, Box, Stack, Spinner, Alert, AlertIcon, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import PageTitle from '../../../components/ui/PageTitle';

const PayslipGenerator = () => {
  const [department, setDepartment] = useState('');
  const [paymentDate, setPaymentDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGeneratePayslips = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/generate-payslips', { department, paymentDate });
      setSuccess(response.data.message || 'Payslips generated successfully!');
    } catch (error) {
      setError('Error generating payslips. Please try again.');
      console.error('Error generating payslips:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={5}>
      <PageTitle title="Payslip Generator" />
      <Stack spacing={5}>
        <Box>
          <FormControl isInvalid={!department}>
            <FormLabel>Select Department</FormLabel>
            <Select
              placeholder="Select Department"
              className="text-black"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="all">All</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
              <option value="engineering">Engineering</option>
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
            </Select>
            <FormErrorMessage>Select a department.</FormErrorMessage>
          </FormControl>
        </Box>
        
        <Box>
          <FormControl isInvalid={!paymentDate}>
            <FormLabel>Payment Date</FormLabel>
            <DatePicker
              onChange={(date) => setPaymentDate(date ? moment(date).format('YYYY-MM-DD') : null)}
              style={{ width: '100%' }}
              placeholder="Select Payment Date"
            />
            <FormErrorMessage>Select a payment date.</FormErrorMessage>
          </FormControl>
        </Box>

        <Button
          onClick={handleGeneratePayslips}
          mt={4}
          isLoading={loading}
          colorScheme="orange"
          isDisabled={!department || !paymentDate} // Disable if department or paymentDate is not selected
        >
          Generate Payslips
        </Button>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success">
            <AlertIcon />
            {success}
          </Alert>
        )}
        {loading && <Spinner />}
      </Stack>
    </Box>
  );
};

export default PayslipGenerator;
