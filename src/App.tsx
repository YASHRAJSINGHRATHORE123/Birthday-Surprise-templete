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
    <div className="min-h-[3rem] md:min-h-[4rem] flex items-center justify-center mt-4 px-4 text-center">
      <span className="font-script text-2xl md:text-4xl text-amber-200 border-r-2 border-pink-400 pr-1 animate-pulse leading-tight">
        {text}
      </span>
    </div>
  );
};

// Petals Component
const Petals = () => {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    setPetals(Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 15,
      size: 14 + Math.random() * 16,
      emoji: ['🌸', '🌺', '🌷', '💮', '🌹', '✿'][Math.floor(Math.random() * 6)],
      xOffset1: Math.random() * 100 - 50,
      xOffset2: Math.random() * 100 - 50,
      rotationDir: 360 * (Math.random() > 0.5 ? 1 : -1)
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map(p => (
        <motion.div
          key={p.id}
          className="absolute -top-10"
          style={{ left: `${p.left}vw`, fontSize: p.size }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.xOffset1, p.xOffset2],
            rotate: [0, p.rotationDir],
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
  const [smokeParticles, setSmokeParticles] = useState<any[]>([]);

  useEffect(() => {
    setSmokeParticles([...Array(5)].map((_, i) => ({
      id: i,
      xOffset: (Math.random() - 0.5) * 40,
      yOffset: -100 - Math.random() * 50,
      duration: 2 + Math.random() * 2,
      delay: i * 0.4
    })));
  }, []);

  return (
    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-10 h-20 pointer-events-none">
      {smokeParticles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            y: p.yOffset, 
            x: p.xOffset,
            scale: [0.5, 1.5, 2] 
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
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
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles([...Array(30)].map((_, i) => ({
      id: i,
      initialX: Math.random() * 100 + "vw",
      initialY: Math.random() * 100 + "vh",
      opacity: Math.random() * 0.5,
      targetY: Math.random() * 100 + "vh",
      targetX: Math.random() * 100 + "vw",
      duration: 20 + Math.random() * 20
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: p.initialX, 
            y: p.initialY,
            opacity: p.opacity
          }}
          animate={{ 
            y: [null, p.targetY],
            x: [null, p.targetX],
          }}
          transition={{ 
            duration: p.duration, 
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
const FlipCard: React.FC<{ i: number, startAnimation?: boolean }> = ({ i, startAnimation = true }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const messages = [
    "Your smile lights up the room! ✨",
    "A heart of gold and hands that heal 💖",
    "May all your dreams come true 🌟",
    "Keep shining, Dr. Sahiba! 👩‍⚕️",
    "Blessed to have you in our lives 🙏"
  ];

  useEffect(() => {
    if (!startAnimation) return;

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
  }, [i, startAnimation]);

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



const BackgroundHearts = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    setHearts(Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: 16 + Math.random() * 24,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.2,
      xOffset1: Math.random() * 60 - 30,
      xOffset2: Math.random() * 60 - 30,
      rotate1: Math.random() * 180 - 90,
      rotate2: Math.random() * 180 - 90,
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(h => (
        <motion.div
          key={h.id}
          className="absolute -bottom-16 text-pink-500"
          style={{ left: h.left, opacity: h.opacity }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, h.xOffset1, h.xOffset2],
            rotate: [0, h.rotate1, h.rotate2],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const CountdownIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState<number | null>(3);
  const [showFlash, setShowFlash] = useState(false);
  const [showText, setShowText] = useState(false);
  
  const tickAudio = useRef<HTMLAudioElement>(null);
  const sparkleAudio = useRef<HTMLAudioElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (count === null) return;

    if (count > 0) {
      if (tickAudio.current) {
        tickAudio.current.currentTime = 0;
        tickAudio.current.volume = 0.4;
        tickAudio.current.play().catch(() => {});
      }
      
      const timer = setTimeout(() => {
        setCount(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      setCount(null); // Prevent effect from re-running
      setShowFlash(true);
      if (sparkleAudio.current) {
        sparkleAudio.current.volume = 0.6;
        sparkleAudio.current.play().catch(() => {});
      }
      
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.4 },
        colors: ['#ffb6c1', '#ff69b4', '#ff1493', '#ffd700', '#ffffff'],
        zIndex: 10000
      });

      setTimeout(() => {
        setShowFlash(false);
        setShowText(true);
      }, 150);

      setTimeout(() => {
        onCompleteRef.current();
      }, 3000);
    }
  }, [count]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05020a] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-pink-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-0 opacity-50">
        <FloatingParticles />
      </div>

      {/* Audio elements */}
      <audio ref={tickAudio} src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" preload="auto" />
      <audio ref={sparkleAudio} src="https://actions.google.com/sounds/v1/magic/magic_chime.ogg" preload="auto" />

      {/* Camera Zoom Container */}
      <motion.div
        animate={{ scale: [1, 1.15] }}
        transition={{ duration: 3, ease: "linear" }}
        className="relative z-10 flex items-center justify-center w-full h-full"
      >
        <AnimatePresence>
          {count !== null && count > 0 && (
            <motion.div
              key={count}
              initial={{ scale: 0.2, opacity: 0, rotateX: 60, rotate: -10, x: "-50%", y: "-50%" }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotateX: 0,
                rotate: 0,
                x: "-50%",
                y: "-50%",
                textShadow: "0 0 20px #ff69b4, 0 0 40px #ff1493, 0 0 80px #ff1493"
              }}
              exit={{ scale: 2.5, opacity: 0, filter: "blur(10px)", x: "-50%", y: "-50%" }}
              transition={{ duration: 0.9, type: "spring", bounce: 0.4 }}
              className="absolute top-1/2 left-1/2 font-serif font-bold text-[8rem] sm:text-[12rem] md:text-[20rem] text-white leading-none"
              style={{
                WebkitTextStroke: "2px rgba(255,105,180,0.8)",
              }}
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white z-40"
          />
        )}
      </AnimatePresence>

      {/* Final Text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: "-40%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", x: "-50%", y: "-50%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 z-20 text-center px-4 w-full"
          >
            <h2 className="font-serif italic text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.6)] leading-relaxed">
              Someone special deserves<br/>something special 💖
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SurpriseView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [introDone]);

  return (
    <>
      <AnimatePresence>
        {!introDone && <CountdownIntro onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: introDone ? 1 : 0, scale: introDone ? 1 : 0.95 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: introDone ? 0.5 : 0 }}
        className="min-h-screen bg-[#05020a] text-white relative font-sans w-full overflow-x-hidden"
        style={{ 
          pointerEvents: introDone ? 'auto' : 'none', 
          height: introDone ? 'auto' : '100vh', 
          overflowY: introDone ? 'auto' : 'hidden' 
        }}
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
      <BackgroundHearts />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-20">
        <button 
          onClick={onBack} 
          aria-label="Back to celebration"
          className="group text-pink-300 hover:text-white mb-6 md:mb-8 flex items-center gap-2 transition-all font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 text-sm md:text-base"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Celebration
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 md:p-16 shadow-2xl relative overflow-hidden max-w-4xl mx-auto w-full"
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
            <div className="mt-8 md:mt-12 p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 shadow-inner relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0a0514] px-3 md:px-4 text-pink-300 font-script text-lg md:text-2xl whitespace-nowrap">
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

        <div className="mt-12 md:mt-24 flex flex-col gap-12 md:gap-32 pb-20">
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
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 max-w-5xl mx-auto w-full`}
            >
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-64 sm:w-80 md:w-full max-w-sm">
                  <FlipCard i={memory.id} startAnimation={introDone} />
                </div>
              </div>
              <div className={`w-full md:w-1/2 space-y-3 md:space-y-4 text-center ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-pink-300 leading-tight">{memory.title}</h3>
                <p className="text-sm sm:text-base md:text-xl text-pink-100/80 leading-relaxed">
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
    </>
  );
};

export default function App() {
  const [isBlown, setIsBlown] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{id: number, left: string, top: string, emoji: string, xOffset: number}[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const generateHearts = (count: number, leftBase: number, leftRange: number, topBase: number, topRange: number, emojis: string[]) => {
    return Array.from({ length: count }).map(() => ({
      id: Date.now() + Math.random(),
      left: `${leftBase + Math.random() * leftRange}vw`,
      top: `${topBase + Math.random() * topRange}vh`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      xOffset: (Math.random() - 0.5) * 100
    }));
  };

  const handleBlow = () => {
    setIsBlown(true);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio play failed:", error);
          // Removed fallback URL that was causing "no supported source" errors
        });
      }
    }

    const hearts = generateHearts(20, 20, 60, 30, 40, ['💖','💝','💗','💓','✨','🌸','🌷','💫']);
    setFloatingHearts(hearts);
    
    setTimeout(() => setFloatingHearts([]), 3000);
  };

  const handleSurpriseClick = () => {
    setShowSurprise(true);
  };

  return (
    <>
      {/* Background Music - Happy Birthday Song */}
      <audio 
        ref={audioRef} 
        src="https://archive.org/download/HappyBirthdayToYou_897/Happy_Birthday_To_You.mp3" 
        loop 
        preload="auto" 
      />
      
      <AnimatePresence mode="wait">
      {showSurprise ? (
        <motion.div 
          key="surprise"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full min-h-screen"
        >
          <SurpriseView onBack={() => setShowSurprise(false)} />
        </motion.div>
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
            className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl py-10"
          >
            <div className="mb-6 md:absolute md:top-0 md:right-0 bg-pink-500/20 border border-pink-500/40 rounded-full px-5 py-2 text-sm text-pink-200 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              <Sparkles size={16} /> Your Special Day
            </div>

            <motion.h1 
              className="font-serif italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl md:mt-20 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-white to-pink-300 drop-shadow-[0_0_20px_rgba(255,192,203,0.4)] px-2 leading-tight"
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

            <div className="transform scale-[0.65] sm:scale-100 origin-bottom mt-4 sm:mt-0">
              <Cake onBlow={handleBlow} isBlown={isBlown} />
            </div>

            <div className="min-h-[6rem] mt-4 sm:mt-8 flex flex-col items-center justify-center">
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
                        const newHearts = generateHearts(5, 40, 20, 60, 0, ['✨', '⭐', '🌟', '💫', '💖']);
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
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1], y: -200, x: heart.xOffset }}
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
