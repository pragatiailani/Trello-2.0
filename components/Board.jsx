"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Column from "./Column";

function Board() {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState,
        state.updateTodoInDB
    ]);

    useEffect(() => {
        getBoard();
    }, [getBoard]);

    const handleOnDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        // console.log(destination, source, draggableId, type);

        // Handle column drag
        if (type === "column") {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);

            const rearrangedColumns = new Map(entries);
            setBoardState({
                ...board,
                columns: rearrangedColumns,
            });
        }

        // This step is needed as the indexes are stored as numbers 0, 1, 2, etc. instead of ids with DND library
        // const columns = Array.from(board.columns);
        const startColIndex = board.columns.get(source.droppableId);
        const finishColIndex = board.columns.get(destination.droppableId);

        // console.log(columns, startColIndex, finishColIndex);

        const startCol = {
            id: startColIndex.id,
            todos: startColIndex.todos,
        };
        const finishCol = {
            id: finishColIndex.id,
            todos: finishColIndex.todos,
        };

        if (!startCol || !finishCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        // Same Column Task Drag
        if (startCol.id == finishCol.id) {
            newTodos.splice(destination.index, 0, todoMoved);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCol);
            setBoardState({
                ...board,
                columns: newColumns,
            });
        } else {
            // Different Column Task Drag
            const finishTodos = finishCol.todos;
            finishTodos.splice(destination.index, 0, todoMoved);

            const newColumns = new Map(board.columns);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };
            newColumns.set(startCol.id, newCol);
            newColumns.set(finishCol.id, {
                id: finishCol.id,
                todos: finishTodos,
            });
            updateTodoInDB(todoMoved, finishCol.id);
            setBoardState({
                ...board,
                columns: newColumns,
            });
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="column">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
                        {...provided.droppableProps}
                    >
                        {Array.from(board.columns.entries()).map(
                            ([id, column], index) => (
                                <Column
                                    key={id}
                                    id={id}
                                    todos={column.todos}
                                    index={index}
                                />
                            )
                        )}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default Board;
