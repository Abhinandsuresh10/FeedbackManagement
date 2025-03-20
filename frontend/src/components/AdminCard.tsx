import React from 'react';

interface CardProps {
  username: string;
  message: string[];
}

const AdminCard: React.FC<CardProps> = ({ username, message }) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-md bg-white shadow-md">
      <p className="text-sm text-gray-700"><strong> {username}</strong></p>
      <ul>
        {message.map((msg, index) => (
          <li key={index}><small>{index + 1}. </small>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCard;
