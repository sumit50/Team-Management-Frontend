import {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

import {loginApi} from "../../services/authApi";
import {setAuth} from "../utils/auth";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginApi(form);
      const {token, user} = res.data;

      // save auth
      setAuth(token, user);

      // role based redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "lead") {
        navigate("/lead/team");
      } else {
        navigate("/member/team");
      }

      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800"></h2>
        <p className="text-center text-gray-500 mt-1">Team Management System</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@company.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Team Management
        </p>
      </div>
    </div>
  );
};
