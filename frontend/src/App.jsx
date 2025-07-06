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
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        console.error("Error fetching todos:", err.response?.data || err.message);
      });
  }, []);


  const handleAdd = () => {
    const trimmed = Todo.trim();
    if (trimmed !== '') {
      console.log("Adding todo:", trimmed); // Debug
      axios.post(BASE_URL, { title: trimmed })
        .then(res => {
          setTodos([...Todos, res.data]);
          setTodo('');
        })
        .catch(err => {
          console.error("Error adding todo:", err.response?.data || err.message);
        });
    } else {
      console.warn("Empty todo not allowed.");
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/${id}`)
      .then(() => {
        setTodos(Todos.filter(todo => todo._id !== id));
      })
      .catch(err => {
        console.error("Error deleting todo:", err.response?.data || err.message);
      });
  };

 
  const handleEdit = (todo) => {
    setTodo(todo.title);
    handleDelete(todo._id); 
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-3 bg-violet-200 w-140 min-h-[80vh]">
        <h1 className="text-xl font-bold">Your Todo</h1>

        <div>
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={Todo}
            className="bg-red-50 w-117 p-3 py-1 rounded-2xl"
            type="text"
            placeholder="Add your task..."
          />
          <button
            onClick={handleAdd}
            className="cursor-pointer m-2 p-2 py-0.5 rounded bg-red-600 hover:bg-red-900 text-white"
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
                className="cursor-pointer bg-amber-950 p-3 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="cursor-pointer bg-amber-950 p-3 py-1 rounded text-white"
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
