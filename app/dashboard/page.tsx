'use client';
import { useState, useEffect } from 'react';
import { Plus, Sparkles, BarChart2, Share2, Globe, Settings, Library, FolderOpen, Loader2, Play, Download, Clock } from 'lucide-react';
import { getVideos, getJobs, getUserCredits } from '@/lib/api';
import Link from 'next/link';

const USER_ID = 'widjo-studio-user';

export default function DashboardPage() {
  const [videos, setVideos] = useState<{ id: string; prompt: string; status: string; video_url: string | null; created_at: string }[]>([]);
  const [credits, setCredits] = useState<{ credits_total: number; credits_used: number; credits_remaining: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ views: '1.2M', shares: '84K', languages: '14' });

  useEffect(() => {
    Promise.all([
      getVideos(USER_ID),
      getUserCredits(USER_ID),
    ]).then(([vData, cData]) => {
      setVideos(vData.videos ?? []);
      setCredits(cData);
    }).finally(() => setLoading(false));
  }, []);

  const navItems = [
    { icon: <FolderOpen className="w-4 h-4" />, label: 'Projects', href: '/dashboard', active: true },
    { icon: <Sparkles className="w-4 h-4" />, label: 'Templates', href: '/dashboard/templates' },
    { icon: <Library className="w-4 h-4" />, label: 'Library', href: '/dashboard/library' },
    { icon: <FolderOpen className="w-4 h-4" />, label: 'Assets', href: '/assets' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 glass border-r border-dark-border flex flex-col">
        <div className="p-4 border-b border-dark-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-accent flex items-center justify-center font-bold text-sm">W</div>
            <div>
              <p className="font-bold text-sm">Aether Workspace</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
          </div>
        </div>
        <div className="p-3">
          <Link href="/studio" className="w-full btn-primary text-sm py-2 flex items-center gap-2 justify-center mb-4">
            <Plus className="w-4 h-4" /> New Project
          </Link>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${item.active ? 'bg-brand/20 text-brand' : 'text-gray-400 hover:text-white hover:bg-dark-card'}`}>
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-dark-border">
          {credits && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Crédits IA</span>
                <span>{credits.credits_remaining}/{credits.credits_total}</span>
              </div>
              <div className="h-1.5 bg-dark-border rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand to-accent rounded-full transition-all"
                  style={{ width: `${(credits.credits_remaining / credits.credits_total) * 100}%` }} />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-7 h-7 rounded-full bg-brand/30 flex items-center justify-center text-xs font-bold text-brand">U</div>
            User Profile
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="p-8 border-b border-dark-border flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back. Here is your creative pulse.</p>
          </div>
          <Link href="/studio" className="btn-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Nouveau Projet IA
          </Link>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { label: 'TOTAL VIEWS', value: stats.views, change: '+12%' },
              { label: 'SHARES', value: stats.shares, change: '+5%' },
              { label: 'LANGUAGES GENERATED', value: stats.languages, change: '' },
            ].map((stat) => (
              <div key={stat.label} className="card">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-black">{stat.value}</p>
                  {stat.change && <span className="text-green-400 text-sm mb-1">↗{stat.change}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Recent projects */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Projets Récents</h2>
            <button className="text-sm text-brand hover:text-brand-light flex items-center gap-1">
              View All →
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(0, 6).map((video) => (
                <div key={video.id} className="card-hover group">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-dark-surface rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                    {video.video_url ? (
                      <video src={video.video_url} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center">
                        {video.status === 'processing' || video.status === 'pending' ? (
                          <Loader2 className="w-8 h-8 text-brand animate-spin" />
                        ) : (
                          <Play className="w-8 h-8 text-gray-600" />
                        )}
                      </div>
                    )}
                    {/* Status badge */}
                    <div className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                      video.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      video.status === 'processing' ? 'bg-brand/20 text-brand' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      ● {video.status === 'completed' ? 'AI RENDERED' : video.status === 'processing' ? 'PROCESSING' : 'PENDING'}
                    </div>
                    {/* Actions on hover */}
                    {video.video_url && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <a href={video.video_url} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Play className="w-4 h-4" />
                        </a>
                        <a href={video.video_url} download
                          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm mb-1 truncate">{video.prompt.substring(0, 50)}...</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(video.created_at).toLocaleDateString('fr-FR')}
                    </p>
                    <button className="text-gray-500 hover:text-white text-lg">···</button>
                  </div>
                </div>
              ))}

              {/* New project card */}
              <Link href="/studio" className="card-hover flex flex-col items-center justify-center min-h-48 border-dashed">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-dark-border flex items-center justify-center mb-3 group-hover:border-brand transition-colors">
                  <Plus className="w-6 h-6 text-gray-500" />
                </div>
                <p className="font-medium text-gray-400">Start Blank Canvas</p>
                <p className="text-xs text-gray-600 mt-1">Nouveau Projet</p>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
