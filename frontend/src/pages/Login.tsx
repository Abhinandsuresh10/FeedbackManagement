import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginSchema } from '../schema/zod.schema';
import { ZodError } from 'zod';
import { useLogin } from "../api/LoginApi";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ emailError: '', passwordError: '' });
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({ emailError: '', passwordError: '' });
    setApiError(null);

    try {
      LoginSchema.parse(formData);
      
      mutate(formData, {
        onSuccess: (data) => {
          const userRole = data.user?.role; 
          if (userRole === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/user-dashboard");
          }
        },
        onError: (error) => {
          setApiError("Invalid email or password");
        }
      });
      
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.errors.reduce((acc, error) => {
          acc[`${error.path[0]}Error`] = error.message;
          return acc;
        }, {} as Record<string, string>);
        setError(errors);
      } 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          {apiError && <p className="text-red-500">{apiError}</p>}
          <h1>Don't have an account? <Link to='/' className='text-blue-500'>Register</Link></h1>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;