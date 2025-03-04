import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'canteenxpress-secret-key';

// Path to users.json file
const usersFilePath = path.join(process.cwd(), 'server', 'data', 'users.json');

// Helper function to find user by id
const findUserById = (id) => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    const { users } = JSON.parse(data);
    return users.find(user => user.id === id);
  } catch (error) {
    console.error('Error reading users file:', error);
    return null;
  }
};

export const authenticate = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    next();
  };
};