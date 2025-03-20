import { useState } from "react";
import TodoForm from "./components/TodoForm";
import { FaTrash } from "react-icons/fa";
import { deleteTodo } from "./services/todoService";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

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

  return (
    <div className=" bg-amber-100  py-6 flex flex-col justify-center sm:py-12">
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
                        <h3 className="font-semibold text-xl text-indigo-700">
                          {todo.title}
                        </h3>
                        <button
                          onClick={() => handleDeleteTodo(todo._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          aria-label="Delete todo"
                        >
                          <FaTrash />
                        </button>
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
