const API_BASE_URL = "https://api.freeapi.app/api/v1";

export const updateTodo = async (todoId, { title }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    const result = await response.json();
    if (!result.data) {
      throw new Error("Invalid response format");
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

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

    const result = await response.json();
    if (!result.data) {
      throw new Error("Invalid response format");
    }
    return result;
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

    const result = await response.json();
    if (!result.data) {
      throw new Error("Invalid response format");
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
