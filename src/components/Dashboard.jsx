import ChatUIPage from './ChatDashboard';
import RecentChats from './RecentChats';

const Dashboard = () => {
  return (
    <div className="flex">
      <aside className="w-1/4 h-170 bg-gray-300 text-white p-4 ml-0 mt-10 rounded-md">
        <h3 className="font-bold mb-4 text-black">Recent Chats</h3>
        <RecentChats />
      </aside>
      <main className="w-3/4">
        <h2 className="text-xl font-bold mb-4 text-indigo-600">Gemini Chat</h2>
        <ChatUIPage />
      </main>
    </div>
  );
};
export default Dashboard;