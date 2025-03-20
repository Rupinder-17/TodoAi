const API_BASE_URL = "https://api.freeapi.app/api/v1";

export const createTodo = async ({ title }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error("Failed to create todo");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
