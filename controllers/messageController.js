import Message from "../models/Message.js";
import Ticket from "../models/Ticket.js";

// Create a new message to a ticket
export const createMessage = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { content } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const message = new Message({
      ticket: ticketId,
      sender: req.user.userId,
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating message", error: err.message });
  }
};

// Get the messages by ticket id
export const getMessagesByTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const messages = await Message.find({ ticket: ticketId })
      .populate("sender", "name role")
      .sort({ created_at: 1 }); // oldest to newest

    res.json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching messages", error: err.message });
  }
};
