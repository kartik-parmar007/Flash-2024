import { useEffect, useState } from "react";
import axios from "axios";

const LinkedinAutomate = () => {
  // Replace with your actual LinkedIn Access Token
  const accessToken =
    "AQXCm6dLqYzDLurrlmku6gnSAgwhRpfGMeUvZqhNpyTQzwiP8Ufd8uvr9VtlooXud7hzdLXd2fZGbt4EXrbiP_owifY2CSTmFqzLdSCFNB5ym7YYczf3qUoTKos5NmBiFHFkhtJDFcVgVyropIVBFXtnS5-pMkeT57HWT6YmeT3FMd3P4POOkbIOxugzcg2O1CnxhWo5YuCWmS_lNPTzEJfR1hxQtLbt2hruBisiEa99TYJtXMPsC0ICR1qp4UrZ83BWOHG2f-rOEJQ057Muc2x5UPkngpXC3QZ6D8V6FCEaPPQ4cLgHkm48KxcD6MMWMag5zXDZo_QbELJDi-9tQ8fI7-qUpg";
  const ytUrl = "https://www.youtube.com/watch?v=Mn6gIEM33uU";
  const title =
    "Filtering, Searching, Ordering in Django Rest Framework Part ss2";
  const description = `Are you tired of sifting through an endless sea of data to find the information you need in your Django project? Look no further! With Django filtering in Django Rest Framework, you can easily sort through your data and extract the information you need with just a few simple commands. Say goodbye to endless scrolling and manual data sorting, and say hello to increased efficiency and productivity in your Django workflow. Join the ranks of top-tier developers who have mastered this powerful tool, and start simplifying your data management today! \n #filtering #techsunami #djangofilter`;

  const pythonGroupList = [9247360]; // List of group IDs

  const [userId, setUserId] = useState("");

  // Function to get the thumbnail URL from YouTube
  const extractThumbnailUrl = (url) => {
    const regex =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regex);
    return match
      ? `https://i.ytimg.com/vi/${match[7]}/maxresdefault.jpg`
      : null;
  };

  // Function to get LinkedIn User ID
  const getUserId = async () => {
    try {
      const response = await axios.get("https://api.linkedin.com/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserId(response.data.id);
      return response.data.id;
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  // Common payload for API calls
  const generatePayload = (feedType = "feed", groupId = null) => {
    const payload = {
      author: `urn:li:person:${userId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: description,
          },
          shareMediaCategory: "ARTICLE",
          media: [
            {
              status: "READY",
              description: { text: description },
              originalUrl: ytUrl,
              title: { text: title },
              thumbnails: [{ url: extractThumbnailUrl(ytUrl) }],
            },
          ],
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility":
          feedType === "feed" ? "PUBLIC" : "CONTAINER",
      },
    };

    if (feedType === "group" && groupId) {
      payload.containerEntity = `urn:li:group:${groupId}`;
    }
    return payload;
  };

  // Function to post to user's feed
  const feedPost = async () => {
    const payload = generatePayload("feed");
    try {
      const response = await axios.post(
        "https://api.linkedin.com/v2/ugcPosts",
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("Feed Post Response:", response.data);
    } catch (error) {
      console.error("Error posting to feed:", error);
    }
  };

  // Function to post to a LinkedIn group
  const groupPost = async (groupId) => {
    const payload = generatePayload("group", groupId);
    try {
      const response = await axios.post(
        "https://api.linkedin.com/v2/ugcPosts",
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(`Group ${groupId} Post Response:`, response.data);
    } catch (error) {
      console.error(`Error posting to group ${groupId}:`, error);
    }
  };

  // Main function to handle posting
  const mainFunction = async () => {
    const id = await getUserId();
    if (id) {
      await feedPost();
      for (const groupId of pythonGroupList) {
        console.log("Posting to group:", groupId);
        await groupPost(groupId);
      }
    }
  };

  // Trigger the main function on component mount
  useEffect(() => {
    mainFunction();
  }, []);

  return (
    <div>
      <h1>LinkedIn Automate</h1>
      <p>Posting to LinkedIn feed and groups...</p>
    </div>
  );
};

export default LinkedinAutomate;
