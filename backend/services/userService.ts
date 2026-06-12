import { get } from "../database/db";
import type { UserRow } from "../types";

export async function getProfile(id: number) {
  const user = await get<UserRow>("SELECT id, name, email, address FROM users WHERE id = ?", [id]);
  if (!user) return null;
  const address = user.address ? JSON.parse(user.address) : undefined;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address,
    city: address?.city
  };
}
