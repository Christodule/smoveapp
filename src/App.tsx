import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Hero3DEnhanced from './components/Hero3DEnhanced';
import Footer from './components/Footer';
import PortfolioPage from './components/PortfolioPage';
import BlogPageEnhanced from './components/BlogPageEnhanced';
import ServicesHubPage from './components/ServicesHubPage';
import DesignBrandingPage from './components/services/DesignBrandingPage';
import WebDevelopmentPage from './components/services/WebDevelopmentPage';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import ProjectsSection from './components/ProjectsSection';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import CMSDashboard from './components/cms/CMSDashboard';
import APropos from './imports/APropos';
import { Palette, Code, Megaphone, Video, Box, ArrowRight, Calendar, User } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Simplified services for homepage
const servicesData = [
  {
    icon: Palette,
    title: 'Design & Branding',
    description: 'Création d\'identités visuelles uniques et mémorables',
    color: 'from-[#00b3e8] to-[#00c0e8]',
  },
  {
    icon: Code,
    title: 'Développement Web',
    description: 'Sites web et applications modernes et performantes',
    color: 'from-[#34c759] to-[#2da84a]',
  },
  {
    icon: Megaphone,
    title: 'Communication Digitale',
    description: 'Stratégies digitales pour maximiser votre visibilité',
    color: 'from-[#ffc247] to-[#ff9f47]',
  },
  {
    icon: Video,
    title: 'Production Vidéo',
    description: 'Vidéos professionnelles et contenu multimédia',
    color: 'from-[#ff6b6b] to-[#ee5a6f]',
  },
  {
    icon: Box,
    title: 'Création 3D',
    description: 'Modélisation et animations 3D immersives',
    color: 'from-[#a855f7] to-[#9333ea]',
  },
];

// Blog posts for homepage
const blogPosts = [
  {
    id: 1,
    title: 'Création de site web pour SMOVE',
    excerpt: 'SMOVE propose une vision moderne du web africain, tournée vers l\'innovation.',
    author: 'Spencer Tarring',
    date: 'Il y a 4 jours',
    category: 'Développement Web',
    image: 'modern website design',
  },
  {
    id: 2,
    title: 'Communication d\'entreprise pour ECLA BTP',
    excerpt: 'Création de vidéo et affiche publicitaire pour se démarquer.',
    author: 'James Rodd',
    date: 'Il y a 4 jours',
    category: 'Communication',
    image: 'corporate video production',
  },
  {
    id: 3,
    title: 'Création de logo et visuels pour Gobon Sarl',
    excerpt: 'Logo et visuels pour une identité commerciale remarquée.',
    author: 'David Silvester',
    date: 'Il y a 4 jours',
    category: 'Branding',
    image: 'logo design creative',
  },
];

