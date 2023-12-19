import { databases } from "@/appwrite";
import { getTodosGroupedByColumns } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand";

export const useBoardStore = create((set) => ({
    // state variables
    board: {
        columns: new Map(),
    },
    searchString: "",

    // actions
    getBoard: async () => {
        const board = await getTodosGroupedByColumns();
        set({ board });
    },
    setBoardState: (board) => set({ board }),
    updateTodoInDB: async (todo, columnId) => { 
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
            todo.$id,
            {
                title: todo.title,
                status: columnId
            }
        )
    },

    setSearchString: (searchString) => set({ searchString }),
}));
