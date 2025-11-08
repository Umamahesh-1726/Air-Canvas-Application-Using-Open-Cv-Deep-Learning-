import React, { useState, useEffect } from 'react';

const WelcomePage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentGesture, setCurrentGesture] = useState(0);

  const gestures = ['🤟', '✊', '🖐', '👉', '✌️'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setCurrentGesture(prev => (prev + 1) % gestures.length);
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) / 50;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) / 50;

  return (
    <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden text-white bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
      {/* Animated glowing background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full w-[40rem] h-[40rem] bg-emerald-500 opacity-20 blur-3xl -top-40 -left-40 animate-pulse"
          style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}
        />
        <div
          className="absolute bg-teal-500 rounded-full w-[40rem] h-[40rem] opacity-20 blur-3xl -bottom-40 -right-40 animate-pulse"
          style={{
            transform: `translate(${-parallaxX}px, ${-parallaxY}px)`,
            animationDelay: '1s'
          }}
        />
        <div
          className="absolute rounded-full bg-cyan-500 w-[32rem] h-[32rem] opacity-15 blur-3xl top-1/2 left-1/2 animate-pulse"
          style={{
            transform: `translate(${parallaxX * 2}px, ${parallaxY * 2}px)`,
            animationDelay: '0.5s'
          }}
        />
      </div>

      {/* Floating gesture emojis */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl pointer-events-none opacity-10 animate-pulse"
          style={{
            left: `${15 + i * 20}%`,
            top: `${10 + (i % 2) * 70}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`
          }}
        >
          {gestures[i]}
        </div>
      ))}

      {/* Fullscreen main card */}
      <div className="relative z-10 w-full h-full p-0">
        <div className="relative w-full h-full overflow-hidden rounded-none">
          {/* Glowing border */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400 opacity-20 animate-pulse"
            style={{ animationDuration: '3s' }}
          />

          {/* Inner glass section */}
          <div className="relative flex flex-col justify-between h-full px-20 py-14 bg-[#0a1f1a]/90 backdrop-blur-xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex-1">
                <div className="mb-4 font-black text-transparent text-8xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text animate-pulse">
                  Gesture Drawing Studio
                </div>
                <p className="text-2xl font-light tracking-wide text-teal-200">
                  Transform your creativity with AI-powered gesture recognition technology
                </p>
              </div>
              <div
                className="flex items-center justify-center ml-16 text-[12rem] animate-bounce"
                style={{ animationDuration: '2s' }}
              >
                {gestures[currentGesture]}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-10 mb-10">
              {[
                {
                  emoji: '🖐',
                  title: 'Gesture Control',
                  desc: 'Control everything with natural hand movements',
                  color: 'from-emerald-500 to-teal-500'
                },
                {
                  emoji: '🎨',
                  title: 'Creative Tools',
                  desc: 'Professional drawing & painting features',
                  color: 'from-teal-500 to-cyan-500'
                },
                {
                  emoji: '💾',
                  title: 'Easy Export',
                  desc: 'Save your masterpieces instantly',
                  color: 'from-cyan-500 to-emerald-500'
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-10 transition-all duration-300 transform bg-gradient-to-br from-emerald-900/50 to-teal-900/50 backdrop-blur-sm rounded-2xl hover:scale-105 hover:shadow-2xl hover:from-emerald-800/70 hover:to-teal-800/70"
                >
                  <div className="mb-6 transition-transform duration-300 text-7xl hover:scale-125">
                    {feature.emoji}
                  </div>
                  <div
                    className={`font-bold text-3xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                  >
                    {feature.title}
                  </div>
                  <p className="text-lg text-teal-200">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Gesture commands */}
            <div className="relative p-10 mb-10 overflow-hidden bg-gradient-to-br from-emerald-900/60 to-teal-900/60 backdrop-blur-sm rounded-3xl">
              <div className="absolute top-0 right-0 bg-teal-500 rounded-full w-80 h-80 opacity-10 blur-3xl -z-10" />
              <div className="mb-8 text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text">
                Master These Gestures
              </div>
              <div className="grid grid-cols-5 gap-8">
                {[
                  { gesture: '🤟', name: 'Rock On', action: 'Change Color' },
                  { gesture: '✊', name: 'Fist', action: 'Clear Canvas' },
                  { gesture: '🖐', name: 'Open Hand', action: 'Pause Drawing' },
                  { gesture: '👉', name: 'Point', action: 'Start Drawing' },
                  { gesture: '✌️', name: 'V Sign', action: 'Undo Action' }
                ].map((cmd, i) => (
                  <div
                    key={i}
                    className="p-8 transition-all duration-300 transform bg-teal-800/30 rounded-xl hover:bg-teal-700/50 hover:scale-105"
                  >
                    <div className="mb-4 text-6xl transition-transform duration-300 hover:scale-125">
                      {cmd.gesture}
                    </div>
                    <div className="text-xl font-semibold text-teal-100">{cmd.name}</div>
                    <div className="text-base text-teal-300">{cmd.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex items-center gap-10">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 rounded-full opacity-75 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 blur-lg group-hover:opacity-100 animate-pulse" />
                <button
                  className="relative w-full px-12 py-6 text-2xl font-bold text-white transition-all duration-300 transform rounded-full shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-105 hover:shadow-teal-500/50"
                  onClick={onStart}
                >
                  <span className="flex items-center justify-center gap-4">
                    Launch Studio
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      ✨
                    </span>
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-3 px-8 py-6 rounded-full bg-teal-900/40 backdrop-blur-sm">
                <span className="relative flex w-4 h-4">
                  <span className="absolute inline-flex w-full h-full bg-teal-400 rounded-full opacity-75 animate-ping"></span>
                  <span className="relative inline-flex w-4 h-4 bg-teal-500 rounded-full"></span>
                </span>
                <p className="text-base text-teal-200">Camera access required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
