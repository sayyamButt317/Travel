import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  // States for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // States for loading and error
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');
  
    console.log("Form data:", { username, email, password }); // Add this line to check values
  
    try {
      const response = await axios.post("/api/sign-up", {
        username,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (response.status === 200) {
        alert("Registration successful");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        <p className="text-sm dark:text-gray-600">Create a new account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your User Name here!"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@gmail.com"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              required
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">Password</label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              required
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-8 py-3 font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-violet-600'} dark:text-gray-50`}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Already have an Account?{' '}
            <a rel="noopener noreferrer" href="/login" className="hover:underline dark:text-violet-600">
              Sign In
            </a>.
          </p>
        </div>
      </form>
    </div>
  );
}
