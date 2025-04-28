import Ticket from "../models/Ticket.js";

// Create Ticket
export const createTicket = async (req, res) => {
  try {
    const { title, content } = req.body;
    const ticket = new Ticket({
      title,
      content,
      created_by: req.user.userId,
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating ticket", error: err.message });
  }
};

// Get User Tickets
export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ created_by: req.user.userId });
    res.json(tickets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: err.message });
  }
};

// Get one ticket by id
export const getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId)
      .populate("created_by", "name _id")
      .populate("assigned_to", "name _id");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching ticket", error: err.message });
  }
};

// Get All Tickets
export const getAllTickets = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "designer") {
      return res.status(403).json({ message: "Not authorized" });
    }
    const tickets = await Ticket.find()
      .populate("created_by", "name _id")
      .populate("assigned_to", "name _id");
    res.json(tickets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: err.message });
  }
};
