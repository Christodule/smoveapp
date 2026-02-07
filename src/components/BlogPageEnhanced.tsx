import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Clock, Tag, Search } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';

const blogPosts = [
  {
    id: 1,
    title: 'Création de site web pour SMOVE',
    excerpt: '"SMOVE propose une vision moderne du web africain, tournée vers l\'innovation et la qualité."',
    author: 'Spencer Tarring',
    date: 'Il y a 4 jours',
    category: 'Développement Web',
    image: 'modern website design workspace',
    readTime: '5 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Communication d\'entreprise pour ECLA BTP',
    excerpt: 'Création de vidéo et affiche publicitaire pour mieux se démarquer sur la scène nationale.',
    author: 'James Rodd',
    date: 'Il y a 4 jours',
    category: 'Communication',
    image: 'corporate video production',
    readTime: '4 min',
  },
  {
    id: 3,
    title: 'Création de logo et visuels pour Gobon Sarl',
    excerpt: 'Création de logo et visuels pour une identité commerciale plus remarquée.',
    author: 'David Silvester',
    date: 'Il y a 4 jours',
    category: 'Branding',
    image: 'logo design creative',
    readTime: '3 min',
  },
  {
    id: 4,
    title: 'Stratégie digitale pour PME ivoiriennes',
    excerpt: 'Comment développer une présence en ligne efficace avec un budget limité.',
    author: 'Jody Taylor',
    date: 'Il y a 1 semaine',
    category: 'Stratégie',
    image: 'digital strategy meeting',
    readTime: '7 min',
  },
  {
    id: 5,
    title: 'Animation 3D pour publicité moderne',
    excerpt: 'Les tendances actuelles en matière d\'animation 3D pour les campagnes publicitaires.',
    author: 'Sanjay Jadhav',
    date: 'Il y a 1 semaine',
    category: '3D & Animation',
    image: '3d animation colorful',
    readTime: '6 min',
  },
  {
    id: 6,
    title: 'Optimisation SEO pour le marché africain',
    excerpt: 'Techniques et stratégies SEO adaptées aux marchés émergents africains.',
    author: 'Spencer Tarring',
    date: 'Il y a 2 semaines',
    category: 'Marketing Digital',
    image: 'seo optimization analytics',
    readTime: '8 min',
  },
];

