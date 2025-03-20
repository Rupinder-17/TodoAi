import { useState } from "react";
import { createTodo } from "../services/todoService";

const TodoForm = ({ onTodoCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await createTodo(formData);
      setFormData({ title: "" });
      onTodoCreated(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="  p-8  bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex">
          {/* <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            Title
          </label> */}
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter todo "
            className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 ease-in-out"
          />

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-40 flex justify-center py-3 px-6 border border-transparent rounded-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md"
          >
            {loading ? "Creating..." : "Create Todo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
