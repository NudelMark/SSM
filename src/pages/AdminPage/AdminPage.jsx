import { useState } from "react";
import { Header } from "../../components/Header/Header.jsx";
import { AdminPanel } from "../../components/AdminPanel/AdminPanel.jsx";
import { LoginPage } from "../../components/LoginPage/LoginPage.jsx";

function getStoredAuth() {
  try {
    const raw = localStorage.getItem("ssm_auth");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AdminPage({ site, onSiteChange }) {
  const [auth, setAuth] = useState(getStoredAuth);

  if (!auth) {
    return <LoginPage onLogin={(user) => setAuth({ user })} />;
  }

  return (
    <>
      <Header settings={site.settings} />
      <AdminPanel initialSite={site} onSiteChange={onSiteChange} user={auth.user} />
    </>
  );
}
