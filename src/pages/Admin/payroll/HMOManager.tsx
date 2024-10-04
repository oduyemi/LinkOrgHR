import React, { useState } from 'react';
import { Box, Button, Select, FormControl, FormLabel, Stack, Textarea } from '@chakra-ui/react';
import PageTitle from '../../../components/ui/PageTitle';

const HMOManager = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [hmoPlan, setHmoPlan] = useState('');
  const [notes, setNotes] = useState('');

  // Dummy HMO plans data
  const hmoPlans = [
    { id: 1, name: 'Basic Plan' },
    { id: 2, name: 'Standard Plan' },
    { id: 3, name: 'Premium Plan' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log({
      employeeId,
      employeeName,
      hmoPlan,
      notes,
    });
    // Clear fields after submission
    setEmployeeId('');
    setEmployeeName('');
    setHmoPlan('');
    setNotes('');
  };

  return (
    <Box p={5}>
      <PageTitle title="HMO Manager" />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} className="text-black">
          <FormControl>
            <FormLabel>Employee ID</FormLabel>
            <input
              type="text"
              value={employeeId}
              placeholder="030"
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Employee Name</FormLabel>
            <input
              type="text"
              placeholder="Alice John"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>HMO Plan</FormLabel>
            <Select
              placeholder="Select HMO Plan"
              value={hmoPlan}
              onChange={(e) => setHmoPlan(e.target.value)}
              required
            >
              {hmoPlans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information..."
            />
          </FormControl>

          <Button type="submit" colorScheme="orange">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default HMOManager;
