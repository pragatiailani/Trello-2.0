import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestions = async (board) => {
    try {
        const todos = formatTodosForAI(board);
        const res = await fetch("/api/generateSummary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ todos }),
        });

        const GPTdata = await res.json();
        const { suggestion } = GPTdata;
        return suggestion || "AI bot is summarizing your tasks for the day...";
    } catch (error) {
        console.error("Error fetching suggestion:", error);
        return "AI bot is summarizing your tasks for the day..."; // Return a default message in case of error
    }
};

// import formatTodosForAI from "./formatTodosForAI";

// const fetchSuggestions = async (board) => {
//     const todos = formatTodosForAI(board);
//     console.log("Formatted Todos: ", todos);

//     const res = await fetch("/api/generateSummary", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ todos }),
//     });

//     const GPTdata = await res.json();
//     const { content } = GPTdata;

//     return content;
// };

export default fetchSuggestions;
