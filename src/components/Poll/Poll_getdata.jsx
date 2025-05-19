import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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

export default function Home() {
  const [pollName, setPollName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    const querySnapshot = await getDocs(collection(db, "polls"));
    const fetchedPolls = [];
    querySnapshot.forEach((doc) => {
      fetchedPolls.push({ id: doc.id, ...doc.data() });
    });
    setPolls(fetchedPolls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !pollName ||
      !location ||
      !description ||
      !date ||
      !startTime ||
      !endTime
    ) {
      setMessage("Please fill out all fields");
      return;
    }

    try {
      await addDoc(collection(db, "polls"), {
        pollName,
        location,
        description,
        date,
        startTime,
        endTime,
        yesVotes: 0,
        noVotes: 0,
      });
      setMessage("Poll created successfully!");
      setPollName("");
      setLocation("");
      setDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");
      fetchPolls(); // Refresh the list of polls
    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage("Error creating poll. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a Poll</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label className={styles.label}>
            Poll Name:
            <input
              type="text"
              value={pollName}
              onChange={(e) => setPollName(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className={styles.label}>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className={styles.label}>
            Event Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.dateInput}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className={styles.label}>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={styles.timeInput} 
              
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className={styles.label}>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={styles.timeInput}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className={styles.label}>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Poll
        </button>
      </form>

      <h2>Available Polls</h2>
      {polls.map((poll) => (
        <div key={poll.id} className={styles.pollItem}>
          <h3 className={styles.pollTitle}>{poll.pollName}</h3>
          <p>
            <strong>Location:</strong> {poll.location}
          </p>
          <p>
            <strong>Description:</strong> {poll.description}
          </p>
          <p>
            <strong>Date:</strong> {poll.date}
          </p>
          <p>
            <strong>Time:</strong> {poll.startTime} - {poll.endTime}
          </p>
          <Link to={`/vote/${poll.id}`}>
            <button className={styles.voteButton}>Vote on this poll</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
