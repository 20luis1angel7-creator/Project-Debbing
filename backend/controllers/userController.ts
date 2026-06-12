import type { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await userService.getProfile(Number(req.params.id));
    if (!profile) return res.status(404).json({ error: "User not found" });
    res.json(profile);
  } catch (error) {
    next(error);
  }
}
