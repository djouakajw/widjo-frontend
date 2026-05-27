import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WIDJO — Transformez vos idées en vidéos pro avec l\'IA',
  description: 'La plateforme IA souveraine pour les créateurs africains. Générez, éditez et diffusez des expériences cinématographiques en quelques clics.',
  keywords: ['vidéo IA', 'génération vidéo', 'Afrique', 'SaaS', 'WIDJO', 'Replicate'],
  openGraph: {
    title: 'WIDJO — Vidéos IA Pro',
    description: 'Générez des vidéos professionnelles avec l\'IA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="gradient-bg min-h-screen">{children}</body>
    </html>
  );
}
