import express from "express";
import userRoutes from "./user/user.route";
import restorentRoutes from "./restorent/restorent.routes";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/restorent",restorentRoutes)

export default router;