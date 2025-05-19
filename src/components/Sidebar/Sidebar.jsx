import { Box, Flex  } from "@chakra-ui/react";  //Tooltip , Button
// import { Link } from "react-router-dom";
// import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants";

// import { BiLogOut } from "react-icons/bi";
// import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  // const { handleLogout, isLoggingOut } = useLogout();
  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w="full" height={"full"}>
      
       
          {/* <InstagramMobileLogo /> */}
        
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>

      </Flex>
    </Box>
  );
};

export default Sidebar;

{/* LOGOUT */}
{/* <Tooltip
  hasArrow
  label={"Logout"}
  placement="right"
  ml={1}
  openDelay={500}
  display={{ base: "block", md: "none" }}
>
  <Flex
    onClick={handleLogout}
    alignItems={"center"}
    gap={4}
    _hover={{ bg: "whiteAlpha.400" }}
    borderRadius={6}
    p={2}
    w={{ base: 10, md: "full" }}
    mt={"auto"}
    justifyContent={{ base: "center", md: "flex-start" }}
  >
    <BiLogOut size={25} />
    <Button
      display={{ base: "none", md: "block" }}
      variant={"ghost"}
      _hover={{ bg: "transparent" }}
      isLoading={isLoggingOut}
    >
      Logout
    </Button>
  </Flex>
</Tooltip> */}