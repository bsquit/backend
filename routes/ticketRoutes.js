import express from "express";
import auth from "../middleware/auth.js";
import {
  createTicket,
  getUserTickets,
  getAllTickets,
  getTicketById,
} from "../controllers/ticketController.js";

// Init router
const router = express.Router();

// Routes
router.post("/", auth, createTicket);
router.get("/my-tickets", auth, getUserTickets);
router.get("/all-tickets", auth, getAllTickets);
router.get("/:ticketId", auth, getTicketById);

export default router;
