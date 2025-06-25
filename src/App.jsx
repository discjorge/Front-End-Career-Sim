import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";

function App() {
  const [token, setToken] = useState("");
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* //logged in */}
      <Register setToken={setToken} />
      <Login setToken={setToken} />
      <Account token={token} />
      {!token ? <Register setToken={setToken} /> : <p>You are registered!</p>}
    </>
  );
}

export default App;
