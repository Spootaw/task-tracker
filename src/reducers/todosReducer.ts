export function todosReducer(todos: Array<Todo>, action: TodoAction) {
    switch (action.type) {
        case 'added': {
            return [
                ...todos,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                },
            ]
        }
        case 'changed': {
            return todos.map((todo) => {
                if (todo.id === action.todo.id) {
                    return action.todo
                } else {
                    return todo
                }
            })
        }
        case 'deleted': {
            return todos.filter((todo) => todo.id !== action.id)
        }
        case 'clear-completed': {
            return todos.filter((todo) => !todo.completed)
        }
    }
}