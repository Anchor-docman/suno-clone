import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CreateSection from './components/CreateSection';
import Marquee from './components/Marquee';
import SongCard from './components/SongCard';
import Player from './components/Player';
import { getSampleSongs, TRANSLATIONS } from './constants';
import { Song, Language } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  // Separate generated songs so they persist across language changes
  const [generatedSongs, setGeneratedSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  // Default language set to Chinese
  const [language, setLanguage] = useState<Language>('zh'); 

  const t = TRANSLATIONS[language].app;

  // Merge generated songs with localized sample songs
  const displaySongs = [...generatedSongs, ...getSampleSongs(language)];

  const handleSongGenerated = (newSong: Song) => {
    setGeneratedSongs(prev => [newSong, ...prev]);
    setCurrentSong(newSong); // Auto play generated song
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-white/20">
      <Navbar language={language} setLanguage={setLanguage} />
      
      <main>
        <Hero language={language} />
        
        <div className="relative">
           <CreateSection onSongGenerated={handleSongGenerated} language={language} />
           
           {/* Marquee Section */}
           <div className="mt-20 mb-12 border-y border-white/5 bg-black/20 backdrop-blur-sm">
             <Marquee language={language} />
           </div>
           
           {/* Main Content Grid */}
           <div className="max-w-7xl mx-auto px-6 pb-32">
             
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-bold">{t.trending}</h2>
               <div className="flex gap-4 text-sm text-zinc-400 font-medium">
                 <button className="text-white">{t.global}</button>
                 <button className="hover:text-white transition-colors">{t.japan}</button>
                 <button className="hover:text-white transition-colors">{t.usa}</button>
               </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {displaySongs.map((song) => (
                 <SongCard 
                    key={song.id} 
                    song={song} 
                    onClick={setCurrentSong}
                    language={language}
                 />
               ))}
             </div>
             
             <div className="mt-12 flex justify-center">
                <button className="text-sm font-semibold border border-white/10 px-6 py-3 rounded-full hover:bg-white/5 transition-colors">
                  {t.loadMore}
                </button>
             </div>

           </div>
        </div>
      </main>

      <Player currentSong={currentSong} language={language} />

      {/* Generated Lyrics Modal Overlay (Mockup if song has lyrics) */}
      {currentSong?.lyrics && (
        <div className="fixed bottom-24 right-6 w-80 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl z-40 animate-in slide-in-from-bottom-5">
          <h3 className="text-xs font-bold text-zinc-500 uppercase mb-2 tracking-wider">{t.lyricsTitle}</h3>
          <p className="text-sm text-zinc-300 whitespace-pre-line italic font-serif">
            "{currentSong.lyrics}"
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
             <span className="text-xs text-zinc-500">Gemini 2.5 Flash</span>
             <span className="text-xs text-green-400 flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> {t.complete}
             </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;