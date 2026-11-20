
import React, { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext();

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div style={{
      padding: "20px",
      minHeight: "100vh",
      background: theme === "light" ? "#f8f8f8" : "#333",
      color: theme === "light" ? "#000" : "#fff"
    }}>
      <h2>React Hooks Demo</h2>

      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>

      <button onClick={toggleTheme} style={{ marginLeft: "10px" }}>
        Toggle Theme
      </button>

      <h3>Fetched Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

function AppWrapper() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <App />
    </ThemeContext.Provider>
  );
}

export default AppWrapper;
