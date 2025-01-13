import React from 'react';

const ChatBox: React.FC = () => {
  return (
    <div className="border rounded p-4 max-w-md w-full">
      <h3 className="font-bold mb-2">Chat</h3>
      <div className="bg-gray-100 p-2 rounded mb-2">
        <p>Alice : Bonjour !</p>
        <p>Bob : Salut tout le monde.</p>
      </div>
      <input type="text" placeholder="Message..." className="border p-2 w-full" />
    </div>
  );
};

export default ChatBox;
