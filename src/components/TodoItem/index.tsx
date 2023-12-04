import { useState } from "react";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";

export const TodoItem = ({
  todo,
  onChange,
  onDelete,
}: {
  todo: Todo;
  onChange: (todo: Todo) => void;
  onDelete: (todoId: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;

  if (isEditing) {
    todoContent = (
      <>
        <input
          className="flex-auto break-all border-[1px] border-[#eee] px-3 py-2"
          type="text"
          value={todo.text}
          onChange={(e) => {
            onChange({
              ...todo,
              text: e.target.value,
            });
          }}
        />
        <button
          className="text-[20px] text-[#333]"
          onClick={() => setIsEditing(false)}
        >
          <MdSave />
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        <span className="flex-auto break-all">
          {todo.completed ? (
            <s className="text-[#ccc]">{todo.text}</s>
          ) : (
            todo.text
          )}
        </span>
        <button
          className="text-[20px] text-[#333]"
          onClick={() => setIsEditing(true)}
        >
          <MdEdit />
        </button>
      </>
    );
  }

  return (
    <label className="flex w-full flex-row items-center gap-4">
      <input
        className="h-5 w-5 rounded-[10px] accent-[#2564cf]"
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => {
          onChange({
            ...todo,
            completed: e.target.checked,
          });
        }}
      />
      {todoContent}
      <button
        className="text-[20px] text-[#333]"
        onClick={() => onDelete(todo.id)}
      >
        <MdDelete />
      </button>
    </label>
  );
};
