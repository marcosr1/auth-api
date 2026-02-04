import { registerService, loginService, logoutService, refreshService } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    await registerService(req.body);
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const tokens = await loginService(req.body);
    res.json(tokens);
  } catch (err) {
    next(err);
  }
}


export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const token = await refreshService(refreshToken);
    res.json(token);
  } catch (err) {
    next(err);
  }
}


export async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;
    await logoutService(refreshToken);
    res.json({ message: "Logout realizado" });
  } catch (err) {
    next(err);
  }
}