function HomePageContent() {
  return (
    <div className="relative" style={{ position: 'relative' }}>
      {/* Hero Section with 3D Effect */}
      <Hero3DEnhanced />

      {/* Services Section */}
      <motion.section
        id="services"
        className="relative py-32 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-[#00b3e8]/10 text-[#00b3e8] px-6 py-3 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] mb-6"
              whileHover={{ scale: 1.05 }}
            >
              NOS SERVICES
            </motion.div>
            <h2 className="font-['ABeeZee:Regular',sans-serif] text-[48px] md:text-[72px] text-[#273a41] mb-6">
              Ce que nous faisons
            </h2>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-[#38484e] max-w-3xl mx-auto">
              Des solutions digitales complètes pour propulser votre entreprise vers le succès
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className="relative h-full bg-gradient-to-br from-[#f5f9fa] to-white p-8 rounded-[24px] border-2 border-transparent overflow-hidden cursor-pointer"
                  whileHover={{
                    y: -10,
                    borderColor: '#00b3e8',
                    boxShadow: '0 25px 50px rgba(0, 179, 232, 0.2)',
                  }}
                >
                  {/* Background Gradient on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      className={`w-20 h-20 rounded-[16px] bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="text-white" size={36} />
                    </motion.div>

                    <h3 className="font-['Medula_One:Regular',sans-serif] text-[24px] tracking-[2.4px] uppercase text-[#273a41] group-hover:text-white transition-colors mb-4">
                      {service.title}
                    </h3>

                    <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e] group-hover:text-white/90 transition-colors mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <motion.div
                      className="flex items-center gap-2 text-[#00b3e8] group-hover:text-white font-['Abhaya_Libre:Bold',sans-serif] text-[16px]"
                      whileHover={{ x: 5 }}
                    >
                      En savoir plus
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* View All Services Button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="#services-all"
              className="inline-block bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white px-10 py-5 rounded-[20px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir tous nos services
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="relative py-32 bg-gradient-to-b from-[#f5f9fa] to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                className="aspect-square rounded-[24px] overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ImageWithFallback
                  src=""
                  alt="SMOVE Team"
                  query="creative team working office african"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-[16px] shadow-xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="font-['ABeeZee:Regular',sans-serif] text-[48px] text-[#00b3e8]">5+</div>
                <div className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">Ans d'expérience</div>
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-block bg-[#34c759]/10 text-[#34c759] px-6 py-3 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] mb-6"
                whileHover={{ scale: 1.05 }}
              >
                À PROPOS DE NOUS
              </motion.div>

              <h2 className="font-['ABeeZee:Regular',sans-serif] text-[48px] md:text-[64px] text-[#273a41] mb-6 leading-tight">
                Innovation & Excellence Digitale
              </h2>

              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-[#38484e] mb-6 leading-relaxed">
                SMOVE Communication est une agence digitale basée en Côte d'Ivoire, spécialisée dans la création de solutions digitales innovantes. Nous accompagnons les entreprises dans leur transformation digitale avec passion et expertise.
              </p>

              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-[#38484e] mb-8 leading-relaxed">
                Notre équipe de professionnels talentueux combine créativité, technologie et stratégie pour créer des expériences digitales qui marquent les esprits et génèrent des résultats mesurables.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                {[
                  { value: '150+', label: 'Projets' },
                  { value: '50+', label: 'Clients' },
                  { value: '100%', label: 'Satisfaction' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="font-['ABeeZee:Regular',sans-serif] text-[36px] text-[#00b3e8]">
                      {stat.value}
                    </div>
                    <div className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#portfolio"
                className="inline-flex items-center gap-2 bg-[#34c759] text-white px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px]"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir notre équipe
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Portfolio/Projects Section */}
      <motion.section
        id="portfolio"
        className="relative py-32 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block bg-[#ffc247]/10 text-[#ffc247] px-6 py-3 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] mb-6"
              whileHover={{ scale: 1.05 }}
            >
              PORTFOLIO
            </motion.div>
            <h2 className="font-['ABeeZee:Regular',sans-serif] text-[48px] md:text-[72px] text-[#273a41] mb-6">
              Nos derniers projets
            </h2>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-[#38484e] max-w-3xl mx-auto">
              Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs
            </p>
          </motion.div>

          <ProjectsSection />

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#projects"
              className="inline-block bg-gradient-to-r from-[#ffc247] to-[#ff9f47] text-white px-10 py-5 rounded-[20px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir tous nos projets
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        id="blog"
        className="relative py-32 bg-gradient-to-b from-[#f5f9fa] to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block bg-[#a855f7]/10 text-[#a855f7] px-6 py-3 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[14px] mb-6"
              whileHover={{ scale: 1.05 }}
            >
              BLOG
            </motion.div>
            <h2 className="font-['ABeeZee:Regular',sans-serif] text-[48px] md:text-[72px] text-[#273a41] mb-6">
              Derniers articles
            </h2>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-[#38484e] max-w-3xl mx-auto">
              Actualités, conseils et insights sur le digital
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-[24px] overflow-hidden shadow-lg group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="aspect-video overflow-hidden">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                    <ImageWithFallback
                      src=""
                      alt={post.title}
                      query={post.image}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                <div className="p-6">
                  <span className="inline-block bg-[#00b3e8]/10 text-[#00b3e8] px-3 py-1 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[12px] mb-4">
                    {post.category}
                  </span>

                  <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-3 line-clamp-2 group-hover:text-[#00b3e8] transition-colors">
                    {post.title}
                  </h3>

                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#38484e] mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#eef3f5]">
                    <div className="flex items-center gap-2 text-[#9ba1a4]">
                      <User size={16} />
                      <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px]">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#9ba1a4]">
                      <Calendar size={16} />
                      <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px]">
                        {post.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#blog"
              className="inline-block bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white px-10 py-5 rounded-[20px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir tous les articles
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="relative py-32 bg-gradient-to-br from-[#00b3e8] to-[#00c0e8]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background */}
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['ABeeZee:Regular',sans-serif] text-[48px] md:text-[72px] text-white mb-6">
              Travaillons ensemble
            </h2>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-white/90 max-w-2xl mx-auto">
              Vous avez un projet en tête ? Contactez-nous et discutons de la manière dont nous pouvons vous aider à le réaliser.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-[24px] p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none transition-colors font-['Abhaya_Libre:Regular',sans-serif] text-[16px]"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none transition-colors font-['Abhaya_Libre:Regular',sans-serif] text-[16px]"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none transition-colors font-['Abhaya_Libre:Regular',sans-serif] text-[16px]"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
              </div>

              <div>
                <label className="block font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none transition-colors font-['Abhaya_Libre:Regular',sans-serif] text-[16px] resize-none"
                  placeholder="Décrivez votre projet..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white px-8 py-5 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Envoyer le message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const HOME_SECTIONS = new Set(['services', 'about', 'portfolio', 'contact']);

interface SecurityStatePageProps {
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
}

function SecurityStatePage({ title, description, actionHref, actionLabel }: SecurityStatePageProps) {
  return (
    <div className="min-h-screen bg-[#f5f9fa] flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-[20px] shadow-sm border border-[#eef3f5] p-8 text-center">
        <h1 className="font-['Medula_One:Regular',sans-serif] text-[32px] tracking-[2px] uppercase text-[#273a41] mb-4">
          {title}
        </h1>
        <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e] mb-6">
          {description}
        </p>
        <a
          href={actionHref}
          className="inline-flex items-center justify-center bg-[#00b3e8] text-white px-6 py-3 rounded-[12px] font-['Abhaya_Libre:Bold',sans-serif]"
        >
          {actionLabel}
        </a>
      </div>
    </div>
  );
}

function AppContent() {
  const {
    isAuthenticated,
    isAuthReady,
    canAccessCMS,
    cmsEnabled,
    registrationEnabled,
  } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [cmsSection, setCmsSection] = useState('overview');
  const pendingSectionScroll = useRef<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      const isCmsRoute = hash === 'cms-dashboard' || hash.startsWith('cms-');

      if (isCmsRoute && !cmsEnabled) {
        setCurrentPage('cms-unavailable');
        if (window.location.hash !== '#cms-unavailable') {
          window.location.hash = 'cms-unavailable';
        }
        return;
      }

      if (hash === 'register' && !registrationEnabled) {
        setCurrentPage('login');
        if (window.location.hash !== '#login') {
          window.location.hash = 'login';
        }
        return;
      }

      if (isCmsRoute && !isAuthReady) {
        setCurrentPage('auth-loading');
        return;
      }

      if (isCmsRoute && !isAuthenticated) {
        setCurrentPage('login');
        if (window.location.hash !== '#login') {
          window.location.hash = 'login';
        }
        return;
      }

      if (isCmsRoute && !canAccessCMS) {
        setCurrentPage('cms-forbidden');
        if (window.location.hash !== '#cms-forbidden') {
          window.location.hash = 'cms-forbidden';
        }
        return;
      }

      if (HOME_SECTIONS.has(hash)) {
        pendingSectionScroll.current = hash;
        setCurrentPage('home');
        return;
      }

      setCurrentPage(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated, isAuthReady, canAccessCMS, cmsEnabled, registrationEnabled]);

  useEffect(() => {
    if (pendingSectionScroll.current) {
      const sectionId = pendingSectionScroll.current;
      pendingSectionScroll.current = null;

      requestAnimationFrame(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    if (currentPage === 'auth-loading') {
      return (
        <SecurityStatePage
          title="Vérification de session"
          description="Validation de votre session en cours..."
          actionHref="#home"
          actionLabel="Retour à l'accueil"
        />
      );
    }

    // Auth pages
    if (currentPage === 'login') {
      if (!cmsEnabled) {
        return (
          <SecurityStatePage
            title="CMS désactivé"
            description="Le CMS est désactivé dans cet environnement tant qu'un backend d'authentification sécurisé n'est pas configuré."
            actionHref="#home"
            actionLabel="Retour à l'accueil"
          />
        );
      }
      return <LoginPage />;
    }
    if (currentPage === 'register') {
      if (!registrationEnabled) {
        return (
          <SecurityStatePage
            title="Inscription désactivée"
            description="L'inscription publique est désactivée. Seuls les comptes provisionnés par un administrateur peuvent accéder au CMS."
            actionHref="#login"
            actionLabel="Aller à la connexion"
          />
        );
      }
      return <RegisterPage />;
    }

    // CMS pages
    if (currentPage === 'cms-dashboard' || currentPage.startsWith('cms-')) {
      if (!cmsEnabled) {
        return (
          <SecurityStatePage
            title="CMS désactivé"
            description="Le CMS est indisponible dans cet environnement."
            actionHref="#home"
            actionLabel="Retour à l'accueil"
          />
        );
      }
      if (!isAuthReady) {
        return (
          <SecurityStatePage
            title="Vérification de session"
            description="Validation de votre session en cours..."
            actionHref="#home"
            actionLabel="Retour à l'accueil"
          />
        );
      }
      if (!isAuthenticated) {
        return <LoginPage />;
      }
      if (!canAccessCMS) {
        return (
          <SecurityStatePage
            title="Accès refusé"
            description="Votre compte n'a pas les permissions administrateur nécessaires pour accéder au CMS."
            actionHref="#home"
            actionLabel="Retour à l'accueil"
          />
        );
      }
      return <CMSDashboard currentSection={cmsSection} onSectionChange={setCmsSection} />;
    }

    if (currentPage === 'cms-unavailable') {
      return (
        <SecurityStatePage
          title="CMS désactivé"
          description="Le CMS est désactivé dans cet environnement tant qu'un backend d'authentification sécurisé n'est pas configuré."
          actionHref="#home"
          actionLabel="Retour à l'accueil"
        />
      );
    }

    if (currentPage === 'cms-forbidden') {
      return (
        <SecurityStatePage
          title="Accès refusé"
          description="Votre session est valide mais vous n'avez pas les droits administrateur requis."
          actionHref="#home"
          actionLabel="Retour à l'accueil"
        />
      );
    }

    // Check if it's a project detail page
    if (currentPage.startsWith('project-')) {
      const projectId = currentPage.replace('project-', '');
      return <ProjectDetailPage projectId={projectId} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Navigation currentPath="/" />
            <HomePageContent />
          </>
        );
      case 'projects':
        return <ProjectsPage />;
      case 'services-all':
        return <ServicesHubPage />;
      case 'service-design':
        return <DesignBrandingPage />;
      case 'service-web':
        return <WebDevelopmentPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'blog':
        return <BlogPageEnhanced />;
      case 'apropos':
        return (
          <>
            <Navigation currentPath="/apropos" />
            <div className="pt-20">
              <APropos />
            </div>
            <Footer />
          </>
        );
      default:
        return (
          <>
            <Navigation currentPath="/" />
            <HomePageContent />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
      
      {/* Scroll to Top Button - hide on auth/cms pages */}
      {!['login', 'register', 'auth-loading', 'cms-unavailable', 'cms-forbidden'].includes(currentPage) &&
        !currentPage.startsWith('cms-') && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-[#00b3e8] text-white p-4 rounded-full shadow-lg z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, backgroundColor: '#00c0e8' }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}