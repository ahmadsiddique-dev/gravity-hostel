import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { student_ai_instructions } from '@/data/instructions.json'

export async function POST(request:Request) {
    const { messages }: {messages: UIMessage[]} = await request.json();

    const response = streamText({
        model: google("gemini-2.5-flash"),
        messages: await convertToModelMessages(messages),
        system: student_ai_instructions
    })

    return response.toUIMessageStreamResponse();
}