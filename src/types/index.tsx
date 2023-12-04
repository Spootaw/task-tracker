type Todo = {
    id: number
    text: string
    completed: boolean
}

type TodoAction =
    | {
    type: 'added'
    id: number
    text: string
}
    | { type: 'changed'; todo: Todo }
    | { type: 'deleted'; id: number }
    | { type: 'clear-completed' }

type Visibility = 'all' | 'active' | 'completed'
type Sorting = 'ascending' | 'descending'