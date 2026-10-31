
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MonCompte() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifierConnexion() {
      const { data, error } = await supabase.auth.getUser();

      if (!error && data.user) {
        setEmail(data.user.email ?? null);
      }

      setLoading(false);
    }

    verifierConnexion();
  }, []);

  async function deconnexion() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return <main className="page">Vérification de la connexion...</main>;
  }

  if (!email) {
    return (
      <main className="page">
        <h1>Vous n&apos;êtes pas connecté</h1>
        <a href="/login">Se connecter</a>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Mon compte</h1>
      <p>Vous êtes connecté avec :</p>
      <p><strong>{email}</strong></p>
      <button onClick={deconnexion}>Se déconnecter</button>
    </main>
  );
}
