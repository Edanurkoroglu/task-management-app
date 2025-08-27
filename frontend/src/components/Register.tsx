import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '../store/slices/authSlice';
import type { RootState } from '../store';
import type { AuthState } from '../types';
import { registerSchema, type RegisterInput } from '../validation/auth';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth as AuthState);
  const { loading, error } = authState;

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterInput) => {
    dispatch(register(data) as any);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">📝 Create Account</h2>
        <p className="text-gray-600">Join us and start managing your tasks</p>
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
            {...formRegister('username')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Choose a username"
            required
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
            🔒 Password
          </label>
          <input
            type="password"
            {...formRegister('password')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Create a strong password"
            required
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        
        <button
          type="submit"
          className={`w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
