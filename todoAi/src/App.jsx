import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { deleteTodo, updateTodo } from "./services/todoService";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleTodoCreated = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleUpdateTodo = async (todoId) => {
    try {
      const response = await updateTodo(todoId, { title: editTitle });
      console.log("Response:", response);

      // Check if response exists and has the expected structure
      if (response && response.data) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === todoId ? response.data : todo))
        );
        setEditingId(null);
        setEditTitle("");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
      alert("Failed to update todo. Please try again.");
    }
  };

  const startEditing = (todoId, currentTitle) => {
    setEditingId(todoId);
    setEditTitle(currentTitle);
  };

  return (
    <div className=" bg-blue-100  py-6 flex flex-col justify-center sm:py-12">
      <div className=" py-3  sm:mx-24">
        <div className="py-12 bg-white/80 backdrop-blur-sm  rounded-3xl sm:p-12">
          <div className="w-full ">
            <div className="">
              <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Todo App
                </h1>
                <TodoForm onTodoCreated={handleTodoCreated} />
                <div className="mt-8">
                  {todos.map((todo, index) => (
                    <div
                      key={index}
                      className="mb-4 p-6 text-left bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        {editingId === todo._id ? (
                          <div className="flex items-center gap-4 w-full">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                              onClick={() => handleUpdateTodo(todo._id)}
                              className="text-green-500 hover:text-green-700 transition-colors duration-200"
                              aria-label="Save todo"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <>
                            <TodoItem
                              todo={todo}
                              onStatusChange={() => {
                                setTodos((prevTodos) =>
                                  prevTodos.map((t) =>
                                    t._id === todo._id
                                      ? { ...t, completed: !t.completed }
                                      : t
                                  )
                                );
                              }}
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={() =>
                                  startEditing(todo._id, todo.title)
                                }
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                                aria-label="Edit todo"
                              >
                                <FaEdit /> {/* Remove the bg-black class */}
                              </button>
                              <button
                                onClick={() => handleDeleteTodo(todo._id)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                aria-label="Delete todo"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
