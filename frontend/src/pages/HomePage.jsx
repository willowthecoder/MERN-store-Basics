import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/productcard";
import { Link as ChakraLink } from "@chakra-ui/react";

const HomePage = () => {
  const { fetchproducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchproducts();
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} align="stretch">
        <Text
          fontSize="30px"
          fontWeight="bold"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Current Products
        </Text>

        {loading ? (
          <Box textAlign="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Box>
        ) : products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            textAlign="center"
            fontSize="xl"
            color="gray.500"
            fontWeight="bold"
          >
            No Product Found?{" "}
            <ChakraLink
              as={Link}
              to="/create"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
            >
              Create a Product
            </ChakraLink>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
