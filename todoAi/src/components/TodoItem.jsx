import React from "react";
import { toggleTodoStatus } from "../services/todoService";

const TodoItem = ({ todo, onStatusChange }) => {
  const handleToggle = async () => {
    try {
      await toggleTodoStatus(todo._id);
      onStatusChange();
    } catch (error) {
      console.error("Error toggling todo status:", error);
    }
  };

  return (
    <div className="flex items-center gap-2  rounded">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          // className="w-4 h-4"
        />
      </div>
      <p
        className={`flex-1 ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.title}
      </p>
    </div>
  );
};

export default TodoItem;
