'use client';
import { useState, useEffect } from 'react';
import { Search, Upload, Plus, Grid, List, Filter, Globe, Calendar, FolderPlus, Film, Image, Music, Loader2 } from 'lucide-react';
import { getVideos } from '@/lib/api';
import Link from 'next/link';

const FORMATS = ['Tous', 'TikTok (9:16)', 'YouTube (16:9)', 'Instagram (1:1)', 'Cinéma (2.39:1)'];
const LANGUAGES = ['Toutes', 'Français', 'English', 'Wolof', 'Hausa', 'Swahili'];

export default function AssetsPage() {
  const [videos, setVideos] = useState<{ id: string; prompt: string; status: string; video_url: string | null; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFormat, setActiveFormat] = useState('Tous');
  const [activeLanguage, setActiveLanguage] = useState('Toutes');

  useEffect(() => {
    getVideos().then((data) => setVideos(data.videos ?? [])).finally(() => setLoading(false));
  }, []);

  const filtered = videos.filter((v) =>
    v.prompt.toLowerCase().includes(search.toLowerCase())
  );

  const navItems = [
    { icon: <FolderPlus className="w-4 h-4" />, label: 'Projects', href: '/dashboard' },
    { icon: <Film className="w-4 h-4" />, label: 'Templates', href: '/dashboard' },
    { icon: <Music className="w-4 h-4" />, label: 'Library', href: '/dashboard' },
    { icon: <Image className="w-4 h-4" />, label: 'Assets', href: '/assets', active: true },
    { icon: <Filter className="w-4 h-4" />, label: 'Settings', href: '/dashboard' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 glass border-r border-dark-border flex flex-col">
        <div className="p-4 border-b border-dark-border">
          <div className="flex items-center gap-2">
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
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${(item as { active?: boolean }).active ? 'bg-brand/20 text-brand' : 'text-gray-400 hover:text-white hover:bg-dark-card'}`}>
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-dark-border">
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Storage</span><span className="text-white">85%</span>
            </div>
            <div className="h-1.5 bg-dark-border rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand to-accent rounded-full w-[85%]" />
            </div>
            <p className="text-xs text-gray-600 mt-1">850 GB / 1 TB Used</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black">Assets Library</h1>
            <p className="text-gray-400 text-sm">Manage your uploaded media and AI-generated content.</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary flex items-center gap-2 text-sm">
              <Upload className="w-4 h-4" /> Upload Media
            </button>
            <Link href="/studio" className="btn-primary flex items-center gap-2 text-sm">
              <Film className="w-4 h-4" /> Generate AI Video
            </Link>
          </div>
        </div>

        {/* Search & filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets..." className="input-dark pl-10 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <select className="input-dark text-sm py-2 w-auto" value={activeFormat} onChange={(e) => setActiveFormat(e.target.value)}>
              {FORMATS.map((f) => <option key={f}>{f}</option>)}
            </select>
            <select className="input-dark text-sm py-2 w-auto" value={activeLanguage} onChange={(e) => setActiveLanguage(e.target.value)}>
              {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex border border-dark-border rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-brand/20 text-brand' : 'text-gray-400 hover:text-white'}`}>
              <Grid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-brand/20 text-brand' : 'text-gray-400 hover:text-white'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active filters */}
        {(activeFormat !== 'Tous' || activeLanguage !== 'Toutes') && (
          <div className="flex items-center gap-2 mb-4">
            {activeFormat !== 'Tous' && (
              <span className="text-xs bg-brand/10 text-brand border border-brand/20 rounded-full px-3 py-1 flex items-center gap-1">
                Format: {activeFormat} <button onClick={() => setActiveFormat('Tous')} className="ml-1 hover:text-white">×</button>
              </span>
            )}
            {activeLanguage !== 'Toutes' && (
              <span className="text-xs bg-accent/10 text-accent border border-accent/20 rounded-full px-3 py-1 flex items-center gap-1">
                Language: {activeLanguage} <button onClick={() => setActiveLanguage('Toutes')} className="ml-1 hover:text-white">×</button>
              </span>
            )}
            <button onClick={() => { setActiveFormat('Tous'); setActiveLanguage('Toutes'); }} className="text-xs text-gray-500 hover:text-white">
              Clear all
            </button>
          </div>
        )}

        {/* Assets grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand" />
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {filtered.map((video) => (
              <div key={video.id} className={`card-hover group ${viewMode === 'list' ? 'flex items-center gap-4' : ''}`}>
                <div className={`bg-dark-surface rounded-xl overflow-hidden relative ${viewMode === 'grid' ? 'aspect-video mb-3' : 'w-24 h-16 flex-shrink-0'}`}>
                  {video.video_url ? (
                    <video src={video.video_url} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center">
                      {video.status === 'processing' ? (
                        <Loader2 className="w-5 h-5 text-brand animate-spin" />
                      ) : (
                        <Film className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  )}
                  {video.video_url && (
                    <div className="absolute top-1 left-1 text-xs bg-brand/80 text-white px-1.5 py-0.5 rounded font-medium">
                      ✦AI
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{video.prompt.substring(0, 40)}...</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round(Math.random() * 50 + 5)} MB • {new Date(video.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">···</button>
              </div>
            ))}

            {/* New folder */}
            <div className="card-hover flex flex-col items-center justify-center min-h-32 border-dashed cursor-pointer">
              <FolderPlus className="w-8 h-8 text-gray-600 mb-2" />
              <p className="text-sm text-gray-500">New Folder</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
