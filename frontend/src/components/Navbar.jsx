import React from "react";
import { Container, Flex, Box, Button, HStack, Text } from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Container maxW="1140px" px={4} py={2}>
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          flexDir={{ base: "column", sm: "row" }}
        >
          <Text
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            <Link to="/">Product Store</Link>
          </Text>

          <HStack spacing={2} alignItems="center">
            <Link to="/create">
              <Button
                leftIcon={<CiSquarePlus fontSize={20} />}
                colorScheme="blue"
              ></Button>
            </Link>
            <Button onClick={toggleColorMode}>
              {" "}
              {colorMode === "light" ? "Dark" : "Light"}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
