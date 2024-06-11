// pages/api/login.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { password } = req.body;
      
      console.log('login.jsのif post送信pass.pass = ' + password + ' である')
      // メールアドレスとパスワードが空でないか確認
      if (password) {
        console.log('login.jsの空白チェックpass')
        res.status(200).json({ message: 'Email and password are required' });
        return;
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  