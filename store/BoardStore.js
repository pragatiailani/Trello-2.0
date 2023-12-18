import { getTodosGroupedByColumns } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand";

export const useBoardStore = create((set) => ({
    // state variables
    board: {
        columns: new Map(),
    },

    // actions
    getBoard: async () => {
        const board = await getTodosGroupedByColumns();
        set({ board });
    },
}));
