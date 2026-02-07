import { motion } from 'motion/react';
import { Palette, Code, Megaphone, Video, Box, ArrowRight } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

const services = [
  {
    id: 'design-branding',
    icon: Palette,
    title: 'Design & Branding',
    description: 'Création d\'interfaces immersives, animations 3D et expériences interactives, de logo et d\'identité visuels.',
    color: 'from-[#00b3e8] to-[#00c0e8]',
    features: ['Logo & Identité', 'UI/UX Design', 'Charte Graphique', 'Motion Design'],
  },
  {
    id: 'web-development',
    icon: Code,
    title: 'Développement Web & Mobile',
    description: 'Applications web modernes, rapides et sécurisées, adaptées à vos besoins métiers.',
    color: 'from-[#34c759] to-[#2da84a]',
    features: ['Sites Web', 'Applications Mobile', 'E-commerce', 'Web Apps'],
  },
  {
    id: 'digital-communication',
    icon: Megaphone,
    title: 'Communication Digitale',
    description: 'Stratégie de contenu, visibilité en ligne, branding et storytelling digital.',
    color: 'from-[#ffc247] to-[#ff9f47]',
    features: ['Stratégie Social Media', 'Content Marketing', 'SEO/SEA', 'Email Marketing'],
  },
  {
    id: 'video-production',
    icon: Video,
    title: 'Production Vidéo',
    description: 'Création de vidéos professionnelles pour vos campagnes marketing et événements.',
    color: 'from-[#ff6b6b] to-[#ee5a6f]',
    features: ['Vidéos Publicitaires', 'Motion Graphics', 'Montage Vidéo', 'Live Streaming'],
  },
  {
    id: '3d-creation',
    icon: Box,
    title: 'Création 3D',
    description: 'Modélisation 3D, animations et expériences immersives pour vos projets.',
    color: 'from-[#a855f7] to-[#9333ea]',
    features: ['Modélisation 3D', 'Animation 3D', 'Rendering', 'VR/AR'],
  },
];

export default function ServicesHubPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/services" />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 bg-gradient-to-b from-[#f5f9fa] to-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 3D Background Elements */}
        <motion.div
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#00b3e8]/10 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#34c759]/10 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="font-['ABeeZee:Regular',sans-serif] text-[64px] md:text-[96px] text-[#273a41] mb-6"
              animate={{
                backgroundImage: [
                  'linear-gradient(to right, #273a41, #00b3e8)',
                  'linear-gradient(to right, #00b3e8, #34c759)',
                  'linear-gradient(to right, #34c759, #273a41)',
                  'linear-gradient(to right, #273a41, #00b3e8)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Nos Services
            </motion.h1>
            <motion.p 
              className="font-['Abhaya_Libre:Regular',sans-serif] text-[24px] text-[#38484e] max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Des solutions digitales complètes pour propulser votre entreprise vers le succès
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { value: '150+', label: 'Projets réalisés' },
                { value: '50+', label: 'Clients satisfaits' },
                { value: '5+', label: 'Ans d\'expérience' },
                { value: '100%', label: 'Engagement qualité' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="font-['ABeeZee:Regular',sans-serif] text-[48px] text-[#00b3e8]">
                    {stat.value}
                  </div>
                  <div className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.a
                key={service.id}
                href={`#service-${service.id}`}
                className="group block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="relative h-full bg-white rounded-[24px] overflow-hidden shadow-lg"
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-8">
                    <motion.div
                      className={`w-20 h-20 rounded-[16px] bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="text-white" size={40} />
                    </motion.div>
                    
                    <h2 className="font-['Medula_One:Regular',sans-serif] text-[28px] tracking-[2.8px] uppercase text-[#273a41] group-hover:text-white transition-colors mb-4">
                      {service.title}
                    </h2>
                    
                    <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e] group-hover:text-white/90 transition-colors mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-[#00b3e8] group-hover:bg-white" />
                          <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#38484e] group-hover:text-white/80 transition-colors">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <motion.div
                      className="flex items-center gap-2 text-[#00b3e8] group-hover:text-white font-['Abhaya_Libre:Bold',sans-serif] text-[16px]"
                      whileHover={{ x: 10 }}
                    >
                      En savoir plus
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                  />
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#f5f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[48px] tracking-[4.8px] uppercase text-[#273a41] mb-4">
              Pourquoi Nous Choisir
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expertise Locale',
                description: 'Une connaissance approfondie du marché ivoirien et africain pour des solutions adaptées.',
              },
              {
                title: 'Innovation Constante',
                description: 'Utilisation des dernières technologies et tendances pour rester à la pointe.',
              },
              {
                title: 'Support Dédié',
                description: 'Un accompagnement personnalisé à chaque étape de votre projet.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-[16px] text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0, 179, 232, 0.2)',
                }}
              >
                <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[24px] text-[#00b3e8] mb-4">
                  {item.title}
                </h3>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#00b3e8] to-[#00c0e8] relative overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="font-['Medula_One:Regular',sans-serif] text-[48px] tracking-[4.8px] uppercase text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Prêt à démarrer votre projet ?
          </motion.h2>
          <motion.p 
            className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis gratuit.
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-block bg-[#34c759] text-white px-12 py-5 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[20px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactez-nous
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
