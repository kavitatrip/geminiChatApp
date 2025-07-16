import React from 'react';
import { useSelector } from 'react-redux';

const RecentChats = () => {
  const history = useSelector((state) => state.chat.chatHistory);

  return (
    <ul className="space-y-2">
      {history.slice(0, 10).map((msg) => (
        <li key={msg.id} className="text-sm text-gray-300 truncate">
          {msg.text}
        </li>
      ))}
    </ul>
  );
};

export default RecentChats;
