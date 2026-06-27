const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Register Route
app.post("/register", (req, res) => {
  const { fullName, email, username, password } = req.body;

   if (!fullName || !email || !username || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }
  
  try {
    const stmt = db.prepare(`
      INSERT INTO users (fullName, email, username, password)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(fullName, email, username, password);

    res.json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (err) {
    console.error(err);

    res.status(400).json({
      success: false,
      message: "Email or username already exists.",
    });
  }
});
app.get("/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = db
    .prepare(
      "SELECT * FROM users WHERE username = ? AND password = ?"
    )
    .get(username, password);

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      role: user.role,
    },
  });
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});