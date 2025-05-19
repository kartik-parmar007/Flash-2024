// components/Chat.js
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import styles from "./chat.module.css";
import { getAuth } from "firebase/auth";

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const currentUserId = getAuth().currentUser.uid; // Get the logged-in user's ID

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await addDoc(collection(db, "messages"), {
        text: input,
        createdAt: new Date(),
        userId: currentUserId, // Save the sender ID
      });
      setInput("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Chat Room</div>
      <div className={styles.messages}>
        {messages.map(({ id, text, userId }) => (
          <div
            key={id}
            className={`${styles.message} ${
              userId === currentUserId ? styles.sent : styles.received
            }`}
          >
            {text}
          </div>
        ))}
      </div>
      <form className={styles.inputContainer} onSubmit={sendMessage}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className={styles.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatting;
