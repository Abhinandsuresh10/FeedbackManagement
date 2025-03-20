import React from 'react';

interface CardProps {
  message: string;
}

const Card: React.FC<CardProps> = ({ message }) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-md bg-white shadow-md">
      <p className="text-sm text-gray-700"><strong>Message:</strong> {message}</p>
    </div>
  );
};

export default Card;
