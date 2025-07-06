import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import './App.css';

function App() {
  const [Todo, setTodo] = useState('');
  const [Todos, setTodos] = useState([]);

  const BASE_URL = 'https://todo-list-2-00a4.onrender.com/api/todos';

  useEffect(() => {
    axios.get(BASE_URL)
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error fetching todos:", err.response?.data || err.message));
  }, []);

  const handleAdd = () => {
    const trimmed = Todo.trim();
    if (trimmed !== '') {
      axios.post(BASE_URL, { title: trimmed })
        .then(res => {
          setTodos([...Todos, res.data]);
          setTodo('');
        })
        .catch(err => console.error("Error adding todo:", err.response?.data || err.message));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/${id}`)
      .then(() => setTodos(Todos.filter(todo => todo._id !== id)))
      .catch(err => console.error("Error deleting todo:", err.response?.data || err.message));
  };

  const handleEdit = (todo) => {
    setTodo(todo.title);
    handleDelete(todo._id);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 max-w-screen-sm p-4 sm:p-6 rounded-xl bg-violet-200 min-h-[80vh]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Your Todo</h1>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-6">
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={Todo}
            className="w-full sm:flex-1 bg-red-50 p-2 sm:p-3 rounded-2xl text-sm sm:text-base"
            type="text"
            placeholder="Add your task..."
          />
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto px-4 py-2 rounded bg-red-600 hover:bg-red-900 text-white text-sm sm:text-base"
          >
            ADD
          </button>
        </div>

        <div className="space-y-4">
          {Todos.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 rounded shadow">
              <div className="text-base break-words">{item.title}</div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-600 hover:bg-yellow-800 text-white px-4 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-700 hover:bg-red-900 text-white px-4 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
