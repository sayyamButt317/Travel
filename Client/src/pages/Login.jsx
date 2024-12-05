import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
	e.preventDefault(); 
  
	setIsLoading(true); 
	setError(""); 
  
	try {
	  const response = await axios.post(
		"/api/login",
		{ Email: email, Password: password }, 
		{ headers: { "Content-Type": "application/json" } }
	  );
  
	  if (response.status === 200) {
		navigate("/dashboard"); 
	  }
	} catch (error) {
	  console.error("Login error:", error.response?.data || error.message);
	  setError(error.response?.data?.message || "Login failed"); 
	} finally {
	  setIsLoading(false); 
	}
  };
  

  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Login</h1>
        <p className="text-sm dark:text-gray-600">
          Login to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              required 
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              required 
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}{" "}
        
        <div className="space-y-2">
          <div>
            <button
              type="submit" 
              disabled={loading} 
              className={`w-full px-8 py-3 font-semibold rounded-md ${
                loading ? "bg-gray-400" : "dark:bg-violet-600"
              } dark:text-gray-50`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Don't have an account yet?
            <a
              rel="noopener noreferrer"
              href="/signup"
              className="hover:underline dark:text-violet-600"
            >
              {" "}
              Sign up
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
