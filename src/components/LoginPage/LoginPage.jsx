import { useState } from "react";
import { api } from "../../lib/api.js";

export function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await api("/api/admin/login", {
        method: "POST",
        body: { username, password }
      });
      localStorage.setItem("ssm_auth", JSON.stringify({ token: result.token, user: result.user }));
      onLogin(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-page__card">
        <h1>Админ-панель ССМ</h1>
        <p>Войдите в систему управления сайтом</p>
        <form onSubmit={submit}>
          <label>
            <span>Логин</span>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
          </label>
          <label>
            <span>Пароль</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p className="login-page__error">{error}</p>}
          <button className="button button--orange" type="submit" disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </main>
  );
}
