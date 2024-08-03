import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;
const saltRounds = 12;

// Hash a password
export async function hashPassword(password) {
  if (!password) {
    throw new Error("Password is empty or undefined");
  }
  return await bcrypt.hash(password, saltRounds);
}

// Verify a password
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate a JWT token
export function generateToken(userId, userEmail) {
  return jwt.sign({ userId, userEmail }, secretKey, { expiresIn: '1d' });
}

// Verify a JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
