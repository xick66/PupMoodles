import { useState } from "react";
import { db, auth } from "../config/Firebase";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { Button, Textarea } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";

const Entry = () => {
  const [score, setScore] = useState(0);
  const [textEntry, setTextEntry] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState(null);

  const user = auth.currentUser;
  const entryCollection = collection(db, "Users", user.uid, "Entries");

  const emojis = [
    { emoji: "😁", value: 2 },
    { emoji: "🙂", value: 1 },
    { emoji: "😐", value: 0 },
    { emoji: "☹️", value: -1 },
    { emoji: "😭", value: -2 },
    { emoji: "💀", value: -3 },
  ];

  const handleChange = (value) => {
    setTextEntry(value);
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleEmojiPress = (value, index) => {
    setScore(value);
    setSelectedEmojiIndex(index);
  };

  const showToast = () => {
    toast.success("Your entry has been submitted.", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleSubmit = async (value, note) => {
    const now = serverTimestamp();

    try {
      const entry = {
        datetime: now,
        note,
        value,
      };

      await addDoc(entryCollection, entry);
      setTextEntry("");
      setWordCount("");
      setSelectedEmojiIndex(null);
      showToast();
    } catch (err) {
      console.error("Error pushing data to database: ", err);
    }
  };

  return (
    <div>
      <div className="emojiContainer">
        {emojis.map((emoji, index) => (
          <div
            key={index}
            onClick={() => handleEmojiPress(emoji.value, index)}
            className={`emojiItem ${
              selectedEmojiIndex === index ? "selectedEmojiContainer" : ""
            }`}
          >
            <p
              className={`emoji ${
                selectedEmojiIndex === index ? "selectedEmoji" : ""
              }`}
            >
              {emoji.emoji}
            </p>
          </div>
        ))}
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "75%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Textarea
            className="entryInput"
            size="lg"
            description="optional"
            placeholder="Log your thoughts"
            onChange={(e) => handleChange(e.target.value)}
            value={textEntry}
            minRows={8}
          />
        </div>
        <p className="wordCount" style={{ textAlign: "right", color: "white" }}>
          Word Count: {wordCount}
        </p>
      </div>

      <div className="buttonContainer">
        <Button
          onPress={() => handleSubmit(score, textEntry)}
          isDisabled={selectedEmojiIndex === null}
          size="md"
          color="primary"
          fullWidth={true}
        >
          Submit
        </Button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};

export default Entry;
