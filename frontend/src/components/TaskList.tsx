import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../store';
import type { AuthState, TaskState, Task, UpdateTaskData } from '../types';
import { fetchTasks, updateTask, deleteTask } from '../store/slices/taskSlice';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks as TaskState);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth as AuthState);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTasks() as any);
    }
  }, [isAuthenticated, dispatch]);

  const handleStatusToggle = (task: Task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    dispatch(updateTask({ 
      id: task.id, 
      taskData: { status: newStatus } 
    }) as any);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSaveEdit = (taskId: number) => {
    const taskData: UpdateTaskData = {
      title: editTitle,
      description: editDescription
    };
    dispatch(updateTask({ id: taskId, taskData }) as any);
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDelete = (taskId: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId) as any);
    }
  };

  if (loading) {
    return <div className="text-center">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">📋 My Tasks</h2>
        <Link 
          to="/create-task" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
        >
          ➕ Create New Task
        </Link>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">No tasks yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first task!</p>
          <Link 
            to="/create-task" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {tasks.map((task: Task) => (
            <div key={task.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              {editingTask === task.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Task Title"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Task Description"
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                    </span>
                  </div>
                  
                  {task.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>
                  )}
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      📅 Created: {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      🔄 Updated: {new Date(task.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusToggle(task)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        task.status === 'completed'
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {task.status === 'completed' ? '↩️ Mark Pending' : '✅ Mark Complete'}
                    </button>
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-600 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
