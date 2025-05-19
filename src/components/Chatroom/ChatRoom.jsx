import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import useAuthStore from "../../store/authStore";
import jsPDF from "jspdf";
import styles from "./styles.module.css";
import { ref, uploadString, getDownloadURL } from "firebase/storage"; // Add storage import
import { storage } from "../../firebase/firebase"; // Ensure you have your Firebase storage configured

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBO_QrSWV14_D5hUYb2Inb_80N1JJO1EI4",
  authDomain: "social-media-cfd30.firebaseapp.com",
  projectId: "social-media-cfd30",
  storageBucket: "social-media-cfd30.appspot.com",
  messagingSenderId: "380509310551",
  appId: "1:380509310551:web:83cf97bccc4b72e14f5d12",
  measurementId: "G-8S2GZSQVND",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Chatroom = () => {
  const [room, setRoom] = useState("default-room");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chattingWith, setChattingWith] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for image
  const authUser = useAuthStore((state) => state.user);

  // Fetch messages based on the current room
  useEffect(() => {
    const messagesQuery = query(
      collection(doc(db, "chatrooms", room), "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, [room]);

  // Send a public or private message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "" && !selectedImage) return; // Ensure either text or image is present

    try {
      let imageUrl = null;

      if (selectedImage) {
        // Upload the image first
        const imageRef = ref(storage, `chatrooms/${Date.now()}`); // Create a reference for the image
        await uploadString(imageRef, selectedImage, "data_url"); // Upload the image
        imageUrl = await getDownloadURL(imageRef); // Get the download URL
      }

      // Create message data
      const messageData = {
        text: message,
        userName: authUser.username,
        recipient: chattingWith ? chattingWith : null,
        timestamp: serverTimestamp(),
        imageURL: imageUrl || null, // Add image URL to the message if present
      };

      // Add message to Firestore
      await addDoc(
        collection(doc(db, "chatrooms", room), "messages"),
        messageData
      );

      // Reset the input fields
      setMessage("");
      setSelectedImage(null); // Reset image after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Filter messages for public and private chats
  const filteredMessages = chattingWith
    ? messages.filter(
        (msg) =>
          (msg.userName === authUser.username &&
            msg.recipient === chattingWith) ||
          (msg.userName === chattingWith && msg.recipient === authUser.username)
      )
    : messages.filter((msg) => msg.recipient === null);

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    filteredMessages.forEach((msg) => {
      doc.setFontSize(12);
      doc.text(`${msg.userName}: ${msg.text}`, 10, y);
      y += 10;
    });
    doc.save(`chatroom-${chattingWith || room}.pdf`);
  };

  const startChatWithUser = (e) => {
    e.preventDefault();
    const userName = searchTerm.trim();
    if (!userName) return;
    const userProfile = users.find((user) => user.username === userName);
    setChattingWith(userName);
    setSelectedUserProfile(userProfile || { username: userName, email: "N/A" });
  };

  // Fetch all users for search functionality
  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      setUsers(usersSnapshot.docs.map((doc) => doc.data()));
    };
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <b>{authUser.username}</b>
      </div>

      {/* Search User Section */}
      <div className={styles.userSearchSection}>
        <form onSubmit={startChatWithUser} className={styles.searchForm}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter username to chat..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Start Chat
          </button>
        </form>
      </div>

      {/* Conditional Chatroom display */}
      {!chattingWith ? (
        <>
          {/* Room Selector */}
          <div className={styles.roomSelector}>
            <select value={room} onChange={(e) => setRoom(e.target.value)}>
              <option value="default-room">Default Room</option>
              <option value="room-2">Tree</option>
              <option value="room-3">Water</option>
              <option value="room-4">Forest</option>
              <option value="room-7">Farming</option>
              <option value="room-5">Animal</option>
            </select>
          </div>

          {/* Chat Box */}
          <div className={styles.chatBox}>
            {filteredMessages.map((msg, index) => (
              <div
                key={index}
                onClick={() => setSearchTerm(msg.userName)}
                className={`${styles.message} ${
                  msg.userName === authUser.username
                    ? styles.myMessage
                    : styles.otherMessage
                }`}
              >
                <strong>{msg.userName}:</strong>{" "}
                <div className={styles.messageText}>{msg.text}</div>
                {msg.imageURL && (
                  <img
                    src={msg.imageURL}
                    alt="Sent"
                    className={styles.sentImage}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Send Message Form */}
          <form onSubmit={sendMessage} className={styles.messageForm}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className={styles.messageInput}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = () => setSelectedImage(reader.result); // Set the selected image
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
              className={styles.imageInput} // Add styling for image input
            />
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>

          {/* Download Chat as PDF */}
          <button onClick={downloadPDF} className={styles.downloadButton}>
            Download Chat as PDF
          </button>
        </>
      ) : (
        <>
          {/* Personal Chatroom with user profile */}
          <div className={styles.chatWithHeader}>
            <h2>Chatting with {chattingWith}</h2>
            <button
              onClick={() => setChattingWith(null)}
              className={styles.backButton}
            >
              Back to Room
            </button>
          </div>

          {/* Display User Profile */}
          {selectedUserProfile && (
            <div className={styles.userProfile}>
              <h3>{selectedUserProfile.username} 's Profile</h3>
            </div>
          )}

          {/* Chat Box */}
          <div className={styles.chatBox}>
            {filteredMessages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.userName === authUser.username
                    ? styles.myMessage
                    : styles.otherMessage
                }`}
              >
                <strong>{msg.userName}:</strong>{" "}
                <div className={styles.messageText}>{msg.text}</div>
                {msg.imageURL && (
                  <img
                    src={msg.imageURL}
                    alt="Sent"
                    className={styles.sentImage}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Send Message Form */}
          <form onSubmit={sendMessage} className={styles.messageForm}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className={styles.messageInput}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = () => setSelectedImage(reader.result); // Set the selected image
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
              className={styles.imageInput} // Add styling for image input
            />
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>

          {/* Download Chat as PDF */}
          <button onClick={downloadPDF} className={styles.downloadButton}>
            Download Chat as PDF
          </button>
        </>
      )}
    </div>
  );
};

export default Chatroom;
