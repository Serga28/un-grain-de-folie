
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  let reservationId: string | null = null;

  try {
    const body = await request.json();

    const code =
      typeof body.code === "string" ? body.code.trim() : "";
    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const password =
      typeof body.password === "string" ? body.password : "";

    if (!code || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    if (password.length < 12) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 12 caractères." },
        { status: 400 }
      );
    }

    const { data: reservation, error: reserveError } =
      await supabaseAdmin.rpc("reserve_invitation", {
        p_code: code,
        p_email: email,
      });

    if (reserveError) {
      console.error("Erreur de réservation :", reserveError);
      return NextResponse.json(
        { error: "Impossible de vérifier cette invitation." },
        { status: 500 }
      );
    }

    reservationId = reservation;

    if (!reservationId) {
      return NextResponse.json(
        { error: "Code invalide, expiré ou déjà utilisé." },
        { status: 400 }
      );
    }

    const { data: userData, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (createError || !userData.user) {
      console.error("Erreur de création du compte :", createError);

      await supabaseAdmin.rpc("release_invitation", {
        p_reservation_id: reservationId,
      });

      return NextResponse.json(
        { error: "Impossible de créer ce compte. Vérifie l'adresse e-mail." },
        { status: 400 }
      );
    }

    const userId = userData.user.id;

    const { data: finalized, error: finalizeError } =
      await supabaseAdmin.rpc("finalize_invitation", {
        p_reservation_id: reservationId,
        p_user_id: userId,
      });

    if (finalizeError || finalized !== true) {
      console.error("Erreur de validation de l'invitation :", finalizeError);

      await supabaseAdmin.auth.admin.deleteUser(userId);

      await supabaseAdmin.rpc("release_invitation", {
        p_reservation_id: reservationId,
      });

      return NextResponse.json(
        { error: "La validation de l'invitation a échoué." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Compte créé avec succès. Tu peux maintenant te connecter.",
    });
  } catch (error) {
    console.error("Erreur d'inscription :", error);

    if (reservationId) {
      await supabaseAdmin.rpc("release_invitation", {
        p_reservation_id: reservationId,
      });
    }

    return NextResponse.json(
      { error: "Une erreur est survenue pendant l'inscription." },
      { status: 500 }
    );
  }
}
