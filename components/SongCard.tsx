import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Song, Language } from '../types';

interface SongCardProps {
  song: Song;
  onClick: (song: Song) => void;
  language?: Language;
}

const SongCard: React.FC<SongCardProps> = ({ song, onClick, language = 'en' }) => {
  const formatPlays = (plays: number) => {
    if (language === 'zh') {
       if (plays > 10000) return `${(plays / 10000).toFixed(1)}万`;
       return plays;
    }
    // English default
    if (plays > 1000) return `${(plays / 1000).toFixed(1)}k`;
    return plays;
  };

  return (
    <div 
      className="group relative bg-zinc-900/50 hover:bg-zinc-800/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer border border-white/5 hover:border-white/20"
      onClick={() => onClick(song)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={song.imageUrl} 
          alt={song.title} 
          onError={(e) => {
             // Fallback if image fails to load
             e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(song.title)}/400/400`;
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Hover Overlay with Play Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg scale-90 group-hover:scale-100 transition-transform hover:bg-zinc-200 hover:scale-110">
            <Play className="w-6 h-6 text-black fill-black ml-1" />
          </button>
        </div>

        {/* Stats Overlay (Bottom of image) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          <span className="text-xs font-medium text-white flex items-center gap-1">
            <Play className="w-3 h-3 fill-white" /> {formatPlays(song.plays)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-white text-lg truncate leading-tight mb-1">{song.title}</h3>
        <p className="text-zinc-400 text-sm truncate mb-3">{song.artist}</p>
        
        <div className="flex items-center justify-between">
          <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-zinc-300 font-medium truncate max-w-[60%]">
            {song.style}
          </div>
          <div className="flex gap-2 text-zinc-400">
            <button className="hover:text-white transition-colors hover:scale-110 transform"><Heart className="w-4 h-4" /></button>
            <button className="hover:text-white transition-colors hover:scale-110 transform"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;