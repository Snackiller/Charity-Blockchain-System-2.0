import {
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  useColorMode,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css';
import { Link as RouterLink } from 'react-router-dom';
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.text();
      if (response.ok) {
        console.log('Login successful');
        onLoginSuccess();
        navigate('/home');
      } else {
        console.log('Login failed:', data);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };


  return (
    <>
      <Helmet>
        <title>Login | Charity-Blockchain-System</title>
        <meta name="description" content="Login to the Charity Blockchain System" />
      </Helmet>
  
      <Flex
        className={colorMode === "light" ? "auth-background" : ""}
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        bg={colorMode === "light" ? "gray.200" : "gray.800"}
      >
        <Flex
          as="form"
          onSubmit={handleFormSubmit}
          direction="column"
          align="center"
          py="4"
          width="100%" // Set the width as needed
          maxWidth="360px" // Set a max-width as needed for form
        >
          <Image src="/logo.png" w="100px" />
          <Heading as="h1" size="2xl" mb="2">
            Welcome back
          </Heading>
          <Text color="gray.600" mb="8">
            Login to Charity Blockchain System
          </Text>
          <FormControl id="username" isRequired>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              borderColor="gray.300" // default border color
              _hover={{ borderColor: "gray.400" }} // border color on hover
              focusBorderColor="blue.500" // border color on focus
            />
          </FormControl>
          <FormControl id="password" isRequired mt="4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderColor="gray.300" // default border color
              _hover={{ borderColor: "gray.400" }} // border color on hover
              focusBorderColor="blue.500" // border color on focus
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt="4">
            Login
          </Button>
          <Text mt="4">
            Don't have an account?{" "}
            <ChakraLink as={RouterLink} to="/register" color="blue.500">
              Register here
            </ChakraLink>
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
