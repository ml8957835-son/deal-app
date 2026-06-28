const express = require("express");
const cors = require("cors");
const db = require("./database");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Register Route
app.post("/register", async (req, res) => {
  const { fullName, email, username, password } = req.body;

   if (!fullName || !email || !username || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }
  
  try {
    const stmt = db.prepare(`
  INSERT INTO users (fullName, email, username, password, role)
  VALUES (?, ?, ?, ?, ?)
`);;

     const hashedPassword = await bcrypt.hash(password, 10);
     // Check how many users exist
const userCount = db
  .prepare("SELECT COUNT(*) AS count FROM users")
  .get();

// First user becomes admin
const role = userCount.count === 0 ? "admin" : "user";
stmt.run(
  fullName,
  email,
  username,
  hashedPassword,
  role
);    res.json({
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
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  // Compare entered password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  res.json({
    success: true,
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