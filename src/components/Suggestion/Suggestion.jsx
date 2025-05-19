import  { useRef } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
import SuggestedHeader from "../SuggestedUsers/SuggestedHeader";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="asaprogrammer" ref={searchRef} />
              </FormControl>

              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  // Optional: Render loading skeleton or spinner
  if (isLoading) return null;

  return (
    <VStack
      spacing={4}
      p={6}
      w="85vw"
      h="100vh"
      overflowY="auto"
      bg="gray.50" // Optional: Add background color to differentiate the section
      background="black"
    >
      <SuggestedHeader />

      {suggestedUsers.length !== 0 && (
        <Flex
          alignItems="center"
          justifyContent="space-between"
          w="full"
          p={4}
          bg="white" // Optional: Background color for the header section
          boxShadow="md" // Optional: Add shadow for visual separation
        >
          <Text fontSize={16} fontWeight="bold" color="gray.600">
            Suggested for you
          </Text>
          <Text
            fontSize={14}
            fontWeight="bold"
            _hover={{ color: "gray.400" }}
            cursor="pointer"
          >
            See All
          </Text>
        </Flex>
      )}

      <VStack spacing={4} w="full">
        {suggestedUsers.map((user) => (
          <SuggestedUser user={user} key={user.id} />
        ))}
      </VStack>

      <Box fontSize={12} color="gray.600" mt={5} alignSelf="start">
        © 2024 Built By{" "}
        <Link
          href="https://kartik-parmar.netlify.app/"
          target="_blank"
          color="blue.500"
          fontSize={14}
        >
          Kartik Parmar
        </Link>
      </Box>
    </VStack>
  );
};

const CombinedSearchAndSuggestedUsers = () => {
  return (
    <VStack spacing={6} w="full" h="100vh" justifyContent="space-between">
      {/* Suggested Users section on top */}
      <SuggestedUsers />

      {/* Search section on bottom */}
      <Box w="full" p={4}  bottom={0}>
        <Search />
      </Box>
    </VStack>
  );
};

export default CombinedSearchAndSuggestedUsers;
