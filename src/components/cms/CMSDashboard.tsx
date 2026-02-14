import { motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle,
  Eye,
  FileText,
  Filter,
  FolderOpen,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { projects } from '../../data/projects';
import { BlogPost, deleteBlogPost, getBlogPosts, saveBlogPost } from '../../data/blog';
import { MediaFile, deleteMediaFile, getMediaFiles, uploadMediaFile } from '../../data/media';

interface CMSDashboardProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

type BlogStatusFilter = 'all' | 'published' | 'draft';
type FeedbackType = 'success' | 'error';

interface DashboardFeedback {
  type: FeedbackType;
  message: string;
}

interface BlogFormState {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
  status: 'published' | 'draft';
  tags: string;
}

interface CMSSettingsState {
  siteName: string;
  contactEmail: string;
  heroBaseline: string;
  postsPerPage: string;
  autoPublish: boolean;
}

const SETTINGS_STORAGE_KEY = 'smove_cms_settings';

const emptyBlogForm: BlogFormState = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  authorRole: '',
  category: '',
  readTime: '5 min',
  status: 'draft',
  tags: '',
};

const defaultSettings: CMSSettingsState = {
  siteName: 'SMOVE Communication',
  contactEmail: 'contact@smove.com',
  heroBaseline: 'Communication Digitale & Innovation',
  postsPerPage: '6',
  autoPublish: false,
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function formatDate(dateValue: string): string {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return 'Date inconnue';
  }
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatRelativeTime(dateValue: string): string {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return 'Récemment';
  }

  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    return "À l'instant";
  }
  if (diffHours < 24) {
    return `Il y a ${diffHours}h`;
  }
  if (diffDays < 7) {
    return `Il y a ${diffDays}j`;
  }
  return formatDate(dateValue);
}

