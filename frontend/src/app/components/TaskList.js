"use client";
import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../../utils/api";
import TaskForm from "../tasks/TaskForm";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [token, setToken] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [sortBy, setSortBy] = useState("title");
    const [filterStatus, setFilterStatus] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const fetchAllTasks = async () => {
        if (!token) return;
        try {
            const tasksData = await fetchTasks(token);
            setTasks(tasksData);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch tasks");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id, token);
            fetchAllTasks();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete task");
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            await updateTask(task._id, { completed: !task.completed }, token);
            fetchAllTasks();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update task");
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleTaskUpdated = () => {
        setEditingTask(null);
        fetchAllTasks();
    };

    useEffect(() => {
        fetchAllTasks();
    }, [token]);

    const sortedTasks = [...tasks].sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
        if (sortBy === "priority") return a.priority.localeCompare(b.priority);
        return 0;
    });

    const filteredTasks = sortedTasks.filter((task) => {
        if (filterStatus !== "all" && task.completed !== (filterStatus === "completed")) {
            return false;
        }
        if (startDate && new Date(task.dueDate) < new Date(startDate)) {
            return false;
        }
        if (endDate && new Date(task.dueDate) > new Date(endDate)) {
            return false;
        }
        return true;
    });

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            {error && <p className="text-red-500">{error}</p>}

            {/* Task Form */}
            <TaskForm existingTask={editingTask} onTaskUpdated={handleTaskUpdated} />

            {/* Sorting & Filtering */}
            <div className="flex flex-wrap gap-4 p-4 bg-white shadow-lg rounded-lg mb-4">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="title">Sort by Title</option>
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="priority">Sort by Priority</option>
                </select>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No tasks available.</p>
            ) : (
                <div className="space-y-4">
                    {filteredTasks.map((task) => (
                        <div
                            key={task._id}
                            className="flex justify-between items-center p-5 border border-gray-200 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
                        >
                            <div>
                                <h3 className={`font-semibold text-lg ${task.completed ? "line-through text-gray-500" : ""}`}>
                                    {task.title}
                                </h3>
                                <p className="text-gray-600">{task.description}</p>
                                <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                <p
                                    className={`text-sm font-semibold ${
                                        task.priority === "High" ? "text-red-500" : "text-green-500"
                                    }`}
                                >
                                    Priority: {task.priority}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleToggleComplete(task)}
                                    className={`px-4 py-2 text-white font-semibold rounded ${
                                        task.completed ? "bg-gray-400 hover:bg-gray-500" : "bg-green-500 hover:bg-green-600"
                                    } transition`}
                                >
                                    {task.completed ? "Undo" : "Complete"}
                                </button>
                                <button
                                    onClick={() => handleEditTask(task)}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
