import prisma from '../../src/lib/prisma';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'POST': {
      const { title, content, imageUrl, userId } = body;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      try {
        const post = await prisma.post.create({
          data: {
            title,
            content,
            imageUrl: imageUrl || null,
            author: {
              connect: { id: parseInt(userId, 10) }
            }
          }
        });
        res.status(201).json(post);
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
      }
      break;
    }
    case 'PUT': {
      const { title, content, imageUrl, postId } = body;
      if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
      }
      try {
        const updatedPost = await prisma.post.update({
          where: { id: parseInt(postId, 10) },
          data: {
            title,
            content,
            imageUrl: imageUrl || null,
          },
        });
        res.status(200).json(updatedPost);
      } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
