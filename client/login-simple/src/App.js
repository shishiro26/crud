import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = { name, email, password };
  const loginData = { email, password };

  const handleRegister = () => {
    fetch(`http://localhost:3001/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === "Success") {
          toast.success("Registered successfully");
        } else if (data.status === "Fail") {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred while registering.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  const loginUser = () => {
    axios
      .post(`http://localhost:3001/user/login`, loginData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "Success") {
          toast.success("Login successful");
        } else {
          toast.error("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error while logging in");
      });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="App">
      <ToastContainer />
      <div
        className="register"
        style={{ margin: "5px", border: "2px solid black", padding: "3px" }}
      >
        <h1>Register</h1>
        <form
          onSubmit={handleSubmit}
          className="register
        "
        >
          <label>UserName</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
      <div
        className="login"
        style={{ margin: "5px", border: "2px solid black", padding: "3px" }}
      >
        <h1>Login</h1>
        <form onSubmit={loginSubmit} className="login">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;
