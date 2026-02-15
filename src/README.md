# 🚀 SMOVE Communication - Site Web Complet

> Agence de Communication Digitale Premium - Site web masterisé avec animations 3D, CMS intégré et architecture production-ready

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC)
![Motion](https://img.shields.io/badge/Motion-Latest-FF0080)

---

## 📋 Vue d'ensemble

SMOVE Communication est un site web complet d'agence digitale avec :

✅ **Hero 3D Masterisé** - Animations 3D avancées avec particules, orbs, rings
✅ **CMS Intégré** - Gestion complète du contenu (Projets, Blog, Média)
✅ **Authentification** - Login/Register avec sessions persistantes
✅ **8 Pages Complètes** - Homepage, Services, Portfolio, Blog, etc.
✅ **Performance Optimisée** - Adaptive performance, lazy loading, cache
✅ **Responsive Design** - Mobile, Tablet, Desktop
✅ **Production Ready** - Configuration, documentation, optimisations

---

## 🎯 Features Principales

### 🌟 **Hero 3D Enhanced**
- **8 Orbs flottants** avec gradient animé
- **50 Particules** avec animations aléatoires
- **3 Rings 3D** en rotation permanente
- **Grid perspective** animé
- **Mouse tracking** smooth avec spring physics
- **Scroll effects** avancés (opacity, scale, blur, rotateX)
- **Light beams** animés verticalement
- **Stats cards** interactives
- **CTA buttons** avec animations hover

### 🔐 **Système d'Authentification**
- Login page avec animations 3D
- Register page avec validation
- Sessions persistantes (localStorage)
- Auth Context global
- Protected routes
- User profile dans navigation

### 📊 **CMS Dashboard**
- Vue d'ensemble avec stats
- Sidebar collapsible
- Quick actions
- Activity feed
- User management
- Sections : Projects, Blog, Media, Settings

### 📁 **Data Management**
- **Projects** : 8 projets avec CRUD complet
- **Blog** : 3 articles avec CRUD + statuts
- **Media** : Upload et gestion de fichiers
- LocalStorage pour persistance
- API-ready architecture

### ⚡ **Performance**
- **Adaptive Performance** : Détection device low/medium/high
- **Debounce & Throttle** pour events
- **Lazy Loading** images
- **Cache System** avec TTL
- **Performance Monitoring** intégré
- **Prefers Reduced Motion** support

---

## 📂 Structure du Projet

```
smove-communication/
│
├── components/                 # Composants React
│   ├── auth/                  # Login, Register
│   ├── cms/                   # CMS Dashboard
│   ├── services/              # Pages services
│   ├── ui/                    # Composants UI réutilisables
│   ├── Hero3DEnhanced.tsx     # Hero 3D masterisé ⭐
│   ├── Navigation.tsx         # Nav avec auth buttons
│   ├── Footer.tsx
│   ├── ProjectsPage.tsx
│   ├── BlogPageEnhanced.tsx
│   └── ...
│
├── config/
│   └── app.config.ts          # Configuration centralisée ⚙️
│
├── contexts/
│   └── AuthContext.tsx        # Context d'authentification
│
├── data/
│   ├── projects.ts            # Data + CRUD projets
│   ├── blog.ts                # Data + CRUD blog
│   └── media.ts               # Data + CRUD média
│
├── utils/
│   └── performance.ts         # Utilitaires performance 🚀
│
├── styles/
│   ├── globals.css            # Tailwind + CSS global
│   └── theme.css              # Variables CSS
│
├── imports/                   # Assets Figma
│
├── App.tsx                    # Point d'entrée principal
├── DEVELOPMENT_GUIDE.md       # Guide développement complet 📖
├── CMS_COMPLETE.md            # Documentation CMS
└── README.md                  # Ce fichier
```

---

## 🚀 Quick Start

### Installation

```bash
# Cloner le projet
git clone <repo-url>
cd smove-communication

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

### Accéder au site

```
Homepage : http://localhost:5173/#home
Login    : http://localhost:5173/#login
CMS      : http://localhost:5173/#cms-dashboard
```

### Accès CMS sécurisé

Le CMS est **désactivé en production par défaut**.  
Pour un environnement local, configurez un compte admin de développement via variables d'environnement :

```bash
VITE_ENABLE_CMS=true
VITE_ENABLE_DEV_ADMIN=true
VITE_DEV_ADMIN_EMAIL=admin.local@smove.test
VITE_DEV_ADMIN_PASSWORD=change-me-now
VITE_DEV_ADMIN_NAME=Dev Admin
```

---

## 📖 Documentation

### Guides disponibles

- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** 
  Guide complet de développement (Architecture, Performance, Best Practices)

- **[CMS_COMPLETE.md](./CMS_COMPLETE.md)** 
  Documentation du système CMS (Utilisation, API, Features)

- **[HOMEPAGE_COMPLETE.md](./HOMEPAGE_COMPLETE.md)** 
  Documentation de la homepage

- **[MASTERIZATION_GUIDE.md](./MASTERIZATION_GUIDE.md)** 
  Guide de masterisation du site

---

## 🎨 Technologies

### Core
- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS 4.0** - Utility-first CSS

### Animations
- **Motion (Framer Motion)** - Animations avancées
- **3D Transforms** - Effets 3D CSS
- **Spring Physics** - Animations naturelles

### State & Data
- **React Context** - State management
- **LocalStorage** - Persistance locale
- **Custom Hooks** - Logique réutilisable

### Performance
- **Lazy Loading** - Images & components
- **Code Splitting** - Bundle optimization
- **Adaptive Config** - Device-based settings
- **Cache System** - Computation caching

---

## 🌐 Pages Disponibles

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `#home` | Hero 3D + Services + About + Portfolio + Blog + Contact |
| Projects | `#projects` | Tous les projets avec filtres |
| Project Detail | `#project-{id}` | Page détail projet |
| Services Hub | `#services-all` | Hub de tous les services |
| Design & Branding | `#service-design` | Page service Design |
| Web Development | `#service-web` | Page service Web |
| Portfolio | `#portfolio` | Portfolio complet |
| Blog | `#blog` | Liste des articles |
| About | `#apropos` | À propos |
| Login | `#login` | Connexion |
| Register | `#register` | Inscription |
| CMS Dashboard | `#cms-dashboard` | Dashboard CMS (Protected) |

---

## ⚙️ Configuration

### app.config.ts

Toute la configuration est centralisée dans `/config/app.config.ts` :

```typescript
import { APP_CONFIG } from './config/app.config';

// Couleurs
APP_CONFIG.colors.primary        // #00b3e8
APP_CONFIG.colors.secondary      // #34c759

// Animations
APP_CONFIG.animations.hero3D.orbs.count        // 8
APP_CONFIG.animations.hero3D.particles.count   // 50

// Performance
APP_CONFIG.performance.enableParticles         // true
APP_CONFIG.performance.enable3DEffects         // true

// Features
APP_CONFIG.features.blog                       // true
APP_CONFIG.features.cms                        // true
```

### Helpers disponibles

```typescript
import { 
  getColor,
  isFeatureEnabled,
  shouldReduceMotion,
  getAnimationDuration 
} from './config/app.config';

const primary = getColor('primary');
const blogEnabled = isFeatureEnabled('blog');
const reduceMotion = shouldReduceMotion();
```

---

## 🔧 Scripts

```bash
# Développement
npm run dev              # Démarre le serveur dev

# Build
npm run build            # Build production
npm run preview          # Preview du build

# Type checking
npx tsc --noEmit         # Vérifier les erreurs TypeScript
```

---

## 📊 Performance

### Optimisations implémentées

✅ **Adaptive Performance**
- Détection automatique low/medium/high device
- Ajustement du nombre de particules
- Activation/désactivation des effets

✅ **Lazy Loading**
- Images avec IntersectionObserver
- Components avec React.lazy()
- Routes code-splitting

✅ **Caching**
- Cache avec TTL
- LocalStorage optimization
- Computation memoization

✅ **Debounce & Throttle**
- Search input debounced
- Scroll events throttled
- Resize events optimized

### Métriques cibles

| Métrique | Cible | Status |
|----------|-------|--------|
| FCP | < 1.8s | ✅ |
| LCP | < 2.5s | ✅ |
| FID | < 100ms | ✅ |
| CLS | < 0.1 | ✅ |
| TTI | < 3.8s | ✅ |

---

## 🎯 Animations 3D

### Hero3DEnhanced Features

```typescript
// 8 Orbs avec positions calculées
const angle = (i / 8) * Math.PI * 2;
const radius = 30 + (i % 3) * 10;

// 50 Particules animées
animate={{
  y: [0, -200, 0],
  opacity: [0, 1, 0],
  scale: [0, 1.5, 0]
}}

// 3 Rings 3D rotatifs
animate={{
  rotateY: [0, 360],
  rotateX: [0, 20, 0],
  scale: [1, 1.1, 1]
}}

// Mouse tracking smooth
const smoothMouseX = useSpring(mouseX, { 
  stiffness: 100, 
  damping: 20 
});
```

### Customisation

Modifier dans `app.config.ts` :

```typescript
hero3D: {
  orbs: { count: 8, duration: 15 },
  particles: { count: 50, speed: 5 },
  rings: { count: 3, baseSize: 400 }
}
```

---

## 🔐 Authentification

### Utilisation

```typescript
import { useAuth } from './contexts/AuthContext';

function Component() {
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      // Logged in!
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user?.name}</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Session sécurisée

```typescript
// Récupération de session via backend (cookies httpOnly + CSRF)
const response = await fetch('/api/auth/session', {
  credentials: 'include',
});

if (response.ok) {
  const { user } = await response.json();
  // user est validé par le backend, aucun mot de passe côté client
}
```

---

## 💾 Data Management

### Projects

```typescript
import { 
  projects,
  getProjectById,
  getProjectsByCategory,
  getFeaturedProjects 
} from './data/projects';

const project = getProjectById('1');
const webProjects = getProjectsByCategory('Web Development');
const featured = getFeaturedProjects(6);
```

### Blog

```typescript
import { 
  getBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  getPublishedBlogPosts 
} from './data/blog';

const posts = getBlogPosts();
const published = getPublishedBlogPosts();

saveBlogPost(newPost);
deleteBlogPost('1');
```

### Media

```typescript
import { 
  uploadMediaFile,
  getMediaFiles,
  deleteMediaFile,
  searchMediaFiles 
} from './data/media';

const file = await uploadMediaFile({
  name: 'image.jpg',
  type: 'image',
  file: fileObject,
  uploadedBy: user.email
});

const images = getMediaFilesByType('image');
const results = searchMediaFiles('hero');
```

---

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Déployer le dossier /dist
```

### Variables d'environnement

```env
REACT_APP_API_URL=https://api.smove.com
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_ANALYTICS=true
```

---

## 📝 Best Practices

### Code Style

✅ TypeScript strict
✅ Functional components
✅ Custom hooks pour logique
✅ Composition over inheritance
✅ Comments en français

### Performance

✅ Debounce user inputs
✅ Throttle scroll/resize events
✅ Lazy load images & components
✅ Use transform for animations
✅ Avoid layout thrashing

### Accessibility

✅ Alt text sur images
✅ ARIA labels
✅ Keyboard navigation
✅ Color contrast WCAG AA
✅ Prefers reduced motion

---

## 🎨 Design System

### Couleurs

```css
--primary: #00b3e8     /* Bleu */
--secondary: #34c759   /* Vert */
--accent: #a855f7      /* Purple */
--warning: #ffc247     /* Orange */
--danger: #ff6b6b      /* Rouge */
--dark: #273a41        /* Texte */
--muted: #9ba1a4       /* Texte secondaire */
--light: #f5f9fa       /* Background */
```

### Typographie

- **Titles** : Medula One (uppercase, tracking)
- **Headings** : ABeeZee (modern, clean)
- **Body** : Abhaya Libre (readable)
- **Code** : Monospace

### Spacing

- Base unit : 4px
- Scale : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

---

## 🐛 Troubleshooting

### Animations lentes?
```typescript
const config = getAdaptiveConfig();
// Utilise config.particleCount au lieu de 50
```

### Build trop gros?
```bash
npm run build -- --mode analyze
# Identifier les gros modules
```

### LocalStorage plein?
```typescript
import { clearUnusedData } from './utils/performance';
clearUnusedData();
```

---

## 📞 Support

Pour toute question :
- 📧 Email : contact@smove-communication.com
- 📱 Téléphone : +242 06 XXX XX XX
- 🌐 Site : https://smove-communication.com

---

## 📄 License

© 2024 SMOVE Communication. Tous droits réservés.

---

## 🎉 Résumé

**Le site SMOVE Communication est maintenant complet et production-ready!**

✅ Hero 3D masterisé avec animations avancées
✅ CMS intégré pour gérer tout le contenu
✅ Authentification complète
✅ Performance optimisée
✅ Architecture évolutive
✅ Documentation complète
✅ Ready to deploy! 🚀

**Commencez par :**
1. `npm install`
2. `npm run dev`
3. Ouvrir `http://localhost:5173`
4. Configurer vos variables `VITE_ENABLE_CMS` et `VITE_DEV_ADMIN_*`
5. Se connecter avec votre compte de développement ou backend
6. Explorer le dashboard CMS

**Bon développement! 💻✨**
