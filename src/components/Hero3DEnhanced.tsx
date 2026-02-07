import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ArrowDown, Sparkles, Zap, Star, Globe } from 'lucide-react';

export default function Hero3DEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Advanced scroll transforms
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 15]);

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
      mouseX.set(x * 50);
      mouseY.set(y * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1f2d] via-[#1a2f3d] to-[#0d1f2d]"
      style={{ opacity, position: 'relative' }}
    >
      {/* 3D Perspective Container */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          scale: backgroundScale,
          y: backgroundY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Advanced Grid Pattern with Perspective */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 179, 232, 0.15) 2px, transparent 2px),
              linear-gradient(90deg, rgba(0, 179, 232, 0.15) 2px, transparent 2px),
              linear-gradient(rgba(0, 179, 232, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 179, 232, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            backgroundPosition: [
              '0% 0%, 0% 0%, 0% 0%, 0% 0%',
              '100% 100%, 100% 100%, 20px 20px, 20px 20px'
            ],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating 3D Orbs with Mouse Interaction */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 30 + (i % 3) * 10;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full backdrop-blur-sm"
              style={{
                width: `${150 + (i % 3) * 100}px`,
                height: `${150 + (i % 3) * 100}px`,
                left: `${50 + x}%`,
                top: `${50 + y}%`,
                background: i % 3 === 0 
                  ? 'radial-gradient(circle at 30% 30%, rgba(0, 179, 232, 0.2), rgba(0, 179, 232, 0.05), transparent)'
                  : i % 3 === 1
                  ? 'radial-gradient(circle at 30% 30%, rgba(52, 199, 89, 0.2), rgba(52, 199, 89, 0.05), transparent)'
                  : 'radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.05), transparent)',
                transformStyle: 'preserve-3d',
                x: smoothMouseX,
                y: smoothMouseY,
              }}
              animate={{
                y: [0, -80 * (1 + i * 0.2), 0],
                x: [0, 40 * Math.cos(i), 0],
                scale: [1, 1.3, 1],
                rotate: [0, 180 * (i % 2 === 0 ? 1 : -1), 360 * (i % 2 === 0 ? 1 : -1)],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          );
        })}

        {/* Particle System */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#00b3e8' : i % 3 === 1 ? '#34c759' : '#a855f7',
              boxShadow: `0 0 ${10 + (i % 3) * 5}px currentColor`,
            }}
            animate={{
              y: [0, -200 - Math.random() * 200, 0],
              x: [0, (Math.random() - 0.5) * 100, 0],
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.5, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Animated Light Beams */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute"
            style={{
              width: '2px',
              height: '100%',
              left: `${20 + i * 30}%`,
              background: `linear-gradient(to bottom, 
                transparent, 
                ${i === 0 ? 'rgba(0, 179, 232, 0.3)' : i === 1 ? 'rgba(52, 199, 89, 0.3)' : 'rgba(168, 85, 247, 0.3)'}, 
                transparent)`,
              transformOrigin: 'top',
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* 3D Rotating Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${400 + i * 200}px`,
              height: `${400 + i * 200}px`,
              marginLeft: `-${200 + i * 100}px`,
              marginTop: `-${200 + i * 100}px`,
              border: `1px solid ${i === 0 ? 'rgba(0, 179, 232, 0.2)' : i === 1 ? 'rgba(52, 199, 89, 0.2)' : 'rgba(168, 85, 247, 0.2)'}`,
              borderRadius: '50%',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateY: [0, 360],
              rotateX: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Main Content with 3D Transform */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-6xl"
        style={{ 
          scale,
          y,
          rotateX,
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Animated Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="text-[#00b3e8]" size={20} />
          </motion.div>
          <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-white">
            Agence Digitale Premium
          </span>
          <Star className="text-[#34c759]" size={16} />
        </motion.div>

        {/* Main Title with Advanced Animation */}
        <motion.div
          className="mb-6 relative"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
          }}
        >
          <motion.h1 
            className="font-['Medula_One:Regular',sans-serif] text-[64px] md:text-[96px] lg:text-[120px] tracking-[6px] md:tracking-[12px] uppercase mb-4 relative"
            initial={{ opacity: 0, y: 50, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Gradient Text with Animation */}
            <motion.span
              className="bg-gradient-to-r from-[#00b3e8] via-[#34c759] to-[#a855f7] bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% auto',
              }}
              animate={{
                backgroundPosition: ['0% center', '200% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              SMOVE
            </motion.span>
            
            {/* Glowing Effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-[#00b3e8] via-[#34c759] to-[#a855f7] bg-clip-text text-transparent blur-2xl opacity-50"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              SMOVE
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-['ABeeZee:Regular',sans-serif] text-[20px] md:text-[28px] text-white/90 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Communication Digitale & Innovation
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] md:text-[20px] text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Créez une expérience digitale exceptionnelle avec notre expertise en design, 
          développement web et production vidéo 3D. Transformons vos idées en réalité numérique.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href="#services"
            className="group relative px-8 py-4 bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white rounded-[16px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px] overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(0, 179, 232, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00c0e8] to-[#00b3e8]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10 flex items-center gap-2">
              Découvrir nos services
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap size={20} />
              </motion.div>
            </span>
          </motion.a>

          <motion.a
            href="#portfolio"
            className="group px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-[16px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: 'rgba(255, 255, 255, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Voir nos projets
              <Globe size={20} />
            </span>
          </motion.a>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { value: '150+', label: 'Projets Réalisés' },
            { value: '98%', label: 'Satisfaction Client' },
            { value: '8+', label: 'Années d\'Expérience' },
            { value: '24/7', label: 'Support Disponible' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[16px] p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(0, 179, 232, 0.5)',
              }}
            >
              <motion.p
                className="font-['Medula_One:Regular',sans-serif] text-[36px] text-[#00b3e8] mb-2"
                animate={{ scale: isHovering ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                {stat.value}
              </motion.p>
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <motion.p
          className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll pour découvrir
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="text-white/50" size={24} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}