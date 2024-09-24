import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  Heading,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { savePost, getPosts } from "../../utils/forumDbClient";
import NavBar from "./NavBar";

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSavePost = async () => {
    if (!newPost.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    const newPostData = {
      content: newPost,
      timestamp: new Date().toLocaleString(),
    };

    try {
      await savePost(newPostData);
      setPosts([newPostData, ...posts]);
      setNewPost("");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
    }
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
          opacity="0.7"
          zIndex={-1}
        />

        <Container maxW="container.xl" mt={10}>
          <NavBar />
          <Flex
            direction="column"
            align="center"
            justify="center"
            mt={28}
            p={5}
          >
            <Box
              p={5}
              width={{ base: "100%", md: "50%" }}
              bg="rgba(0, 0, 0, 0.5)"
              borderRadius="lg"
            >
              <FormControl>
                <Textarea
                  placeholder="Create a New Post..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  mb={4}
                  color="white"
                  bg="rgba(255, 255, 255, 0.1)"
                  height="150px"
                />
              </FormControl>
              <VStack spacing={4} mt={4}>
                <Button colorScheme="blue" size="lg" onClick={handleSavePost}>
                  Post
                </Button>
              </VStack>
            </Box>

            <Divider my={6} />

            <Box
              width={{ base: "100%", md: "50%" }}
              bg="rgba(0, 0, 0, 0.5)"
              p={5}
              borderRadius="lg"
            >
              <Heading as="h2" color="white" size="md" mb={4}>
              The post list
              </Heading>
              {posts.length === 0 ? (
                <Text color="white">There are no posts yet, go ahead and create one!</Text>
              ) : (
                posts.map((post, index) => (
                  <Box
                    key={index}
                    p={4}
                    mb={4}
                    bg="rgba(255, 255, 255, 0.1)"
                    borderRadius="lg"
                  >
                    <Text color="white" fontSize="md" mb={2}>
                      {post.content}
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                      {post.timestamp}
                    </Text>
                  </Box>
                ))
              )}
            </Box>
          </Flex>
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
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export default Forum;
