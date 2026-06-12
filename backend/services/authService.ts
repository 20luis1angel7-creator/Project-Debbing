import { get } from "../database/db";

type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export async function login(email: string, password: string) {
  return get<AuthUser>(
    "SELECT id, name, email FROM users WHERE email = ? AND password = ?",
    [email, password]
  );
}
