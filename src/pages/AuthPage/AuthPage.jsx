import {
  Container,
  Flex,
  VStack,
  Box,
  Image,
  keyframes,
} from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

// Keyframes for fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Keyframes for a subtle background animation
const moveBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AuthPage = () => {
  return (
    <Flex
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"black"} // Background set to black
      px={4}
      overflow={"hidden"}
    >
      <Container
        maxW={"container.md"}
        animation={`${moveBackground} 20s ease infinite`} // Smooth background movement
        backgroundSize="200% 200%"
        borderRadius={"lg"}
        p={8}
        boxShadow="2xl"
      >
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* Left-hand side with hover and animation effects */}
          <Box
            display={{ base: "none", md: "block" }}
            overflow={"hidden"}
            borderRadius={"md"}
            _hover={{
              transform: "scale(1.05)",
              transition: "transform 0.5s ease-in-out",
            }}
            boxShadow="lg"
          >
            <Image
              src="/auth1.jpg"
              h={600}
              w={530}
              alt="Phone img"
              objectFit={"cover"}
              borderRadius="md"
              _hover={{
                filter: "brightness(0.9)",
              }}
            />
          </Box>

          {/* Right-hand side with fade-in animation */}
          <VStack
            spacing={6}
            align={"stretch"}
            animation={`${fadeIn} 1s ease-in-out`}
            p={6}
            bg={"rgba(255, 255, 255, 0.1)"}
            borderRadius="lg"
            boxShadow="md"
            position="relative"
          >
            <AuthForm />
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
