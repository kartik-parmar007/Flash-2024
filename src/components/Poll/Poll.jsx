import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import styles from "./styles.module.css";

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

function VotingSystem() {
  const { pollId } = useParams(); // Retrieve the pollId from the URL
  const [poll, setPoll] = useState(null);
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  const [message, setMessage] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchPoll();
    checkIfVoted();
  }, [pollId]);

  // Check if the user has already voted
  const checkIfVoted = () => {
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || {};
    if (votedPolls[pollId]) {
      setHasVoted(true);
      setMessage("You have already voted on this poll.");
    }
  };

  const fetchPoll = async () => {
    try {
      const pollDocRef = doc(db, "polls", pollId);
      const pollDoc = await getDoc(pollDocRef);
      if (pollDoc.exists()) {
        const pollData = pollDoc.data();
        setPoll(pollData);
        setYesVotes(pollData.yesVotes);
        setNoVotes(pollData.noVotes);
      } else {
        setMessage("Poll not found.");
      }
    } catch (e) {
      console.error("Error fetching poll: ", e);
      setMessage("Error fetching poll data. Please try again.");
    }
  };

  const handleVote = async (voteType) => {
    if (hasVoted) {
      setMessage("You have already voted on this poll.");
      return;
    }

    const pollDocRef = doc(db, "polls", pollId);
    const updatedVotes =
      voteType === "yes"
        ? { yesVotes: yesVotes + 1 }
        : { noVotes: noVotes + 1 };
    try {
      await updateDoc(pollDocRef, updatedVotes);
      setMessage("Vote submitted successfully!");
      setHasVoted(true);

      // Store the voting status in localStorage
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || {};
      votedPolls[pollId] = true;
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls));

      fetchPoll(); // Refresh the poll data after voting
    } catch (e) {
      console.error("Error updating vote: ", e);
      setMessage("Error submitting vote. Please try again.");
    }
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <div className={styles.containers}>
      <h1 className={styles.heading}>Vote on Poll</h1>
      {message && <p className={styles.message}>{message}</p>}
      {poll ? (
        <div className={styles.pollContainer}>
          <h3 className={styles.pollHeading}>{poll.pollName}</h3>
          <p className={styles.pollDetails}>
            <strong>Location:</strong> {poll.location}
          </p>
          <p className={styles.pollDetails}>
            <strong>Description:</strong> {poll.description}
          </p>
          <p className={styles.pollDetails}>
            <strong>Date:</strong> {poll.date}
          </p>
          <p className={styles.pollDetails}>
            <strong>Time:</strong> {poll.startTime} - {poll.endTime}
          </p>
          <div className={styles.buttonsContainer}>
            <button
              onClick={() => handleVote("yes")}
              className={`${styles.button} ${styles.yesButton} ${
                hasVoted && styles.disabled
              }`}
              disabled={hasVoted}
            >
              Vote Yes
            </button>
            <button
              onClick={() => handleVote("no")}
              className={`${styles.button} ${styles.noButton} ${
                hasVoted && styles.disabled
              }`}
              disabled={hasVoted}
            >
              Vote No
            </button>
            <button
              onClick={toggleResults}
              className={`${styles.button} ${styles.resultsButton}`}
            >
              {showResults ? "Hide Results" : "Show Results"}
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.message}>Loading poll data...</p>
      )}

      {showResults && (
        <div className={styles.resultsContainer}>
          <h2 className={styles.resultsHeading}>Poll Results</h2>
          <p className={styles.resultItem}>
            <strong style={{ color: "#27AE60" }}>Yes Votes:</strong> {yesVotes}
          </p>
          <p className={styles.resultItem}>
            <strong style={{ color: "#E74C3C" }}>No Votes:</strong> {noVotes}
          </p>
          <p className={styles.resultItem}>
            <strong style={{ color: "#3498DB" }}>Total Votes:</strong>{" "}
            {yesVotes + noVotes}
          </p>
          <p className={styles.resultItem}>
            <strong style={{ color: "#27AE60" }}>Yes Percentage:</strong>
            {((yesVotes / (yesVotes + noVotes)) * 100).toFixed(2)}%
          </p>
          <p className={styles.resultItem}>
            <strong style={{ color: "#E74C3C" }}>No Percentage:</strong>
            {((noVotes / (yesVotes + noVotes)) * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default VotingSystem;
