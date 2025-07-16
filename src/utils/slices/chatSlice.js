import { createSlice, nanoid } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    chatHistory: [],
  },
  reducers: {
    userMessages: (state, action) => {
      state.messages.push({
        id: nanoid(),
        text: action.payload,
        sender: "user",
        timeStamp: new Date().toString(),
      });
      state.chatHistory.unshift(action.payload);
    },
    aiResponseMessages: (state, action) => {
      state.messages.push({
        id: nanoid(),
        text: action.payload,
        sender: "ai",
        timeStamp: new Date().toString(),
      });
      state.chatHistory.unshift(action.payload);
    },
    loadOlderChat: (state, action) => {
      if (state.chatHistory.length > state.messages.length) {
        const remaining = state.chatHistory.slice(
          state.messages.length,
          state.messages.length + 5
        );
        state.messages = [...remaining, ...state.messages];
      }
    },
  },
});

export const { userMessages, aiResponseMessages, loadOlderChat } = chatSlice.actions;
export default chatSlice.reducer;
