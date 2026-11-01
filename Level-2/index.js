// Built in Tool

import express from "express";
import dotenv from "dotenv";
import { ChatGoogle } from "@langchain/google";
import {createAgent} from "langchain"
import { TavilySearch } from "@langchain/tavily";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const tool = new TavilySearch({
  maxResults: 5,
  topic: "general",
  // includeAnswer: false,
  // includeRawContent: false,
  // includeImages: false,
  // includeImageDescriptions: false,
  // searchDepth: "basic",
  // timeRange: "day",
  // includeDomains: [],
  // excludeDomains: [],
});

const model = new ChatGoogle("gemini-3.5-flash-lite");


app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const agent = createAgent({
    model,
    tools: [tool]
  })

  const result = await agent.invoke({
    messages: [
      {
        role:"user",
        content:prompt
      }
    ]
  })

  return res.json(`Result: ${result.messages[result.messages.length - 1].content}`)
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT:${PORT}`);
});
