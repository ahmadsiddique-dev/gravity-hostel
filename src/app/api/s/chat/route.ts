import {
  streamText,
  UIMessage,
  convertToModelMessages,
  stepCountIs,
  tool,
} from "ai";
import { google } from "@ai-sdk/google";
import { public_ai_instruction } from "@/data/instructions.json";
import z from "zod";
import { executionHandler } from "@/lib/execution-handler";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash-lite"),
    messages: await convertToModelMessages(messages),
    system:`
        You are a hostel assistant.
        If you call a tool and receive data,
        you MUST explain the result to the user in plain text.
        Never stop after a tool call.
        If you are asked to give data then query based on the given Id in prompt.
        `,
    stopWhen: stepCountIs(15),
    tools: {
      getWeather: tool({
        description: "Get the weather in the location",
        inputSchema: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: ({ location }) => {
          return { temperature: 72, conditions: "sunny", location: location };
        },
      }),
      getRoom: tool({
        description: "Get the room details of the student",
        inputSchema: z.object({
          id: z.string().describe("Id of student to get the data of room."),
          qfor: z
            .string()
            .describe(
              "pass 'room' if student question is related to room data",
            ),
        }),
        execute: async ({ id, qfor }) => await executionHandler({ id, qfor }), // issue could be here
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
