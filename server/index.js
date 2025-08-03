import express from "express";
import cors from "cors";
import generateReview from "./review.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.post("/api/v1/reviews", async (req, res) => {
  let data = req.body;
  try {
    const review = await generateReview(data);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    review.data.on("data", (chunk) => {
      const lines = chunk.toString().split("\n");
      for (const line of lines) {
        if (line.trim() === "") continue;
        try {
          const json = JSON.parse(line);
          if (json.response) {
            res.write(`${json.response}`);
          }
        } catch (e) {
          console.error("Stream parse error:", e.message);
        }
      }
    });

    review.data.on("end", () => res.end());
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
