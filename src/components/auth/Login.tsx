import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { HOST_API } from "../../config";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email: email,
      password: password,
    };

    const url = `${HOST_API}/user/login`;
    axios.defaults.withCredentials = true;
    const response = await axios.post(url, data);
    try {
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.data.message === "Ok"
      ) {
        const dataToken = response.data.data.token;
        const name = response.data.data.name;
        const id = response.data.data.id;
        localStorage.setItem("_token", dataToken);
        localStorage.setItem("name", name);
        localStorage.setItem("id", id);

        setIsLoggedIn(true);
        setIsLoading(false);
        setError("");

        if (response.data.data.roleId === 1) {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
          window.location.reload();
        }
      } else {
        setIsLoading(false);
        setError(response.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("sampe sini");
      setError(response.data.response.message);
      setIsLoading(false);
    }
  };

  const passwordInputRef = useRef(null);

  useEffect(() => {
    if (password && passwordInputRef.current) {
      setIsPasswordTyping(true);
    }
  }, [password]);

  const isLoginEnabled = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="flex flex-col justify-center min-h-max overflow-hidden py-40">
      <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-md lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs">
        {!isLoggedIn && (
          <>
            <h1 className="text-3xl font-semibold text-center text-[#dc2626]">
              Login Page
            </h1>
            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="mb-2">
                <label htmlFor="email" className="block text-sm text-gray-800">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-[#dc2626] focus:outline-none"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setIsPasswordTyping(true);
                    }}
                    ref={passwordInputRef}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-[#dc2626] focus:outline-none"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                    title="Show/Hide Password"
                  >
                    {showPassword ? (
                      <Eye
                        size={24}
                        className="text-gray-700 hover:text-[#dc2626]"
                      />
                    ) : (
                      <EyeSlash
                        size={24}
                        className="text-gray-700 hover:text-[#dc2626]"
                      />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div
                  role="alert"
                  className="alert alert-error flex items-center bg-red-500 text-white text-sm px-4 py-2 rounded-lg"
                >
                  <svg
                    className="stroke-current h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Error! {error}</span>
                  <button
                    className="ml-28 outline-none focus:outline-none"
                    onClick={() => setError("")}
                  >
                    &#x2715;
                  </button>
                </div>
              )}
              <div className="mt-6">
                <button
                  className={`w-full px-4 py-2 tracking-wide rounded-md text-white transition-colors duration-200 transform ${
                    isPasswordTyping && isLoginEnabled
                      ? "bg-[#dc2626] focus:outline-none hover:bg-red-700"
                      : "bg-red-600 rounded-md disabled"
                  }`}
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
