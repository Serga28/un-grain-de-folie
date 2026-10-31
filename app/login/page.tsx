"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      window.location.href = "/mon-compte";
    } catch (error) {
      console.error("Erreur de connexion Supabase :", error);

      setMessage(
        error instanceof Error
          ? `Erreur : ${error.message}`
          : "Une erreur inconnue est survenue."
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
        Connecte-toi avec ton adresse e-mail et ton mot de passe.
      </p>

      <form onSubmit={login} className="mt-6 space-y-4">
        <div>
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
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Ton mot de passe"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-800 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Connexion en cours…" : "Se connecter"}
        </button>
      </form>

      {message && (
        <p role="alert" className="mt-4 rounded-lg border p-3">
          {message}
        </p>
      )}
    </main>
  );
}
