
"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Une erreur est survenue."
        );
      }

      setSuccess(true);
      setMessage(
        "Ton compte a été créé avec succès ! Tu peux maintenant te connecter."
      );

      setCode("");
      setPassword("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">
        Un Grain de Folie
      </h1>

      <h2 className="mt-6 text-xl font-semibold">
        Rejoindre le réseau
      </h2>

      <p className="mt-2 text-gray-600">
        Entre ton code d&apos;invitation pour créer ton compte.
      </p>

      <form onSubmit={register} className="mt-6 space-y-4">
        <div>
          <label htmlFor="code" className="block font-medium">
            Code d&apos;invitation
          </label>
          <input
            id="code"
            type="text"
            required
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Ton code d'invitation"
          />
        </div>

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
            autoComplete="new-password"
            minLength={12}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="12 caractères minimum"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-800 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Création du compte..." : "Créer mon compte"}
        </button>
      </form>

      {message && (
        <p
          role="status"
          className="mt-5 rounded-lg border p-3"
        >
          {message}
        </p>
      )}

      {success && (
        <p className="mt-4">
          <a
            href="/login"
            className="font-semibold text-green-800 underline"
          >
            Aller à la page de connexion
          </a>
        </p>
      )}

      <p className="mt-8 text-sm text-gray-600">
        Tu as déjà un compte ?{" "}
        <a href="/login" className="underline">
          Se connecter
        </a>
      </p>
    </main>
  );
}
