import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Image,
  Spinner,
  Text,
  Link,
  Stack,
} from "@chakra-ui/react";

const EnvironmentNews = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "d-45BR7RMtEncOiKSCsTBh5sPlOUL3omjYG9LjgM5AikuMNr"; // Currents API Key
  const url = `https://api.currentsapi.services/v1/latest-news?category=environment&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(url);
        setNewsArticles(response.data.news);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error}</Text>;

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={6} color={"white"}>
        Latest Environment Related News
      </Heading>
      <Stack spacing={6}>
        {newsArticles.map((article, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
            p={4}
            bg="white"
            _hover={{ bg: "gray.100" }}
          >
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                borderRadius="md"
                mb={4}
                objectFit="cover"
                w="full"
                h="200px"
              />
            ) : null}
            <Heading as="h2" size="md" mb={2} color={"black"}>
              {article.title}
            </Heading>
            <Text mb={4} color={"black"}>
              {article.description}{" "}
            </Text>
            <Link
              href={article.url}
              isExternal
              color="blue.500"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              Read more
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default EnvironmentNews;
