'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Play, Zap, Globe, TrendingUp, ChevronDown, Star, ArrowRight, Video, Mic, Image, Film } from 'lucide-react';

const FEATURES = [
  { icon: <Zap className="w-5 h-5" />, title: 'Création Automatique', desc: 'Transformez un prompt en séquence vidéo en moins de 30 secondes.' },
  { icon: <Globe className="w-5 h-5" />, title: 'Multilingue', desc: 'Générez et traduisez dans plus de 50 langues avec adaptation culturelle.' },
  { icon: <Film className="w-5 h-5" />, title: 'Studio Audiovisuel', desc: 'De la génération au script à la vidéo cinématique, une chaîne de production complète.' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Ingénierie Virale', desc: 'Analyse des tendances pour calibrer l\'engagement de vos créations.' },
];

const PROFILES = [
  { icon: '🛍️', title: 'Commerçants', desc: 'Générez des vidéos produits captivantes en 1 clic.' },
  { icon: '🏢', title: 'PME', desc: 'Automatisez votre communication d\'entreprise avec une qualité TV.' },
  { icon: '🎬', title: 'Créateurs', desc: 'Dépassez les contraintes techniques pour vous concentrer sur le sens.' },
  { icon: '📊', title: 'Agences', desc: 'Gérez des campagnes multimarques et multipublics à la portée.' },
];

const PLANS = [
  { name: 'Starter', price: 'Gratuit', features: ['5 vidéos/mois', 'Résolution 720p', 'Stockage 5 Go'], cta: 'Commencer', highlight: false },
  { name: 'Pro', price: '29€/mois', features: ['Transformations illimitées', 'Export 4K', '50 Go de stockage'], cta: 'S\'abonner', highlight: true },
  { name: 'Business', price: '99€/mois', features: ['Génération illimitée', 'Équipe 5 membres', 'Partage prioritaire'], cta: 'Contacter les ventes', highlight: false },
];

const FAQS = [
  { q: 'Quels types de vidéos puis-je créer avec WIDJO ?', a: 'Text-to-video, image-to-video, lip sync, thumbnails, vidéos publicitaires, et bien plus encore.' },
  { q: 'L\'IA génère-t-elle dans plusieurs langues ?', a: 'Oui, WIDJO supporte plus de 50 langues dont les dialectes africains.' },
  { q: 'Puis-je annuler mon abonnement à tout moment ?', a: 'Oui, sans engagement. Annulation en 1 clic depuis votre tableau de bord.' },
  { q: 'Ai-je besoin de compétences en montage vidéo ?', a: 'Non. WIDJO est conçu pour être utilisé sans aucune compétence technique.' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-accent flex items-center justify-center font-bold text-sm">W</div>
            <span className="font-bold text-lg">WIDJO</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Produits</a>
            <a href="#profiles" className="hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="btn-ghost text-sm">Login</Link>
            <Link href="/auth?signup=true" className="btn-primary text-sm py-2 px-4">Start for free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-2 text-sm text-brand mb-8">
            <Sparkles className="w-4 h-4" />
            PLATEFORME VIDÉO IA LIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Transformez vos idées en<br />
            <span className="gradient-text">vidéos pro avec l'IA</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            La plateforme IA souveraine conçue pour les créateurs africains. Générez, éditez et diffusez des expériences cinématographiques en quelques clics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/studio" className="btn-primary flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4" /> Essayer gratuitement
            </Link>
            <button className="btn-secondary flex items-center gap-2 justify-center">
              <Play className="w-4 h-4" /> Voir la vidéo
            </button>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mt-16 max-w-5xl mx-auto relative">
          <div className="glass rounded-2xl overflow-hidden border border-dark-border neon-glow aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-brand" />
              </div>
              <p className="text-gray-400">Démo WIDJO Studio</p>
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-2 text-sm font-medium border border-brand/20">
            <span className="text-green-400">●</span> AI Rendering
          </div>
          <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 text-sm font-medium border border-accent/20">
            <span className="text-accent">●</span> 4K Export
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section id="profiles" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Pour qui ?</h2>
          <p className="text-gray-400 text-center mb-12">Un écosystème conçu pour simplifier chaque type de créateur.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROFILES.map((p) => (
              <div key={p.title} className="card-hover text-center">
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">L'arsenal ultime.</h2>
          <p className="text-gray-400 text-center mb-12">Tout ce dont vous avez besoin pour dominer l'espace visuel, découpé dans une interface d'une fluidité absolue.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Big feature */}
            <div className="card row-span-2 flex flex-col justify-between min-h-64">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center mb-4 text-brand">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2">Studio Audiovisuel Automatisé</h3>
                <p className="text-gray-400 text-sm">De la génération de script à la vidéo cinématique, une chaîne de production complète dirigée par des réseaux neuronaux avancés.</p>
              </div>
              <Link href="/studio" className="btn-primary mt-6 inline-flex items-center gap-2 w-fit">
                Ouvrir le Studio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {FEATURES.map((f) => (
              <div key={f.title} className="card flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center text-brand flex-shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Tarifs</h2>
          <p className="text-gray-400 text-center mb-12">Choisissez le plan adapté à vos ambitions créatives.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`card flex flex-col ${plan.highlight ? 'border-brand neon-glow' : ''}`}>
                {plan.highlight && (
                  <div className="text-xs font-semibold text-brand bg-brand/10 rounded-full px-3 py-1 w-fit mb-4">Recommandé</div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-3xl font-black mb-6 gradient-text">{plan.price}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth?signup=true" className={plan.highlight ? 'btn-primary text-center' : 'btn-secondary text-center'}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="card cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === i && <p className="mt-3 text-gray-400 text-sm">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-accent flex items-center justify-center font-bold text-sm">W</div>
              <span className="font-bold">WIDJO</span>
            </div>
            <p className="text-xs text-gray-500">© 2024 WIDJO AI. Built for the future of film.</p>
          </div>
          {[
            { title: 'Company', links: ['WIDJO AI', 'Team', 'Careers', 'Contact'] },
            { title: 'Platform', links: ['Features', 'Pricing', 'Changelog'] },
            { title: 'News & Legal', links: ['Documentation', 'Privacy Policy', 'Terms of Service'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => <li key={l}><a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
