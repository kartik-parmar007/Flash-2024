import { Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ContactLogo } from "../../assets/constants";

const Donate = () => {
  return (
    <Tooltip
      hasArrow
      label={"Product"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        to={"/product"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <ContactLogo />
        <Box display={{ base: "none", md: "block" }}>Product</Box>
      </Link>
    </Tooltip>
  );
};

export default Donate;
