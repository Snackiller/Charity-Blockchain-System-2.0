import { 
  Box, 
  Input, 
  Textarea, 
  Button, 
  Heading, 
  FormControl, 
  FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react';
import { initWeb3, createNewFund } from '../../services/Web3Client.js';
import '../css/CreatePage.css';

function CreatePage() {
  const [charityName, setCharityName] = useState('');
  const [fundsRequired, setFundsRequired] = useState('');
  const [description, setDescription] = useState('');


const createFund = async () => {
  if (!charityName || !fundsRequired || !description) {
    alert("Please fill all the fields");
    return;
  }
  
  console.log('Creating fund:', { charityName, fundsRequired, description });
  await createNewFund(charityName, fundsRequired, description);

  // Retrieve existing charities and add new one
  if (window.confirm("Confirm")) {
  const existingCharities = JSON.parse(localStorage.getItem('charities')) || [];
  existingCharities.push({ 
    name: charityName, 
    number: fundsRequired,
    description: description  // Include description here
  });
  localStorage.setItem('charities', JSON.stringify(existingCharities));
  setCharityName('');
  setFundsRequired('');
  setDescription('');
  }
};


return (
  <Box className="charity-container" p={5}>
    <Heading mb={4}>Create a Charity Fund</Heading>
    <Box className="charity-section" p={5}>
      <FormControl id="charity-form">
        <FormLabel>Charity Name</FormLabel>
        <Input
          type="text"
          placeholder="Charity Name"
          value={charityName}
          onChange={(e) => setCharityName(e.target.value)}
        />
        <FormLabel mt={4}>Funds to be Raised</FormLabel>
        <Input
          type="number"
          placeholder="Funds to be raised"
          min="1"
          step="1"
          value={fundsRequired}
          onChange={(e) => setFundsRequired(e.target.value)}
        />
        <FormLabel mt={4}>Description</FormLabel>
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
        <Button onClick={createFund} colorScheme="blue" mt={4}>Create</Button>
      </FormControl>
    </Box>
  </Box>
);
}

export default CreatePage;
