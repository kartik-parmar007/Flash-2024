import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  // Extract the post ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const targetPostId = urlParams.get("id");

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {/* Loading state with skeletons */}
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap="2">
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" w={"200px"} />
                <Skeleton height="10px" w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {/* Display only the targeted post or all posts */}
      {!isLoading &&
        posts.length > 0 &&
        posts
          .filter((post) => !targetPostId || post.id === targetPostId) // Filter posts if targetPostId exists
          .map((post) => <FeedPost key={post.id} post={post} />)}

      {/* No posts available message */}
      {!isLoading && posts.length === 0 && (
        <>
          <Text fontSize={"md"} color={"gray.500"}>
            You dont have any posts to display.
          </Text>
          <Text fontSize={"sm"} color={"gray.400"}>
            Please follow more users to see their posts.
          </Text>
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
