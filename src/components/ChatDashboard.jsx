import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userMessages,
  aiResponseMessages,
  loadOlderChat,
  setTyping,
} from "../utils/slices/chatSlice";
import { Plus } from "lucide-react";

const ChatUIPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const isTyping = useSelector((state) => state.chat.typing);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      dispatch(loadOlderChat());
    }
  };
  useEffect(() => {
    // handleScroll();
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const sendMessage = () => {
    const isText = input.trim().length > 0;
    const isImage = !!image;

    if (!isText && !isImage) return;

    const imageURL = isImage ? URL.createObjectURL(image) : null;
    const textValue = input.trim();

    const messagePayload = {
      id: Date.now().toString(),
      sender: "user",
      text: isText ? textValue : null,
      image: imageURL,
      timestamp: new Date().toLocaleTimeString(),
    };

    dispatch(userMessages(messagePayload));
    dispatch(setTyping(true));
    setInput("");
    setImage(null);

    setTimeout(() => {
      const aiReply = {
        id: Date.now().toString(),
        sender: "ai",
        text: isText
          ? `Gemini: Replied to "${textValue}"`
          : "Gemini: Here's your image!",
        image: isImage ? imageURL : null,
        timestamp: new Date().toLocaleTimeString(),
      };
      dispatch(aiResponseMessages(aiReply));
      dispatch(setTyping(false));
    }, 2000 + Math.random() * 2000);
  };

  return (
    <form
      className="max-w-2xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <div
        className="h-96 overflow-y-scroll bg-gray-100 p-2 mb-4 rounded"
        ref={chatRef}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            {(msg?.text || msg?.image) && (
              <div className="inline-block bg-blue-200 px-3 py-1 rounded">
                {msg?.text && <p>{msg?.text}</p>}
                {msg?.image && (
                  <img
                    src={msg?.image}
                    alt="uploaded"
                    className="mt-1 max-w-[200px] rounded"
                  />
                )}
                <span className="text-xs text-gray-600 block">
                  {msg?.timestamp}
                </span>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="text-left text-sm text-gray-500 mt-2">
            Gemini is typing...
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send
        </button>

        <div className="flex justify-start">
          <button
            onClick={handleUploadClick}
            title="Upload image"
            className="hover:opacity-80"
          >
            <Plus className="w-6 h-6 text-gray-600" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </div>
      </div>
    </form>
  );
};

export default ChatUIPage;
