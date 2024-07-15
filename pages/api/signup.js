import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    
    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: {
           email: email,
        },
      });

      if (existingUser) {
        // User already exists, return an error
        return res.status(400).json({ error: 'User already exists with this name or email.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create the new user
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ success: false, message: 'Failed to register user' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
