"use client";
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { createTask, updateTask } from '../../utils/api'; 

const TaskForm = ({ existingTask, onTaskUpdated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium'); // Default priority
    const [error, setError] = useState('');

    useEffect(() => {
        if (existingTask) {
            // If an existing task is provided, populate the form with its data
            setTitle(existingTask.title);
            setDescription(existingTask.description);
            setDueDate(existingTask.dueDate.split('T')[0]); // Format date for input
            setPriority(existingTask.priority);
        }
    }, [existingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        const token = localStorage.getItem('token'); // Get the token from local storage

        try {
            if (existingTask) {
                // Update existing task
                await updateTask(existingTask._id, { title, description, dueDate, priority }, token);
                toast.success('Task updated successfully!'); // Show success toast
            } else {
                // Create new task
                await createTask({ title, description, dueDate, priority }, token);
                toast.success('Task created successfully!'); // Show success toast
            }
            // Call the callback function to refresh the task list or perform other actions
            onTaskUpdated(); // This should trigger a refresh of the task list
            // Clear the form
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('Medium');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            toast.error(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="input"
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="input"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="input"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="input"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type="submit" className="btn">
                    {existingTask ? 'Update Task' : 'Create Task'}
                </button>
            </form>
            <ToastContainer /> 
        </>
    );
};

export default TaskForm;