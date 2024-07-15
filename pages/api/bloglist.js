import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { viewMode, userId } = req.body; // Extract viewMode and userId from req.body
    try {
      let posts;
      if (viewMode === 'myself' && userId) { // If viewMode is 'myself' and userId is provided
        posts = await prisma.post.findMany({
          where: { userId: userId },
          orderBy: { id: 'asc' },
          select: {
            id: true,
            title: true,
            content: true,
            imageUrl: true,
            createdAt: true,
          }
        });
      } else if (viewMode === 'everyone') {
        posts = await prisma.post.findMany({
          orderBy: { id: 'asc' },
          select: {
            id: true,
            title: true,
            content: true,
            imageUrl: true,
            createdAt: true,
          }
        });
      } else {
        posts = []; // If no valid viewMode is provided, return an empty array
      }
      res.status(200).json({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end(); // Respond with Method Not Allowed for non-POST requests
  }
}
