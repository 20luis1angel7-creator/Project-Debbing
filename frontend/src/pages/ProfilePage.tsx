import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import type { Profile } from "../types";

export default function ProfilePage() {
  const [userId, setUserId] = useState(1);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    apiGet<Profile>(`/users/${userId}`)
      .then(setProfile)
      .catch(() => setError("No se pudo cargar el perfil"));
  }, [userId]);

  return (
    <div>
      <header className="page-header">
        <div>
          <h2>Perfil</h2>
          <p>Prueba el usuario 1 y el usuario 2.</p>
        </div>
        <select value={userId} onChange={(event) => setUserId(Number(event.target.value))}>
          <option value="1">Usuario 1</option>
          <option value="2">Usuario 2</option>
        </select>
      </header>

      {error && <p className="error">{error}</p>}
      {profile && (
        <section className="panel">
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <p>Ciudad: {profile.city}</p>
        </section>
      )}
    </div>
  );
}
