import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {registerSchema} from '../schema/zod.schema';
import { ZodError } from 'zod';
import { useRegister } from "../api/ResiterApi";;

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState({ nameError: '', emailError: '', passwordError: '', roleError: '' });

  const { mutate: registerUser, isLoading, error: apiError } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError({ nameError: '', emailError: '', passwordError: '', roleError: '' }); // ✅ Reset errors
  
    try {
      registerSchema.parse(formData);
      registerUser(formData)
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          errors[`${error.path[0]}Error`] = error.message;
        });
        setError(errors); 
      }
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              
            />
            <small className="text-red-500">{error.nameError}</small>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              
            />
            <small className="text-red-500">{error.emailError}</small>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              
            />
            <small className="text-red-500">{error.passwordError}</small>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <small className="text-red-500">{error.roleError}</small>
          </div>
          <h1>
            Already registered? <Link to="/login" className="text-blue-500 cursor-pointer">Login</Link>
          </h1>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;