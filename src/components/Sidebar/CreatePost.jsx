import { useRef, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";

import { useLocation } from "react-router-dom";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import "leaflet/dist/leaflet.css";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const staticLatitude = 21.7562044;
  const staticLongitude = 72.1536458;

  const handleFindLocation = async () => {
    // Here you can use an API to fetch the location address if needed.
    // For simplicity, we'll use a static location.
    const fetchedLocation =
      "Location Address: Ssccs (Shree Swaminarayan College Of Computer Science )";
    setLocation(fetchedLocation);
  };

  const handleAddLocation = () => {
    setCaption((prev) => `${prev}\n${location}`);
  };

  // Handle post creation
  const handlePostCreation = async () => {
    try {
      await handleCreatePost(
        selectedFile || selectedVideo,
        caption,
        selectedVideo ? "video" : "image"
      );
      onClose();
      setCaption("");
      setSelectedFile(null);
      setSelectedVideo(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  // Handle video selection
  // const handleVideoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith("video/")) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setSelectedVideo(event.target.result);
  //       setSelectedFile(null); // Clear image if a video is selected
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Handle image selection
  const handleImageSelection = (e) => {
    handleImageChange(e); // Use existing image handler
    setSelectedVideo(null); // Clear video if an image is selected
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
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
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            {/* Image Input */}
            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageSelection}
            />
            <BsFillImageFill
              onClick={() => imageRef.current.click()}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
            />
            {/* Video Input */}
            {/* <Input
              type="file"
              hidden
              ref={videoRef}
              onChange={handleVideoChange}
            />
            <BsFillCameraVideoFill
              onClick={() => videoRef.current.click()}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
            /> */}
            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="Selected img" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => setSelectedFile(null)}
                />
              </Flex>
            )}
            {/* Show selected video */}
            {selectedVideo && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <video src={selectedVideo} controls style={{ width: "100%" }} />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => setSelectedVideo(null)}
                />
              </Flex>
            )}

            <Button mt={4} onClick={handleFindLocation}>
              Find Location
            </Button>
            {location && (
              <>
                <Flex mt={4}>
                  <Box>{location}</Box>
                  <Button ml={4} onClick={handleAddLocation}>
                    Add Location
                  </Button>
                </Flex>

                {/* Leaflet map to show static location */}
                <MapContainer
                  center={[staticLatitude, staticLongitude]}
                  zoom={13}
                  style={{ height: "200px", marginTop: "20px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[staticLatitude, staticLongitude]}>
                    <Popup>{location}</Popup>
                  </Marker>
                </MapContainer>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

const useCreatePost = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image");
    if (!authUser) throw new Error("User is not authenticated");

    setIsLoading(true);

    const newPost = {
      caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid)
        createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== "/" && userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};
