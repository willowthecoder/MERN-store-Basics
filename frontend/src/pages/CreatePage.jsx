import React, { useState } from "react";
import {
  Button,
  Container,
  VStack,
  Box,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useProductStore } from "../store/product.js"; // Importing the product store
const CreatePage = () => {
  const [newproduct, setnewproduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();

  const { createProduct } = useProductStore();

  const handleAddproduct = async () => {
    const { success } = await createProduct(newproduct);
    if (!success) {
      toast({
        title: "Product Not Created.",
        description: "Product creation failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product created.",
        description: "Product creation successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setnewproduct({ name: "", price: "", image: "" }); // Reset the form after submission
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        mb={8}
        bgGradient="linear(to-r, cyan.400, blue.500)"
        bgClip="text"
      >
        Create New Product
      </Heading>

      <Box
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        rounded="lg"
        shadow="md"
      >
        <VStack spacing={4}>
          <Input
            placeholder="Product Name"
            name="name"
            value={newproduct.name}
            onChange={(e) =>
              setnewproduct({ ...newproduct, name: e.target.value })
            }
          />
          <Input
            placeholder="Price"
            name="price"
            type="number"
            value={newproduct.price}
            onChange={(e) =>
              setnewproduct({ ...newproduct, price: e.target.value })
            }
          />
          <Input
            placeholder="Image URL"
            name="image"
            value={newproduct.image}
            onChange={(e) =>
              setnewproduct({ ...newproduct, image: e.target.value })
            }
          />
          <Button colorScheme="blue" w="full" onClick={handleAddproduct}>
            Submit
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreatePage;
