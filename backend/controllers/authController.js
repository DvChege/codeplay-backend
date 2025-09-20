// After user is found and validated during login:
const token = jwt.sign(
  { id: user.id, username: user.username, is_admin: user.is_admin },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);