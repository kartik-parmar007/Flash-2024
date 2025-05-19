import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";
import { ShareLogo } from "../../assets/constants";
import useSocialMedias from "../../hooks/useSocialMedia";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const SocialMedia = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  const { user, getUserProfile, setUser } = useSocialMedias();

  // State to track user points
  const [points, setPoints] = useState(0);

  // State to track the badge
  const [badge, setBadge] = useState("");

  // State to track if a share attempt was made
  const [shareAttempt, setShareAttempt] = useState(false);

  // Initialize the react-router-dom navigation hook
  const navigate = useNavigate();

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  const shareUrl = "nps07.netlify.app";

  // Function to handle share button click
  const handleShareClick = () => {
    setShareAttempt(true); // Set share attempt to true on click
  };

  // Function to update points when the share action is confirmed
  const handleShareCompletion = (pointValue) => {
    if (shareAttempt) {
      setPoints((prevPoints) => prevPoints + pointValue);
      setShareAttempt(false); // Reset share attempt after successful point update
    }
  };

  // Effect to update the badge based on points
  useEffect(() => {
    if (points < 100) {
      setBadge("Bronze");
    } else if (points < 500) {
      setBadge("Silver");
    } else if (points < 1000) {
      setBadge("Gold");
    } else if (points < 2500) {
      setBadge("Platinum");
    } else if (points < 10000) {
      setBadge("Master");
    } else {
      setBadge("Grandmaster");
    }
  }, [points]);

  // Function to navigate to the points and badge page
  const handleViewPoints = () => {
    navigate("/user-points-badge", { state: { points, badge } });
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Share"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <ShareLogo />
          <Box display={{ base: "none", md: "block" }}>Social Media</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Social Media Platform List</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FacebookShareButton  
                url={shareUrl}
                quote={"NPS"}
                hashtag={"#NPS"}
                onClick={handleShareClick}
                onShareWindowClose={() => handleShareCompletion(2)}
              >
                <FacebookIcon size={40} round={50} />
              </FacebookShareButton>

              <WhatsappShareButton
                url={shareUrl}
                summary={"kartik"}
                quote={"NPS"}
                hashtag={"#NPS"}
                onClick={handleShareClick}
                onShareWindowClose={() => handleShareCompletion(2)}
              >
                <WhatsappIcon size={40} round={50} />
              </WhatsappShareButton>

              <LinkedinShareButton
                url={shareUrl}
                quote={"NPS"}
                hashtag={"#NPS"}
                onClick={handleShareClick}
                onShareWindowClose={() => handleShareCompletion(2)}
              >
                <LinkedinIcon size={40} round={50} />
              </LinkedinShareButton>

              <TwitterShareButton
                url={shareUrl}
                quote={"NPS"}
                hashtag={"#NPS"}
                onClick={handleShareClick}
                onShareWindowClose={() => handleShareCompletion(2)}
              >
                <TwitterIcon size={40} round={50} />
              </TwitterShareButton>

              <EmailShareButton
                url={shareUrl}
                onClick={handleShareClick}
                onShareWindowClose={() => handleShareCompletion(1)}
              >
                <EmailIcon size={40} round={50} />
              </EmailShareButton>

              <PinterestShareButton
                url={shareUrl}
                quote={"NPS"}
                hashtag={"#NPS"}
                onClick={handleShareClick}
                onShareWindowClose={() => handleShareCompletion(2)}
              >
                <PinterestIcon size={40} round={50} />
              </PinterestShareButton>

              <Flex w={"full"} justifyContent={"flex-end"}></Flex>
            </form>

            {user && <SuggestedUser user={user} setUser={setUser} />}

            <Box mt={4} color="white">
              Total Points: {points}
            </Box>

            <Box mt={2} color="yellow.300">
              Current Badge: {badge}
            </Box>

            {/* Button to navigate to the points and badge page */}
            <Button mt={4} colorScheme="blue" onClick={handleViewPoints}>
              View Points and Badge
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SocialMedia;
