// jwtUtils.js

const jwt = require('jsonwebtoken');
require('dotenv').config(); // .env ファイルから環境変数を読み込む場合

// JWT を生成する関数
function generateToken(payload) {
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET; // 環境変数から秘密鍵を読み込む

  // JWT を生成
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // 有効期限を指定する例

  return token;
}

// JWT を検証する関数
function verifyToken(token) {
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET; // 環境変数から秘密鍵を読み込む

  // JWT を検証
  const decoded = jwt.verify(token, secretKey);

  return decoded;
}

module.exports = {
  generateToken,
  verifyToken,
};
