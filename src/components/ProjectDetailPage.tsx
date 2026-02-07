import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, Check, Quote, ExternalLink } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import { getProjectById } from '../data/projects';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectDetailPageProps {
  projectId: string;
}

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[48px] text-[#273a41] mb-4">Projet non trouvé</h1>
          <a href="#projects" className="text-[#00b3e8] underline">
            Retour aux projets
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects" />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 bg-gradient-to-b from-[#f5f9fa] to-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Background */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ffc247]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 text-[#00b3e8] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] mb-8"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} />
            Retour aux projets
          </motion.a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Category Badge */}
              <motion.div
                className="inline-block bg-[#ffc247] text-white px-4 py-2 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] mb-6"
                whileHover={{ scale: 1.05 }}
              >
                {project.category}
              </motion.div>

              <h1 className="font-['ABeeZee:Regular',sans-serif] text-[48px] md:text-[64px] text-[#273a41] mb-6 leading-tight">
                {project.title}
              </h1>

              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-[#38484e] mb-8 leading-relaxed">
                {project.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-[#9ba1a4] mb-2">
                    <User size={16} />
                    <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px]">
                      Client
                    </span>
                  </div>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-[#273a41]">
                    {project.client}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#9ba1a4] mb-2">
                    <Calendar size={16} />
                    <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px]">
                      Année
                    </span>
                  </div>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-[#273a41]">
                    {project.year}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-[#9ba1a4] mb-4">
                  <Tag size={16} />
                  <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px]">
                    Technologies & Services
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      className="bg-[#f5f9fa] text-[#273a41] px-4 py-2 rounded-full font-['Abhaya_Libre:Regular',sans-serif] text-[14px] border-2 border-transparent hover:border-[#ffc247]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffc247] to-[#ff9f47] text-white px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px]"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Démarrer un projet similaire
                <ExternalLink size={20} />
              </motion.a>
            </motion.div>

            {/* Right: Main Image */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                className="aspect-square rounded-[24px] overflow-hidden shadow-2xl"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ImageWithFallback
                  src=""
                  alt={project.title}
                  query={project.mainImage}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Challenge & Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Challenge */}
            <motion.div
              className="bg-gradient-to-br from-[#ff6b6b]/10 to-[#ee5a6f]/10 p-8 rounded-[24px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-[#ff6b6b] w-12 h-12 rounded-[12px] flex items-center justify-center mb-6">
                <span className="text-white font-['ABeeZee:Regular',sans-serif] text-[24px]">⚡</span>
              </div>
              <h2 className="font-['Medula_One:Regular',sans-serif] text-[28px] tracking-[2.8px] uppercase text-[#273a41] mb-4">
                Le Défi
              </h2>
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e] leading-relaxed">
                {project.challenge}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              className="bg-gradient-to-br from-[#34c759]/10 to-[#2da84a]/10 p-8 rounded-[24px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-[#34c759] w-12 h-12 rounded-[12px] flex items-center justify-center mb-6">
                <span className="text-white font-['ABeeZee:Regular',sans-serif] text-[24px]">💡</span>
              </div>
              <h2 className="font-['Medula_One:Regular',sans-serif] text-[28px] tracking-[2.8px] uppercase text-[#273a41] mb-4">
                La Solution
              </h2>
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e] leading-relaxed">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-[#f5f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-[#273a41] mb-4">
              Galerie du Projet
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-video rounded-[16px] overflow-hidden shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <ImageWithFallback
                  src=""
                  alt={`${project.title} - Image ${index + 1}`}
                  query={image}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-[#273a41] mb-4">
              Résultats Obtenus
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {project.results.map((result, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-[#f5f9fa] p-6 rounded-[16px]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5, backgroundColor: '#ebf9ff' }}
              >
                <div className="bg-[#34c759] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={16} />
                </div>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#273a41] leading-relaxed">
                  {result}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {project.testimonial && (
        <section className="py-20 bg-gradient-to-br from-[#00b3e8] to-[#00c0e8] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }} />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Quote className="text-white/30 mx-auto mb-6" size={64} />
              
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[24px] md:text-[28px] text-white mb-8 leading-relaxed italic">
                "{project.testimonial.text}"
              </p>

              <div className="border-t border-white/20 pt-6">
                <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-white mb-2">
                  {project.testimonial.author}
                </p>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-white/80">
                  {project.testimonial.position}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Projects CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-[#273a41] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Découvrez nos autres projets
          </motion.h2>
          <motion.a
            href="#projects"
            className="inline-block bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white px-10 py-5 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir tous les projets
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
