import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Gabby et la maison magique - Concours Roulette",
  description: "Tentez votre chance avec la roulette magique de Gabby ! Tournez la roue pour gagner des places de cinéma pour le film 'Gabby et la maison magique'. Un concours gratuit et amusant pour toute la famille.",
  keywords: "Gabby, maison magique, concours, roulette, cinéma, places gratuites, jeu, enfants, famille, DreamWorks",
  openGraph: {
    title: "Gabby et la maison magique - Concours Roulette",
    description: "Tournez la roulette magique et tentez de gagner des places de cinéma !",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabby et la maison magique - Concours Roulette",
    description: "Tournez la roulette magique et tentez de gagner des places de cinéma !",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
