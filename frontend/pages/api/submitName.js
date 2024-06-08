export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;
    if (name) {
      res.status(200).json({ message: '成功' });
    } else {
      res.status(400).json({ message: '失敗' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
