import prisma from '../../src/lib/prisma';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'POST': {
      const { title, content, imageUrl, userId } = body;
      // Ensure userId is provided in the request body
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      try {
        // Create a new post using Prisma ORM
        const post = await prisma.post.create({
          data: {
            title,
            content,
            imageUrl: imageUrl || null,
            author: {
              connect: { id: parseInt(userId, 10) } // Connect post to its author
            }
          }
        });
        res.status(201).json(post); // Respond with created post object
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
      }
      break;
    }
    case 'PUT': {
      const { title, content, imageUrl, postId } = body;
      // Ensure postId is provided in the request body
      if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
      }
      try {
        // Update an existing post using Prisma ORM
        const updatedPost = await prisma.post.update({
          where: { id: parseInt(postId, 10) }, // Specify the post to update by ID
          data: {
            title,
            content,
            imageUrl: imageUrl || null,
          },
        });
        res.status(200).json(updatedPost); // Respond with updated post object
      } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
      }
      break;
    }
    default:
      // Handle unsupported HTTP methods
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
