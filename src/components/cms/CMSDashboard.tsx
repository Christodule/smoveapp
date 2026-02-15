import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Image as ImageIcon, 
  Users,
  TrendingUp,
  Eye,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Settings,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { projects } from '../../data/projects';
import { getBlogPosts } from '../../data/blog';
import { getMediaFiles } from '../../data/media';

interface CMSDashboardProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export default function CMSDashboard({ currentSection, onSectionChange }: CMSDashboardProps) {
  const { user, logout, canAccessCMS } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    {
      label: 'Total Projets',
      value: projects.length,
      icon: FolderOpen,
      color: 'from-[#00b3e8] to-[#00c0e8]',
      change: '+12%',
    },
    {
      label: 'Articles Blog',
      value: getBlogPosts().length,
      icon: FileText,
      color: 'from-[#a855f7] to-[#9333ea]',
      change: '+8%',
    },
    {
      label: 'Fichiers Média',
      value: getMediaFiles().length,
      icon: ImageIcon,
      color: 'from-[#ffc247] to-[#ff9f47]',
      change: '+15%',
    },
    {
      label: 'Vues Totales',
      value: '12.5k',
      icon: Eye,
      color: 'from-[#34c759] to-[#2da84a]',
      change: '+23%',
    },
  ];

  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
    { id: 'projects', label: 'Projets', icon: FolderOpen },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'media', label: 'Médiathèque', icon: ImageIcon },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const recentActivity = [
    { action: 'Nouveau projet ajouté', item: 'SMOVE Platform', time: 'Il y a 2h', type: 'project' },
    { action: 'Article publié', item: 'Création site web', time: 'Il y a 5h', type: 'blog' },
    { action: 'Image uploadée', item: 'hero-banner.jpg', time: 'Il y a 1j', type: 'media' },
    { action: 'Projet modifié', item: 'ECLA BTP', time: 'Il y a 2j', type: 'project' },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.hash = 'login';
  };

  if (!canAccessCMS) {
    return (
      <div className="min-h-screen bg-[#f5f9fa] flex items-center justify-center px-6">
        <div className="max-w-xl w-full bg-white rounded-[20px] shadow-sm border border-[#eef3f5] p-8 text-center">
          <h1 className="font-['Medula_One:Regular',sans-serif] text-[32px] tracking-[2px] uppercase text-[#273a41] mb-4">
            Accès refusé
          </h1>
          <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e] mb-6">
            Seuls les comptes administrateurs peuvent accéder au CMS.
          </p>
          <a
            href="#home"
            className="inline-flex items-center justify-center bg-[#00b3e8] text-white px-6 py-3 rounded-[12px] font-['Abhaya_Libre:Bold',sans-serif]"
          >
            Retour au site
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f9fa] flex">
      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#eef3f5] flex items-center justify-between">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-[#00b3e8] to-[#34c759] rounded-[10px] flex items-center justify-center">
                <span className="text-white font-['ABeeZee:Regular',sans-serif] text-[20px]">S</span>
              </div>
              <div>
                <h2 className="font-['ABeeZee:Regular',sans-serif] text-[18px] text-[#273a41]">
                  SMOVE
                </h2>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4]">
                  CMS Admin
                </p>
              </div>
            </motion.div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#f5f9fa] rounded-[8px] transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-[#eef3f5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#00b3e8] to-[#34c759] rounded-full flex items-center justify-center">
              <span className="text-white font-['Abhaya_Libre:Bold',sans-serif] text-[16px]">
                {user?.name?.charAt(0) ?? 'A'}
              </span>
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 min-w-0"
              >
                <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-[#273a41] truncate">
                  {user?.name}
                </p>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4] truncate">
                  {user?.email}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all ${
                currentSection === item.id
                  ? 'bg-[#00b3e8] text-white'
                  : 'text-[#273a41] hover:bg-[#f5f9fa]'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={20} />
              {sidebarOpen && (
                <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px]">
                  {item.label}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#eef3f5]">
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-red-500 hover:bg-red-50 transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            {sidebarOpen && (
              <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px]">
                Déconnexion
              </span>
            )}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b border-[#eef3f5] px-8 py-6 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-['Medula_One:Regular',sans-serif] text-[28px] tracking-[2.8px] uppercase text-[#273a41]">
                {menuItems.find(m => m.id === currentSection)?.label || 'Dashboard'}
              </h1>
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4] mt-1">
                Bienvenue, {user?.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#home"
                className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4] hover:text-[#273a41]"
              >
                Voir le site →
              </a>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {currentSection === 'overview' && (
          <div className="p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-[20px] p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-[12px] bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <span className="text-[#34c759] font-['Abhaya_Libre:Bold',sans-serif] text-[14px]">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[32px] text-[#273a41] mb-1">
                    {stat.value}
                  </h3>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <motion.button
                onClick={() => onSectionChange('projects')}
                className="bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white p-6 rounded-[20px] flex items-center justify-between group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-left">
                  <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[18px] mb-1">
                    Nouveau Projet
                  </p>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/80">
                    Ajouter un projet
                  </p>
                </div>
                <Plus className="group-hover:rotate-90 transition-transform" size={32} />
              </motion.button>

              <motion.button
                onClick={() => onSectionChange('blog')}
                className="bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white p-6 rounded-[20px] flex items-center justify-between group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-left">
                  <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[18px] mb-1">
                    Nouvel Article
                  </p>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/80">
                    Rédiger un article
                  </p>
                </div>
                <Plus className="group-hover:rotate-90 transition-transform" size={32} />
              </motion.button>

              <motion.button
                onClick={() => onSectionChange('media')}
                className="bg-gradient-to-r from-[#ffc247] to-[#ff9f47] text-white p-6 rounded-[20px] flex items-center justify-between group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-left">
                  <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[18px] mb-1">
                    Upload Média
                  </p>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/80">
                    Ajouter des fichiers
                  </p>
                </div>
                <Plus className="group-hover:rotate-90 transition-transform" size={32} />
              </motion.button>
            </div>

            {/* Recent Activity */}
            <motion.div
              className="bg-white rounded-[20px] p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-6">
                Activité Récente
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-[12px] hover:bg-[#f5f9fa] transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'project' ? 'bg-[#00b3e8]/10 text-[#00b3e8]' :
                      activity.type === 'blog' ? 'bg-[#a855f7]/10 text-[#a855f7]' :
                      'bg-[#ffc247]/10 text-[#ffc247]'
                    }`}>
                      {activity.type === 'project' ? <FolderOpen size={20} /> :
                       activity.type === 'blog' ? <FileText size={20} /> :
                       <ImageIcon size={20} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-[#273a41]">
                        {activity.action}
                      </p>
                      <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4]">
                        {activity.item}
                      </p>
                    </div>
                    <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4]">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
