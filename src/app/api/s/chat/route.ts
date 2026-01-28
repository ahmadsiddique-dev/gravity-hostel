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
import dbConnect from "@/connection/dbconnect";
import { RoomModel } from "@/models/Room.model";
import { StudentModel } from "@/models/StudentSignup.model";

export async function POST(req: Request) {
  const { messages }: {messages: UIMessage[]} = await req.json();

  console.log("Data DOta: ", messages);

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: await (convertToModelMessages(messages)),
    system: `
    If you are asked to give data then query based on the given Id in prompt.
    `,
    stopWhen: stepCountIs(5),
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
      getRoomNO: tool({
        description: "Get the room details of the student",
        inputSchema: z.object({
          id: z.string().describe("Id of student to get the data of room."),
        }),
        execute: async ({ id }) => {
          await dbConnect();
          console.log("ID: ", id);
          try {
            if (!id) {
              return "Id is not defined";
            }

            const studentId = await StudentModel.findOne({ user: id }, {_id : 1})

            if (!studentId) {
                return 'Student not found';
            }

            const response = await RoomModel.find({ occupants: { $in: [studentId] } });

            if (!response.length) {
              return "Noting found";
            }
            return response;
          } catch (error) {
            return "something went wrong.";
          }
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}

// tools: {
//       getStudentInfo: {
//         description: `This is the quote written by Ahmad Siddique. And Id you need to send id ${activeId}`,
//         inputSchema: z.object({
//           id: z.string().describe("The id used in the quote"),
//         }),
//         execute: async ({ id }) => {
//           return `History tells use:
//           who we are?
//           this id ${id}
//           what we are?
//           why we are?
//           `;
//         },
//       },
//     },
