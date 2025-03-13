import express from "express";
import { processReceipt, getReceiptById, getReceiptPointsById } from "../controllers/receiptController";
import { validateReceiptIdRouteParam } from "../middleware/validateReceiptIdRouteParam";
import { validateReceiptPayload } from "../middleware/validateReceiptPayload";

const router = express.Router();

router.post("/process", validateReceiptPayload, processReceipt);
router.get("/:id", validateReceiptIdRouteParam, getReceiptById);
router.get("/:id/points", validateReceiptIdRouteParam, getReceiptPointsById);

export default router;