import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import './App.css';

function App() {
  const [Todo, setTodo] = useState('');
  const [Todos, setTodos] = useState([]);

  // Fetch all todos from MongoDB when page loads
  useEffect(() => {
    axios.get('/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  const handleAdd = () => {
    if (Todo.trim() !== '') {
      axios.post('/api/todos', { title: Todo })
        .then(res => {
          setTodos([...Todos, res.data]);
          setTodo('');
        })
        .catch(err => console.error("Error adding todo:", err));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(Todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.error("Error deleting todo:", err));
  };

  const handleEdit = (todo) => {
    setTodo(todo.title);
    handleDelete(todo._id); // OR write an update API instead
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-3 bg-violet-200 w-140 min-h-[80vh]">
        <h1 className="text-xl font-bold">Your Todo</h1>

        <div>
          <input
            onChange={handleChange}
            value={Todo}
            className="bg-red-50 w-117 p-3 py-1 rounded-2xl"
            type="text"
            placeholder="Add your task..."
          />
          <button
            onClick={handleAdd}
            className="cursor-pointer m-2 p-2 py-0.5 rounded bg-red-600 hover:bg-red-900"
          >
            ADD
          </button>
        </div>

        {Todos.map((item) => (
          <div key={item._id} className="todo flex p-2.5 gap-1.5 items-start justify-between">
            <div className="text">{item.title}</div>
            <div className="flex gap-1.5">
              <button
                onClick={() => handleEdit(item)}
                className="cursor-pointer bg-amber-950 p-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="cursor-pointer bg-amber-950 p-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
