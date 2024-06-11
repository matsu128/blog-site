import { getUserByUsernameAndPassword } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, password } = req.body;

    try {
      // データベースからユーザー情報を取得
      const user = await getUserByUsernameAndPassword(name, password);

      if (user) {
        // ユーザーが存在する場合、必要な情報を返す
        const userData = {
          name: user.name,
          title: user.title,
          content: user.content,
          imageUrl: user.imageUrl,
          postDate: user.postDate,
          userId: user.userId,
        };
        res.status(200).json(userData);
      } else {
        // ユーザーが存在しない場合はエラーを返す
        res.status(401).json({ message: 'Invalid name or password' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
