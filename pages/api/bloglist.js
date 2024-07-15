import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { viewMode, userId } = req.body; // req.bodyからviewModeとuserIdを抽出
    try {
      let posts;
      if (viewMode === 'myself' && userId) { // viewModeが'myself'かつuserIdが存在する場合
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
        console.log('back listのeveryoneパス')
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
        posts = []; // 適切なviewModeが提供されなかった場合、空の配列を返す
      }
      res.status(200).json({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end();
  }
}
