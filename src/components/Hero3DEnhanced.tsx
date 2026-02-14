import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero3DEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 140, damping: 24 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 140, damping: 24 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.65]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      tiltY.set(x * 12);
      tiltX.set(-y * 10);
    };

    const resetTilt = () => {
      tiltX.set(0);
      tiltY.set(0);
    };

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerleave', resetTilt);

    return () => {
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', resetTilt);
    };
  }, [tiltX, tiltY]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0d1f2d] via-[#1a2f3d] to-[#0d1f2d] pt-32 pb-20"
      style={{ opacity: heroOpacity }}
    >
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 179, 232, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 179, 232, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '64px 64px'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute left-20 top-20 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 179, 232, 0.28), rgba(0, 179, 232, 0))',
          }}
          animate={{ y: [0, -30, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute right-20 bottom-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(52, 199, 89, 0.24), rgba(52, 199, 89, 0))',
          }}
          animate={{ y: [0, 24, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

      <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ y: heroY }}>
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Sparkles className="text-[#00b3e8]" size={18} />
            <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-white tracking-[1.6px] uppercase">
              Agence de communication
            </span>
          </motion.div>

          <motion.h1
            className="font-['ABeeZee:Regular',sans-serif] text-[48px] md:text-[96px] leading-none text-white mb-6"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Donnez du relief
            <span className="block bg-gradient-to-r from-[#00b3e8] via-white to-[#34c759] bg-clip-text text-transparent">
              à votre communication
            </span>
          </motion.h1>

          <motion.p
            className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Un hero premium avec animation 3D légère, pour valoriser votre image de marque et
            présenter vos services avec impact.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.a
              href="#services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white px-8 py-4 rounded-[16px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
              whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(0, 179, 232, 0.35)' }}
              whileTap={{ scale: 0.96 }}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('services');
              }}
            >
              Découvrir nos services
              <ArrowRight size={18} />
            </motion.a>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-[16px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px] backdrop-blur-md"
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.96 }}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('contact');
              }}
            >
              Lancer un projet
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          ref={stageRef}
          className="relative h-[500px] w-full flex items-center justify-center cursor-pointer"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <div className="relative w-full h-[500px] flex items-center justify-center" style={{ perspective: 1200 }}>
            <motion.div
              className="relative h-[324px] w-[600px]"
              style={{
                rotateX: smoothTiltX,
                rotateY: smoothTiltY,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-[24px] bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl p-8"
                style={{ transform: 'translateZ(40px)' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="size-[12px] rounded-full bg-[#ff5f56]" />
                    <span className="size-[12px] rounded-full bg-[#ffbd2e]" />
                    <span className="size-[12px] rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-white/70">
                    Campagne 360°
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[42, 78, 62].map((value, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-[12px] p-4">
                      <div className="font-['ABeeZee:Regular',sans-serif] text-[28px] text-white mb-1">{value}%</div>
                      <div className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-white/65">
                        Performance
                      </div>
                      <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#00b3e8] to-[#34c759]"
                          initial={{ width: '0%' }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 1.2, delay: 0.5 + index * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {[90, 72, 58].map((line, index) => (
                    <div key={index} className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#00b3e8]/5 to-[#2da84a]/10 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${line}%` }}
                        transition={{ duration: 1, delay: 0.9 + index * 0.15 }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="hidden md:block absolute top-4 -right-20 w-[280px] bg-white/10 border border-white/20 rounded-[16px] backdrop-blur-sm p-4"
                style={{ transform: 'translateZ(120px)' }}
                animate={{ y: [0, -12, 0], rotate: [-4, -2, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-[#00b3e8] mb-2">Brand Content</p>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/80">
                  Storytelling, visuels et activation social media.
                </p>
              </motion.div>

              <motion.div
                className="hidden md:block absolute -left-8 bottom-8 w-[280px] bg-white/10 border border-white/20 rounded-[16px] backdrop-blur-sm p-4"
                style={{ transform: 'translateZ(100px)' }}
                animate={{ y: [0, 10, 0], rotate: [3, 1, 3] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              >
                <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-[#34c759] mb-2">Web & Performance</p>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/80">
                  Site vitrine, tunnel de conversion et suivi KPI.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2 text-white/50"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          onClick={() => scrollToSection('services')}
        >
          <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px]">Scroll pour découvrir</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown size={22} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}