import { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

export default function Account() {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login"); // 'login' or 'register'

  // Set token in both state and localStorage
  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  // On mount: check localStorage for existing token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  // When token is available, fetch user data
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error(err);
        setToken(null); // Clear invalid token
      });
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.username}!</h2>
        <p>User ID: {user.id}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  }

  return (
    <div>
      {mode === "login" ? (
        <Login setToken={setToken} />
      ) : (
        <Register setToken={setToken} />
      )}
      <p>
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          Switch to {mode === "login" ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
