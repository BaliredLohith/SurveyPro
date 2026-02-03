import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, MapPin, BarChart3, Star } from 'lucide-react';

const LoginForm = ({ 
  formData, 
  errors, 
  loading, 
  error, 
  onChange, 
  onSubmit, 
  onAutoFill, 
  onTogglePassword 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [localFormData, setLocalFormData] = useState({ email: '', password: '' });
  const [localLoading, setLocalLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const newFormData = { ...localFormData, [e.target.name]: e.target.value };
    setLocalFormData(newFormData);
    onChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localFormData.email || !localFormData.password) return;

    setLocalLoading(true);
    const success = await login(localFormData.email, localFormData.password);
    if (!success) setLocalLoading(false);
    onSubmit(e);
  };

  const handleAutoFill = () => {
    const demoData = { email: 'admin@example.com', password: 'password123' };
    setLocalFormData(demoData);
    onChange({ target: { name: 'email', value: demoData.email } });
    onChange({ target: { name: 'password', value: demoData.password } });
    onAutoFill();
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT HERO PANEL */}
      <div className="w-1/2 bg-[#4F5EEA] text-white flex flex-col justify-center px-16 py-14">
        {/* Top Section */}
        <div>
          {/* Project Name */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-wide mb-1">
              SURVEY<span className="text-yellow-400">PRO</span>
            </h1>
            <p className="text-blue-100 text-sm tracking-wide">
              ISP Site Survey Management System
            </p>
          </div>

          {/* Main Headline */}
          <div className="mb-8">
            <h2 className="text-5xl font-extrabold leading-snug mb-6">
              <span className="text-yellow-400">Survey</span> Smarter, ✨ <br />
              <span className="text-yellow-400">Deploy</span> Faster
            </h2>
            <p className="text-blue-100 text-lg max-w-md">
              
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex gap-6 mt-12">
          {/* Card 1 */}
          <div className="bg-white/15 rounded-2xl p-6 w-1/2 backdrop-blur-md">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-lg p-3 flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">
                  Smart Site Surveys ✨
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Capture location, network feasibility, and infrastructure data accurately.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/15 rounded-2xl p-6 w-1/2 backdrop-blur-md">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-lg p-3 flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">
                  Deployment Ready ✨
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Convert survey data into actionable insights for faster ISP deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN SIDE */}
      <div className="w-1/2 bg-slate-50 flex items-center justify-center p-8">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">
              Sign in to your Site Survey Tool account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  value={localFormData.email}
                  onChange={handleChange}
                  className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={localFormData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => {
                    setShowPassword(!showPassword);
                    onTogglePassword();
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={localLoading || loading}
              className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
              {(localLoading || loading) ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* SIGNUP LINK */}
          <div className="text-center mt-5 text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign up here
            </Link>
          </div>

          {/* DEMO BOX */}
          <div className="mt-6 bg-slate-100 rounded-xl p-4 text-sm">
            <p className="font-semibold text-gray-700 mb-1">Demo Account</p>
            <p className="font-mono">Email: admin@example.com</p>
            <p className="font-mono">Password: password123</p>
            <button
              type="button"
              onClick={handleAutoFill}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-xs"
            >
              Auto Fill Demo
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
