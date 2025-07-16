import React from 'react';
import ChatUIPage from './ChatDashboard';
import RecentChats from './RecentChats';

const Dashboard = () => {
  return (
    <div className="flex">
      <aside className="w-1/4 h-screen bg-gray-900 text-white p-4">
        <h3 className="font-bold mb-4">Recent Chats</h3>
        <RecentChats />
      </aside>
      <main className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Gemini Chat</h2>
        <ChatUIPage />
      </main>
    </div>
  );
};
export default Dashboard;