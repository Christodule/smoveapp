# 🚀 SMOVE Communication - Guide de Développement

## 📋 Table des matières

1. [Architecture](#architecture)
2. [Configuration](#configuration)
3. [Performance](#performance)
4. [Animations 3D](#animations-3d)
5. [Composants](#composants)
6. [Data Management](#data-management)
7. [Déploiement](#déploiement)
8. [Best Practices](#best-practices)

---

## 🏗️ Architecture

### Structure du projet

```
/
├── components/          # Composants React
│   ├── auth/           # Authentification
│   ├── cms/            # CMS Dashboard
│   ├── services/       # Pages services
│   ├── ui/             # Composants UI réutilisables
│   └── figma/          # Composants Figma importés
├── config/             # Configuration centralisée
│   └── app.config.ts   # Configuration app
├── contexts/           # React Contexts
│   └── AuthContext.tsx # Contexte auth
├── data/               # Data layer
│   ├── projects.ts     # Data projets + CRUD
│   ├── blog.ts         # Data blog + CRUD
│   └── media.ts        # Data média + CRUD
├── utils/              # Utilitaires
│   └── performance.ts  # Optimisations performance
├── styles/             # Styles globaux
│   ├── globals.css     # CSS global + Tailwind
│   └── theme.css       # Variables CSS
└── imports/            # Assets Figma
```

### Principes architecturaux

✅ **Separation of Concerns** - Chaque fichier a une responsabilité unique
✅ **Component Composition** - Composants réutilisables et composables
✅ **Centralized Configuration** - Une source de vérité pour la config
✅ **Performance First** - Optimisation dès le départ
✅ **Type Safety** - TypeScript partout
✅ **Accessibility** - Support prefers-reduced-motion

---

## ⚙️ Configuration

### app.config.ts

Le fichier central de configuration. **Ne pas hardcoder de valeurs ailleurs!**

```typescript
import { APP_CONFIG } from './config/app.config';

// Accéder aux couleurs
const primaryColor = APP_CONFIG.colors.primary;

// Vérifier une feature
if (APP_CONFIG.features.blog) {
  // ...
}

// Helpers disponibles
import { getColor, isFeatureEnabled, shouldReduceMotion } from './config/app.config';
```

### Variables d'environnement (à créer)

Créer `.env.local` :

```env
# API Configuration
REACT_APP_API_URL=https://api.smove-communication.com
REACT_APP_ENVIRONMENT=production

# Analytics (optionnel)
REACT_APP_GA_ID=UA-XXXXXXXXX-X

# Feature Flags
REACT_APP_ENABLE_BLOG=true
REACT_APP_ENABLE_CMS=true
```

---

## ⚡ Performance

### Optimisations implémentées

#### 1. **Lazy Loading**

```typescript
import { lazyLoadImage } from './utils/performance';

// Lazy load une image
lazyLoadImage(imageUrl).then(src => {
  // Image chargée
});
```

#### 2. **Debounce & Throttle**

```typescript
import { debounce, throttle } from './utils/performance';

// Pour recherche
const handleSearch = debounce((query) => {
  // Recherche...
}, 300);

// Pour scroll
const handleScroll = throttle(() => {
  // Handle scroll...
}, 100);
```

#### 3. **Performance Monitoring**

```typescript
import { performanceMonitor } from './utils/performance';

performanceMonitor.start('render');
// Votre code...
performanceMonitor.end('render'); // Log: ⏱️ render: 45.23ms
```

#### 4. **Adaptive Performance**

Le système détecte automatiquement les performances de l'appareil :

```typescript
import { getAdaptiveConfig } from './utils/performance';

const config = getAdaptiveConfig();
// { enableParticles: true/false, particleCount: 10-50, ... }
```

**Appareils Low-end** :
- Moins de particules (10 au lieu de 50)
- Pas d'effets blur
- Animations simplifiées

**Appareils High-end** :
- Tous les effets activés
- 50 particules
- Animations complexes 3D

#### 5. **Image Optimization**

```typescript
import { optimizeImageUrl } from './utils/performance';

const optimized = optimizeImageUrl(url, {
  width: 800,
  quality: 80,
  format: 'webp'
});
```

#### 6. **Cache System**

```typescript
import { Cache } from './utils/performance';

const cache = new Cache<Project[]>(5); // 5 minutes TTL

cache.set('projects', projects);
const cached = cache.get('projects'); // null si expiré
```

### Métriques à surveiller

- **FCP** (First Contentful Paint) : < 1.8s
- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1
- **TTI** (Time to Interactive) : < 3.8s

---

## 🎨 Animations 3D

### Hero3DEnhanced

Le nouveau hero avec animations masterisées.

#### Features

✨ **8 Orbs flottants** avec parallax mouse
✨ **50 Particules** animées
✨ **3 Rings rotatifs** en 3D
✨ **Grid animé** avec perspective
✨ **Light beams** animés
✨ **Mouse tracking** smooth avec spring
✨ **Scroll effects** avancés
✨ **Stats cards** interactives
✨ **CTA buttons** avec animations

#### Utilisation

```typescript
import Hero3DEnhanced from './components/Hero3DEnhanced';

<Hero3DEnhanced />
```

#### Personnalisation

Modifier dans `app.config.ts` :

```typescript
hero3D: {
  orbs: {
    count: 8,           // Nombre d'orbs
    duration: 15,       // Durée animation
  },
  particles: {
    count: 50,          // Nombre de particules
  },
  rings: {
    count: 3,           // Nombre de rings
  }
}
```

#### Performance

- **Adaptive** : Réduit automatiquement la complexité sur appareils faibles
- **Reduced Motion** : Respecte prefers-reduced-motion
- **GPU Accelerated** : Utilise transform3d pour GPU
- **RAF Throttle** : Optimise les updates

### Animations globales

#### Motion Variants

```typescript
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

<motion.div {...fadeIn}>Content</motion.div>
```

#### Scroll Animations

```typescript
import { useScroll, useTransform } from 'motion/react';

const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

<motion.div style={{ opacity }}>Content</motion.div>
```

#### Hover Effects

```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring" }}
>
  Content
</motion.div>
```

---

## 🧩 Composants

### Structure d'un composant

```typescript
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { APP_CONFIG } from '../config/app.config';

interface ComponentProps {
  title: string;
  description?: string;
}

export default function Component({ title, description }: ComponentProps) {
  const [state, setState] = useState();

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="..."
    >
      {/* Content */}
    </motion.div>
  );
}
```

### Composants UI réutilisables

Situés dans `/components/ui/` :
- `button.tsx`
- `card.tsx`
- `dialog.tsx`
- `input.tsx`
- etc.

Utilisation :

```typescript
import { Button } from './components/ui/button';

<Button variant="primary" size="lg">
  Click me
</Button>
```

---

## 💾 Data Management

### Projects

```typescript
import { projects, getProjectById, getProjectsByCategory } from './data/projects';

// Tous les projets
const allProjects = projects;

// Par ID
const project = getProjectById('1');

// Par catégorie
const webProjects = getProjectsByCategory('Web Development');

// Featured
const featured = getFeaturedProjects(6);
```

### Blog

```typescript
import { getBlogPosts, saveBlogPost, deleteBlogPost } from './data/blog';

// CRUD
const posts = getBlogPosts();
const post = getBlogPostById('1');

// Create/Update
saveBlogPost(newPost);

// Delete
deleteBlogPost('1');

// Filtres
const published = getPublishedBlogPosts();
const drafts = getDraftBlogPosts();
```

### Media

```typescript
import { uploadMediaFile, getMediaFiles, deleteMediaFile } from './data/media';

// Upload
const file = await uploadMediaFile({
  name: 'image.jpg',
  type: 'image',
  file: fileObject,
  uploadedBy: user.email,
  tags: ['hero', 'homepage']
});

// Get all
const media = getMediaFiles();

// By type
const images = getMediaFilesByType('image');

// Search
const results = searchMediaFiles('hero');
```

### LocalStorage Structure

```javascript
// Auth
// Aucun identifiant ni session auth stocké côté client.
// Session récupérée depuis /api/auth/session (backend).

// Content
smove_blog_posts: [{ ...post }]
smove_media_files: [{ ...file }]
smove_projects: [{ ...project }] // (future)
```

---

## 🚀 Déploiement

### Préparation

1. **Build**
```bash
npm run build
```

2. **Test du build**
```bash
npm run preview
```

3. **Vérifier les assets**
- Images optimisées
- Fonts chargées
- CSS minifié
- JS bundlé

### Platforms recommandées

#### Vercel (Recommandé)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Configuration `vercel.json` :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Firebase Hosting

```bash
firebase init hosting
firebase deploy
```

### Variables d'environnement

Sur la plateforme de déploiement, ajouter :

```
REACT_APP_API_URL=https://api.smove.com
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_ANALYTICS=true
```

### Optimisations production

✅ **Code Splitting** - Automatic avec Vite
✅ **Tree Shaking** - Enlève code non utilisé
✅ **Minification** - CSS + JS minifiés
✅ **Compression** - Gzip/Brotli
✅ **Cache Headers** - Configurés
✅ **CDN** - Assets sur CDN

---

## 📝 Best Practices

### Code Style

```typescript
// ✅ Good
const fetchProjects = async (): Promise<Project[]> => {
  try {
    const projects = await getProjects();
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// ❌ Bad
const getStuff = async () => {
  const stuff = await fetch();
  return stuff;
};
```

### Performance

```typescript
// ✅ Good - Debounce search
const handleSearch = debounce((query) => {
  searchProjects(query);
}, 300);

// ❌ Bad - Search on every keystroke
const handleSearch = (query) => {
  searchProjects(query); // Fires 100x per second
};
```

### Accessibility

```typescript
// ✅ Good
<button
  aria-label="Close menu"
  onClick={closeMenu}
>
  <X />
</button>

// ❌ Bad
<div onClick={closeMenu}>
  <X />
</div>
```

### Responsive Design

```typescript
// ✅ Good - Mobile first
<div className="
  w-full              /* Mobile */
  md:w-1/2            /* Tablet */
  lg:w-1/3            /* Desktop */
">

// ❌ Bad - Desktop first
<div style={{ width: window.innerWidth < 768 ? '100%' : '50%' }}>
```

### Animation Performance

```typescript
// ✅ Good - GPU accelerated
<motion.div
  style={{ 
    transform: 'translateZ(0)',  // Force GPU
  }}
  animate={{ 
    x: 100,                       // Use transform
    opacity: 0.5 
  }}
/>

// ❌ Bad - Triggers reflow
<motion.div
  animate={{ 
    left: '100px',                // Avoid left/top/right/bottom
    width: '50%'                  // Triggers reflow
  }}
/>
```

### State Management

```typescript
// ✅ Good - Context for global state
const { user } = useAuth();

// ❌ Bad - Prop drilling
<Component user={user}>
  <Child user={user}>
    <GrandChild user={user} />
  </Child>
</Component>
```

### Error Handling

```typescript
// ✅ Good
try {
  await saveData(data);
  toast.success('Saved!');
} catch (error) {
  console.error('Save failed:', error);
  toast.error('Failed to save');
}

// ❌ Bad
await saveData(data); // No error handling
```

---

## 🔧 Commandes Utiles

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build production
npm run preview          # Preview production build

# Linting (à configurer)
npm run lint             # Lint code
npm run lint:fix         # Fix lint errors

# Testing (à configurer)
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Type checking
npx tsc --noEmit         # Check TypeScript errors
```

---

## 📊 Checklist Pré-Déploiement

### Performance
- [ ] Images optimisées (WebP, tailles multiples)
- [ ] Fonts préchargées
- [ ] Code splitting activé
- [ ] Lazy loading implémenté
- [ ] Bundle size < 500KB

### SEO
- [ ] Meta tags configurés
- [ ] Open Graph tags
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Analytics configuré

### Accessibility
- [ ] Alt text sur images
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Color contrast
- [ ] Reduced motion support

### Security
- [ ] No hardcoded secrets
- [ ] HTTPS obligatoire
- [ ] CSP headers
- [ ] XSS protection
- [ ] CORS configuré

### Testing
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Test responsive
- [ ] Test cross-browser
- [ ] Test performance

---

## 🆘 Troubleshooting

### Animations lentes?

```typescript
// Réduire la complexité
const config = getAdaptiveConfig();
if (config.animationQuality === 'low') {
  // Simplifier animations
}
```

### Build trop gros?

```typescript
// Analyser le bundle
npm run build -- --mode analyze

// Lazy load composants lourds
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### LocalStorage plein?

```typescript
// Nettoyer les vieilles données
import { clearUnusedData } from './utils/performance';
clearUnusedData();
```

---

## 📚 Resources

- [Motion Documentation](https://motion.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Best Practices](https://react.dev/)
- [Web Performance](https://web.dev/performance/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Le site est maintenant production-ready! 🚀**

Pour toute question, contactez l'équipe de développement.
