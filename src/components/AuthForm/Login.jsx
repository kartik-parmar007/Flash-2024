import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { auth } from "../../firebase/firebase"; // import your Firebase config file
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { loading, error, login } = useLogin();
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const toast = useToast();

  const handleForgotPassword = async () => {
    if (!inputs.email) {
      toast({
        title: "Email required",
        description: "Please enter your email to reset password.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, inputs.email);
      setResetEmailSent(true);
      toast({
        title: "Password reset email sent",
        description: "Check your inbox to reset your password.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error sending password reset email",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Function to handle both button click and "Enter" key press
  const handleLogin = () => login(inputs);

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Password"
        fontSize={14}
        size={"sm"}
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
      />
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={handleLogin}
      >
        Log in
      </Button>

      {/* Forgot Password Link */}
      <Text
        mt={2}
        fontSize={12}
        color="blue.500"
        cursor="pointer"
        onClick={handleForgotPassword}
        _hover={{ textDecoration: "underline", color: "blue.400" }}
      >
        Forgot Password?
      </Text>
      {resetEmailSent && (
        <Alert status="success" fontSize={13} p={2} borderRadius={4} mt={2}>
          <AlertIcon fontSize={12} />
          Password reset email has been sent!
        </Alert>
      )}
    </>
  );
};

export default Login;
