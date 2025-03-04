import express from 'express';
import fs from 'fs';
import path from 'path';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Path to users.json file
const usersFilePath = path.join(process.cwd(), 'server', 'data', 'users.json');

// Helper function to read users from JSON file
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return { users: [] };
  }
};

// Helper function to write users to JSON file
const writeUsers = (data) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
};

// Helper function to find user by id
const findUserById = (id) => {
  const { users } = readUsers();
  return users.find(user => user.id === id);
};

// Get user profile (protected route)
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  const { name, email, classroomAddress } = req.body;
  
  try {
    const data = readUsers();
    const userIndex = data.users.findIndex(user => user.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user fields
    if (name) data.users[userIndex].name = name;
    if (email) data.users[userIndex].email = email;
    if (classroomAddress) data.users[userIndex].classroomAddress = classroomAddress;
    
    // Save updated users
    writeUsers(data);
    
    // Remove password from response
    const { password, ...userWithoutPassword } = data.users[userIndex];
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Admin route to get all users
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { users } = readUsers();
    // Remove passwords from response
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.json(usersWithoutPasswords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;