import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { RefreshToken } from "../models/RefreshToken.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/token.js";

export async function registerService({ name, email, password }) {
  const exists = await User.findOne({ where: { email } });
  if (exists) throw new Error("Email já cadastrado");

  const hash = await bcrypt.hash(password, 10);

  return User.create({ name, email, password: hash });
}

export async function loginService({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Credenciais inválidas");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Credenciais inválidas");

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  await RefreshToken.create({
    token: refreshToken,
    UserId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { accessToken, refreshToken };
}

export async function refreshService(refreshToken) {
  const stored = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!stored) throw new Error("Refresh token inválido");

  const payload = verifyRefreshToken(refreshToken);

  const newAccessToken = generateAccessToken({ id: payload.id });

  return { accessToken: newAccessToken };
}

export async function logoutService(refreshToken) {
  await RefreshToken.destroy({ where: { token: refreshToken } });
}
