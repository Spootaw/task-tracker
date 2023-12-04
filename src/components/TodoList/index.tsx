import { useEffect, useMemo, useReducer, useState } from "react";
import { STORAGE_KEY } from "@/constants";
import { TodoAddInput } from "@/components/TodoAddInput";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { TodoItem } from "@/components/TodoItem";
import cn from "classnames";
import { todosReducer } from "@/reducers/todosReducer";

export default function TodoList() {
  const [todos, dispatchTodos] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  );
  const [searchText, setSearchText] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("all");
  const [sorting, setSorting] = useState<Sorting>("descending");

  const remaining = todos.filter((todo) => !todo.completed).length;

  function handleAddTodo(text: string) {
    dispatchTodos({
      type: "added",
      id: Date.now(),
      text,
    });
  }

  function handleChangeTodo(todo: Todo) {
    dispatchTodos({
      type: "changed",
      todo,
    });
  }

  function handleDeleteTodo(todoId: number) {
    dispatchTodos({
      type: "deleted",
      id: todoId,
    });
  }

  function handleClearCompleteTodo() {
    dispatchTodos({
      type: "clear-completed",
    });
  }

  const filteredTodos = useMemo(() => {
    let filteredTodos = [];

    switch (visibility) {
      case "all":
        filteredTodos = [...todos];
        break;
      case "active":
        filteredTodos = todos.filter((todo) => !todo.completed);
        break;
      case "completed":
        filteredTodos = todos.filter((todo) => todo.completed);
        break;
      default:
        filteredTodos = [...todos];
    }

    filteredTodos.sort((a, b) => {
      if (sorting === "descending") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

    return searchText
      ? filteredTodos.filter((todo) =>
          todo.text.toLowerCase().includes(searchText.toLowerCase())
        )
      : filteredTodos;
  }, [searchText, sorting, todos, visibility]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="format lg:format-lg w-full max-w-[450px] rounded-[5px] border-[1px] border-[#333] bg-white p-5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="m-0 p-0 text-[30px] font-bold text-[#2564cf]">
          Task Tracker
        </h1>
        <strong className="m-0 flex flex-col items-center justify-center p-0">
          <div className="text-[35px] font-bold text-[#2564cf]">
            {remaining}
          </div>
          <div className="text-[12px]">
            {remaining > 1 ? "Items" : "Item"} Left
          </div>
        </strong>
      </div>
      <TodoAddInput onAddTodo={handleAddTodo} />
      <div className="not-format mt-4 flex w-full flex-col gap-4">
        <section className="flex flex-col gap-4">
          <div className="flex w-full flex-row items-center justify-between gap-4">
            {sorting === "descending" ? (
              <button
                className="rounded-[5px] bg-[#2564cf] p-2 text-white"
                onClick={() => setSorting("ascending")}
              >
                <FaSortAmountDown className="h-5 w-5" />
              </button>
            ) : (
              <button
                className="rounded-[5px] bg-[#2564cf] p-2 text-white"
                onClick={() => setSorting("descending")}
              >
                <FaSortAmountUp className="h-5 w-5 " />
              </button>
            )}
            <div className="flex gap-5">
              <button
                className={cn(
                  visibility === "all" ? "text-[#2564cf]" : "text-[#aaa]"
                )}
                onClick={() => setVisibility("all")}
              >
                All
              </button>
              <button
                className={cn(
                  visibility === "active" ? "text-[#2564cf]" : "text-[#aaa]"
                )}
                onClick={() => setVisibility("active")}
              >
                Active
              </button>
              <button
                className={cn(
                  visibility === "completed" ? "text-[#2564cf]" : "text-[#aaa]"
                )}
                onClick={() => setVisibility("completed")}
              >
                Completed
              </button>
            </div>
          </div>
        </section>
        <input
          className="mt-[2px] w-full rounded-[5px] border-[1px] border-[#ccc] px-2 py-2"
          type="text"
          value={searchText}
          placeholder="Search your task from the list ..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <ul
          className={cn(
            [
              "text-sm",
              "font-medium",
              "text-gray-900",
              "bg-white",
              "border",
              "border-gray-200",
              "rounded-lg",
            ],
            { hidden: filteredTodos.length === 0 }
          )}
        >
          {filteredTodos.map((todo, index) => (
            <li
              key={todo.id}
              className={cn(
                ["w-full", "px-4", "py-5"],
                { "rounded-t-lg": index === 0 },
                {
                  "border-b border-gray-200":
                    index !== filteredTodos.length - 1,
                },
                { "rounded-b-lg": index === filteredTodos.length - 1 }
              )}
            >
              <TodoItem
                todo={todo}
                onChange={handleChangeTodo}
                onDelete={handleDeleteTodo}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        className={cn(
          { hidden: remaining >= filteredTodos.length },
          "mt-[15px] text-[14px] font-bold"
        )}
        onClick={handleClearCompleteTodo}
      >
        Clear Completed
      </button>
    </div>
  );
}
