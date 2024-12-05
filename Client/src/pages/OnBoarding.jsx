import React from "react";
import { useNavigate } from "react-router-dom"; 

const OnBoarding = () => {
  const navigate = useNavigate(); 
  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundImage: "url('boy.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center space-y-4 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-thin text-gray-800">Welcome to the Travel Guide</h1>
        <div className="space-x-4">
       
          <button
            onClick={goToLogin}
            className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={goToSignUp}
            className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
