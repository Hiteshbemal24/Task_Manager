const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);