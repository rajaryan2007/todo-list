const Todo = require('../models/todoModel');

// ✅ Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// ✅ Add a new todo
exports.addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = new Todo({ title });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
};

// ✅ Delete a todo by ID
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

// ✅ Update a todo by ID (if needed)
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isCompleted } = req.body;

    const updated = await Todo.findByIdAndUpdate(
      id,
      { title, isCompleted },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};
