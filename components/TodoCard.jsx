"use client";

import { XCircleIcon } from "@heroicons/react/24/solid";

function TodoCard({
    todo,
    index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps,
}) {
    return (
        <div
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
            className="bg-white rounded-md space-y-2 shadow-sm"
        >
            <div className="flex justify-between items-center p-5">
                <p>{todo.title}</p>
                <button className="text-red-500 hover:text-red-600">
                    <XCircleIcon className="ml-5 h-8 w-8" />
                </button>
            </div>

        </div>
    );
}

export default TodoCard;
