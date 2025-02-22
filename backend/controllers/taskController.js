const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const task = new Task({ title, description, dueDate, priority, user: req.user.id });
    await task.save();
    res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
    const { title, description, dueDate, priority, completed } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, priority, completed }, { new: true });
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
};