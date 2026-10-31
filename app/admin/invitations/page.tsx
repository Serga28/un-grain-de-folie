
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function InvitationsPage() {
  const [code, setCode] = useState("");
  const [expiration, setExpiration] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function creerInvitation() {
    setLoading(true);
    setMessage("");
    setCode("");
    setExpiration("");
    setCopied(false);

    try {
      const { data, error } = await supabase.rpc("create_invitation");

      if (error) throw error;

      const invitation = Array.isArray(data) ? data[0] : null;

      if (!invitation?.invitation_code) {
        throw new Error("Aucun code reçu.");
      }

      setCode(invitation.invitation_code);
      setExpiration(invitation.expires_at);
      setMessage("Invitation créée avec succès.");
    } catch (error) {
  console.error("Erreur création invitation :", error);

  const details =
    typeof error === "object" && error !== null
      ? JSON.stringify(error)
      : String(error);

  setMessage(`Erreur détaillée : ${details}`);
} finally {
      setLoading(false);
    }
  }

  async function copierCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setMessage("Impossible de copier le code automatiquement.");
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold">Gestion des invitations</h1>

      <p className="mt-3 text-gray-600">
        Crée une invitation pour permettre à une nouvelle personne
        de rejoindre Un Grain de Folie.
      </p>

      <button
        onClick={creerInvitation}
        disabled={loading}
        className="mt-8 rounded-lg bg-green-800 px-6 py-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Création en cours..." : "Créer une invitation"}
      </button>

      {message && (
        <p role="status" className="mt-5 rounded-lg border p-3">
          {message}
        </p>
      )}

      {code && (
        <section className="mt-6 rounded-xl border p-5">
          <h2 className="text-xl font-semibold">
            Nouvelle invitation
          </h2>

          <p className="mt-3 text-sm text-gray-600">
            Code à transmettre au futur membre :
          </p>

          <p className="mt-2 break-all rounded-lg bg-gray-100 p-3 font-mono text-sm">
            {code}
          </p>

          <button
            onClick={copierCode}
            className="mt-3 rounded-lg border px-4 py-2 font-medium"
          >
            {copied ? "Code copié !" : "Copier le code"}
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Expire le :{" "}
            {new Date(expiration).toLocaleString("fr-FR")}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Cette invitation est utilisable une seule fois.
          </p>
        </section>
      )}
    </main>
  );
}
