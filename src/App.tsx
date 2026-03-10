import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, HeartPulse, BookOpen, Sparkles, Gift, Heart, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

// Typewriter Component
const Typewriter = ({ messages }: { messages: string[] }) => {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentMsg = messages[currentMsgIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentMsg.substring(0, text.length + 1));
        if (text.length === currentMsg.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentMsg.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setCurrentMsgIndex((prev) => (prev + 1) % messages.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentMsgIndex, messages]);

  return (
    <div className="h-10 flex items-center justify-center mt-4">
      <span className="font-script text-2xl md:text-4xl text-amber-200 border-r-2 border-pink-400 pr-1 animate-pulse">
        {text}
      </span>
    </div>
  );
};

// Petals Component
const Petals = () => {
  const petals = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 15,
    size: 14 + Math.random() * 16,
    emoji: ['🌸', '🌺', '🌷', '💮', '🌹', '✿'][Math.floor(Math.random() * 6)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map(p => (
        <motion.div
          key={p.id}
          className="absolute -top-10"
          style={{ left: `${p.left}vw`, fontSize: p.size }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Shooting Stars
// Floating Icons
const FloatingIcons = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10 md:opacity-15 hidden sm:block">
      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-[15%]">
        <Stethoscope size={72} className="text-white" />
      </motion.div>
      <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-1/3 right-[15%]">
        <HeartPulse size={80} className="text-pink-400" />
      </motion.div>
      <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-1/4 left-[20%]">
        <BookOpen size={64} className="text-blue-300" />
      </motion.div>
    </div>
  );
};

// Smoke Component for Blown Candle
const Smoke = () => {
  return (
    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-10 h-20 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            y: -100 - Math.random() * 50, 
            x: (Math.random() - 0.5) * 40,
            scale: [0.5, 1.5, 2] 
          }}
          transition={{ 
            duration: 2 + Math.random() * 2, 
            repeat: Infinity, 
            delay: i * 0.4,
            ease: "easeOut"
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full blur-xl"
        />
      ))}
    </div>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "vw", 
            y: Math.random() * 100 + "vh",
            opacity: Math.random() * 0.5
          }}
          animate={{ 
            y: [null, Math.random() * 100 + "vh"],
            x: [null, Math.random() * 100 + "vw"],
          }}
          transition={{ 
            duration: 20 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-1 h-1 bg-pink-200/30 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

const Cake = ({ onBlow, isBlown }: { onBlow: () => void, isBlown: boolean }) => {
  return (
    <div className="relative w-72 h-72 mx-auto mt-8 z-10">
      {/* Cake Base/Plate */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-10 bg-zinc-800 rounded-[100%] border-b-4 border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"></div>
      
      {/* Cake Body */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 h-32 bg-gradient-to-b from-[#ffb6c1] to-[#ff69b4] rounded-[50%/20px] shadow-inner">
        {/* Cake Top */}
        <div className="absolute top-0 left-0 w-full h-14 bg-[#ffc0cb] rounded-[50%] border border-[#ffb6c1]"></div>
        
        {/* Icing Drips */}
        <div className="absolute top-7 left-0 w-full h-full pointer-events-none">
           <div className="absolute top-0 left-[10%] w-8 h-14 bg-[#fff0f5] rounded-b-full shadow-sm"></div>
           <div className="absolute top-0 left-[30%] w-10 h-20 bg-[#fff0f5] rounded-b-full shadow-sm"></div>
           <div className="absolute top-0 left-[55%] w-6 h-12 bg-[#fff0f5] rounded-b-full shadow-sm"></div>
           <div className="absolute top-0 left-[75%] w-8 h-16 bg-[#fff0f5] rounded-b-full shadow-sm"></div>
        </div>
      </div>
      
      {/* Candle */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-4 h-20 bg-gradient-to-r from-blue-100 via-white to-blue-200 rounded-t-sm shadow-sm">
        {/* Stripes */}
        <div className="absolute inset-0 overflow-hidden rounded-t-sm">
          <div className="w-full h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#ff6b9d_5px,#ff6b9d_10px)] opacity-60"></div>
        </div>
        {/* Wick */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-zinc-800 rounded-t-sm"></div>
        
        {/* Smoke when blown */}
        {isBlown && <Smoke />}
        
        {/* Flame */}
        <AnimatePresence>
          {!isBlown && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.1, 0.9, 1.05, 1],
                rotate: [0, -3, 3, -1, 0],
                y: [0, -2, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-yellow-100 via-orange-400 to-red-500 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] blur-[1px] cursor-pointer origin-bottom shadow-[0_0_25px_#ff9900,0_0_50px_#ff4500]"
              onClick={onBlow}
            >
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-5 bg-white rounded-full opacity-80 blur-[1px]"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Ring */}
        {!isBlown && (
          <motion.div
            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-amber-300 rounded-full pointer-events-none"
          />
        )}
      </div>
    </div>
  )
}

// FlipCard Component
const FlipCard: React.FC<{ i: number }> = ({ i }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const messages = [
    "Your smile lights up the room! ✨",
    "A heart of gold and hands that heal 💖",
    "May all your dreams come true 🌟",
    "Keep shining, Dr. Sahiba! 👩‍⚕️",
    "Blessed to have you in our lives 🙏"
  ];

  useEffect(() => {
    // Automatically flip the card sequentially after the page loads
    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
    }, 1200 + i * 800); // Staggered delay: 2s, 2.8s, 3.6s...

    // Flip it back after showing the message for a few seconds
    const flipBackTimer = setTimeout(() => {
      setIsFlipped(false);
    }, 1200 + i * 800 + 4000);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(flipBackTimer);
    };
  }, [i]);

  return (
    <div 
      className="aspect-[4/5] [perspective:1000px] cursor-pointer group relative"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          <img 
            src={`/memory-${i}.jpg`} 
            onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/sahiba${i + 10}/600/800` }}
            alt={`Memory ${i}`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-6 z-20">
            <div className="flex items-center gap-2 text-pink-200 text-sm font-medium tracking-wider uppercase">
              <Star size={16} className="fill-pink-200" /> Memory {i}
            </div>
          </div>
        </div>
        {/* Back */}
        <div 
          className="absolute inset-0 [backface-visibility:hidden] rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 border border-white/20 shadow-xl flex items-center justify-center p-6 text-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-serif italic text-xl md:text-2xl text-white drop-shadow-md">
            {messages[i - 1]}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// FloatingBalloons Component
const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState(Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}vw`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
    color: ['bg-pink-500', 'bg-purple-500', 'bg-red-400', 'bg-amber-400', 'bg-blue-400'][Math.floor(Math.random() * 5)],
    popped: false,
    popMessage: ['Smile! ✨', 'Stay Blessed! 🙏', 'Keep Shining! 🌟', 'Happy Bday! 🎉', 'You are loved! 💖', 'Stay Awesome! 😎', 'Magic is Real! 🪄', 'Dream Big! 🌈'][Math.floor(Math.random() * 8)]
  })));

  const [popTexts, setPopTexts] = useState<{id: number, x: number, y: number, text: string, color: string}[]>([]);
  const [blasts, setBlasts] = useState<{id: number, x: number, y: number, color: string}[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const balloonsRef = useRef(balloons);

  useEffect(() => {
    balloonsRef.current = balloons;
  }, [balloons]);

  const triggerPop = (id: number, x: number, y: number, text: string, color: string) => {
    setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    
    // Add blast effect
    const blastId = Date.now() + Math.random();
    setBlasts(prev => [...prev, { id: blastId, x, y, color }]);
    const blastTimeout = setTimeout(() => {
      setBlasts(prev => prev.filter(b => b.id !== blastId));
    }, 1000);
    timeoutsRef.current.push(blastTimeout);

    // Add pop text
    const newTextId = Date.now() + Math.random();
    const newText = { id: newTextId, x, y, text, color };
    setPopTexts(prev => [...prev, newText]);
    
    const textTimeout = setTimeout(() => {
      setPopTexts(prev => prev.filter(t => t.id !== newTextId));
    }, 2500);
    timeoutsRef.current.push(textTimeout);

    // Respawn balloon after a delay
    const respawnTimeout = setTimeout(() => {
      setBalloons(prev => prev.map(b => b.id === id ? { 
        ...b, 
        popped: false, 
        left: `${5 + Math.random() * 90}vw`,
        delay: Math.random() * 2,
        duration: 8 + Math.random() * 8,
        color: ['bg-pink-500', 'bg-purple-500', 'bg-red-400', 'bg-amber-400', 'bg-blue-400'][Math.floor(Math.random() * 5)],
        popMessage: ['Smile! ✨', 'Stay Blessed! 🙏', 'Keep Shining! 🌟', 'Happy Bday! 🎉', 'You are loved! 💖', 'Stay Awesome! 😎', 'Magic is Real! 🪄', 'Dream Big! 🌈'][Math.floor(Math.random() * 8)]
      } : b));
    }, 3000);
    timeoutsRef.current.push(respawnTimeout);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const unpopped = balloonsRef.current.filter(b => !b.popped);
      if (unpopped.length > 0) {
        const randomBalloon = unpopped[Math.floor(Math.random() * unpopped.length)];
        const leftPercent = parseFloat(randomBalloon.left);
        const x = (leftPercent / 100) * window.innerWidth;
        const y = window.innerHeight / 2 + (Math.random() * 200 - 100);
        triggerPop(randomBalloon.id, x, y, randomBalloon.popMessage, randomBalloon.color);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutsRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const popBalloon = (id: number, e: React.MouseEvent, text: string, color: string) => {
    triggerPop(id, e.clientX, e.clientY, text, color);
  };

  const autoPopBalloon = (id: number, text: string, leftStr: string, color: string) => {
    const leftPercent = parseFloat(leftStr);
    const x = (leftPercent / 100) * window.innerWidth;
    const y = 50;
    triggerPop(id, x, y, text, color);
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {balloons.map(b => (
          <AnimatePresence key={b.id}>
            {!b.popped && (
              <motion.div
                initial={{ y: '110vh', x: 0 }}
                animate={{ y: '0vh', x: [0, Math.random() * 100 - 50, 0] }}
                transition={{ duration: b.duration, delay: b.delay, ease: "linear" }}
                onAnimationComplete={() => autoPopBalloon(b.id, b.popMessage, b.left, b.color)}
                className="absolute pointer-events-auto cursor-crosshair"
                style={{ left: b.left }}
                onClick={(e) => popBalloon(b.id, e, b.popMessage, b.color)}
                exit={{ scale: 2, opacity: 0, transition: { duration: 0.1 } }}
              >
                <div className={`w-12 h-16 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] ${b.color} shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2)] relative flex items-center justify-center hover:brightness-110 transition-all`}>
                  <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white/50"></div>
                  <div className="absolute bottom-[-40px] left-1/2 w-[1px] h-10 bg-white/30"></div>
                  <div className="absolute top-2 left-2 w-3 h-4 bg-white/40 rounded-full blur-[1px] rotate-45"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      
      <AnimatePresence>
        {popTexts.map(pt => (
          <motion.div
            key={pt.id}
            initial={{ opacity: 0, scale: 0.5, y: pt.y, x: pt.x }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8], y: pt.y - 150, x: pt.x }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className={`fixed z-50 font-bold text-3xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none whitespace-nowrap -translate-x-1/2 -translate-y-1/2 ${pt.color.replace('bg-', 'text-')}`}
          >
            <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20">
              {pt.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Blast Particles */}
      <AnimatePresence>
        {blasts.map(blast => (
          <div key={blast.id} className="fixed z-40 pointer-events-none" style={{ left: blast.x, top: blast.y }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 200, 
                  y: (Math.random() - 0.5) * 200, 
                  scale: 0, 
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`absolute w-3 h-3 rounded-full ${blast.color}`}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </>
  );
};

const SurpriseView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#05020a] text-white overflow-y-auto relative font-sans"
    >
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0514]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-900/10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
      </div>
      
      <FloatingParticles />
      <FloatingBalloons />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        <button 
          onClick={onBack} 
          aria-label="Back to celebration"
          className="group text-pink-300 hover:text-white mb-8 flex items-center gap-2 transition-all font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Celebration
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-16 shadow-2xl relative overflow-hidden max-w-4xl mx-auto"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400"></div>
          
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.5)]">
              <Heart className="text-white fill-white w-8 h-8 md:w-10 md:h-10" />
            </div>
          </div>

          <h2 className="font-serif italic text-3xl md:text-6xl text-center mb-8 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200 bg-[length:200%_auto] animate-gradient-x">
            A Year of Blessings Ahead
          </h2>

          <div className="space-y-6 md:space-y-8 text-base md:text-2xl text-pink-50/90 leading-relaxed font-light text-center max-w-3xl mx-auto">
            <p>
              Dear Dr. Sahiba,
            </p>
            <p>
              May this year bring you as much joy and healing as you bring to others. Your dedication, your pure soul, and your unwavering kindness make you truly special.
            </p>
            <p>
              May Khatu Shyam Ji bless your path with success, peace, and endless happiness. Keep shining your beautiful light on the world.
            </p>
            
            {/* Personal Message Section */}
            <div className="mt-8 md:mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 shadow-inner relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0a0514] px-4 text-pink-300 font-script text-xl md:text-2xl whitespace-nowrap">
                A Special Note For You
              </div>
              <div className="italic text-pink-100/80 text-base md:text-xl leading-relaxed mt-2 space-y-4">
                <p>
                  "You’re on your way to becoming an amazing doctor, and I truly admire your dedication and dreams.
                  Keep shining and never stop believing in yourself."
                </p>
                <p>
                  "Happy Birthday and wishing you all the success and happiness in the world."
                </p>
              </div>
              <p className="mt-4 md:mt-6 text-right text-pink-300 font-medium text-base md:text-lg">
                — YR Rathore
              </p>
            </div>

            <p className="pt-6 md:pt-8 font-script text-3xl md:text-5xl text-pink-300 drop-shadow-md">
              Happy Birthday! 🎉
            </p>
          </div>
        </motion.div>

        <div className="mt-16 md:mt-24 flex flex-col gap-16 md:gap-32 pb-20">
          {[
            { id: 1, title: "A Beautiful Beginning", text: "Every great journey starts with a single step. Your journey has been nothing short of magical, touching lives along the way." },
            { id: 2, title: "Healing Hands", text: "The way you care for others shows the pure gold your heart is made of. You are a true healer, inside and out." },
            { id: 3, title: "Unstoppable Spirit", text: "Through all the late nights and endless studying, your determination never faded. We are so proud of you." },
            { id: 4, title: "That Radiant Smile", text: "A smile that brings comfort and joy to everyone around you. Never lose this beautiful spark!" },
            { id: 5, title: "The Bright Future", text: "Khatu Shyam Ji's blessings are always with you. The future holds wonderful things for you, Dr. Sahiba." }
          ].map((memory, index) => (
            <motion.div 
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'} items-center gap-4 sm:gap-8 md:gap-16 max-w-5xl mx-auto w-full`}
            >
              <div className="w-1/2 flex justify-center">
                <div className="w-full max-w-sm">
                  <FlipCard i={memory.id} />
                </div>
              </div>
              <div className={`w-1/2 space-y-2 md:space-y-4 ${index % 2 === 1 ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-serif italic text-pink-300 leading-tight">{memory.title}</h3>
                <p className="text-xs sm:text-sm md:text-xl text-pink-100/80 leading-relaxed">
                  {memory.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 z-50 p-4 bg-pink-600/20 hover:bg-pink-600/40 border border-pink-500/30 rounded-full backdrop-blur-md transition-all text-pink-200 shadow-lg"
      >
        <Star size={20} className="fill-pink-200" />
      </motion.button>
    </motion.div>
  );
};

export default function App() {
  const [isBlown, setIsBlown] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{id: number, left: string, top: string, emoji: string}[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleBlow = () => {
    setIsBlown(true);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio play failed, trying fallback:", error);
          // Fallback to a working URL if local file fails
          if (audioRef.current) {
            audioRef.current.src = "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3";
            audioRef.current.load();
            audioRef.current.play().catch(e => console.log("Fallback audio also failed:", e));
          }
        });
      }
    }

    const hearts = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + Math.random(),
      left: `${20 + Math.random() * 60}vw`,
      top: `${30 + Math.random() * 40}vh`,
      emoji: ['💖','💝','💗','💓','✨','🌸','🌷','💫'][Math.floor(Math.random() * 8)]
    }));
    setFloatingHearts(hearts);
    
    setTimeout(() => setFloatingHearts([]), 3000);
  };

  const handleSurpriseClick = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ffb6c1', '#ff69b4', '#ff1493', '#ffd700', '#ffffff'],
      zIndex: 100
    });
    setTimeout(() => setShowSurprise(true), 600);
  };

  return (
    <>
      {/* Background Music - Replace src with your preferred Lofi MP3 URL */}
      {/* Note: Pixabay blocks direct links. Download the file and upload it to the 'public' folder as 'happy-birthday-lofi.mp3' to use it. */}
      <audio 
        ref={audioRef} 
        src="/happy-birthday-lofi.mp3" 
        loop 
        preload="auto" 
      />
      
      <AnimatePresence mode="wait">
      {showSurprise ? (
        <SurpriseView key="surprise" onBack={() => setShowSurprise(false)} />
      ) : (
        <motion.div 
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#0a0514] text-white overflow-hidden relative font-sans flex flex-col items-center justify-center"
        >
          {/* Enhanced Home Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-pink-900/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-900/10 blur-[120px] rounded-full"></div>
          </div>
          
          <FloatingParticles />
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,20,60,0.8)_0%,rgba(10,5,20,1)_100%)]"></div>
          <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
          
          <Petals />
          <FloatingIcons />

          {/* Main Content */}
          <motion.main 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl"
          >
            <div className="absolute top-0 right-4 md:right-0 bg-pink-500/20 border border-pink-500/40 rounded-full px-5 py-2 text-sm text-pink-200 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              <Sparkles size={16} /> Your Special Day
            </div>

            <motion.h1 
              className="font-serif italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl mt-16 md:mt-20 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-white to-pink-300 drop-shadow-[0_0_20px_rgba(255,192,203,0.4)] px-2"
            >
              Happy Birthday,<br />Dr. Sahiba 💖
            </motion.h1>

            <Typewriter messages={[
              'Future Doctor. Pure Soul.',
              'Blessed by Khatu Shyam Ji 🙏',
              'The world is lucky to have you ✨',
              'Your kindness heals before medicine does 💖',
              'Shine on, beautiful soul 🌟'
            ]} />

            <div className="transform scale-[0.75] sm:scale-100 origin-bottom">
              <Cake onBlow={handleBlow} isBlown={isBlown} />
            </div>

            <div className="h-24 mt-2 sm:mt-8">
              <AnimatePresence mode="wait">
                {!isBlown ? (
                  <motion.div
                    key="instruction"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-pink-200/90 text-base tracking-[0.2em] uppercase font-medium"
                  >
                    <p>Blow out the candle 🕯️💨🎂</p>
                    <p className="text-sm opacity-60 mt-2 tracking-[0.3em]">— make a wish first! —</p>
                    <button 
                      onClick={() => {
                        const newHearts = Array.from({ length: 5 }).map((_, i) => ({
                          id: Date.now() + Math.random(),
                          left: `${40 + Math.random() * 20}vw`,
                          top: `60vh`,
                          emoji: ['✨', '⭐', '🌟', '💫', '💖'][Math.floor(Math.random() * 5)]
                        }));
                        setFloatingHearts(prev => [...prev, ...newHearts]);
                        setTimeout(() => {
                          setFloatingHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
                        }, 2000);
                      }}
                      aria-label="Make a wish"
                      className="mt-4 text-pink-300/60 hover:text-pink-300 text-xs transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Sparkles size={12} /> Make a Wish
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button 
                      onClick={handleSurpriseClick}
                      aria-label="Enter surprise"
                      className="group relative px-6 py-4 md:px-10 md:py-5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-semibold text-white text-base md:text-lg shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.7)] transition-all duration-300 hover:scale-105 overflow-hidden w-full max-w-[280px] md:max-w-none mx-auto"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                      <span className="relative flex items-center justify-center gap-2 md:gap-3">
                        <Gift className="w-5 h-5 md:w-[22px] md:h-[22px]" /> Enter Surprise ✨
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.main>

          {/* Floating Hearts/Wishes */}
          <AnimatePresence>
            {floatingHearts.map(heart => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1], y: -200, x: (Math.random() - 0.5) * 100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute z-50 text-4xl pointer-events-none"
                style={{ left: heart.left, top: heart.top }}
              >
                {heart.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
