import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../store/slices/authSlice';
import type { RootState } from '../store';
import type { AuthState } from '../types';
import { loginSchema, type LoginInput } from '../validation/auth';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth as AuthState);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginInput) => {
    dispatch(login(data) as any);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🔐 Welcome Back</h2>
        <p className="text-gray-600">Sign in to your account</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
            👤 Username
          </label>
          <input
            type="text"
            {...register('username')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
            🔒 Password
          </label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Logging in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
