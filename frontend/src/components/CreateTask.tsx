import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTask } from '../store/slices/taskSlice';
import { createTaskSchema, type CreateTaskInput } from '../validation/task';

const CreateTask: React.FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: CreateTaskInput) => {
    dispatch(createTask(data) as any);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">➕ Create a New Task</h2>
      
      <div className="mb-4">
        <input
          type="text"
          {...register('title')}
          placeholder="Task Title"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      
      <div className="mb-4">
        <textarea
          {...register('description')}
          placeholder="Task Description (optional)"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      
      <button 
        type="submit" 
        className="bg-green-600 text-white rounded-lg p-3 w-full hover:bg-green-700 transition-colors"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
