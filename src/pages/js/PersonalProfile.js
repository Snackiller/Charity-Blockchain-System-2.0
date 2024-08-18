import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { saveProfile, getProfile } from "../../utils/resDbClient";
import NavBar from "./NavBar";

function PersonalProfile() {
  const [username, setUsername] = useState("your-username");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [profileText, setProfileText] = useState("");
  const [profileImage, setProfileImage] = useState("/profile.png");

  // Load saved profile data from localStorage
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(username);
        const { name, profession, email, profileText, profileImage } = profile.getProfile;
        if (name) setName(name);
        if (profession) setProfession(profession);
        if (email) setEmail(email);
        if (profileText) setProfileText(profileText);
        if (profileImage) setProfileImage(profileImage);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [username]);

  const handleSaveProfile = async () => {
    const profileData = {
      username,
      name,
      profession,
      email,
      profileText,
      profileImage,
    };

    try {
      await saveProfile(profileData);
      alert("Profile information saved!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile information");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setProfileImage(upload.target.result);
      };
      reader.readAsDataURL(file);
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
            <Box flexShrink={0} mb={5} textAlign="center">
              <Image
                src={profileImage}
                alt="Profile Picture"
                borderRadius="full"
                objectFit="cover"
                boxSize="150px"
                mx="auto"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                mt={2}
              />
            </Box>

            <Box
              p={5}
              width={{ base: "100%", md: "50%" }}
              bg="rgba(0, 0, 0, 0.5)"
              borderRadius="lg"
            >
              <FormControl>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  mb={2}
                  color="white"
                  bg="rgba(255, 255, 255, 0.1)"
                />
              </FormControl>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  mb={2}
                  color="white"
                  bg="rgba(255, 255, 255, 0.1)"
                />
              </FormControl>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  mb={2}
                  color="white"
                  bg="rgba(255, 255, 255, 0.1)"
                />
              </FormControl>
              <FormControl>
                <Textarea
                  placeholder="Profile Text"
                  value={profileText}
                  onChange={(e) => setProfileText(e.target.value)}
                  mb={4}
                  color="white"
                  bg="rgba(255, 255, 255, 0.1)"
                  height="150px"
                />
              </FormControl>
              <Divider />
              <VStack spacing={4} mt={4}>
                <Button colorScheme="blue" size="lg" onClick={handleSaveProfile}>
                  Save Profile
                </Button>
              </VStack>
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

export default PersonalProfile;
