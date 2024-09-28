// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Stack,
//   Textarea,
//   Heading,
//   FormErrorMessage,
//   Select,
//   useToast,
//   Flex,
// } from '@chakra-ui/react';

// const AddEmployee = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     position: '',
//     department: '',
//     email: '',
//     phone: '',
//     address: '',
//   });
  
//   const [errors, setErrors] = useState({});
//   const toast = useToast();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.name) tempErrors.name = "Name is required";
//     if (!formData.email) tempErrors.email = "Email is required";
//     if (!formData.phone) tempErrors.phone = "Phone number is required";
//     if (!formData.position) tempErrors.position = "Position is required";
//     if (!formData.department) tempErrors.department = "Department is required";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       onSubmit(formData);
//       toast({
//         title: "Employee Added.",
//         description: "The employee has been successfully added.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//       setFormData({
//         name: '',
//         position: '',
//         department: '',
//         email: '',
//         phone: '',
//         address: '',
//       });
//     }
//   };

//   return (
//     <Flex align="center" justify="center" py={10}>
//       <Box
//         bg="white"
//         p={8}
//         borderRadius="md"
//         shadow="md"
//         width={{ base: '90%', md: '50%' }}
//         maxW="600px"
//       >
//         <Heading mb={6} textAlign="center" size="lg" color="blue.600">
//           Add New Employee
//         </Heading>
//         <form onSubmit={handleSubmit}>
//           <Stack spacing={4}>
//             {/* Name */}
//             <FormControl isInvalid={errors.name}>
//               <FormLabel>Name</FormLabel>
//               <Input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Employee's full name"
//               />
//               <FormErrorMessage>{errors.name}</FormErrorMessage>
//             </FormControl>

//             {/* Position */}
//             <FormControl isInvalid={errors.position}>
//               <FormLabel>Position</FormLabel>
//               <Input
//                 type="text"
//                 name="position"
//                 value={formData.position}
//                 onChange={handleChange}
//                 placeholder="Job position"
//               />
//               <FormErrorMessage>{errors.position}</FormErrorMessage>
//             </FormControl>

//             {/* Department */}
//             <FormControl isInvalid={errors.department}>
//               <FormLabel>Department</FormLabel>
//               <Select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 placeholder="Select department"
//               >
//                 <option value="HR">HR</option>
//                 <option value="Finance">Finance</option>
//                 <option value="Engineering">Engineering</option>
//                 <option value="Marketing">Marketing</option>
//                 <option value="Sales">Sales</option>
//               </Select>
//               <FormErrorMessage>{errors.department}</FormErrorMessage>
//             </FormControl>

//             {/* Email */}
//             <FormControl isInvalid={errors.email}>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Employee's email address"
//               />
//               <FormErrorMessage>{errors.email}</FormErrorMessage>
//             </FormControl>

//             {/* Phone */}
//             <FormControl isInvalid={errors.phone}>
//               <FormLabel>Phone</FormLabel>
//               <Input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Employee's phone number"
//               />
//               <FormErrorMessage>{errors.phone}</FormErrorMessage>
//             </FormControl>

//             {/* Address */}
//             <FormControl>
//               <FormLabel>Address</FormLabel>
//               <Textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="Employee's address"
//               />
//             </FormControl>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               colorScheme="blue"
//               size="lg"
//               width="full"
//             >
//               Add Employee
//             </Button>
//           </Stack>
//         </form>
//       </Box>
//     </Flex>
//   );
// };

// export default AddEmployee;
