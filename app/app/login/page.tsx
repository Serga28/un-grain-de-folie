
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendLoginLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      setMessage(
        "Si cette adresse peut se connecter, un lien de connexion va être envoyé par e-mail."
      );
    } catch {
      setMessage(
        "Impossible d'envoyer le lien pour le moment. Vérifie la configuration Supabase et réessaie."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">Un Grain de Folie</h1>
      <h2 className="mt-6 text-xl font-semibold">Connexion</h2>
      <p className="mt-2">
        Entre ton adresse e-mail pour recevoir ton lien de connexion sécurisé.
      </p>

      <form onSubmit={sendLoginLink} className="mt-6 space-y-4">
        <label htmlFor="email" className="block font-medium">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="toi@exemple.fr"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-800 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
        </button>
      </form>

      {message && (
        <p role="status" className="mt-4 rounded-lg border p-3">
          {message}
        </p>
      )}
    </main>
  );
}
