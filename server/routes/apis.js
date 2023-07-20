import express from "express";
import {
    addApi,
    getApis,
    getApi,
    approveApi,
    rejectApi,
} from "../controllers/apis.js";

import { verifyToken } from "../middleware/auth.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getApis);
router.get("/:id", verifyToken, getApi);

/* UPDATE */
router.post("/add", addApi);

/* PUT */
router.patch("/:userId/approve/:id", verifyToken, approveApi);
router.patch("/:userId/reject/:id", verifyToken, rejectApi);

export default router;