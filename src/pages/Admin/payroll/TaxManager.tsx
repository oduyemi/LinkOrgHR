import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, FormControl, FormLabel, useDisclosure } from '@chakra-ui/react';

interface TaxRate {
  id: number;
  name: string;
  rate: number;
  effectiveDate: string;
}

const initialTaxRates: TaxRate[] = [
  { id: 1, name: 'Low Income', rate: 5, effectiveDate: '2024-01-01' },
  { id: 2, name: 'Middle Income', rate: 10, effectiveDate: '2024-01-01' },
  { id: 3, name: 'High Income', rate: 15, effectiveDate: '2024-01-01' },
];

const TaxManager: React.FC = () => {
  const [taxRates, setTaxRates] = useState<TaxRate[]>(initialTaxRates);
  const [newTaxRate, setNewTaxRate] = useState({ name: '', rate: 0, effectiveDate: '' });
  const [editingTaxRate, setEditingTaxRate] = useState<TaxRate | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTaxRate = () => {
    if (editingTaxRate) {
      setTaxRates(taxRates.map(rate => (rate.id === editingTaxRate.id ? { ...editingTaxRate, ...newTaxRate } : rate)));
    } else {
      setTaxRates([...taxRates, { ...newTaxRate, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEditTaxRate = (taxRate: TaxRate) => {
    setEditingTaxRate(taxRate);
    setNewTaxRate({ name: taxRate.name, rate: taxRate.rate, effectiveDate: taxRate.effectiveDate });
    onOpen();
  };

  const handleDeleteTaxRate = (id: number) => {
    setTaxRates(taxRates.filter(rate => rate.id !== id));
  };

  const resetForm = () => {
    setNewTaxRate({ name: '', rate: 0, effectiveDate: '' });
    setEditingTaxRate(null);
    onClose();
  };

  return (
    <Box p={5}>
      <Button onClick={onOpen} colorScheme="orange">Add New Tax Rate</Button>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Tax Name</Th>
            <Th>Rate (%)</Th>
            <Th>Effective Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody className="text-black">
          {taxRates.map((rate) => (
            <Tr key={rate.id}>
              <Td>{rate.name}</Td>
              <Td>{rate.rate}</Td>
              <Td>{rate.effectiveDate}</Td>
              <Td>
                <Button onClick={() => handleEditTaxRate(rate)} colorScheme="orange">Edit</Button>
                <Button onClick={() => handleDeleteTaxRate(rate.id)} colorScheme="red" ml={2}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for adding/editing tax rates */}
      {isOpen && (
        <Box mt={4} p={5} borderWidth={1} borderRadius="md" boxShadow="md">
          <FormControl className="text-black" id="name">
            <FormLabel>Tax Name</FormLabel>
            <Input value={newTaxRate.name} onChange={(e) => setNewTaxRate({ ...newTaxRate, name: e.target.value })} />
          </FormControl>
          <FormControl className="text-black" id="rate" mt={4}>
            <FormLabel>Rate (%)</FormLabel>
            <Input type="number" value={newTaxRate.rate} onChange={(e) => setNewTaxRate({ ...newTaxRate, rate: Number(e.target.value) })} />
          </FormControl>
          <FormControl className="text-black" id="effectiveDate" mt={4}>
            <FormLabel>Effective Date</FormLabel>
            <Input type="date" value={newTaxRate.effectiveDate} onChange={(e) => setNewTaxRate({ ...newTaxRate, effectiveDate: e.target.value })} />
          </FormControl>
          <Button onClick={handleAddTaxRate} mt={4} colorScheme="orange">{editingTaxRate ? 'Update' : 'Add'} Tax Rate</Button>
          <Button onClick={resetForm} mt={4} ml={2} variant="outline" colorScheme="orange">Cancel</Button>
        </Box>
      )}
    </Box>
  );
};

export default TaxManager;
