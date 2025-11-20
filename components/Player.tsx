import React from 'react';
import { Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Maximize2 } from 'lucide-react';
import { Song, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface PlayerProps {
  currentSong: Song | null;
  language: Language;
}

const Player: React.FC<PlayerProps> = ({ currentSong, language }) => {
  if (!currentSong) return null;
  const t = TRANSLATIONS[language].player;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 px-4 md:px-8 py-3 z-50 flex items-center justify-between animate-in slide-in-from-bottom-10">
      
      {/* Song Info */}
      <div className="flex items-center gap-4 w-1/3">
        <img src={currentSong.imageUrl} alt="" className="w-12 h-12 rounded bg-zinc-800 object-cover" />
        <div className="hidden md:block">
          <h4 className="text-sm font-bold text-white truncate max-w-[150px]">{currentSong.title}</h4>
          <p className="text-xs text-zinc-400 truncate max-w-[150px]">{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1 w-1/3">
        <div className="flex items-center gap-6">
          <button className="text-zinc-400 hover:text-white transition-colors"><Shuffle className="w-4 h-4" /></button>
          <button className="text-zinc-200 hover:text-white transition-colors"><SkipBack className="w-5 h-5 fill-current" /></button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
          </button>
          <button className="text-zinc-200 hover:text-white transition-colors"><SkipForward className="w-5 h-5 fill-current" /></button>
          <button className="text-zinc-400 hover:text-white transition-colors"><Repeat className="w-4 h-4" /></button>
        </div>
        <div className="w-full max-w-md flex items-center gap-2 text-xs text-zinc-500">
           <span>0:00</span>
           <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group">
              <div className="h-full w-0 bg-white group-hover:bg-green-500 relative"></div>
           </div>
           <span>{currentSong.duration}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center justify-end gap-4 w-1/3">
         {currentSong.lyrics && (
           <div className="hidden lg:flex px-2 py-0.5 rounded border border-white/10 text-[10px] text-zinc-400 bg-zinc-900">
             {t.lyrics}
           </div>
         )}
         <div className="flex items-center gap-2 group">
            <Volume2 className="w-5 h-5 text-zinc-400" />
            <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-white group-hover:bg-green-500"></div>
            </div>
         </div>
         <button className="text-zinc-400 hover:text-white"><Maximize2 className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

export default Player;