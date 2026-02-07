import { Calendar, User, ArrowRight } from 'lucide-react';
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
    image: 'modern website design',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Communication d\'entreprise pour ECLA BTP',
    excerpt: 'Création de vidéo et affiche publicitaire pour mieux se démarquer sur la scène nationale.',
    author: 'James Rodd',
    date: 'Il y a 4 jours',
    category: 'Communication',
    image: 'corporate communication',
    readTime: '4 min',
  },
  {
    id: 3,
    title: 'Création de logo et visuels pour Gobon Sarl',
    excerpt: 'Création de logo et visuels pour une identité commerciale plus remarquée.',
    author: 'David Silvester',
    date: 'Il y a 4 jours',
    category: 'Branding',
    image: 'logo design branding',
    readTime: '3 min',
  },
  {
    id: 4,
    title: 'Stratégie digitale pour PME ivoiriennes',
    excerpt: 'Comment développer une présence en ligne efficace avec un budget limité.',
    author: 'Jody Taylor',
    date: 'Il y a 1 semaine',
    category: 'Stratégie',
    image: 'digital strategy office',
    readTime: '7 min',
  },
  {
    id: 5,
    title: 'Animation 3D pour publicité moderne',
    excerpt: 'Les tendances actuelles en matière d\'animation 3D pour les campagnes publicitaires.',
    author: 'Sanjay Jadhav',
    date: 'Il y a 1 semaine',
    category: '3D & Animation',
    image: '3d animation modern',
    readTime: '6 min',
  },
  {
    id: 6,
    title: 'Optimisation SEO pour le marché africain',
    excerpt: 'Techniques et stratégies SEO adaptées aux marchés émergents africains.',
    author: 'Spencer Tarring',
    date: 'Il y a 2 semaines',
    category: 'Marketing Digital',
    image: 'seo optimization laptop',
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

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/blog" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#f5f9fa] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-['ABeeZee:Regular',sans-serif] text-[64px] md:text-[96px] text-[#273a41] mb-4">
              Blog
            </h1>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[24px] text-[#38484e] max-w-3xl mx-auto">
              Actualités, conseils et insights sur le digital et la communication
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-[#eef3f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-['Abhaya_Libre:Regular',sans-serif] text-[14px] transition-all ${
                  index === 0
                    ? 'bg-[#00b3e8] text-white'
                    : 'bg-white border border-[#eef3f5] text-[#273a41] hover:border-[#00b3e8] hover:text-[#00b3e8]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#00b3e8] to-[#00c0e8] rounded-[24px] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
              <div className="order-2 lg:order-1">
                <div className="inline-block bg-[#34c759] text-white px-4 py-2 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[12px] mb-4">
                  ✨ ARTICLE VEDETTE
                </div>
                <h2 className="font-['ABeeZee:Regular',sans-serif] text-[36px] md:text-[48px] text-white mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-white/90 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-white/80 mb-8">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px]">{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px]">{blogPosts[0].date}</span>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-white text-[#00b3e8] px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] hover:bg-[#f5f9fa] transition-colors"
                >
                  Lire l'article
                  <ArrowRight size={20} />
                </a>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-video rounded-[16px] overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src=""
                    alt={blogPosts[0].title}
                    query={blogPosts[0].image}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-[#f5f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-[#273a41] mb-4">
              Derniers Articles
            </h2>
            <div className="h-1 w-24 bg-[#00b3e8]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src=""
                    alt={post.title}
                    query={post.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-[#ebf9ff] text-[#00b3e8] px-3 py-1 rounded-full font-['Abhaya_Libre:Bold',sans-serif] text-[12px]">
                      {post.category}
                    </span>
                    <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4]">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-3 line-clamp-2">
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
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-[#00b3e8] font-['Abhaya_Libre:Bold',sans-serif] text-[14px] hover:gap-2 transition-all"
                    >
                      Lire plus
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-[#00b3e8] text-white px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] hover:bg-[#00c0e8] transition-colors">
              Charger plus d'articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#00b3e8] to-[#00c0e8] rounded-[24px] p-8 md:p-12 text-center">
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-white mb-4">
              Newsletter
            </h2>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[18px] text-white/90 mb-8">
              Recevez nos derniers articles et conseils directement dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-[15px] text-[#273a41] placeholder:text-[#9ba1a4] focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-[#34c759] text-white px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[16px] hover:bg-[#2da84a] transition-colors whitespace-nowrap">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
