import { Draggable, Droppable } from "@hello-pangea/dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";

const idToColumnText = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
};

function Column({ id, todos, index }) {
    const [searchString] = useBoardStore((state) => [state.searchString]);

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Droppable droppableId={id} type="card">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`p-2 rounded-2xl shadow-sm ${
                                    snapshot.isDraggingOver
                                        ? "bg-green-200"
                                        : "bg-white/50"
                                }`}
                            >
                                <h2 className="flex justify-between font-bold text-xl p-2">
                                    {idToColumnText[id]}
                                    <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                                        {!searchString
                                            ? todos.length
                                            : todos.filter((todo) =>
                                                  todo.title
                                                      .toLowerCase()
                                                      .includes(
                                                          searchString.toLowerCase()
                                                      )
                                              ).length}
                                    </span>
                                </h2>
                                <div className="space-y-2">
                                    {todos.map((todo, index) => {
                                        if (
                                            searchString &&
                                            !todo.title
                                                .toLowerCase()
                                                .includes(
                                                    searchString.toLowerCase()
                                                )
                                        )
                                            return null;

                                        return (
                                            <Draggable
                                                key={todo.$id}
                                                draggableId={todo.$id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <TodoCard
                                                            todo={todo}
                                                            index={index}
                                                            id={id}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                    <div className="flex items-end justify-end p-2">
                                        <button className="text-green-500 hover:text-green-600">
                                            <PlusCircleIcon className="h-10 w-10" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}

export default Column;
