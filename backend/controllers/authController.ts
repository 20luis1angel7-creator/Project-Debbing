import type { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ token: `fake-token-${user.id}`, user });
  } catch (error) {
    next(error);
  }
}
