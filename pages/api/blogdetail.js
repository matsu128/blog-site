import prisma from '../../src/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
    const { postId } = req.body;

    try {
      await prisma.post.delete({
        where: {
          id: Number(postId),
        },
      });
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
