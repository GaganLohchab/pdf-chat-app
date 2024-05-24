import { useState } from 'react';
import PropTypes from 'prop-types';

const ChatInterface = ({ projectId, onSendMessage, messages }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(projectId, message);
    setMessage('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Chat with PDF</h2>
      <div className="chat-box bg-gray-100 p-4 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message">
            <strong>{msg.user}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input-bordered w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-2">
          Send
        </button>
      </form>
    </div>
  );
};

ChatInterface.propTypes = {
    projectId: PropTypes.string.isRequired,
    onSendMessage: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default ChatInterface;
