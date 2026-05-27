'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Suspense } from 'react';

function AuthForm() {
  const searchParams = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('signup') === 'true');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth — in production connect to Supabase Auth
    await new Promise((r) => setTimeout(r, 1500));
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-accent flex items-center justify-center font-bold">W</div>
            <span className="font-bold text-xl">WIDJO</span>
          </Link>
          <h1 className="text-2xl font-bold">{isSignup ? 'Créer un compte' : 'Connexion'}</h1>
          <p className="text-gray-400 text-sm mt-1">
            {isSignup ? 'Rejoignez des milliers de créateurs africains' : 'Bon retour sur WIDJO'}
          </p>
        </div>

        <div className="card">
          {/* OAuth */}
          <div className="space-y-3 mb-6">
            <button className="w-full btn-secondary flex items-center justify-center gap-3 text-sm">
              <span className="text-lg">🔵</span> Continuer avec Google
            </button>
            <button className="w-full btn-secondary flex items-center justify-center gap-3 text-sm">
              <span className="text-lg">⚫</span> Continuer avec GitHub
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-500">
              <span className="bg-dark-card px-2">ou avec email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Nom complet</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-dark" placeholder="Votre nom" required />
              </div>
            )}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-dark" placeholder="vous@exemple.com" required />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Mot de passe</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-dark pr-10" placeholder="••••••••••••" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isSignup && (
              <div className="text-right">
                <a href="#" className="text-xs text-brand hover:text-brand-light">Mot de passe oublié ?</a>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isSignup ? 'Créer mon compte' : 'Se connecter'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isSignup ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
            <button onClick={() => setIsSignup(!isSignup)} className="text-brand hover:text-brand-light font-medium">
              {isSignup ? 'Se connecter' : 'S\'inscrire gratuitement'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}