const categories = [
  'Tous',
  'Développement Web',
  'Communication',
  'Branding',
  'Stratégie',
  '3D & Animation',
  'Marketing Digital',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function BlogPageEnhanced() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/blog" />
      
      {/* Hero Section with 3D effect */}
      <motion.section 
        className="pt-32 pb-16 bg-gradient-to-b from-[#f5f9fa] to-white overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 3D Floating elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-[#00b3e8]/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#34c759]/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="font-['ABeeZee:Regular',sans-serif] text-[64px] md:text-[96px] text-[#273a41] mb-4"
              animate={{
                backgroundImage: [
                  'linear-gradient(to right, #273a41, #273a41)',
                  'linear-gradient(to right, #00b3e8, #273a41)',
                  'linear-gradient(to right, #273a41, #273a41)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Blog
            </motion.h1>
            <motion.p 
              className="font-['Abhaya_Libre:Regular',sans-serif] text-[24px] text-[#38484e] max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Actualités, conseils et insights sur le digital et la communication
            </motion.p>
          </motion.div>

          {/* Search Bar with 3D effect */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#00b3e8] to-[#34c759] rounded-[20px] blur opacity-25 group-hover:opacity-50 transition duration-300"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-white rounded-[20px] px-6 py-4 flex items-center gap-4 shadow-xl">
                <Search className="text-[#00b3e8]" size={24} />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-[#273a41] placeholder:text-[#9ba1a4]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Filter with 3D buttons */}
      <section className="py-8 border-b border-[#eef3f5] sticky top-20 bg-white/95 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] transition-all relative overflow-hidden group ${
                  selectedCategory === category
                    ? 'bg-[#00b3e8] text-white shadow-lg'
                    : 'bg-white border-2 border-[#eef3f5] text-[#273a41] hover:border-[#00b3e8]'
                }`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: '0 10px 25px rgba(0, 179, 232, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{category}</span>
                {selectedCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00b3e8] to-[#00c0e8]"
                    layoutId="activeCategory"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post with 3D card */}
      {filteredPosts.find(post => post.featured) && (
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ rotateX: 20, opacity: 0 }}
              whileInView={{ rotateX: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ perspective: 1000 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-[#00b3e8] to-[#00c0e8] rounded-[24px] overflow-hidden shadow-2xl relative"
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 25px 50px rgba(0, 179, 232, 0.4)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    style={{
                      backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                      backgroundSize: '50px 50px',
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12 relative z-10">
                  <motion.div 
                    className="order-2 lg:order-1"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="inline-block bg-[#34c759] text-white px-4 py-2 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[12px] mb-4"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      ✨ ARTICLE VEDETTE
                    </motion.div>
                    <h2 className="font-['ABeeZee:Regular',sans-serif] text-[36px] md:text-[48px] text-white mb-4">
                      {filteredPosts.find(post => post.featured)?.title}
                    </h2>
                    <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-white/90 mb-6">
                      {filteredPosts.find(post => post.featured)?.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-white/80 mb-8">
                      <div className="flex items-center gap-2">
                        <User size={18} />
                        <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px]">
                          {filteredPosts.find(post => post.featured)?.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px]">
                          {filteredPosts.find(post => post.featured)?.date}
                        </span>
                      </div>
                    </div>
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-2 bg-white text-[#00b3e8] px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px]"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Lire l'article
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </motion.a>
                  </motion.div>
                  <motion.div 
                    className="order-1 lg:order-2"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div 
                      className="aspect-video rounded-[16px] overflow-hidden shadow-xl"
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <ImageWithFallback
                        src=""
                        alt={filteredPosts.find(post => post.featured)?.title || ''}
                        query={filteredPosts.find(post => post.featured)?.image || ''}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid with stagger animation */}
      <section className="py-16 bg-[#f5f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-[#273a41] mb-4">
              {selectedCategory === 'Tous' ? 'Derniers Articles' : selectedCategory}
            </h2>
            <motion.div 
              className="h-1 w-24 bg-[#00b3e8]"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredPosts.filter(post => !post.featured).map((post, index) => (
              <motion.article 
                key={post.id}
                variants={itemVariants}
                className="bg-white rounded-[16px] overflow-hidden shadow-lg group cursor-pointer"
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src=""
                      alt={post.title}
                      query={post.image}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Clock size={14} className="text-[#00b3e8]" />
                    <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#273a41]">
                      {post.readTime}
                    </span>
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.span 
                      className="inline-flex items-center gap-1 bg-[#ebf9ff] text-[#00b3e8] px-3 py-1 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[12px]"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Tag size={12} />
                      {post.category}
                    </motion.span>
                  </div>
                  <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-3 line-clamp-2 group-hover:text-[#00b3e8] transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#38484e] mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#eef3f5]">
                    <div className="flex items-center gap-2 text-[#9ba1a4]">
                      <User size={16} />
                      <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px]">{post.author}</span>
                    </div>
                    <motion.div
                      className="inline-flex items-center gap-1 text-[#00b3e8] font-['Abhaya_Libre:Bold',sans-serif] text-[14px]"
                      whileHover={{ gap: 8 }}
                    >
                      Lire plus
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-[#9ba1a4]">
                Aucun article trouvé pour cette catégorie
              </p>
            </motion.div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="bg-[#00b3e8] text-white px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-[#00c0e8]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Charger plus d'articles</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section with 3D card */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="relative"
            initial={{ rotateX: 20, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="bg-gradient-to-br from-[#00b3e8] to-[#00c0e8] rounded-[24px] p-8 md:p-12 text-center relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 30px 60px rgba(0, 179, 232, 0.3)',
              }}
            >
              {/* Animated particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}

              <motion.h2 
                className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-white mb-4 relative z-10"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                Newsletter
              </motion.h2>
              <motion.p 
                className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-white/90 mb-8 relative z-10"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Recevez nos derniers articles et conseils directement dans votre boîte mail
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto relative z-10"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-4 rounded-[15px] text-[#273a41] placeholder:text-[#9ba1a4] focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
                <motion.button 
                  className="bg-[#34c759] text-white px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] whitespace-nowrap"
                  whileHover={{ scale: 1.05, backgroundColor: '#2da84a' }}
                  whileTap={{ scale: 0.95 }}
                >
                  S'abonner
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
