import express from "express";
import {
  getUser,
  getAllUsers,

  updateUser,

} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

import image2url from "image2url";

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/:id", verifyToken, updateUser);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });


router.post("/send/:path", (req, res) => {
  
  image2url.init({
    token: process.env.DISCORD_TOKEN,
    channel: process.env.PFP_CHANNEL
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  upload.single("picture")(req, res, (err) => {
      if (err) {
          res.json({
              error: err
          });
      } else {
          if (fs.existsSync(path.join(__dirname, `../../server/public/assets/${req.params.path}`))) {
              const file = path.join(__dirname, `../../server/public/assets/${req.params.path}`);
              const fileName = req.params.path.split(".")[0];
              image2url.upload(`${file}`, `${fileName}`).then(url => {
                  res.json({
                      url: url
                  })
              }).then(() => {
                  fs.unlinkSync(file);
              });
          } else {
              res.json({
                  error: "File not found"
              });
          }
      }
  });
});



export default router;
