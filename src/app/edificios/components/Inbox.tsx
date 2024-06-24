import React, { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/app/edificios/components/ui/card";
import { Textarea } from "@/app/edificios/components/ui/textarea";
import { Button } from "@/app/edificios/components/ui/button";
import { useSession } from 'next-auth/react'; // Importa el hook useSession de next-auth/react

import { getMessages, sendMessage } from '../utils/msgServices';
import user from "@/app/models/user";


const Message = ({ sender, content, timestamp }: { sender: string; content: string; timestamp: string }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg w-8 h-8 bg-[#55efc4] text-2xl flex items-center justify-center">😁</div>
      <div className="grid gap-1 items-start text-sm">
        <div className="flex items-center gap-2">
          <div className="font-medium">{sender}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</div>
        </div>
        <div>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};


const Inbox = () => {
  const { data: session } = useSession(); // Obtiene la sesión del usuario autenticado

  const [setMessages] = useState<{ _id: string; sender: string; content: string; timestamp: string }[]>([]);
  const messages = [
    { _id: "1", sender: "user1", content: "¡Hola! ¿Cómo estás?", timestamp: "2024-06-01T12:00:00Z" },
    { _id: "2", sender: "user2", content: "¡Hola! Estoy bien, ¿y tú?", timestamp: "2024-06-01T12:05:00Z" },
    { _id: "3", sender: "user1", content: "Yo también estoy bien, gracias.", timestamp: "2024-06-01T12:10:00Z" },
    // Agrega más mensajes aquí si es necesario
  ];
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await getMessages();
     // setMessages(messagesData);
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage || !"u1") return;
    await sendMessage("u1", newMessage);
  
    const [messages, setMessages] = useState<
  { _id: string; sender: string; content: string; timestamp: string }[]
  >([]);

    // Asegurarse de que messages esté actualizado correctamente antes de agregar un nuevo mensaje
    setMessages((prevMessages: any) => {
      const updatedMessages = [
        ...prevMessages,
        {
          sender: "u1",
          content: newMessage,
          _id: "1",
          timestamp: new Date().toISOString()
        }
      ];
      return updatedMessages;
    });
    setNewMessage('');
  };
  

  return (
    <Card className="max-w-md rounded-2xl w-full">
      <CardHeader className="px-4 pt-4">
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-4">
        {messages && messages.map((message) => (
  <Message
    key={message._id}
    sender={message.sender}
    content={message.content}
    timestamp={message.timestamp}
  />
))}
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <div className="flex items-center gap-2">
        <Textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        placeholder="Escribe tu mensaje..."
      />
          <Button onClick={handleSendMessage}>Enviar</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Inbox;
