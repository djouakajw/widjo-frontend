'use client';
import { useState, useEffect } from 'react';
import { Sparkles, Upload, Play, Clock, Zap, Image, Mic, Film, ChevronDown, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { generateVideo, enhancePrompt } from '@/lib/api';
import Link from 'next/link';

const STYLES = [
  { id: 'cinematic', label: 'Cinématique', icon: '🎬' },
  { id: 'anime', label: 'Anime', icon: '✨' },
  { id: 'realistic', label: 'Réaliste', icon: '📷' },
  { id: 'ads', label: 'Publicité', icon: '📢' },
  { id: 'documentary', label: 'Documentaire', icon: '🎥' },
];

const DURATIONS = [5, 10, 15, 30, 60];

const TYPES = [
  { id: 'text-to-video', label: 'Texte → Vidéo', icon: <Film className="w-4 h-4" /> },
  { id: 'image-to-video', label: 'Image → Vidéo', icon: <Image className="w-4 h-4" /> },
  { id: 'lip-sync', label: 'Lip Sync', icon: <Mic className="w-4 h-4" /> },
  { id: 'thumbnail', label: 'Thumbnail', icon: <Zap className="w-4 h-4" /> },
];

export default function StudioPage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [duration, setDuration] = useState(5);
  const [type, setType] = useState('text-to-video');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ job_id: string; video_id: string; status: string; replicate?: { prediction_id: string } } | null>(null);
  const [error, setError] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanced, setEnhanced] = useState('');

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    try {
      const data = await enhancePrompt(prompt, style);
      setEnhanced(data.enhanced);
    } catch { setError('Erreur lors de l\'amélioration du prompt'); }
    finally { setIsEnhancing(false); }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) { setError('Entrez un prompt'); return; }
    setIsGenerating(true);
    setError('');
    setResult(null);
    try {
      const data = await generateVideo({
        prompt: enhanced || prompt,
        style, duration, type,
        user_id: 'widjo-studio-user',
      });
      if (data.error) { setError(data.error); return; }
      setResult(data);
    } catch { setError('Erreur de connexion à l\'API'); }
    finally { setIsGenerating(false); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass border-b border-dark-border px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand to-accent flex items-center justify-center font-bold text-xs">W</div>
            <span className="font-bold text-sm">WIDJO</span>
          </Link>
          <span className="text-xs bg-brand/20 text-brand px-2 py-0.5 rounded-full font-medium">STUDIO</span>
          <span className="text-gray-500 text-sm">Project Alpha</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">● Saved</span>
          <button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}
            className="btn-primary text-sm py-2 px-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Générer la vidéo
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — IA params */}
        <aside className="w-64 glass border-r border-dark-border p-4 overflow-y-auto flex-shrink-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">IA PARAMÈTRES</p>

          {/* Type */}
          <div className="mb-5">
            <label className="text-xs text-gray-400 mb-2 block">Type de génération</label>
            <div className="space-y-1">
              {TYPES.map((t) => (
                <button key={t.id} onClick={() => setType(t.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${type === t.id ? 'bg-brand/20 text-brand border border-brand/30' : 'text-gray-400 hover:bg-dark-card hover:text-white'}`}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div className="mb-5">
            <label className="text-xs text-gray-400 mb-2 block">Style du Script IA</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button key={s.id} onClick={() => setStyle(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${style === s.id ? 'bg-brand text-white' : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'}`}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-5">
            <label className="text-xs text-gray-400 mb-2 block">Durée</label>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button key={d} onClick={() => setDuration(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${duration === d ? 'bg-brand text-white' : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'}`}>
                  {d}s
                </button>
              ))}
            </div>
          </div>

          {/* Intensité IA */}
          <div className="mb-5">
            <label className="text-xs text-gray-400 mb-2 flex justify-between">
              <span>Intensité IA</span><span className="text-white">75%</span>
            </label>
            <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-brand" />
          </div>
        </aside>

        {/* Center — Preview */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Preview area */}
          <div className="flex-1 flex items-center justify-center p-8 bg-dark-surface">
            {isGenerating ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-4 border-brand/30 border-t-brand animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Génération en cours...</p>
                <p className="text-xs text-gray-600 mt-1">Replicate AI • {style} • {duration}s</p>
              </div>
            ) : result ? (
              <div className="text-center max-w-md">
                {result.status === 'processing' || result.status === 'pending' ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center mx-auto mb-4">
                      <Loader2 className="w-8 h-8 text-brand animate-spin" />
                    </div>
                    <p className="font-semibold mb-2">Génération en cours sur Replicate</p>
                    <p className="text-sm text-gray-400 mb-4">Job ID: {result.job_id}</p>
                    <Link href={`/dashboard`} className="btn-primary text-sm">
                      Voir dans le Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="font-semibold mb-2">Vidéo générée !</p>
                    <Link href="/dashboard" className="btn-primary text-sm">Voir la vidéo</Link>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <Film className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>Entrez un prompt et cliquez sur Générer</p>
              </div>
            )}
          </div>

          {/* Prompt area */}
          <div className="glass border-t border-dark-border p-4">
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm mb-3 bg-red-500/10 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}
            {enhanced && (
              <div className="text-xs text-brand bg-brand/10 rounded-lg px-3 py-2 mb-3">
                ✨ Prompt amélioré : {enhanced.substring(0, 100)}...
              </div>
            )}
            <div className="flex gap-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Décrivez votre vidéo... ex: Femme africaine dansant au coucher du soleil, style cinématique 4K"
                className="input-dark flex-1 resize-none h-16 text-sm"
                onKeyDown={(e) => { if (e.key === 'Enter' && e.ctrlKey) handleGenerate(); }}
              />
              <div className="flex flex-col gap-2">
                <button onClick={handleEnhance} disabled={isEnhancing || !prompt.trim()}
                  className="btn-secondary text-xs py-2 px-3 flex items-center gap-1 disabled:opacity-50">
                  {isEnhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Améliorer
                </button>
                <button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}
                  className="btn-primary text-xs py-2 px-3 flex items-center gap-1 disabled:opacity-50">
                  {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                  Générer
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">Ctrl+Enter pour générer • Style: {style} • Durée: {duration}s</p>
          </div>
        </main>

        {/* Right panel — Media library */}
        <aside className="w-52 glass border-l border-dark-border p-4 overflow-y-auto flex-shrink-0">
          <div className="flex gap-4 mb-4 text-xs font-medium">
            {['Médias', 'Texte', 'Audio'].map((t) => (
              <button key={t} className="text-gray-400 hover:text-white transition-colors">{t}</button>
            ))}
          </div>
          <input placeholder="Rechercher des médias..." className="input-dark text-xs py-2 mb-4" />
          <div className="grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video bg-dark-card rounded-lg border border-dark-border flex items-center justify-center text-gray-600 text-xs hover:border-brand/30 cursor-pointer transition-colors">
                {i === 5 ? <Upload className="w-4 h-4" /> : <Film className="w-4 h-4" />}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
