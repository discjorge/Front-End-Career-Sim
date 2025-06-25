import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";

function App() {
  const [token, setToken] = useState(null);
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
      {!token ? <SignUpForm setToken={setToken} /> : <p>You are registered!</p>}
    </>
  );
}

export default App;
