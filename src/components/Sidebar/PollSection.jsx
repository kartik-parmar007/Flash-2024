import { Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { PollLogo } from "../../assets/constants";

const Event = () => {
  return (
    <Tooltip
      hasArrow
      label={"Poll"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        to={"/poll"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <PollLogo />
        <Box display={{ base: "none", md: "block" }}>Poll</Box>
      </Link>
    </Tooltip>
  );
};

export default Event;
