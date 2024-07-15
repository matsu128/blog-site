import prisma from '../../src/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { postId } = req.body;

    try {
      // Attempt to delete the post with the given postId
      await prisma.post.delete({
        where: {
          id: Number(postId), // Convert postId to a number for database query
        },
      });
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    // If the request method is not DELETE, respond with 405 Method Not Allowed
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
