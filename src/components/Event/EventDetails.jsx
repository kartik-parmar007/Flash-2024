import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO_QrSWV14_D5hUYb2Inb_80N1JJO1EI4",
  authDomain: "social-media-cfd30.firebaseapp.com",
  projectId: "social-media-cfd30",
  storageBucket: "social-media-cfd30.appspot.com",
  messagingSenderId: "380509310551",
  appId: "1:380509310551:web:83cf97bccc4b72e14f5d12",
  measurementId: "G-8S2GZSQVND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [points, setPoints] = useState(0);
  const [badgeName, setBadgeName] = useState("Bronze");
  const navigate = useNavigate();
  const userId = "USER_ID"; // Replace with logic to get the actual user ID

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such event!");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    const fetchUserPoints = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userPoints = userDocSnap.data().points || 0;
          setPoints(userPoints);
          updateBadge(userPoints);
        }
      } catch (error) {
        console.error("Error fetching user points:", error);
      }
    };

    fetchEvent();
    fetchUserPoints();
  }, [id]);

  const updateBadge = (userPoints) => {
    if (userPoints >= 10000) {
      setBadgeName("Grand Master");
    } else if (userPoints >= 4000) {
      setBadgeName("Master");
    } else if (userPoints >= 1000) {
      setBadgeName("Gold");
    } else if (userPoints >= 500) {
      setBadgeName("Silver");
    } else {
      setBadgeName("Bronze");
    }
  };

  const handleShare = async (platform) => {
    try {
      const newPoints = points + 100; // Add 100 points for each share
      const userDocRef = doc(db, "users", userId);

      await updateDoc(userDocRef, { points: newPoints });
      setPoints(newPoints); // Update the UI with the new points
      updateBadge(newPoints); // Update the badge if necessary

      alert(`Successfully shared on ${platform} and earned 100 points!`);
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  if (!event) {
    return <div>Loading event details...</div>;
  }

  const eventUrl = `https://nps07.netlify.app/event/${event.id}`;
  const shareMessage = `Join us for ${event.name}! ${event.description}`;

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>{event.name}</h1>
      <p style={paragraphStyle}>{event.description}</p>
      <p style={paragraphStyle}>Date: {event.date}</p>
      <p style={paragraphStyle}>Start Time: {event.startTime}</p>
      <p style={paragraphStyle}>End Time: {event.endTime}</p>
      <p style={paragraphStyle}>Location: {event.location}</p>

      <div style={shareButtonsContainerStyle}>
        <h3 style={{ textAlign: "center", color: "black", marginBottom: "30px" }}>
          Share this event:
        </h3>
        <FacebookShareButton
          url={eventUrl}
          quote={shareMessage}
          style={shareButtonStyle}
          onClick={() => handleShare("Facebook")}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LinkedinShareButton
          url={eventUrl}
          title={event.name}
          summary={event.description}
          style={shareButtonStyle}
          onClick={() => handleShare("LinkedIn")}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TwitterShareButton
          url={eventUrl}
          title={shareMessage}
          style={shareButtonStyle}
          onClick={() => handleShare("Twitter")}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={eventUrl}
          title={shareMessage}
          style={shareButtonStyle}
          onClick={() => handleShare("WhatsApp")}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      {/* <div style={pointsContainerStyle}>
        <p>Your current points: {points}</p>
        <p>Your badge: {badgeName}</p>
        <button
          onClick={() => navigate("/user-points-badge")}
          style={buttonStyle}
        >
          My Points
        </button>
      </div> */}
    </div>
  );
};

// Styling (Optional)
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  padding: "30px",
  maxWidth: "800px",
  margin: "0 auto",
  fontFamily: "'Poppins', sans-serif",
  backgroundColor: "#f4f4f4",
  backgroundSize: "cover",
};

const headingStyle = {
  fontSize: "2.5rem",
  color: "#333",
  marginBottom: "20px",
  textAlign: "center",
};

const paragraphStyle = {
  fontSize: "1.2rem",
  color: "#555",
  marginBottom: "15px",
  textAlign: "center",
};

const shareButtonsContainerStyle = {
  marginTop: "20px",
  textAlign: "center",
};

const shareButtonStyle = {
  margin: "0 10px",
  transition: "transform 0.3s",
};

const pointsContainerStyle = {
  marginTop: "40px",
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "600px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "20px",
};

export default EventDetails;
