import { motion } from 'motion/react';
import { Code, Smartphone, ShoppingCart, Zap, CheckCircle, ArrowRight, Layers } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const technologies = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#000000' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'Node.js', color: '#339933' },
  { name: 'MongoDB', color: '#47A248' },
];

const features = [
  {
    icon: Code,
    title: 'Sites Web Modernes',
    description: 'Applications web rapides, sécurisées et optimisées pour le SEO avec les dernières technologies.',
  },
  {
    icon: Smartphone,
    title: 'Applications Mobile',
    description: 'Apps natives et hybrides pour iOS et Android avec une expérience utilisateur exceptionnelle.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Boutiques en ligne complètes avec paiement sécurisé et gestion de stock intégrée.',
  },
  {
    icon: Zap,
    title: 'Web Apps',
    description: 'Applications web progressives (PWA) offrant une expérience similaire aux apps natives.',
  },
];

const projects = [
  { 
    title: 'SMOVE Platform', 
    type: 'SaaS Platform',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: 'modern saas dashboard',
  },
  { 
    title: 'E-Shop Abidjan', 
    type: 'E-commerce',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    image: 'ecommerce website modern',
  },
  { 
    title: 'Mobile Banking App', 
    type: 'Mobile App',
    tech: ['React Native', 'Firebase'],
    image: 'mobile banking app',
  },
];

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/services" />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 bg-gradient-to-br from-[#0d1f2d] via-[#1a2f3d] to-[#0d1f2d] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Animated Code Lines Background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-[#34c759]"
              style={{
                left: 0,
                right: 0,
                top: `${i * 5}%`,
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Floating Code Symbols */}
        {['<', '>', '{', '}', '/', '='].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-[#34c759]/20 font-mono text-6xl"
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {symbol}
          </motion.div>
        ))}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block bg-gradient-to-r from-[#34c759] to-[#2da84a] text-white px-4 py-2 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] mb-6"
                whileHover={{ scale: 1.05 }}
              >
                Développement Web & Mobile
              </motion.div>
              <h1 className="font-['ABeeZee:Regular',sans-serif] text-[56px] md:text-[72px] text-white mb-6 leading-tight">
                Transformez vos idées en <span className="text-[#34c759]">applications</span>
              </h1>
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-white/80 mb-8 leading-relaxed">
                De la simple vitrine au système complexe, nous développons des solutions web et mobile performantes, scalables et sécurisées.
              </p>
              
              {/* Tech Stack */}
              <div className="mb-8">
                <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-white/60 mb-4">
                  Technologies utilisées:
                </p>
                <div className="flex flex-wrap gap-3">
                  {technologies.map((tech, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white border border-white/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: tech.color + '20',
                        borderColor: tech.color,
                      }}
                    >
                      {tech.name}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  className="bg-[#34c759] text-white px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px] inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Démarrer un projet
                  <ArrowRight size={20} />
                </motion.a>
                <motion.a
                  href="#projects"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir les projets
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Code Editor Mockup */}
              <motion.div
                className="bg-[#1e1e1e] rounded-[16px] overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Editor Header */}
                <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="font-mono text-[12px] text-white/60">App.tsx</span>
                  </div>
                </div>
                
                {/* Code Content */}
                <div className="p-6 font-mono text-[14px] leading-relaxed">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-[#c586c0]">import</span>{' '}
                    <span className="text-white">{'{'}</span>
                    <span className="text-[#9cdcfe]"> useState </span>
                    <span className="text-white">{'}'}</span>{' '}
                    <span className="text-[#c586c0]">from</span>{' '}
                    <span className="text-[#ce9178]">'react'</span>
                    <span className="text-white">;</span>
                  </motion.div>
                  <div className="h-4" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="text-[#c586c0]">export</span>{' '}
                    <span className="text-[#c586c0]">default</span>{' '}
                    <span className="text-[#c586c0]">function</span>{' '}
                    <span className="text-[#dcdcaa]">YourApp</span>
                    <span className="text-white">() {'{'}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="pl-4"
                  >
                    <span className="text-[#c586c0]">return</span>{' '}
                    <span className="text-white">{'<'}</span>
                    <span className="text-[#4ec9b0]">div</span>
                    <span className="text-white">{'>'}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="pl-8"
                  >
                    <span className="text-[#34c759]">✨ Votre projet ici</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="pl-4"
                  >
                    <span className="text-white">{'</'}</span>
                    <span className="text-[#4ec9b0]">div</span>
                    <span className="text-white">{'>'}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <span className="text-white">{'}'}</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[48px] tracking-[4.8px] uppercase text-[#273a41] mb-4">
              Nos Solutions
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-[#f5f9fa] to-white p-8 rounded-[16px] h-full border-2 border-transparent"
                  whileHover={{ 
                    y: -10,
                    borderColor: '#34c759',
                    boxShadow: '0 20px 40px rgba(52, 199, 89, 0.2)',
                  }}
                >
                  <motion.div
                    className="bg-gradient-to-br from-[#34c759] to-[#2da84a] w-16 h-16 rounded-[12px] flex items-center justify-center mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="text-white" size={32} />
                  </motion.div>
                  <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[24px] text-[#273a41] mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#f5f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[48px] tracking-[4.8px] uppercase text-[#273a41] mb-4">
              Projets Récents
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="bg-white rounded-[16px] overflow-hidden shadow-lg"
                  whileHover={{ y: -10 }}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <ImageWithFallback
                      src=""
                      alt={project.title}
                      query={project.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-block bg-[#34c759]/10 text-[#34c759] px-3 py-1 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[12px] mb-3">
                      {project.type}
                    </div>
                    <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[24px] text-[#273a41] mb-3">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-[#f5f9fa] text-[#38484e] px-2 py-1 rounded font-['Abhaya_Libre:Regular',sans-serif] text-[12px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#34c759] to-[#2da84a] relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="font-['Medula_One:Regular',sans-serif] text-[48px] tracking-[4.8px] uppercase text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Discutons de votre projet
          </motion.h2>
          <motion.p 
            className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Que ce soit une simple landing page ou une application complexe, nous sommes là pour vous aider.
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-block bg-white text-[#34c759] px-12 py-5 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[20px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Obtenir un devis gratuit
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
