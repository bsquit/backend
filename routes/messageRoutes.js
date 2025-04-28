import express from "express";
import auth from "../middleware/auth.js";
import {
  createMessage,
  getMessagesByTicket,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/:ticketId", auth, createMessage);
router.get("/:ticketId", auth, getMessagesByTicket);

export default router;
