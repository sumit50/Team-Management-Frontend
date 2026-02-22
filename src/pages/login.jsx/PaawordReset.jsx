import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import LoadingButton from '../../components/common/LoadingButton';  
import {resetPasswordApi} from '../../services/authApi';

export const PaawordReset = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      const [isLoading, setIsLoading] = useState(false);

      const handleChange=(e)=>{
        const {name,value}=e.target
        setForm({
          ...form,
          [name]: value,
        });
      }

      const handleSubmit=async(e)=>{
        e.preventDefault();
        
        if(isLoading) return;
        
        // Validation
        if(!form.currentPassword || !form.newPassword || !form.confirmPassword) {
          toast.error("All fields are required");
          return;
        }
        
        if(form.newPassword !== form.confirmPassword) {
          toast.error("New passwords do not match");
          return;
        }
        
        if(form.newPassword.length < 6) {
          toast.error("Password must be at least 6 characters");
          return;
        }
        
        setIsLoading(true);
        
        try {
          const response = await resetPasswordApi({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword
          });
          
          toast.success("Password changed successfully!");
          navigate("/admin");
          
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to change password");
        } finally {
          setIsLoading(false);
        }
      }

        
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/Logo.png" 
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl text-center text-gray-800">Change Password</h2>
        <p className="text-center text-gray-500 mt-1">Update your account password</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Changing Password..."
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Change Password
          </LoadingButton>
        </form>
      </div>
    </div>
  )
}
