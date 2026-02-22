import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginApi } from "../../services/authApi";
import { setAuth } from "../utils/auth";
import LoadingButton from "../../components/common/LoadingButton";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // useEffect(() => {
  //   // Check if reCAPTCHA script is loaded
  //   const checkRecaptcha = () => {
  //     if (window.grecaptcha) {
  //       setRecaptchaLoaded(true);
  //       // Render reCAPTCHA
  //       window.grecaptcha.render('recaptcha-container', {
  //         'sitekey': '6LdycUwsAAAAAKD2gK4Sw8uxYKEnBTXn_IFbDBU_'
  //       });
  //     } else {
  //       setTimeout(checkRecaptcha, 100);
  //     }
  //   };

  //   checkRecaptcha();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isLoading) return;

    setIsLoading(true);

    try {
      const res = await loginApi(form);
      const { token, user } = res.data;

      // save auth
      setAuth(token, user);

      // role based redirect
      if (user.role === "admin") {
        navigate("/admin");
        toast.success("Login successful");
      } else if (user.role === "teamLeader") {
        navigate("/lead/my-team");
        toast.success("Login successful");
      } else {
        toast.error("Unauthorized access");
        return;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-48 w-auto"
          />
        </div>


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

          {/* <div className="flex justify-center">
            <div id="recaptcha-container"></div>
          </div> */}

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Logging in..."
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </LoadingButton>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Team Management
        </p>
      </div>
    </div>
  );
};
