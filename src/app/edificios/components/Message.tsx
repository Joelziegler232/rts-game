// components/Message.js
import React from "react";

interface MessageProps {
  sender: string;
  content: string;
}

const Message: React.FC<MessageProps> = ({ sender, content }) => {
  return (
    <div>
      <p>De: {sender}</p>
      <p>{content}</p>
    </div>
  );
};

export default Message;
