import { Router } from "express";
import { RestaurantController } from "../controllers/restaurant.controller";

const router = Router();

router.put("/menu", RestaurantController.updateMenu);
router.patch("/availability", RestaurantController.toggleAvailability);
router.post("/order/process", RestaurantController.processOrder);

export default router;
