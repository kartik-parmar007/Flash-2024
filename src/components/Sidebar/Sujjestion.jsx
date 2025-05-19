import { Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { UsersLogo } from "../../assets/constants";

const Donate = () => {
  return (
    <Tooltip
      hasArrow
      label="Suggestion"
      placement="left"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={{ base: "flex", md: "none" }} // Show as flex on mobile and hide on md and larger
        to="/suggest"
        as={RouterLink}
        alignItems="left"
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        justifyContent="left"
      >
        <UsersLogo />
        <Box display={{ base: "none", md: "none" }}>Donation</Box>{" "}
        {/* Show only on mobile */}
      </Link>
    </Tooltip>
  );
};

export default Donate;
