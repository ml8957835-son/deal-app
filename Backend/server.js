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
// =======================
// Add Deal Route
// =======================
app.post("/deals", (req, res) => {
  const {
    title,
    store,
    category,
    discount,
    description,
  } = req.body;

  // Check if all fields are filled
  if (
    !title ||
    !store ||
    !category ||
    !discount ||
    !description
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields.",
    });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO deals
      (title, store, category, discount, description)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(
      title,
      store,
      category,
      discount,
      description
    );

    res.json({
      success: true,
      message: "Deal added successfully!",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to add deal.",
    });
  }
});
// Get All Deals
app.get("/deals", (req, res) => {
  try {
    const deals = db.prepare(`
      SELECT * FROM deals
      ORDER BY id DESC
    `).all();

    res.json({
      success: true,
      deals,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch deals.",
    });
  }
});
app.get("/deals/:id", (req, res) => {
  const { id } = req.params;

  const deal = db
    .prepare("SELECT * FROM deals WHERE id = ?")
    .get(id);

  if (!deal) {
    return res.status(404).json({
      success: false,
      message: "Deal not found",
    });
  }

  res.json({
    success: true,
    deal,
  });
});
app.delete("/deals/:id", (req, res) => {
  const { id } = req.params;

  db.prepare("DELETE FROM deals WHERE id = ?").run(id);

  res.json({
    success: true,
    message: "Deal deleted successfully!",
  });
});
app.put("/deals/:id", (req, res) => {
  const { id } = req.params;

  const {
    title,
    store,
    category,
    discount,
    description,
  } = req.body;

  db.prepare(`
    UPDATE deals
    SET
      title = ?,
      store = ?,
      category = ?,
      discount = ?,
      description = ?
    WHERE id = ?
  `).run(
    title,
    store,
    category,
    discount,
    description,
    id
  );

  res.json({
    success: true,
    message: "Deal updated successfully!",
  });
});
app.post("/claims", (req, res) => {
  const { userId, dealId } = req.body;

  try {
    // Check if already claimed
    const existing = db.prepare(`
      SELECT * FROM claims
      WHERE userId = ? AND dealId = ?
    `).get(userId, dealId);

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Deal already claimed."
      });
    }

    // Insert claim
    db.prepare(`
      INSERT INTO claims (userId, dealId)
      VALUES (?, ?)
    `).run(userId, dealId);

    res.json({
      success: true,
      message: "Deal claimed successfully."
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to claim deal."
    });
  }
});
app.get("/users", (req, res) => {
const users = db.prepare(`
  SELECT
    id,
    fullName,
    email,
    username,
    role
  FROM users
`).all();  res.json(users);
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