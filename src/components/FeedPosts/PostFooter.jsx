import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
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
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { useRef, useState, useEffect } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
  ShareLogo,
} from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Assuming Firebase setup

const emojiList = ["❤️", "😂", "👍", "😢", "🔥", "👏"];

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [emojiCounts, setEmojiCounts] = useState({});
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);

  const {
    isOpen: isShareOpen,
    onOpen: openShare,
    onClose: closeShare,
  } = useDisclosure(); // Share Modal
  const {
    isOpen: isCommentsOpen,
    onOpen: openComments,
    onClose: closeComments,
  } = useDisclosure(); // Comments Modal

  const navigate = useNavigate();
  const [points, setPoints] = useState(0);

  // Load emoji data on mount
  useEffect(() => {
    const fetchEmojiData = async () => {
      const docRef = doc(db, "posts", post.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const postData = docSnap.data();
        setEmojiCounts(postData.emojiCounts || {});
        const userEmoji = postData.userEmojis?.[authUser.uid];
        if (userEmoji) setSelectedEmoji(userEmoji);
      } else {
        const initialEmojiCounts = emojiList.reduce((acc, emoji) => {
          acc[emoji] = 0;
          return acc;
        }, {});
        setEmojiCounts(initialEmojiCounts);
      }
    };

    if (post.id && authUser) fetchEmojiData();
  }, [post.id, authUser]);

  // Firebase update for emojis
  const updateEmojiInFirebase = async (newCounts, userEmoji) => {
    const docRef = doc(db, "posts", post.id);
    await updateDoc(docRef, {
      emojiCounts: newCounts,
      [`userEmojis.${authUser.uid}`]: userEmoji,
    });
  };

  const handleSendEmoji = async (emoji) => {
    let updatedCounts = { ...emojiCounts };

    if (selectedEmoji === emoji) {
      updatedCounts[emoji] = Math.max(updatedCounts[emoji] - 1, 0);
      setSelectedEmoji(null);
    } else {
      if (selectedEmoji) updatedCounts[selectedEmoji] -= 1;
      updatedCounts[emoji] = (updatedCounts[emoji] || 0) + 1;
      setSelectedEmoji(emoji);
    }

    setEmojiCounts(updatedCounts);
    await updateEmojiInFirebase(
      updatedCounts,
      selectedEmoji === emoji ? null : emoji
    );
  };

  // Share modal functionality
  const handleShareCompletion = () => {
    const currentPoints = parseInt(
      localStorage.getItem("userPoints") || "0",
      10
    );
    const newPoints = currentPoints + 2;
    localStorage.setItem("userPoints", newPoints);
  };

  const redirectToPointsBadge = () => {
    const points = parseInt(localStorage.getItem("userPoints") || "0", 10);
    let badge = "Bronze";
    if (points >= 100) badge = "Silver";
    if (points >= 1000) badge = "Gold";
    if (points >= 4000) badge = "Master";
    if (points >= 10000) badge = "Grand Master";

    navigate("/user-points-badge", { state: { points, badge } });
  };

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={10} mt={"auto"}>
      {/* Footer Buttons */}
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <Box cursor={"pointer"} fontSize={18} onClick={openComments}>
          <CommentLogo />
        </Box>

        <Box cursor={"pointer"} fontSize={18} onClick={openShare}>
          <ShareLogo />
        </Box>
      </Flex>

      {/* Like Count */}
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {/* Caption and Comments */}
      {!isProfilePage && (
        <>
          <Text fontSize="sm" fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as="span" fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize="sm"
              color={"gray"}
              cursor={"pointer"}
              onClick={openComments}
            >
              View all {post.comments.length} comments
            </Text>
          )}
        </>
      )}

      {/* Emojis */}
      <Flex gap={2} mt={3}>
        {emojiList.map((emoji, index) => (
          <Box
            key={index}
            cursor={"pointer"}
            fontSize={20}
            onClick={() => handleSendEmoji(emoji)}
          >
            {emoji} {emojiCounts[emoji] || 0}
          </Box>
        ))}
      </Flex>

      {/* Add Comment */}
      {authUser && (
        <InputGroup mt={3}>
          <Input
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <InputRightElement>
            <Button onClick={handleSubmitComment} isLoading={isCommenting}>
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      )}

      {/* Comments Modal */}
      <CommentsModal
        isOpen={isCommentsOpen}
        onClose={closeComments}
        post={post}
      />

      {/* Share Modal */}
      <Modal isOpen={isShareOpen} onClose={closeShare}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Share this post</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {/* Dynamic URL with post ID */}
      {post.id && (
        <Flex gap={4} flexWrap="wrap">
          {/* Facebook Share */}
          <FacebookShareButton
            url={`${window.location.origin}?id=${post.id}`}
            onShareWindowClose={handleShareCompletion}
          >
            <FacebookIcon size={36} />
          </FacebookShareButton>

          {/* WhatsApp Share */}
          <WhatsappShareButton
            url={`${window.location.origin}?id=${post.id}`}
            onShareWindowClose={handleShareCompletion}
          >
            <WhatsappIcon size={36} />
          </WhatsappShareButton>

          {/* Twitter Share */}
          <TwitterShareButton
            url={`${window.location.origin}?id=${post.id}`}
            onShareWindowClose={handleShareCompletion}
          >
            <TwitterIcon size={36} />
          </TwitterShareButton>

          {/* LinkedIn Share */}
          <LinkedinShareButton
            url={`${window.location.origin}?id=${post.id}`}
            onShareWindowClose={handleShareCompletion}
          >
            <LinkedinIcon size={36} />
          </LinkedinShareButton>
          
          <PinterestShareButton
            url={`${window.location.origin}?id=${post.id}`}
            media={`${window.location.origin}/path-to-image`} // Replace with a valid image URL for Pinterest
            description="Check out this amazing post!"
            onShareWindowClose={handleShareCompletion}
          >
            <PinterestIcon size={36} />
          </PinterestShareButton>

          {/* Telegram Share */}
          <TelegramShareButton
            url={`${window.location.origin}?id=${post.id}`}
            onShareWindowClose={handleShareCompletion}
          >
            <TelegramIcon size={36} />
          </TelegramShareButton>
        </Flex>
      )}

      {/* View Badge Button */}
      <Button colorScheme="blue" mt={4} onClick={redirectToPointsBadge}>
        View Badge
      </Button>
    </ModalBody>
  </ModalContent>
</Modal>

    </Box>
  );
};

export default PostFooter;
