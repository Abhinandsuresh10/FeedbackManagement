import React, { useEffect, useState } from 'react';
import { useUserStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from '../api/feedbackApi';
import { useFeedbackQuery } from '../api/getFeedback';
import Card from '../components/Card';


const UserDashboard: React.FC = () => {
  const [username, setUserName] = useState('');
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const { mutate: submitFeedback, isLoading, error: apiError } = useFeedback();
  const { data: feedbacks, isLoading: isFeedbackLoading, error: feedbackError } = useFeedbackQuery();

  useEffect(() => {
    setUserName(useUserStore.getState().user?.name || '');
  }, []);

  const [view, setView] = useState<'add' | 'list'>('add');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim(); 
    
    if (trimmedMessage.length < 10) {
      setErrorMessage('Message must be at least 10 characters long');
      return;
    }
    
    setErrorMessage('');
    submitFeedback({ feedback: trimmedMessage }, {
      onSuccess: () => {
        setMessage('');
      }
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-16 md:w-64 bg-red-600 text-white p-4 flex flex-col justify-between">
        <ul>
          <li className="mb-2">
            <button
              className={`w-full text-left px-1 py-2 rounded-md ${view === 'add' ? 'bg-red-700' : 'hover:bg-red-500'}`}
              onClick={() => setView('add')}
            >
              <span className="md:hidden" title='Add Feedback'>➕</span>
              <span className="hidden md:inline">➕ Add Feedback</span>
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-1 py-2 rounded-md ${view === 'list' ? 'bg-red-700' : 'hover:bg-red-500'}`}
              onClick={() => setView('list')}
            >
              <span className="md:hidden" title='List Feedback'>📃</span>
              <span className="hidden md:inline">📃 List Feedbacks</span>
            </button>
          </li>
        </ul>
        <button
          className="mt-4 bg-red-600 text-white px-1 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handleLogout}
        >
          <span className="md:hidden " title='Logout'>🚪</span>
          <span className="hidden md:inline">Logout</span>
        </button>
      </aside>
      <div className="flex-1 p-4">
        <header className="bg-white shadow-md p-4 mb-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">User Dashboard</h1>
            <span className="text-lg">{username}</span>
          </div>
        </header>
        <main>
          {view === 'add' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Add Feedback</h2>
              <form onSubmit={handleAddFeedback}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                    rows={4}
                    placeholder="Enter your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  {errorMessage && <small className="text-red-500">{errorMessage}</small>}
                  {apiError && <small className="text-red-500">{apiError.message}</small>}
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          )}
          {view === 'list' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Feedbacks</h2>
              {isFeedbackLoading ? (
                <p>Loading feedbacks...</p>
              ) : feedbackError ? (
                <p className="text-red-500">Error loading feedbacks: {feedbackError.message}</p>
              ) : (
                <ul>
                  {feedbacks.message.map((msg,index) => (
                      <Card key={index} message={msg} />
                  ))}
                  
                </ul>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;