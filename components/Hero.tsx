import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = TRANSLATIONS[language].hero;
  const [index, setIndex] = useState(0);
  
  // Automatic scrolling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % t.prompts.length);
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [t.prompts.length]);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center text-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="relative z-10 px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-8 animate-pulse-slow">
           <span className="w-2 h-2 rounded-full bg-green-500"></span>
           {t.intro}
        </div>
        
        {/* Dynamic Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-tight flex flex-col md:block items-center">
          <span className="text-white">{t.prefix}</span>
          
          {/* Mobile: New line, Desktop: Inline with space */}
          <span className="md:hidden h-2"></span>
          <span className="hidden md:inline">&nbsp;</span>

          {/* Vertical Scroller Container */}
          {/* Use flex-col and text-center to align content properly. h-[1.2em] masks the rest. */}
          <span className="inline-flex flex-col h-[1.2em] overflow-hidden align-bottom justify-start text-center">
             <div 
                className="flex flex-col transition-transform duration-500 ease-in-out will-change-transform"
                // FIX: Use 'em' units instead of '%' to guarantee exact line-height scrolling.
                // Percentages can be unreliable if the container height collapses.
                style={{ transform: `translateY(-${index * 1.2}em)` }}
             >
                {t.prompts.map((prompt, i) => (
                    <span 
                      key={i} 
                      className="block h-[1.2em] leading-[1.2em] whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500"
                    >
                      {prompt}
                    </span>
                ))}
             </div>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.description}
        </p>
      </div>
    </section>
  );
};

export default Hero;