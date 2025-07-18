import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChat } from "../utils/slices/chatSlice";
import { Trash2, Plus } from "lucide-react";

const RecentChats = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.chat.chatHistory);
  const userChat = history.filter((msg) => msg.sender === "user");

  const selectChat = (text) => {
    console.log(text);
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {userChat.slice(0, 10).map(
          (msg) => (
              <li
                key={msg.id}
                className="flex items-center justify-between text-sm text-black hover:bg-gray-400 px-2 py-1 rounded cursor-pointer"
                onClick={() => selectChat(msg.text)}
              >
                {msg.text && (
                  <span className="truncate max-w-[140px]">{msg.text}</span>
                )}
                {msg.image && <span>{"image.png"}</span>}
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteChat(msg.id));
                    }}
                    title="Delete chat"
                  >
                    <Trash2
                      size={14}
                      className="text-white hover:text-red-400"
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      //   window.location.reload();
                    }}
                    title="New chat"
                  >
                    <Plus
                      size={14}
                      className="text-white hover:text-green-400"
                    />
                  </button>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default RecentChats;
