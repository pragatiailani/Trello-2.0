const formatTodosForAI = (board) => {
    const todos = Array.from(board.columns.entries());

    const flatArray = todos.reduce((map, [key, value]) => {
        map[key] = value.todos;
        return map;
    });

    // reduce to key: value (length)
    const flatArrayCounted = Object.entries(flatArray).reduce(
        (map, [key, value]) => {
            map[key] = value.length;
            return map;
        }
    );

    return flatArrayCounted;
};

export default formatTodosForAI;
