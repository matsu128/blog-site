import jwt from 'jsonwebtoken';
import prisma from '../../src/lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validate input types
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      // Find user by email in the database
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // If user is not found, return 401 Unauthorized
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare hashed password with provided password
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Set expiration time (e.g., 1 hour)
      );

      // Send the token back to the client
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
