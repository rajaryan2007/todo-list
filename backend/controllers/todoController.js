const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({ title });
  await todo.save();
  res.status(201).json(todo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { title, isCompleted }, { new: true });
  res.json(todo);
};
