import { motion } from 'motion/react';
import { Palette, Pen, Layout, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const features = [
  {
    icon: Palette,
    title: 'Identité Visuelle',
    description: 'Création de logos mémorables et d\'identités visuelles cohérentes qui reflètent l\'essence de votre marque.',
  },
  {
    icon: Pen,
    title: 'Design Graphique',
    description: 'Conception de supports visuels percutants : affiches, flyers, cartes de visite, et plus encore.',
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Interfaces utilisateur intuitives et expériences utilisateur optimisées pour vos applications.',
  },
  {
    icon: Sparkles,
    title: 'Motion Design',
    description: 'Animations et vidéos qui donnent vie à votre marque et captivent votre audience.',
  },
];

const process = [
  { step: '01', title: 'Découverte', description: 'Analyse de vos besoins et de votre vision' },
  { step: '02', title: 'Recherche', description: 'Étude de marché et analyse concurrentielle' },
  { step: '03', title: 'Création', description: 'Développement de concepts créatifs' },
  { step: '04', title: 'Révision', description: 'Ajustements selon vos retours' },
  { step: '05', title: 'Livraison', description: 'Fichiers finaux et guide de marque' },
];

const portfolio = [
  { title: 'Gobon Sarl', category: 'Logo & Identité', image: 'logo design corporate' },
  { title: 'ECLA BTP', category: 'Branding Complet', image: 'construction branding' },
  { title: 'StartUp Tech', category: 'UI/UX Design', image: 'modern tech interface' },
  { title: 'Restaurant Abidjan', category: 'Menu & Packaging', image: 'restaurant menu design' },
];

export default function DesignBrandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/services" />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 bg-gradient-to-br from-[#f5f9fa] via-white to-[#ebf9ff] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 3D Background Elements */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00b3e8]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block bg-[#00b3e8] text-white px-4 py-2 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] mb-6"
                whileHover={{ scale: 1.05 }}
              >
                Design & Branding
              </motion.div>
              <h1 className="font-['ABeeZee:Regular',sans-serif] text-[56px] md:text-[72px] text-[#273a41] mb-6 leading-tight">
                Créez une identité visuelle <span className="text-[#00b3e8]">inoubliable</span>
              </h1>
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-[#38484e] mb-8 leading-relaxed">
                Transformez votre vision en une marque forte et cohérente qui résonne avec votre audience. Notre équipe de designers crée des identités visuelles qui marquent les esprits.
              </p>
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
                  href="#portfolio"
                  className="bg-white border-2 border-[#00b3e8] text-[#00b3e8] px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
                  whileHover={{ scale: 1.05, backgroundColor: '#ebf9ff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir nos réalisations
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                className="aspect-square rounded-[24px] overflow-hidden shadow-2xl"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 10,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ImageWithFallback
                  src=""
                  alt="Design & Branding"
                  query="creative design workspace colorful"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[16px] shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="font-['ABeeZee:Regular',sans-serif] text-[36px] text-[#00b3e8]">150+</div>
                <div className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">Projets réalisés</div>
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
              Nos Services
            </h2>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-[#38484e] max-w-2xl mx-auto">
              Une gamme complète de services de design pour tous vos besoins visuels
            </p>
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
                  className="bg-[#f5f9fa] p-8 rounded-[16px] h-full relative overflow-hidden"
                  whileHover={{ 
                    y: -10,
                    backgroundColor: '#ebf9ff',
                    boxShadow: '0 20px 40px rgba(0, 179, 232, 0.2)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#00b3e8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <motion.div
                    className="bg-[#00b3e8] w-16 h-16 rounded-[12px] flex items-center justify-center mb-6 relative z-10"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="text-white" size={32} />
                  </motion.div>
                  <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[24px] text-[#273a41] mb-3 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e] leading-relaxed relative z-10">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#f5f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[48px] tracking-[4.8px] uppercase text-[#273a41] mb-4">
              Notre Processus
            </h2>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-[#38484e] max-w-2xl mx-auto">
              Une méthode éprouvée pour des résultats exceptionnels
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[#00b3e8]/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative"
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: '0 20px 40px rgba(0, 179, 232, 0.3)',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#00b3e8] to-[#00c0e8] rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    />
                    <span className="font-['ABeeZee:Regular',sans-serif] text-[24px] text-white relative z-10">
                      {item.step}
                    </span>
                  </motion.div>
                  <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#38484e]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[48px] tracking-[4.8px] uppercase text-[#273a41] mb-4">
              Nos Réalisations
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.map((item, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="relative aspect-video rounded-[16px] overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <ImageWithFallback
                    src=""
                    alt={item.title}
                    query={item.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[24px] text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-white/80">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#00b3e8] to-[#00c0e8] relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
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
            Prêt à démarrer ?
          </motion.h2>
          <motion.p 
            className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé.
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
