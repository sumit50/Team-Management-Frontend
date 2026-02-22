import api from "../../app/api";
import toast from "react-hot-toast";
import React from "react";
import Button from "./button";
import LoadingButton from "./LoadingButton";


const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const CreateTeamModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    password: "",
    email: "",
    team: "Team Name",
    role: "team leader",
    member: "team member",
  });


  const [isLoading, setIsLoading] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const sendPasswordEmail = async (email, password, name, role) => {
    try {
      // Determine content based on role
      const isTeamMember = role === "user";
      const welcomeMessage = isTeamMember
        ? `You have been added as a member of the <strong>${formData.team}</strong>. You can now collaborate with your team and track your tasks.`
        : "Your team leader account has been successfully created. You're now part of our team management system where you can efficiently manage your team members and tasks.";

      const subjectLine = isTeamMember
        ? "Welcome to the Team! - Account Details"
        : "Welcome to Team Management System - Your Account Details";

      // Professional HTML email template
      const emailData = {
        to: email,
        subject: subjectLine,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Team Management System</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
                <div style="color: #ffffff; font-size: 32px; font-weight: bold; margin-bottom: 10px;">
                  Team Management
                </div>
                <div style="color: #e0e7ff; font-size: 16px;">
                  System Portal
                </div>
              </div>
              
              <!-- Main Content -->
              <div style="padding: 40px 30px;">
                <div style="color: #1e293b; font-size: 24px; font-weight: 600; margin-bottom: 20px;">
                  Welcome aboard, ${name}! 👋
                </div>
                
                <div style="color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                  ${welcomeMessage}
                </div>
                
                <!-- Account Details Card -->
                <div style="background-color: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                  <div style="color: #334155; font-size: 18px; font-weight: 600; margin-bottom: 20px; text-align: center;">
                    📋 Your Account Details
                  </div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div style="color: #64748b; font-size: 14px; font-weight: 500;">Email Address:</div>
                    <div style="color: #1e293b; font-size: 16px; font-weight: 600; background-color: #ffffff; padding: 8px 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
                      ${email}
                    </div>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="color: #64748b; font-size: 14px; font-weight: 500;">Temporary Password:</div>
                    <div style="color: #1e293b; font-size: 16px; font-weight: 600; background-color: #fef3c7; padding: 8px 15px; border-radius: 6px; border: 1px solid #fbbf24;">
                      ${password}
                    </div>
                  </div>
                </div>
                
                <!-- Login Button -->
                <div style="text-align: center; margin-bottom: 30px;">
                  <a href="http://localhost:5173/login" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                    🚀 Login to Your Account
                  </a>
                </div>
                
                <!-- Security Notice -->
                <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin-bottom: 30px;">
                  <div style="color: #991b1b; font-size: 14px; font-weight: 600; margin-bottom: 5px;">
                    🔒 Security Reminder
                  </div>
                  <div style="color: #7f1d1d; font-size: 13px; line-height: 1.5;">
                    Please login and change your temporary password immediately to ensure account security.
                  </div>
                </div>
                
                <!-- Next Steps -->
                <div style="color: #64748b; font-size: 16px; line-height: 1.6;">
                  <div style="font-weight: 600; color: #334155; margin-bottom: 10px;">🎯 What's Next?</div>
                  <ul style="margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Login with your credentials</li>
                    <li style="margin-bottom: 8px;">Update your password</li>
                    <li style="margin-bottom: 8px;">Explore your dashboard</li>
                    <li style="margin-bottom: 8px;">Start managing your team</li>
                  </ul>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                <div style="color: #64748b; font-size: 14px; margin-bottom: 15px;">
                  Need help? Contact our support team
                </div>
                <div style="color: #3b82f6; font-size: 16px; font-weight: 600;">
                  support@teammanagement.com
                </div>
                <div style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
                  © 2026 Team Management System. All rights reserved.
                </div>
              </div>
              
            </div>
          </body>
          </html>
        `,
      };

      // Call your backend email endpoint
      await api.post("/admin/send-password-email", emailData);
      console.log("Password email sent to:", email);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const generateRandomPassword = () => {
    const password =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-4);
    setFormData({
      ...formData,
      password: password,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "name"
        ? value
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        : value;
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const submitData = {
      name: formData.name,
      email: formData.email,
      teamName: formData.team,
      password: formData.password,
      role: formData.role,
      status: "active",
    };

    try {
      // Create team leader
      await onSubmit(submitData);

      // Send password email
      await sendPasswordEmail(formData.email, formData.password, formData.name, formData.role);

      // Show success message
      const roleText = formData.role === "team leader" ? "Team leader" : "Team member";
      toast.success(
        `${roleText} created successfully! Password sent to ${formData.email}`,
      );

      // Reset form
      setFormData({ name: "", password: "", email: "", team: "" });
      onClose();
    } catch (error) {
      console.error("Error creating team:", error);
      const roleText = formData.role === "team leader" ? "team leader" : "team member";
      toast.error(`Failed to create ${roleText}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Team Leader/Member">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h6 className="font-light" >Select what you want to create</h6>

        <select value={formData.role} onChange={handleChange} name="role" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">

          {formData.role == "admin" ? <option value="team leader" className="font-bold cursor-pointer" >Team Leader</option> : <option value="user" className="font-bold cursor-pointer">Team member</option>}

        </select>
        <h6 className="text-xs font-light">Selected Role : {formData.role}</h6>

        <div>
          {formData.role == "admin" ? <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Leader Name
          </label> : <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Member Name
          </label>}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="flex gap-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-md transition-colors">
              {showPassword ? "Hide" : "Show"}
            </button>
            <button
              type="button"
              onClick={generateRandomPassword}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors">
              Generate
            </button>
          </div>
        </div>

        <div>
          {formData.role == "admin" ? <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Leader Email
          </label> : <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Member Email
          </label>}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          {formData.role == "admin" ? <label className="block text-sm font-medium text-gray-700 mb-1">
            Team
          </label> : <label className="block text-sm font-medium text-gray-700 mb-1">
            Team
          </label>}
          <select
            name="team"
            value={formData.team || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select a team</option>
            <option value="designing team">Designing Team</option>
            <option value="mern team">MERN Team</option>
            <option value="frontend team">Frontend Team</option>
            <option value="backend team">Backend Team</option>
          </select>
        </div>

        <h6 className="font-light">Selected Team : {formData.team}</h6>
        <div className="flex gap-2 pt-4">
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Logging in..."
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Create
          </LoadingButton>
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTeamModal;
