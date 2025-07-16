import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userMessages, aiResponseMessages, loadOlderChat } from '../utils/slices/chatSlice';

const ChatUIPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      dispatch(loadOlderChat());
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    dispatch(
      userMessages({
        id: Date.now().toString(),
        sender: 'user',
        text: input,
        timestamp: new Date().toISOString(),
      })
    );

    setTimeout(() => {
      dispatch(
        aiResponseMessages({
          id: Date.now().toString() + '-ai',
          sender: 'ai',
          text: `Gemini: Replied to \"${input}\"`,
          timestamp: new Date().toISOString(),
        })
      );
    }, 1200);

    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        onScroll={handleScroll}
        className="h-96 overflow-y-scroll bg-gray-100 p-2 mb-4 rounded"
        ref={chatRef}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span className="inline-block bg-blue-200 px-3 py-1 rounded">
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-black text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatUIPage;
