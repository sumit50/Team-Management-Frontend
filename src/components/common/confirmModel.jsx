import React from "react";
import Button from "./button";

const Modal = ({isOpen, onClose, title, children}) => {
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

const CreateTeamModal = ({isOpen, onClose, onSubmit}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    password: "",
    email: "",
    team: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({...formData, role: "teamLeader"});
    setFormData({name: "", password: "", email: "", team: ""});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Team Leader">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
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
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team
          </label>
          <select
            name="team"
            value={formData.team || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a team</option>
            <option value="designing team">Designing Team</option>
            <option value="mern team">MERN Team</option>
            <option value="frontend team">Frontend Team</option>
            <option value="backend team">Backend Team</option>
          </select>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" variant="primary" className="flex-1">
            Create Team Leader
          </Button>
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
