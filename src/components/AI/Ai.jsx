import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);

    const lowerCaseQuestion = question.toLowerCase().trim();

    // Custom responses for predefined questions
    if (
      lowerCaseQuestion === "who are you?" ||
      lowerCaseQuestion.includes("who are you")
    ) {
      setAnswer("I am an AI Chatbot, made for Flash exhibition only.");
      setGeneratingAnswer(false);
      return;
    } else if (
      lowerCaseQuestion === "facility" ||
      lowerCaseQuestion.includes("about this website")
    ) {
      setAnswer(
        "post uploading, post sharing, location, user finding, news, weather, AI, poll, Event, chatroom, Donation, Product, Profile"
      );
      setGeneratingAnswer(false);
      return;
    } else if (
      lowerCaseQuestion === "how are you" ||
      lowerCaseQuestion.includes("how are you?")
    ) {
      setAnswer(
        "Hy audience, i am fine how are you! i hope you are also fine 😇"
      );
      setGeneratingAnswer(false);
      return;
    } else if (
      lowerCaseQuestion === "website name" ||
      lowerCaseQuestion.includes("this website name")
    ) {
      setAnswer("NPS(Nature Protect System) made by Kartik Parmar");
      setGeneratingAnswer(false);
      return;
    }

    setAnswer("Loading your answer... \n It might take up to 10 seconds");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDLnjVLEfnbPEV8WIsxkj2cd_YwDuwSCzo",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }], // Request body for Gemini
        },
      });

      // Extract the answer text
      let answerText =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];

      // Limit the answer to 35 words
      const wordLimit = 35;
      const words = answerText.split(" ");
      if (words.length > wordLimit) {
        answerText = words.slice(0, wordLimit).join(" ") + "...";
      }

      // Append the notice about outdated information and last update date
      const outdatedNotice = `
      `;

      setAnswer(outdatedNotice + "\n\n" + answerText);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className={styles.container}>
        {/* Prompt section at the top */}
        <div className={styles.promptSection}>
          <form onSubmit={generateAnswer} className={styles.formContainer}>
            <a target="_blank" rel="noopener noreferrer">
              <h1 className={styles.title}>Chat AI 🤖</h1>
              <br />
              <h6 className={styles.notice}>
                **Notice**: This AI might not have the latest information. The
                data is based on the most recent updates available, which may
                not reflect the latest news or trends. Last update available:
                December 2023.
              </h6>
            </a>
            <textarea
              required
              className={styles.textarea}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
            ></textarea>
            <button
              type="submit"
              className={`${styles.generateButton} ${
                generatingAnswer ? styles.disabled : ""
              }`}
              disabled={generatingAnswer}
            >
              {generatingAnswer ? "Generating..." : "Generate Answer"}
            </button>
          </form>
        </div>

        {/* Answer section at the bottom */}
        <div className={styles.answerSection}>
          <div className={styles.answerContainer}>
            <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
