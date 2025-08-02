import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from './user.controller';

const router = Router();

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get a single user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

export default router;