function formatFileSize(size: number): string {
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function detectMediaType(file: File): 'image' | 'video' | 'document' {
  if (file.type.startsWith('image/')) {
    return 'image';
  }
  if (file.type.startsWith('video/')) {
    return 'video';
  }
  return 'document';
}

export default function CMSDashboard({ currentSection, onSectionChange }: CMSDashboardProps) {
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [feedback, setFeedback] = useState<DashboardFeedback | null>(null);

  const [projectQuery, setProjectQuery] = useState('');
  const [projectCategory, setProjectCategory] = useState('Tous');

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogQuery, setBlogQuery] = useState('');
  const [blogStatusFilter, setBlogStatusFilter] = useState<BlogStatusFilter>('all');
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<BlogFormState>(emptyBlogForm);

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [mediaQuery, setMediaQuery] = useState('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video' | 'document'>('all');
  const [isUploading, setIsUploading] = useState(false);

  const [settingsState, setSettingsState] = useState<CMSSettingsState>(defaultSettings);

  useEffect(() => {
    setBlogPosts(getBlogPosts());
    setMediaFiles(getMediaFiles());

    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!storedSettings) {
      return;
    }

    try {
      const parsed = JSON.parse(storedSettings) as Partial<CMSSettingsState>;
      setSettingsState({
        ...defaultSettings,
        ...parsed,
      });
    } catch {
      setSettingsState(defaultSettings);
    }
  }, []);

  useEffect(() => {
    if (!feedback) {
      return;
    }
    const timeout = window.setTimeout(() => setFeedback(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const menuItems = [
    { id: 'overview', label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: 'projects', label: 'Projets', icon: FolderOpen },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'media', label: 'Mediatheque', icon: ImageIcon },
    { id: 'settings', label: 'Parametres', icon: Settings },
  ];

  const projectCategories = useMemo(() => {
    const categories = Array.from(new Set(projects.map((project) => project.category)));
    return ['Tous', ...categories];
  }, []);

  const filteredProjects = useMemo(() => {
    const query = projectQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = projectCategory === 'Tous' || project.category === projectCategory;
      const matchesQuery =
        query.length === 0 ||
        project.title.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [projectCategory, projectQuery]);

  const filteredBlogPosts = useMemo(() => {
    const query = blogQuery.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesStatus = blogStatusFilter === 'all' || post.status === blogStatusFilter;
      const matchesQuery =
        query.length === 0 ||
        post.title.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesStatus && matchesQuery;
    });
  }, [blogPosts, blogQuery, blogStatusFilter]);

  const filteredMediaFiles = useMemo(() => {
    const query = mediaQuery.trim().toLowerCase();
    return mediaFiles.filter((file) => {
      const matchesType = mediaTypeFilter === 'all' || file.type === mediaTypeFilter;
      const matchesQuery =
        query.length === 0 ||
        file.name.toLowerCase().includes(query) ||
        file.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesType && matchesQuery;
    });
  }, [mediaFiles, mediaQuery, mediaTypeFilter]);

  const stats = useMemo(
    () => [
      {
        label: 'Projets',
        value: projects.length,
        icon: FolderOpen,
        color: 'from-[#00b3e8] to-[#00c0e8]',
        change: `${filteredProjects.length} visibles`,
      },
      {
        label: 'Articles Blog',
        value: blogPosts.length,
        icon: FileText,
        color: 'from-[#a855f7] to-[#9333ea]',
        change: `${blogPosts.filter((post) => post.status === 'draft').length} brouillons`,
      },
      {
        label: 'Fichiers Media',
        value: mediaFiles.length,
        icon: ImageIcon,
        color: 'from-[#ffc247] to-[#ff9f47]',
        change: `${mediaFiles.filter((file) => file.type === 'image').length} images`,
      },
      {
        label: 'Articles Publies',
        value: blogPosts.filter((post) => post.status === 'published').length,
        icon: Eye,
        color: 'from-[#34c759] to-[#2da84a]',
        change: 'Statut en direct',
      },
    ],
    [blogPosts, filteredProjects.length, mediaFiles],
  );

  const recentActivity = useMemo(() => {
    const activity = [];

    const latestBlog = [...blogPosts].sort(
      (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
    )[0];

    if (latestBlog) {
      activity.push({
        id: `blog-${latestBlog.id}`,
        action: latestBlog.status === 'published' ? 'Article publie' : 'Brouillon mis a jour',
        item: latestBlog.title,
        time: formatRelativeTime(latestBlog.publishedDate),
        type: 'blog' as const,
      });
    }

    const latestMedia = [...mediaFiles].sort(
      (a, b) => new Date(b.uploadedDate).getTime() - new Date(a.uploadedDate).getTime(),
    )[0];

    if (latestMedia) {
      activity.push({
        id: `media-${latestMedia.id}`,
        action: 'Media ajoute',
        item: latestMedia.name,
        time: formatRelativeTime(latestMedia.uploadedDate),
        type: 'media' as const,
      });
    }

    activity.push({
      id: 'project-sync',
      action: 'Portfolio synchronise',
      item: `${projects.length} projets disponibles`,
      time: 'A l ouverture',
      type: 'project' as const,
    });

    return activity;
  }, [blogPosts, mediaFiles]);

  const pushFeedback = (type: FeedbackType, message: string) => {
    setFeedback({ type, message });
  };

  const handleLogout = () => {
    logout();
    window.location.hash = 'login';
  };

  const openNewBlogForm = () => {
    setEditingBlogId(null);
    setBlogForm({
      ...emptyBlogForm,
      author: user?.name || '',
      authorRole: user?.role === 'admin' ? 'Administrateur' : 'Editeur',
    });
    setIsBlogFormOpen(true);
  };

  const openEditBlogForm = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      authorRole: post.authorRole,
      category: post.category,
      readTime: post.readTime,
      status: post.status,
      tags: post.tags.join(', '),
    });
    setIsBlogFormOpen(true);
  };

  const handleBlogSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!blogForm.title.trim() || !blogForm.excerpt.trim() || !blogForm.content.trim()) {
      pushFeedback('error', "Titre, extrait et contenu sont obligatoires.");
      return;
    }

    const existingPost = editingBlogId ? blogPosts.find((post) => post.id === editingBlogId) : undefined;
    const postId = editingBlogId || Date.now().toString();
    const baseSlug = slugify(blogForm.title) || `article-${postId}`;
    const hasSameSlug = blogPosts.some(
      (post) => post.slug === baseSlug && post.id !== editingBlogId,
    );
    const finalSlug = hasSameSlug ? `${baseSlug}-${postId}` : baseSlug;

    const postToSave: BlogPost = {
      id: postId,
      title: blogForm.title.trim(),
      slug: finalSlug,
      excerpt: blogForm.excerpt.trim(),
      content: blogForm.content.trim(),
      author: blogForm.author.trim() || user?.name || 'Equipe SMOVE',
      authorRole: blogForm.authorRole.trim() || 'Editeur',
      category: blogForm.category.trim() || 'Communication',
      tags: blogForm.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      publishedDate: existingPost?.publishedDate || new Date().toISOString().slice(0, 10),
      readTime: blogForm.readTime.trim() || '5 min',
      featuredImage: existingPost?.featuredImage || 'digital communication strategy',
      images: existingPost?.images || [],
      status: blogForm.status,
    };

    saveBlogPost(postToSave);
    setBlogPosts(getBlogPosts());
    setIsBlogFormOpen(false);
    setEditingBlogId(null);
    setBlogForm(emptyBlogForm);
    pushFeedback('success', editingBlogId ? 'Article mis a jour.' : 'Nouvel article ajoute.');
  };

  const handleDeleteBlog = (postId: string) => {
    const shouldDelete = window.confirm('Supprimer cet article ?');
    if (!shouldDelete) {
      return;
    }
    deleteBlogPost(postId);
    setBlogPosts(getBlogPosts());
    pushFeedback('success', 'Article supprime.');
  };

  const handleToggleBlogStatus = (post: BlogPost) => {
    const nextStatus: BlogPost['status'] = post.status === 'published' ? 'draft' : 'published';
    saveBlogPost({
      ...post,
      status: nextStatus,
      publishedDate: nextStatus === 'published' ? new Date().toISOString().slice(0, 10) : post.publishedDate,
    });
    setBlogPosts(getBlogPosts());
    pushFeedback('success', nextStatus === 'published' ? 'Article publie.' : 'Article passe en brouillon.');
  };

  const handleMediaUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    setIsUploading(true);
    try {
      await uploadMediaFile({
        name: file.name,
        type: detectMediaType(file),
        file,
        uploadedBy: user?.name || 'Admin SMOVE',
        alt: file.name,
        tags: [detectMediaType(file), 'cms'],
      });
      setMediaFiles(getMediaFiles());
      pushFeedback('success', 'Fichier charge avec succes.');
    } catch {
      pushFeedback('error', "Impossible d'uploader ce fichier.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteMedia = (mediaId: string) => {
    const shouldDelete = window.confirm('Supprimer ce fichier media ?');
    if (!shouldDelete) {
      return;
    }
    deleteMediaFile(mediaId);
    setMediaFiles(getMediaFiles());
    pushFeedback('success', 'Fichier supprime.');
  };

  const handleSaveSettings = () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settingsState));
    pushFeedback('success', 'Parametres CMS enregistres.');
  };

  const renderOverviewSection = () => (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-[20px] p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-[12px] bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white" size={22} />
              </div>
              <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4]">
                {stat.change}
              </span>
            </div>
            <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[32px] text-[#273a41] mb-1">{stat.value}</p>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.button
          onClick={() => onSectionChange('projects')}
          className="bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white p-6 rounded-[20px] text-left"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] mb-2">Piloter les projets</p>
          <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/80">
            Recherche, filtres et suivi du portfolio.
          </p>
        </motion.button>

        <motion.button
          onClick={() => {
            onSectionChange('blog');
            openNewBlogForm();
          }}
          className="bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white p-6 rounded-[20px] text-left"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] mb-2">Nouveau contenu</p>
          <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/80">
            Rediger un article et choisir son statut.
          </p>
        </motion.button>

        <motion.button
          onClick={() => onSectionChange('media')}
          className="bg-gradient-to-r from-[#ffc247] to-[#ff9f47] text-white p-6 rounded-[20px] text-left"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] mb-2">Mediatheque</p>
          <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-white/80">
            Upload rapide et suppression des assets.
          </p>
        </motion.button>
      </div>

      <motion.div
        className="bg-white rounded-[20px] p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-5">Activite recente</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-4 rounded-[12px] hover:bg-[#f5f9fa] transition-colors">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'project'
                    ? 'bg-[#00b3e8]/10 text-[#00b3e8]'
                    : activity.type === 'blog'
                    ? 'bg-[#a855f7]/10 text-[#a855f7]'
                    : 'bg-[#ffc247]/10 text-[#ffc247]'
                }`}
              >
                {activity.type === 'project' ? <FolderOpen size={18} /> : activity.type === 'blog' ? <FileText size={18} /> : <ImageIcon size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-[#273a41] truncate">{activity.action}</p>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4] truncate">{activity.item}</p>
              </div>
              <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4]">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderProjectsSection = () => (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-4 text-[#9ba1a4]" size={18} />
            <input
              value={projectQuery}
              onChange={(event) => setProjectQuery(event.target.value)}
              placeholder="Rechercher un projet, client ou tag"
              className="w-full pl-12 pr-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-4 text-[#9ba1a4]" size={18} />
            <select
              value={projectCategory}
              onChange={(event) => setProjectCategory(event.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            >
              {projectCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <motion.article
            key={project.id}
            className="bg-white rounded-[20px] p-6 shadow-sm"
            whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[12px] bg-[#00b3e8]/10 text-[#00b3e8] px-3 py-1 rounded-full">
                {project.category}
              </span>
              <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4]">{project.year}</span>
            </div>
            <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-1 line-clamp-2">{project.title}</h3>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4] mb-4">{project.client}</p>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#38484e] mb-4 line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] bg-[#f5f9fa] text-[#273a41] px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-[20px] p-8 text-center shadow-sm">
          <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[18px] text-[#273a41] mb-2">Aucun projet trouve</p>
          <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">
            Ajuste les filtres ou la recherche pour voir les projets.
          </p>
        </div>
      )}
    </div>
  );

  const renderBlogSection = () => (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-4 text-[#9ba1a4]" size={18} />
            <input
              value={blogQuery}
              onChange={(event) => setBlogQuery(event.target.value)}
              placeholder="Rechercher un article, auteur ou tag"
              className="w-full pl-12 pr-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={blogStatusFilter}
              onChange={(event) => setBlogStatusFilter(event.target.value as BlogStatusFilter)}
              className="flex-1 px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="published">Publies</option>
              <option value="draft">Brouillons</option>
            </select>
            <motion.button
              onClick={openNewBlogForm}
              className="bg-[#00b3e8] text-white px-5 py-3 rounded-[12px] inline-flex items-center gap-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Plus size={16} />
              Nouveau
            </motion.button>
          </div>
        </div>
      </div>

      {isBlogFormOpen && (
        <motion.form
          onSubmit={handleBlogSubmit}
          className="bg-white rounded-[20px] p-6 shadow-sm space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41]">
              {editingBlogId ? 'Modifier article' : 'Nouvel article'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsBlogFormOpen(false);
                setEditingBlogId(null);
                setBlogForm(emptyBlogForm);
              }}
              className="p-2 rounded-[8px] hover:bg-[#f5f9fa]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={blogForm.title}
              onChange={(event) => setBlogForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Titre"
              className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            />
            <input
              value={blogForm.category}
              onChange={(event) => setBlogForm((prev) => ({ ...prev, category: event.target.value }))}
              placeholder="Categorie"
              className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            />
            <input
              value={blogForm.author}
              onChange={(event) => setBlogForm((prev) => ({ ...prev, author: event.target.value }))}
              placeholder="Auteur"
              className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            />
            <input
              value={blogForm.authorRole}
              onChange={(event) => setBlogForm((prev) => ({ ...prev, authorRole: event.target.value }))}
              placeholder="Role auteur"
              className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            />
            <input
              value={blogForm.readTime}
              onChange={(event) => setBlogForm((prev) => ({ ...prev, readTime: event.target.value }))}
              placeholder="Temps de lecture (ex: 6 min)"
              className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            />
            <select
              value={blogForm.status}
              onChange={(event) =>
                setBlogForm((prev) => ({ ...prev, status: event.target.value as BlogFormState['status'] }))
              }
              className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publie</option>
            </select>
          </div>

          <textarea
            value={blogForm.excerpt}
            onChange={(event) => setBlogForm((prev) => ({ ...prev, excerpt: event.target.value }))}
            placeholder="Extrait"
            rows={3}
            className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none resize-none"
          />
          <textarea
            value={blogForm.content}
            onChange={(event) => setBlogForm((prev) => ({ ...prev, content: event.target.value }))}
            placeholder="Contenu complet (markdown accepte)"
            rows={8}
            className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none resize-none"
          />
          <input
            value={blogForm.tags}
            onChange={(event) => setBlogForm((prev) => ({ ...prev, tags: event.target.value }))}
            placeholder="Tags separes par virgule"
            className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                setIsBlogFormOpen(false);
                setEditingBlogId(null);
                setBlogForm(emptyBlogForm);
              }}
              className="px-6 py-3 rounded-[12px] border-2 border-[#eef3f5] text-[#273a41] hover:bg-[#f5f9fa]"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-[12px] bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white inline-flex items-center gap-2"
            >
              <Save size={16} />
              Enregistrer
            </button>
          </div>
        </motion.form>
      )}

      <div className="space-y-4">
        {filteredBlogPosts.map((post) => (
          <motion.article
            key={post.id}
            className="bg-white rounded-[20px] p-6 shadow-sm"
            whileHover={{ y: -3, boxShadow: '0 10px 28px rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="min-w-0">
                <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] line-clamp-2">{post.title}</h3>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4] mt-1">
                  {post.author} • {post.authorRole} • {formatDate(post.publishedDate)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[12px] ${
                  post.status === 'published' ? 'bg-[#34c759]/10 text-[#34c759]' : 'bg-[#ffc247]/10 text-[#ffc247]'
                }`}
              >
                {post.status === 'published' ? 'Publie' : 'Brouillon'}
              </span>
            </div>

            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#38484e] mb-4 line-clamp-3">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[12px] bg-[#f5f9fa] text-[#273a41] px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openEditBlogForm(post)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] border-2 border-[#eef3f5] hover:bg-[#f5f9fa]"
              >
                <Pencil size={14} />
                Editer
              </button>
              <button
                onClick={() => handleToggleBlogStatus(post)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-[#00b3e8]/10 text-[#00b3e8] hover:bg-[#00b3e8]/20"
              >
                <Eye size={14} />
                {post.status === 'published' ? 'Passer en brouillon' : 'Publier'}
              </button>
              <button
                onClick={() => handleDeleteBlog(post.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-red-50 text-red-700 border border-red-200 hover:bg-red-50"
              >
                <Trash2 size={14} />
                Supprimer
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredBlogPosts.length === 0 && (
        <div className="bg-white rounded-[20px] p-8 text-center shadow-sm">
          <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[18px] text-[#273a41] mb-2">Aucun article correspondant</p>
          <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">
            Crée un article ou change les filtres.
          </p>
        </div>
      )}
    </div>
  );

  const renderMediaSection = () => (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-4 text-[#9ba1a4]" size={18} />
            <input
              value={mediaQuery}
              onChange={(event) => setMediaQuery(event.target.value)}
              placeholder="Rechercher un media"
              className="w-full pl-12 pr-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={mediaTypeFilter}
              onChange={(event) =>
                setMediaTypeFilter(event.target.value as 'all' | 'image' | 'video' | 'document')
              }
              className="flex-1 px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
            >
              <option value="all">Tous types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
            <label className="inline-flex items-center gap-2 px-4 py-3 rounded-[12px] bg-[#00b3e8] text-white cursor-pointer">
              <Upload size={16} />
              {isUploading ? 'Upload...' : 'Uploader'}
              <input
                type="file"
                className="hidden"
                onChange={handleMediaUpload}
                accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMediaFiles.map((file) => (
          <motion.article
            key={file.id}
            className="bg-white rounded-[20px] p-4 shadow-sm"
            whileHover={{ y: -3, boxShadow: '0 10px 28px rgba(0,0,0,0.08)' }}
          >
            <div className="h-40 rounded-[12px] overflow-hidden bg-[#f5f9fa] mb-4 flex items-center justify-center">
              {file.type === 'image' ? (
                <img src={file.thumbnailUrl || file.url} alt={file.alt || file.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <ImageIcon size={36} className="mx-auto text-[#9ba1a4]" />
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4] mt-2">
                    {file.type.toUpperCase()}
                  </p>
                </div>
              )}
            </div>

            <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] truncate mb-1">{file.name}</h3>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4] mb-3">
              {formatFileSize(file.size)} • {formatDate(file.uploadedDate)}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {file.tags.map((tag) => (
                <span key={`${file.id}-${tag}`} className="text-[12px] bg-[#f5f9fa] text-[#273a41] px-2 py-1 rounded-[8px]">
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleDeleteMedia(file.id)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[12px] bg-red-50 text-red-700 border border-red-200"
            >
              <Trash2 size={14} />
              Supprimer
            </button>
          </motion.article>
        ))}
      </div>

      {filteredMediaFiles.length === 0 && (
        <div className="bg-white rounded-[20px] p-8 text-center shadow-sm">
          <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[18px] text-[#273a41] mb-2">Aucun media trouve</p>
          <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">
            Upload un fichier pour demarrer la mediatheque.
          </p>
        </div>
      )}
    </div>
  );

  const renderSettingsSection = () => (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-[20px] p-6 shadow-sm space-y-4">
        <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41]">Parametres generaux</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={settingsState.siteName}
            onChange={(event) => setSettingsState((prev) => ({ ...prev, siteName: event.target.value }))}
            placeholder="Nom du site"
            className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
          />
          <input
            value={settingsState.contactEmail}
            onChange={(event) => setSettingsState((prev) => ({ ...prev, contactEmail: event.target.value }))}
            placeholder="Email contact"
            className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
          />
          <input
            value={settingsState.heroBaseline}
            onChange={(event) => setSettingsState((prev) => ({ ...prev, heroBaseline: event.target.value }))}
            placeholder="Baseline hero"
            className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
          />
          <input
            value={settingsState.postsPerPage}
            onChange={(event) => setSettingsState((prev) => ({ ...prev, postsPerPage: event.target.value }))}
            placeholder="Articles par page"
            className="w-full px-4 py-3 rounded-[12px] border-2 border-[#eef3f5] focus:border-[#00b3e8] outline-none"
          />
          <label className="flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 border-[#eef3f5]">
            <input
              type="checkbox"
              checked={settingsState.autoPublish}
              onChange={(event) => setSettingsState((prev) => ({ ...prev, autoPublish: event.target.checked }))}
            />
            <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#273a41]">
              Publication automatique des nouveaux articles
            </span>
          </label>
        </div>
        <div className="flex" style={{ justifyContent: 'flex-end' }}>
          <button
            onClick={handleSaveSettings}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] bg-gradient-to-r from-[#00b3e8] to-[#00c0e8] text-white"
          >
            <Save size={16} />
            Enregistrer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-3">Etat du CMS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#f5f9fa] rounded-[12px] p-4">
            <p className="text-[12px] text-[#9ba1a4] mb-1">Role actif</p>
            <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41]">{user?.role || 'editeur'}</p>
          </div>
          <div className="bg-[#f5f9fa] rounded-[12px] p-4">
            <p className="text-[12px] text-[#9ba1a4] mb-1">Articles</p>
            <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41]">{blogPosts.length}</p>
          </div>
          <div className="bg-[#f5f9fa] rounded-[12px] p-4">
            <p className="text-[12px] text-[#9ba1a4] mb-1">Fichiers media</p>
            <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41]">{mediaFiles.length}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    if (currentSection === 'projects') {
      return renderProjectsSection();
    }
    if (currentSection === 'blog') {
      return renderBlogSection();
    }
    if (currentSection === 'media') {
      return renderMediaSection();
    }
    if (currentSection === 'settings') {
      return renderSettingsSection();
    }
    return renderOverviewSection();
  };

  return (
    <div className="min-h-screen bg-[#f5f9fa] flex">
      <motion.aside
        className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      >
        <div className="p-6 border-b border-[#eef3f5] flex items-center justify-between">
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00b3e8] to-[#34c759] rounded-[10px] flex items-center justify-center">
                <span className="text-white font-['ABeeZee:Regular',sans-serif] text-[20px]">S</span>
              </div>
              <div>
                <h2 className="font-['ABeeZee:Regular',sans-serif] text-[18px] text-[#273a41]">SMOVE</h2>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4]">CMS Master</p>
              </div>
            </motion.div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-[#f5f9fa] rounded-[8px] transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="p-6 border-b border-[#eef3f5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#00b3e8] to-[#34c759] rounded-full flex items-center justify-center">
              <span className="text-white font-['Abhaya_Libre:Bold',sans-serif] text-[16px]">{user?.name.charAt(0)}</span>
            </div>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
                <p className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px] text-[#273a41] truncate">{user?.name}</p>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4] truncate">{user?.email}</p>
              </motion.div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all ${
                currentSection === item.id ? 'bg-[#00b3e8] text-white' : 'text-[#273a41] hover:bg-[#f5f9fa]'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px]">{item.label}</span>}
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#eef3f5]">
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-red-500 hover:bg-red-50 transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px]">Deconnexion</span>}
          </motion.button>
        </div>
      </motion.aside>

      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <header className="bg-white border-b border-[#eef3f5] px-8 py-6 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-['Medula_One:Regular',sans-serif] text-[28px] tracking-[2.8px] uppercase text-[#273a41]">
                {menuItems.find((item) => item.id === currentSection)?.label || 'Dashboard'}
              </h1>
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4] mt-1">
                Gestion centralisee des contenus
              </p>
            </div>
            <a href="#home" className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4] hover:text-[#273a41]">
              Voir le site →
            </a>
          </div>
        </header>

        {feedback && (
          <div className="px-8 pt-6">
            <div
              className={`rounded-[12px] px-4 py-3 flex items-center gap-3 ${
                feedback.type === 'success'
                  ? 'bg-[#34c759]/10 text-[#34c759] border border-[#00b3e8]'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {feedback.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[14px]">{feedback.message}</span>
            </div>
          </div>
        )}

        {renderCurrentSection()}
      </main>
    </div>
  );
}
