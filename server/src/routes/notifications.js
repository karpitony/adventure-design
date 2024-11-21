const express = require("express");
const { sendNotification } = require("../services/notification");

const router = express.Router();

router.get("/up", async (req, res) => {
  console.log("up");
  try {
    await sendNotification("up");
    res.status(200).json({ message: "Notification for 'up' sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/down", async (req, res) => {
  console.log("down");
  try {
    await sendNotification("down");
    res.status(200).json({ message: "Notification for 'down' sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
