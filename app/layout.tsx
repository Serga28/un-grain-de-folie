import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Un Grain de Folie",
  description: "Une communauté d'entraide et d'échanges en Graines.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
