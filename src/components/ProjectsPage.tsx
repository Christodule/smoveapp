import { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, Search, ArrowRight, ExternalLink } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import { projects, projectCategories } from '../data/projects';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects" />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 bg-gradient-to-b from-[#f5f9fa] to-white relative overflow-hidden"
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
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ffc247]/10 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-[#ffc247]/10 text-[#ffc247] px-6 py-3 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] mb-6"
              whileHover={{ scale: 1.05 }}
            >
              PORTFOLIO
            </motion.div>
            <h1 className="font-['ABeeZee:Regular',sans-serif] text-[64px] md:text-[96px] text-[#273a41] mb-6">
              Nos Projets
            </h1>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[24px] text-[#38484e] max-w-3xl mx-auto mb-8">
              Découvrez nos réalisations et comment nous avons aidé nos clients à atteindre leurs objectifs
            </p>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { value: `${projects.length}+`, label: 'Projets réalisés' },
                { value: '50+', label: 'Clients satisfaits' },
                { value: '8', label: 'Catégories' },
                { value: '100%', label: 'Taux de réussite' },
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

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#ffc247] to-[#ff9f47] rounded-[20px] blur opacity-25 group-hover:opacity-50 transition duration-300"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-white rounded-[20px] px-6 py-4 flex items-center gap-4 shadow-xl">
                <Search className="text-[#ffc247]" size={24} />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-[#273a41] placeholder:text-[#9ba1a4]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-[#eef3f5] sticky top-20 bg-white/95 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="text-[#273a41]" size={20} />
            <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41]">
              Filtrer par catégorie:
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {projectCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] transition-all relative overflow-hidden ${
                  selectedCategory === category
                    ? 'bg-[#ffc247] text-white shadow-lg'
                    : 'bg-white border-2 border-[#eef3f5] text-[#273a41] hover:border-[#ffc247]'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{category}</span>
                {selectedCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#ffc247] to-[#ff9f47]"
                    layoutId="activeCategory"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">
              {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onClick={() => {
                    window.location.hash = `project-${project.id}`;
                  }}
                >
                  <motion.div
                    className="bg-white rounded-[24px] overflow-hidden shadow-lg h-full flex flex-col"
                    whileHover={{
                      y: -15,
                      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1, rotateY: 5 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ImageWithFallback
                          src=""
                          alt={project.title}
                          query={project.mainImage}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <motion.span
                            className="text-white font-['Abhaya_Libre:Bold',sans-serif] text-[16px]"
                            initial={{ x: -20, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                          >
                            Voir le détail
                          </motion.span>
                          <ExternalLink className="text-white" size={20} />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full">
                        <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[12px] text-[#ffc247]">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute top-4 left-4 bg-[#34c759] px-3 py-1 rounded-full">
                        <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[12px] text-white">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#ffc247]" />
                        <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">
                          {project.client}
                        </span>
                      </div>

                      <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[24px] text-[#273a41] mb-3 line-clamp-2 group-hover:text-[#ffc247] transition-colors">
                        {project.title}
                      </h3>

                      <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#38484e] mb-4 line-clamp-3 flex-1">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="bg-[#f5f9fa] text-[#38484e] px-2 py-1 rounded font-['Abhaya_Libre:Regular',sans-serif] text-[12px]"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="bg-[#f5f9fa] text-[#9ba1a4] px-2 py-1 rounded font-['Abhaya_Libre:Regular',sans-serif] text-[12px]">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <motion.div
                        className="flex items-center gap-2 text-[#ffc247] font-['Abhaya_Libre:Bold',sans-serif] text-[14px] pt-4 border-t border-[#eef3f5]"
                        whileHover={{ x: 5 }}
                      >
                        Découvrir le projet
                        <ArrowRight size={16} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-[#9ba1a4] mb-4">
                <Search size={64} className="mx-auto mb-4" />
              </div>
              <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[24px] text-[#273a41] mb-2">
                Aucun projet trouvé
              </h3>
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#9ba1a4]">
                Essayez de modifier vos critères de recherche
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#ffc247] to-[#ff9f47] relative overflow-hidden">
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
            Votre projet, notre mission
          </motion.h2>
          <motion.p 
            className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Prêt à créer quelque chose d'exceptionnel ensemble ?
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-block bg-white text-[#ffc247] px-12 py-5 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[20px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Démarrer un projet
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
