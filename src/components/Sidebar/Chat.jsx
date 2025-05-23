import { Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ChatLogo } from "../../assets/constants";

const Chat = () => {
  return (
    <Tooltip
      hasArrow
      label={"ChatRoom"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        to={"/chatroom"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <ChatLogo />
        <Box display={{ base: "none", md: "block" }}>Chatroom</Box>
      </Link>
    </Tooltip>
  );
};

export default Chat;
