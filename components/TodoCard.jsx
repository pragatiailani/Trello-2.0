"use client";

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
            className="bg-white rounded-md space-y-2 shadow-sm p-2"
        >
            <h1>Hello</h1>
        </div>
    );
}

export default TodoCard;
