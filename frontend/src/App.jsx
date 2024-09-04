import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [updateData, setUpdateData] = useState({ text: "", completed: false });
  const [updateTitle, setUpdateTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async () => {
    try {
      await axios.post("http://localhost:3000/todo", newTodo);
      fetchTodos();
      setNewTodo({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async () => {
    try {
      await axios.put(`http://localhost:3000/todos/title/${updateTitle}`, updateData);
      fetchTodos();
      setUpdateTitle("");
      setUpdateData({ text: "", completed: false });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const markCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:3000/completed`, { id });
      fetchTodos();
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  const deleteTodo = async (title) => {
    try {
      await axios.delete(`http://localhost:3000/todos/title/${title}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      
      <div>
        <h2>Create a Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button onClick={createTodo}>Create Todo</button>
      </div>

      

      <div>
        <h2>Todos List</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>{todo.completed ? "Completed" : "Not Completed"}</p>
              <button onClick={() => markCompleted(todo._id)}>Mark as Completed</button>
              <br></br>
              <br></br>
              <button onClick={() => deleteTodo(todo.title)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
