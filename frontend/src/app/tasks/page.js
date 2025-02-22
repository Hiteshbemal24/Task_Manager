import TaskList from '../components/TaskList';

export default function TasksPage() {
    return (
        <div className="min-h-screen p-4">
            <h2 className="flex justify-center text-2xl font-bold mb-4">Your Tasks</h2>
            <TaskList />
        </div>
    );
}