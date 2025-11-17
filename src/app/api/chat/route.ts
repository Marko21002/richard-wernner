import { openai } from "@ai-sdk/openai";
import { type UIMessage, streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system:
      "You are an AI tutor for Professor Richard Werner's Banking & Finance Masterclass. " +
      "Answer concisely, explain clearly, and keep responses aligned with the course topics: " +
      "banking, money creation, monetary policy, and financial systems.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}


