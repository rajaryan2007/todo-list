import { useState } from 'react'
import Navbar from './components/navbar'
import './App.css'

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);

  const handleEdit = (index) => {
    setTodo(Todos[index].Todo);
    handleDelete(index); 
  }

  const handleAdd = () => {
    if (Todo.trim() !== "") {
      setTodos([...Todos, { Todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDelete = (index) => {
    const updatedTodos = Todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 rounded-xl p-3 bg-violet-200 w-140 min-h-[80vh]">
        <div><h1 className="text-xl font-bold flex">Your Todo</h1></div>

        <div className=''>
          <input
            onChange={handleChange}
            value={Todo}
            className='bg-red-50 w-117 p-3 py-1 rounded-2xl '
            type="text"
            placeholder="Add your task..."
          />
          <button
            onClick={handleAdd}
            className='cursor-pointer m-2 p-2 py-0.5  rounded bg-red-600 hover:bg-red-900'
          >
           ADD
          </button>
        </div>

        {Todos.map((item, index) => (
          <div key={index} className='todo flex p-2.5 gap-1.5 items-start justify-between'>
            <div className="text">{item.Todo}</div>

            <div className='flex gap-1.5'>
              <button
                onClick={() => handleEdit(index)}
                className='cursor-pointer bg-amber-950 p-1 rounded p-3 py-1'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className='cursor-pointer bg-amber-950 p-1 rounded p-3 py-1'
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

export default App;
