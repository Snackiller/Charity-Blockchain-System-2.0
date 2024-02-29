import { Box, Link, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="transparent" // Set the background to transparent
      position="absolute" // Position it absolutely relative to its parent
      top="0"
      right="0"
      left="0"
      zIndex="10" // Higher index to ensure it's above the background image
    >
      <Box>
        <Link as={RouterLink} to="/home">
          ByteCoin
        </Link>
      </Box>
      {!isAuthPage && (
        <Box display="flex" alignItems="center">
          <Link as={RouterLink} to="/home" mx="2">
            Home
          </Link>
          <Link as={RouterLink} to="/create" mx="2">
            Create
          </Link>
          <Link as={RouterLink} to="/logout" mx="2">
            Logout
          </Link>
        </Box>
      )}
    </Flex>
  );
}

export default NavBar;
