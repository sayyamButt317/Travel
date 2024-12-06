import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    // Submit the form to the backend to insert into the User table
    try {
      const response = await axios.post(
        "/api/sign-up",
        {
          username: username,
          password: password,
          email: email,
          registrationDate: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("User signed up successfully!");
        setUsername('');
        setPassword('');
        setEmail('');
      }
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error("Error during sign-up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        <p className="text-sm dark:text-gray-600">
          Signup to create your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              required 
            />
          </div>
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
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <div className="space-y-2">
          <div>
            <button
              type="submit" 
              disabled={loading} 
              className={`w-full px-8 py-3 font-semibold rounded-md ${loading ? "bg-gray-400" : "dark:bg-violet-600"} dark:text-gray-50`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
           Already have an account?
            <a
              rel="noopener noreferrer"
              href="/login"
              className="hover:underline dark:text-violet-600"
            >
              Login
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
