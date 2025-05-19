import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom"; // Import Link for navigation
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
const auth = getAuth(app);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchEvents();
      }
    });
  }, []);

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const currentDateTime = new Date();

    const upcomingEvents = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((event) => {
        const eventEndDateTime = new Date(`${event.date}T${event.endTime}`);
        return eventEndDateTime >= currentDateTime;
      });

    setEvents(upcomingEvents);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), {
        name,
        description,
        date,
        startTime,
        endTime,
        location,
        attendees: [],
      });
      alert("Event created successfully!");
      setName("");
      setDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setLocation("");
      fetchEvents();
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  if (!user) {
    return (
      <div className={styles.authContainer}>
        <h1>Login</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Events</h1>

      <form onSubmit={createEvent} className={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <strong>Staring time</strong>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <strong>Staring time</strong>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <button type="submit">Create Event</button>
      </form>

      <h2 className={styles.subheading}>Upcoming Events</h2>
      <div className={styles.eventList}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Start Time: {event.startTime}</p>
            <p>End Time: {event.endTime}</p>
            <p>Location: {event.location}</p>
            <Link to={`/event/${event.id}`} className={styles.shareButton}>
              View Details and Share
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
