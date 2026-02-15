import { Home, Info, Briefcase, FolderOpen, BookOpen, Mail, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import imgTelegramCloudDocument from "figma:asset/9152e642280f0d22dbf10b789d9b260fdd8949da.png";
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentPath?: string;
}

export default function Navigation({ currentPath = '/' }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, registrationEnabled, cmsEnabled, canAccessCMS } = useAuth();
  const currentHash = window.location.hash.slice(1) || 'home';
  const showAuthActions = cmsEnabled && !isAuthenticated;
  const showDashboardAction = cmsEnabled && canAccessCMS;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, sectionId?: string) => {
    e.preventDefault();

    const hash = window.location.hash.slice(1);
    const isHomeContext = hash === '' || hash === 'home' || ['services', 'about', 'portfolio', 'contact'].includes(hash);

    if (sectionId) {
      if (isHomeContext) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, '', `#${sectionId}`);
          setIsMobileMenuOpen(false);
          return;
        }
      }

      window.location.hash = sectionId;
      setIsMobileMenuOpen(false);
      return;
    }

    window.location.hash = path;
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Accueil', path: 'home', icon: Home },
    { name: 'Services', path: 'home', sectionId: 'services', icon: Briefcase },
    { name: 'À Propos', path: 'home', sectionId: 'about', icon: Info },
    { name: 'Portfolio', path: 'home', sectionId: 'portfolio', icon: FolderOpen },
    { name: 'Blog', path: 'blog', icon: BookOpen },
    { name: 'Contact', path: 'home', sectionId: 'contact', icon: Mail },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center" onClick={(e) => handleNavClick(e, 'home')}>
            <img 
              src={imgTelegramCloudDocument} 
              alt="SMOVE Communication" 
              className="h-12 w-auto rounded-full"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className={`font-['Abhaya_Libre:Regular',sans-serif] text-[16px] transition-colors ${
                currentPath === '/' ? 'text-[#00b3e8]' : 'text-[#273a41] hover:text-[#00b3e8]'
              }`}
            >
              Accueil
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'home', 'services')}
              className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#273a41] hover:text-[#00b3e8] transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'home', 'about')}
              className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#273a41] hover:text-[#00b3e8] transition-colors"
            >
              À Propos
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleNavClick(e, 'home', 'portfolio')}
              className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#273a41] hover:text-[#00b3e8] transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#blog"
              onClick={(e) => handleNavClick(e, 'blog')}
              className={`font-['Abhaya_Libre:Regular',sans-serif] text-[16px] transition-colors ${
                currentPath === '/blog' ? 'text-[#00b3e8]' : 'text-[#273a41] hover:text-[#00b3e8]'
              }`}
            >
              Blog
            </a>

            {/* Auth / CMS actions */}
            {showAuthActions ? (
              <>
                <motion.a
                  href="#login"
                  className="flex items-center gap-2 text-[#00b3e8] px-4 py-2 rounded-[12px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] hover:bg-[#00b3e8]/10 transition-colors border-2 border-[#00b3e8]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn size={18} />
                  Se connecter
                </motion.a>
                {registrationEnabled && (
                  <motion.a
                    href="#register"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white px-4 py-2 rounded-[12px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UserPlus size={18} />
                    S'inscrire
                  </motion.a>
                )}
              </>
            ) : isAuthenticated ? (
              <>
                {/* User Avatar */}
                <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f9fa] rounded-[12px]">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#00b3e8] to-[#34c759] rounded-full flex items-center justify-center">
                    <span className="text-white font-['Abhaya_Libre:Bold',sans-serif] text-[14px]">
                      {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                    </span>
                  </div>
                  <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-[#273a41]">
                    {user?.name?.split(' ')[0] ?? 'Utilisateur'}
                  </span>
                </div>

                {showDashboardAction && (
                  <motion.a
                    href="#cms-dashboard"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white px-5 py-3 rounded-[12px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </motion.a>
                )}
              </>
            ) : null}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'home', 'contact')}
              className="bg-[#34c759] text-white px-6 py-3 rounded-[12px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] hover:bg-[#2da84a] transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-black p-2"
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
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#00b3e8] border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const targetHash = item.sectionId ?? item.path;
              return (
                <a
                  key={`${item.path}-${item.sectionId ?? 'page'}`}
                  href={`#${targetHash}`}
                  className={`flex items-center gap-3 text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-colors ${
                    currentHash === targetHash ? 'bg-white/20 font-bold' : ''
                  }`}
                  onClick={(e) => handleNavClick(e, item.path, item.sectionId)}
                >
                  <Icon size={20} />
                  <span className="font-['Abhaya_Libre:Regular',sans-serif]">{item.name}</span>
                </a>
              );
            })}

            {/* Mobile Auth Buttons */}
            {showAuthActions ? (
              <>
                <a
                  href="#login"
                  className="flex items-center gap-3 text-white py-3 px-3 rounded-lg bg-white/10 border-2 border-white/30 font-['Abhaya_Libre:Bold',sans-serif]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={20} />
                  <span>Se connecter</span>
                </a>
                {registrationEnabled && (
                  <a
                    href="#register"
                    className="flex items-center gap-3 text-white py-3 px-3 rounded-lg bg-white/20 border-2 border-white/30 font-['Abhaya_Libre:Bold',sans-serif]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus size={20} />
                    <span>S'inscrire</span>
                  </a>
                )}
              </>
            ) : showDashboardAction ? (
              <a
                href="#cms-dashboard"
                className="flex items-center gap-3 text-white py-3 px-3 rounded-lg bg-[#a855f7] border-2 border-[#a855f7] font-['Abhaya_Libre:Bold',sans-serif]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </a>
            ) : null}

            <a
              href="#contact"
              className="block bg-[#34c759] text-white text-center py-3 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] mt-4"
              onClick={(e) => handleNavClick(e, 'home', 'contact')}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}