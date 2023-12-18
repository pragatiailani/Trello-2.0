import { databases } from "@/appwrite";

export const getTodosGroupedByColumns = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID
    );

    // console.log(data);
    // Object { total: 1, documents: [
    // Array[Object { "$collectionId": "657dc4c4581236d4415a", "$createdAt": "2023-12-16T15:45:28.221+00:00", "$databaseId": "657dc1232cdd8693335a", "$id": "123dc61835fbbd6347c7", "$permissions": Array[], "$updatedAt": "2023-12-16T15:45:28.221+00:00", image: null, status: "todo", title: "go to gym" }],
    // Array[Object { "$collectionId": "657dc4c4581236d4415a", "$createdAt": "2023-12-16T15:45:28.221+00:00", "$databaseId": "657dc1232cdd8693335a", "$id": "123dc61835fbbd6347c7", "$permissions": Array[], "$updatedAt": "2023-12-16T15:45:28.221+00:00", image: null, status: "todo", title: "drink water" }]]}

    const todos = data.documents;

    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: [],
            });
        }
        acc.get(todo.status).todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.image && { image: JSON.parse(todo.image) }),
        });
        return acc;
    }, new Map());

    // console.log(columns);
    // Map(2) { "todo" => Object { id: "todo", todos: [Object{ 0: Object { "$id":"123dc61835fbbd6347c7", "$createdAt": "2023-12-16T15:45:28.221+00:00", title: "go to gym"}] }, "inprogress" => Object { id: "inprogress", todos: [Object{ 0: Object { "$id":"123dc61835fbbd6347c7", "$createdAt": "2023-12-16T15:45:28.221+00:00", title: "drink water"}] }

    const columnTypes = ["todo", "inprogress", "done"];
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: [],
            });
        }
    }

    // console.log(columns);
    // Map(3) { "todo" => Object { id: "todo", todos: [Object{ 0: Object { "$id":"123dc61835fbbd6347c7", "$createdAt": "2023-12-16T15:45:28.221+00:00", title: "go to gym"}] }, "inprogress" => Object { id: "inprogress", todos: [Object{ 0: Object { "$id":"123dc61835fbbd6347c7", "$createdAt": "2023-12-16T15:45:28.221+00:00", title: "drink water"}] }, "done" => Object { id: "done", todos: [] } }

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort(
            (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        )
    );

    const board = { columns: sortedColumns };

    return board;
};
