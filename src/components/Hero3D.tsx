import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1f2d] via-[#1a2f3d] to-[#0d1f2d]"
      style={{ opacity, position: 'relative' }}
    >
      {/* 3D Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? 'rgba(0, 179, 232, 0.1)' : 'rgba(52, 199, 89, 0.1)'
              }, transparent)`,
            }}
            animate={{
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid Pattern */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 179, 232, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 179, 232, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[#00b3e8] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ scale, y }}
      >
        {/* Logo/Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="inline-block mb-8"
        >
          <motion.div
            className="bg-gradient-to-r from-[#00b3e8] to-[#34c759] p-1 rounded-[20px]"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 179, 232, 0.3)',
                '0 0 40px rgba(52, 199, 89, 0.3)',
                '0 0 20px rgba(0, 179, 232, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="bg-[#0d1f2d] px-6 py-3 rounded-[18px] flex items-center gap-2">
              <Sparkles className="text-[#00b3e8]" size={20} />
              <span className="font-['Abhaya_Libre:Bold',sans-serif] text-white text-[14px] tracking-wider">
                DIGITAL EXCELLENCE
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="font-['ABeeZee:Regular',sans-serif] text-[64px] md:text-[96px] lg:text-[120px] leading-none mb-6">
            <motion.span
              className="block bg-gradient-to-r from-white via-[#00b3e8] to-[#34c759] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% auto' }}
            >
              SMOVE
            </motion.span>
          </h1>
          <motion.h2
            className="font-['Abhaya_Libre:Regular',sans-serif] text-[24px] md:text-[32px] lg:text-[40px] text-white/80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Communication Digitale & Innovation
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] md:text-[20px] text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Transformez votre vision digitale en réalité avec nos solutions créatives et innovantes. 
          De la conception à la réalisation, nous créons des expériences mémorables.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.button
            className="bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white px-10 py-5 rounded-[20px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px] relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const servicesSection = document.getElementById('services');
              servicesSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00c0e8] to-[#34c759]"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Découvrir nos services</span>
          </motion.button>

          <motion.button
            className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-[20px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.location.hash = 'contact';
            }}
          >
            Nous contacter
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => {
              const servicesSection = document.getElementById('services');
              servicesSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px]">
              Scroll pour découvrir
            </span>
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3D Erase Effect Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ 
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none'
        }}
      />
    </motion.div>
  );
}