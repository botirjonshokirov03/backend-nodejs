const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const algorithm = "aes-256-cbc";
const secretHex = process.env.CRYPTO_SECRET;

if (!secretHex) {
  throw new Error("CRYPTO_SECRET is not defined in your .env file");
}

const secretKey = Buffer.from(secretHex, "hex");

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (data) => {
  const [ivHex, encryptedHex] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const cryptoJS = {
  encrypt,
  decrypt,
};

module.exports = cryptoJS;
