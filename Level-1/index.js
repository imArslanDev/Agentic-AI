import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// generateContent apko response deta ha jb sara response complete ho chuka ho
// const callGemini = async () => {
//     try {
//         const response = await ai.models.generateContent({
//             model: "gemini-3.5-flash-lite", // Make sure you're using a valid available model
//             contents: "Shortly Explain me What are the sklills require to get a job in  MERN Stack?"
//         });

//         console.log("AI Response:\n", response.text);
//     } catch (error) {
//         console.error(`Gemini API Error (${error.status || 503}):`, error.message);
//         console.log("Retrying or skipping due to high demand...");
//     }
// };

// GenerateContentStream chunks/tokens ma repsone dega
// const callGemini = async () => {
//   try {
//     const responseStream = await ai.models.generateContentStream({
//       model: "gemini-3.5-flash-lite", // Make sure you're using a valid available model
//       contents: "Shortly explain me what is MCP?",
//     });

//     for await (const chunk of responseStream) {
//       //   process.stdout.write(chunk.text);
//       console.log(chunk.text);
//     }
//   } catch (error) {
//     console.error(`Gemini API Error (${error.status || 503}):`, error.message);
//     console.log("Retrying or skipping due to high demand...");
//   }
// };


// Project
app.post("/chat", async (req, res) => {
    const {prompt} = req.body
    const result = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt
    })

    return res.json(result.text)
})


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT:${PORT}`);
//   callGemini();
});
