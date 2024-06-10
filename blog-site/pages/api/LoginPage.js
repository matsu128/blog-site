export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { name } = req.body;
        
        if (name) {
          // ログイン成功時にBlogListPageに遷移するためのURLを返す
          res.status(200).json({ message: 'Login successful', redirectUrl: '/about' });
        } else {
          res.status(400).json({ message: 'Name is required' });
        }
      } catch (error) {
        console.error('Error while logging in:', error);
        res.status(500).json({ error: 'Failed to log in.' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  