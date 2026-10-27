# Un Grain de Folie — base de l'application

Première base visuelle Next.js pour le projet. Cette version ne contient pas encore de comptes membres ni de comptabilité active.

## Technologies prévues
- Next.js / React / TypeScript
- Supabase pour l'authentification et PostgreSQL
- Vercel pour le déploiement

## Démarrage
1. Créer un projet Supabase.
2. Récupérer l'URL du projet et la clé publique (publishable/anon).
3. Définir `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans les variables d'environnement du déploiement.
4. Déployer le dépôt sur Vercel.

Ne jamais ajouter de mot de passe, de clé `service_role` ou de secret au dépôt GitHub. Les transactions et contrôles de solde devront être implémentés côté serveur avec des écritures comptables atomiques avant toute utilisation réelle.
