import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {loginApi} from "../../services/authApi";
import {setAuth} from "../utils/auth";
import LoadingButton from "../../components/common/LoadingButton";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // On mount: if 'rememberMe' was saved before, restore email & password
  useEffect(() => {
    const saved = localStorage.getItem("rememberMe");
    if (saved === "true") {
      const savedEmail = localStorage.getItem("savedEmail") || "";
      const savedPassword = localStorage.getItem("savedPassword") || "";
      setRememberMe(true);
      setForm({email: savedEmail, password: savedPassword});
    }
  }, []);

  const onRemember = (e) => {
    const checked = e.target.checked;
    setRememberMe(checked);
    if (checked) {
      // Save credentials immediately when checkbox is ticked
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("savedEmail", form.email);
      localStorage.setItem("savedPassword", form.password);
      toast.success("Credentials saved!");
    } else {
      // Clear immediately when unchecked
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
      toast.error("Saved credentials removed");
    }
  };

  const onShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    const updated = {...form, [name]: value};
    setForm(updated);
    // If remember me is on, keep localStorage in sync as user types
    if (rememberMe) {
      localStorage.setItem("savedEmail", updated.email);
      localStorage.setItem("savedPassword", updated.password);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isLoading) return;

    setIsLoading(true);

    // Clear any stale tokens before fresh login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    try {
      const res = await loginApi({...form});

      const {token, user} = res.data;

      // Credentials already synced via checkbox/typing — nothing extra needed here

      // save auth token (pass rememberMe so token goes to correct storage)
      setAuth(token, user, rememberMe);

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
          <img src="/Logo.png" alt="Logo" className="h-48 w-auto" />
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={onShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                {showPassword ? (
                  <EyeSlashIcon className="size-5" />
                ) : (
                  <EyeIcon className="size-5" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={onRemember}
                checked={rememberMe}
                className="h-4 w-4 border rounded focus:ring-2 focus:ring-indigo-500"
              />
              <label className="text-sm text-gray-600">Remember Me?</label>
            </div>
          </div>

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Logging in..."
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
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
