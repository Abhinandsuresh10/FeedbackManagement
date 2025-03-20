import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useUserStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useAllUsersQuery } from '../api/getAllusers';
import AdminCard from '../components/AdminCard';
import { useAnalytics } from '../api/getAnalytics';


const ItemType = {
  WIDGET: 'widget',
};

const DraggableWidget: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const [, drag] = useDrag({
    type: ItemType.WIDGET,
    item: { id },
  });

  return (
    <div ref={drag} className="p-2 border border-gray-300 rounded-md bg-white shadow-md">
      {children}
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<'list' | 'analytics'>('list');

  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const [adminName, setAdminName] = useState('');
  const { data: users } = useAllUsersQuery();
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [totalFeedbacks, setTotalFeedbacks] = useState<number>(0);
  const {data} = useAnalytics();
  
  useEffect(() => { 
    setAdminName(useUserStore.getState().user?.name || '');
    if(data) {
      setActiveUsers(data.users);
      setTotalFeedbacks(data?.totalMessages);
    }
  },[users, data])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex bg-gray-100">
        <aside className="w-16 md:w-64 bg-red-600 text-white p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4 hidden md:block">Admin Dashboard</h2>
            <ul>
              <li className="mb-2">
                <button
                  className={`w-full text-left px-1 py-2 rounded-md ${view === 'list' ? 'bg-red-700' : 'hover:bg-red-500'}`}
                  onClick={() => setView('list')}
                >
                  <span className="md:hidden">📃</span>
                  <span className="hidden md:inline">📃 List All Feedbacks</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-1 py-2 rounded-md ${view === 'analytics' ? 'bg-red-700' : 'hover:bg-red-500'}`}
                  onClick={() => setView('analytics')}
                >
                  <span className="md:hidden">📊</span>
                  <span className="hidden md:inline">📊 Analytics Dashboard</span>
                </button>
              </li>
            </ul>
          </div>
          <button
            className="mt-4 bg-red-600 text-white px-1 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={handleLogout}
          >
            <span className="md:hidden">🚪</span>
            <span className="hidden md:inline">Logout</span>
          </button>
        </aside>
        <div className="flex-1 p-4">
          <header className="bg-white shadow-md p-4 mb-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="sm:block hidden text-2xl font-bold">Feedback Management</h1>
              <h1 className="sm:hidden text-xl font-bold">FD Management</h1>
              <span className="text-lg sm:block hidden">{adminName || ''}</span>
              <span className="text-small sm:hidden">{adminName || ''}</span>
            </div>
          </header>
          <main >
            {view === 'list' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                 {users?.map((user, index) => (
                  <AdminCard key={index} username={user.userName} message={user.message} />
                 ))}
              </div>
            )}
            {view === 'analytics' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResizableBox width={260} height={100} minConstraints={[200, 100]} maxConstraints={[600, 400]}>
                    <DraggableWidget id="total-feedbacks">
                      <h3 className="text-lg font-bold">Total Feedbacks Submitted</h3>
                      <p className="text-small ml-28">{totalFeedbacks}</p>
                    </DraggableWidget>
                  </ResizableBox>
                  <ResizableBox width={200} height={200} minConstraints={[200, 100]} maxConstraints={[600, 400]}>
                    <DraggableWidget id="top-users">
                      <h3 className="text-lg font-bold">Top Active Users</h3>
                      <ul>
                        {activeUsers.map((user, index) => (
                          <li key={index} className="text-small ml-18">{user}</li>
                        ))}
                      </ul>
                    </DraggableWidget>
                  </ResizableBox>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </DndProvider>
  );
};

export default AdminDashboard;