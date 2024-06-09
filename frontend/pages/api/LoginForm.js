import bcrypt from 'bcryptjs'; // bcryptライブラリをインポート

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, password, email } = req.body;
      
      // パスワードのハッシュ化
      const hashedPassword = await bcrypt.hash(password, 10); // 10はハッシュのラウンド数を指定するパラメータ

      // データベースにハッシュ化されたパスワードと他のユーザー情報を保存する処理を実行
      // await db.users.create({ name, password: hashedPassword, email });

      res.status(200).json({ message: 'User data saved successfully!', name });
    } catch (error) {
      console.error('Error while saving user data:', error);
      res.status(500).json({ error: 'Failed to save user data.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
