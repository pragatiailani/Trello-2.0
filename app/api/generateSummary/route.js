
import openai, { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openaiApi = new OpenAIApi(configuration);

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { todos } = requestData;

        const response = await openaiApi.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.8,
            n: 1,
            stream: false,
            messages: [
                {
                    role: "system",
                    content: `When responding, Welcome the user always as Mr. Bellion and say welcome to the Jello App! Limit the response to 200 characters`,
                },
                {
                    role: "user",
                    content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress, and done, then tell the user a short inspirational quote to inspire them to have a positive productive day! Here's the data: 
            ${JSON.stringify(todos)}`,
                },
            ],
        });

        const { data } = response;
        const suggestion = data.choices[0]?.message?.content || "";

        return new Response(JSON.stringify({ suggestion }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching suggestion:", error);

        return new Response(
            JSON.stringify({ error: "Failed to fetch suggestion" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

// import openai from "@/openai";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//     // todos in the body of the POST req
//     const { todos } = await request.body.json();
//     console.log(todos);

//     // communicate with openAI GPT
//     const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         temperature: "0.8",
//         n: 1,
//         stream: false,
//         messages: [
//             {
//                 role: "system",
//                 content: `When responding, welcome the user always as Devi Pragati (using Indian honorifics) and say welcome to the amazin todo app! Limit the response to 200 characters.`,
//             },
//             {
//                 role: "user",
//                 content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as to do, in progress and done, then tell the user to have a productive day with a motivational quote. Here's the data: ${JSON.stringify(
//               todos
//                 )}`,
//             },
//         ],
//     });
//     const { data } = response;

//     console.log("DATA IS", data);
//     console.log(data.choices[0].message);

//     return NextResponse.json(data.choices[0].message);
// }
