import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  Heading,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import bronze from "../../../public/bronge.png";
import gold from "../../../public/gold.png";
import master from "../../../public/master.png";
import grandmster from "../../../public/grand_master.png";
import silver from "../../../public/silver.png";



// Badge threshold logic
const getBadgeDetails = (points) => {
  if (points >= 10000) return { badge: "Grand Master", color: "#FFD700" };
  if (points >= 4000) return { badge: "Master", color: "#FF6347" };
  if (points >= 1000) return { badge: "Gold", color: "#FFA500" };
  if (points >= 500) return { badge: "Silver", color: "#C0C0C0" };
  return { badge: "Bronze", color: "#CD7F32" };
};

const BadgeSectionPage = () => {
  const [points, setPoints] = useState(0);
  const [badgeDetails, setBadgeDetails] = useState({
    badge: "Bronze",
    color: "#CD7F32",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Load points on component mount
  useEffect(() => {
    const storedPoints = parseInt(
      localStorage.getItem("userPoints") || "0",
      10
    );
    setPoints(storedPoints);
    setBadgeDetails(getBadgeDetails(storedPoints));
  }, [location]);

  // Go back to post footer
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box p={6} bg="#f4f4f4" minH="100vh">
      <Flex justify="center" align="center" direction="column">
        {/* Badge Display */}
        <Heading mb={4} color={badgeDetails.color}>
          🎖️ Congratulations!
        </Heading>
        <Text fontSize="lg" mb={6} color={"orange"}>
          You've earned a{" "}
          <Text as="span" fontWeight="bold" color={badgeDetails.color}>
            {badgeDetails.badge}
          </Text>{" "}
          badge.
        </Text>
        <Box
          bg={badgeDetails.color}
          color="white"
          p={8}
          borderRadius="10px"
          boxShadow="lg"
          _hover={{
            transform: "scale(1.05)",
            transition: "all 0.3s ease",
          }}
        >
          <Flex justify="center" align="center" direction="column">
            <Image
              src={bronze}
              alt={`${badgeDetails.badge} badge`}
              borderRadius="full"
              mb={4}
              boxShadow="md"
              boxSize="100px"
            />
            <Text fontSize="2xl" fontWeight="bold">
              {badgeDetails.badge} Badge
            </Text>
            <Text mt={2} fontSize="lg">
              Total Points: {points}
            </Text>
          </Flex>
        </Box>

        {/* Section for Badge Information */}
        <Box mt={10} w="full" maxW="600px">
          <Heading size="md" mb={4} color="teal.600">
            Badges & Points Information
          </Heading>
          <VStack spacing={4} align="stretch">
            {/* Bronze Badge Info */}
            <Box
              p={4}
              bg="gray.50"
              borderRadius="md"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
              color="orange"
            >
              <Image src={bronze} boxSize="50px" display="inline-block" />
              <Text display="inline-block" ml={4} fontWeight="bold">
                Bronze: Less than 500 points
              </Text>
            </Box>

            {/* Silver Badge Info */}
            <Box
              p={4}
              bg="gray.50"
              borderRadius="md"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
              color="orange"
            >
              <Image src={silver} boxSize="50px" display="inline-block" />
              <Text display="inline-block" ml={4} fontWeight="bold">
                Silver: 500 - 999 points
              </Text>
            </Box>

            {/* Gold Badge Info */}
            <Box
              p={4}
              bg="gray.50"
              borderRadius="md"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
              color="orange"
            >
              <Image src={gold} boxSize="50px" display="inline-block" />
              <Text display="inline-block" ml={4} fontWeight="bold">
                Gold: 1000 - 3999 points
              </Text>
            </Box>

            {/* Master Badge Info */}
            <Box
              p={4}
              bg="gray.50"
              borderRadius="md"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
              color="orange"
            >
              <Image src={master} boxSize="50px" display="inline-block" />
              <Text display="inline-block" ml={4} fontWeight="bold">
                Master: 4000 - 9999 points
              </Text>
            </Box>

            {/* Grand Master Badge Info */}
            <Box
              p={4}
              bg="gray.50"
              borderRadius="md"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
              color="orange"
            >
              <Image src={grandmster} boxSize="50px" display="inline-block" />
              <Text display="inline-block" ml={4} fontWeight="bold">
                Grand Master: 10,000+ points
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Navigation */}
        <Button
          mt={8}
          colorScheme="teal"
          onClick={handleGoBack}
          _hover={{ bg: "teal.600", color: "white" }}
        >
          Go Back to Posts
        </Button>
      </Flex>
    </Box>
  );
};

export default BadgeSectionPage;
