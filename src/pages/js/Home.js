import React from "react";
import {
  Button,
  Box,
  Divider,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  useColorMode,
  Link as ChakraLink,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Home() {
  const navigate = useNavigate();
  const charityData = JSON.parse(localStorage.getItem("charities")) || [];

  const handleRowClick = (row) => {
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

        <Container maxW="container.xl" mt={10}>
          <NavBar />
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="center"
            mt={28}
            p={5}
          >
            <Box flexShrink={0}>
              <Image
                src="/blockchain.png"
                alt="Triton"
                borderRadius="lg"
                objectFit="cover"
                width={{ base: "100%", sm: "85%", md: "50%" }}
                maxWidth="700px"
                height="auto"
              />
            </Box>

            <Box p={5} ml={-10}>
              <Text fontSize="2xl" fontWeight="bold" mb={2} color="gray.300">
                Our Mission
              </Text>
              <Text mb={2} fontSize="xl" color="gray.300">
                Empowering generosity with Resilient DB: Transparent, secure,
                global giving made simple with ByteCoin.
              </Text>
            </Box>
          </Flex>

          <Divider />

          <VStack spacing={4} my={10}>
            <Heading as="h1" size="xl" color="whitesmoke">
              Charity Funds
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="silver">Charity Name</Th>
                  <Th isNumeric color="silver">
                    Funds Needed
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {charityData.map((charity, index) => (
                  <Tr
                    key={index}
                    onClick={() => handleRowClick(charity)}
                    cursor="pointer"
                  >
                    <Td color="silver">{charity.name}</Td>
                    <Td isNumeric color="silver">
                      ${charity.funds_needed}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        </Container>

        <Box
          as="footer"
          mt="auto"
          p="20px"
          bg="#282c34"
          color="white"
          textAlign="center"
          width="full"
        >
          <Text>
            &copy; {new Date().getFullYear()} Donate for a Cause. All rights
            reserved.
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export default Home;
