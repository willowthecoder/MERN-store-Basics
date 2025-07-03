import React from "react";
import {
  Box,
  Image,
  Heading,
  useColorModeValue,
  VStack,
  Input,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IconButton, Text, HStack, Button } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  const [updatedproduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.800", "gray.200");
  const bgColor = useColorModeValue("white", "gray.700");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateHandleproduct = async (pid, updatedProduct) => {
    let { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Product Not Updated.",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product  Updated.",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Product Can't be deleted.",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product Deleted.",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
      }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={"2"}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize={"xl"} color={textColor}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<MdEdit />} colorScheme={"blue"} onClick={onOpen} />
          <IconButton
            icon={<MdDelete />}
            colorScheme={"blue"}
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <VStack spacing={4} p={6}>
            <Input
              placeholder="Product-name"
              name="name"
              value={updatedproduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedproduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={updatedproduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedproduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image Url"
              name="image"
              value={updatedproduct.image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedproduct, image: e.target.value })
              }
            />
          </VStack>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => updateHandleproduct(product._id, updatedproduct)}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
