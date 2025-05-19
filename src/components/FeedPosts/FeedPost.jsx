import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        {/* Check if the post contains a video or image */}
        {post.fileType === "video" ? (
          <video
            src={post.imageURL}
            controls
            style={{ width: "100%", borderRadius: "4px" }}
          />
        ) : (
          <Image src={post.imageURL} alt={"FEED POST IMG"} />
        )}
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  );
};

export default FeedPost;
