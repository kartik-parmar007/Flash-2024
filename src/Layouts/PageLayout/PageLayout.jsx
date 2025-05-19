import {
  Box,
  Flex,
  Spinner,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";
import { FiMenu } from "react-icons/fi";

// PageLayout Component
const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI for Drawer state

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {/* Popup Button and Drawer for Sidebar */}
      {canRenderSidebar ? (
        <>
          {/* Popup Button for Mobile */}
          <Box
            display={{ base: "block", md: "none" }}
            position="absolute"
            top="4"
            left="4"
            zIndex="1000"
          >
            <IconButton
              icon={<FiMenu />}
              onClick={onOpen}
              variant="outline"
              aria-label="Open Sidebar"
              fontSize="20px"
            />
          </Box>

          {/* Sidebar Drawer for Mobile */}
          <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay onClick={onClose} />
            <DrawerContent onClick={onClose}>
              <Sidebar onClick={onClose} />
            </DrawerContent>
          </Drawer>

          {/* Sidebar for Desktop */}
          <Box
            w={{ base: "0", md: "240px" }}
            display={{ base: "none", md: "block" }}
            borderRight="1px solid #E2E8F0"
          >
            <Sidebar />
          </Box>
        </>
      ) : null}

      {/* Navbar */}
      {canRenderNavbar ? <Navbar /> : null}

      {/* Page Content */}
      <Box
        flex={1}
        w={{ base: "100%", md: "calc(100% - 240px)" }}
        mx={"auto"}
        overflow="auto"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

// PageLayoutSpinner Component
const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir="column"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" />
    </Flex>
  );
};
