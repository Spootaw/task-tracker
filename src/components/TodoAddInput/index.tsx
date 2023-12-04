import React, { useState } from "react";

export const TodoAddInput = ({
  onAddTodo,
}: {
  onAddTodo: (text: string) => void;
}) => {
  const [text, setText] = useState("");

  function handleKeyUpEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const text = (event.target as HTMLInputElement).value.trim();
      if (text) {
        setText("");
        onAddTodo(text);
      }
    }
  }

  return (
    <input
      className="mt-[15px] w-full rounded-[5px] border-[3px] border-[#2564cf] px-5 py-4"
      type="text"
      autoFocus
      placeholder="＋ Add a task"
      value={text}
      onKeyUp={handleKeyUpEnter}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
