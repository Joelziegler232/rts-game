const Message = require('@/app/models/messageModel');

// Controlador para obtener todos los mensajes
const getMessages = async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear un nuevo mensaje
const createMessage = async (req: { body: { sender: any; content: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  const message = new Message({
    sender: req.body.sender,
    content: req.body.content,
    timestamp: new Date(),
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getMessages,
  createMessage,
};
