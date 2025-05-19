import { Box, Flex, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const bgColor = useColorModeValue("gray.800", "gray.900");
  const textColor = useColorModeValue("white", "gray.300");
//   const borderColor = useColorModeValue("white", "gray.600");

  return (
    <Box
      bgColor={bgColor}
      color={textColor}
      borderRadius={4}
      padding={5}
      boxShadow={useColorModeValue("sm", "lg")}
      border=".1px solid white"
    >
      <VStack spacing={4}>
        <Image src="/logo.png" h={24} cursor={"pointer"} alt="Instagram" />

        {isLogin ? <Login /> : <Signup />}

        {/* ---------------- OR -------------- */}
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          my={1}
          gap={1}
          w={"full"}
        >
          <Box flex={2} h={"1px"} bg={"gray.400"} />
          <Text mx={1} color={"white"}>
            OR
          </Text>
          <Box flex={2} h={"1px"} bg={"gray.400"} />
        </Flex>

        <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
      </VStack>

      <Flex alignItems={"center"} justifyContent={"center"} h={20}>
        <Box mx={2} fontSize={14}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Box>
        <Box
          onClick={() => setIsLogin(!isLogin)}
          color={"blue.500"}
          cursor={"pointer"}
          _hover={{ textDecoration: "underline", color: "purple.400" }}
        >
          {isLogin ? "Sign up" : "Log in"}
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
