import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store the token in local storage or a state management tool
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // Only navigate if login is successful
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col self-stretch my-auto font-medium text-black max-md:mt-10">
      <h1 className="self-center mt-2 text-2xl font-semibold text-center">
        Login to Your Account
      </h1>
      <label htmlFor="username" className="self-start mt-20 text-base text-center max-md:mt-10">
        Username
      </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-1.5 w-full p-2 border rounded"
        aria-label="Username"
        required
      />
      <label htmlFor="password" className="self-start mt-7 text-base">
        Password
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1.5 w-full p-2 border rounded"
        aria-label="Password"
        required
      />
      <a href="#" className="self-end text-xs text-right text-neutral-400">
        Forgot Password?
      </a>
      <button
        type="submit"
        className="px-16 py-2.5 mx-5 mt-10 text-sm text-center text-white whitespace-nowrap rounded-xl bg-neutral-950 max-md:px-5 max-md:mx-2.5"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
