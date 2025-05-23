import { Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { DonationLogo } from "../../assets/constants";

const Donate = () => {
  return (
    <Tooltip
      hasArrow
      label={"Donation"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        to={"/donation"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <DonationLogo />
        <Box display={{ base: "none", md: "block" }}>Donation</Box>
      </Link>
    </Tooltip>
  );
};

export default Donate;
