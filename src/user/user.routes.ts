import { Router } from "express";
import { placeOrder } from "./user.controller";

const router = Router();

router.post("/place-order", placeOrder);

export default router;
