import {
  Button,
  Box,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  useColorMode,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';

const MainContent = styled.main`
  margin: 40px 0;
  text-align: center;
  width: 80%; /* Set the width of the content area */
  max-width: 1200px; /* Set a maximum width if needed */
  margin: auto; /* Center the content */
`;

const DonationSection = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ByteCoinHeading = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
`;

const TotalRaised = styled.h2`
  color: #4caf50;
  margin-bottom: 10px;
`;

const TableContainer = styled.div`
  width: 600%;
  max-width: 1200px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: center;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 15px;
  background-color: ${(props) => (props.isHeader ? "#282c34" : "white")};
  color: ${(props) => (props.isHeader ? "white" : "inherit")};
  font-weight: ${(props) => (props.isHeader ? "bold" : "normal")};
`;

const TableCell = styled.div`
  width: 5000%;
  text-align: center;
`;

function Home() {
  const navigate = useNavigate();
  const charityData = JSON.parse(localStorage.getItem("charities")) || [];

  const handleRowClick = (row) => {
    // Adjust based on how row data is structured
    navigate(`/donation/${row.name}`);
  };

  return (
    <>
      <Flex
        direction="column"
        minHeight="100vh"
        align="center"
        justify="space-between"
        bgImage="url('/stars.png')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        position="relative"
        // filter="brightness(0.8)"
        // bg="gray.100"    // Good color if not using the image background
      >
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg="black"
          opacity="1.0"
          zIndex={-1}
        />

        <Box width="150vh">
          <NavBar />
          <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" mt={28} p={5}>
            <Box flexShrink={0}>
              <Image
                src="blockchain.png"
                alt="Triton"
                borderRadius="lg"
                objectFit="cover"
                width={{ base: "100%", sm: "85%", md: "50%" }}
                maxWidth={{ md: "700px" }}
                height="auto"
              />
            </Box>

            <Box p={5}>
              <Text fontSize="2xl" fontWeight="bold" mb={2} color="gray.300">Our Mission</Text>
              <Text mb={2} fontSize="xl" color="gray.300">
                Empowering generosity with Resilient DB: Transparent, secure, global giving made simple with ByteCoin.
              </Text>
            </Box>
          </Flex>
          
          <MainContent>
            <ByteCoinHeading>Charity Funds</ByteCoinHeading>
            <DonationSection>
              <TableContainer>
                {charityData.map((charity, index) => (
                  <TableRow key={index} onClick={() => handleRowClick(charity)}>
                    <TableCell>{charity.name}</TableCell>
                    <TableCell>${charity.number}</TableCell>
                  </TableRow>
                ))}
              </TableContainer>
            </DonationSection>
          </MainContent>
        </Box>

        <Box
          as="footer"
          mt="auto"
          p="20px"
          bg="#282c34"
          color="white"
          textAlign="center"
          width="100%"
        >
          <p>
            &copy; {new Date().getFullYear()} Donate for a Cause. All rights
            reserved.
          </p>
        </Box>
      </Flex>
    </>
  );
}

export default Home;
