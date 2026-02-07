import Navigation from './Navigation';
import Footer from './Footer';
import imgRectangle45 from "figma:asset/2be0ad523e90d970c7b3fe37bd71965b54cb6d43.png";
import imgRectangle46 from "figma:asset/9a85c7bfa00a7a0c4072896b4e2ba833170bb385.png";
import imgRectangle47 from "figma:asset/b5f621f1dfaf32c94e5dd8d22e6920a8ddd344a0.png";
import imgRectangle48 from "figma:asset/5c615d97af102c0418633ccd255b98ec4ff458ba.png";
import imgRectangle49 from "figma:asset/227d45e9e8e6288bb798d612d478e9342a34c62c.png";
import imgRectangle50 from "figma:asset/2f1e7676e93110fd994836a57c730e19e58fe706.png";
import imgRectangle51 from "figma:asset/0efadfdc21a8d75c72f54c95f0fe225a3d2892c0.png";
import imgRectangle52 from "figma:asset/e9c2611d179b89d6eabeb0f2e3ed720d0ab809e9.png";
import imgRectangle53 from "figma:asset/77d2021c336661caf518a19872da392486e92b12.png";

const teamMembers = [
  {
    name: 'Spencer Tarring',
    role: 'CEO',
    bio: 'Expert en stratégie digitale avec plus de 15 ans d\'expérience dans le marketing et la communication.',
    image: imgRectangle52,
  },
  {
    name: 'Jody Taylor',
    role: 'COO',
    bio: 'Spécialisé en gestion opérationnelle et en développement d\'entreprise dans le secteur digital.',
    image: imgRectangle45,
  },
  {
    name: 'Sanjay Jadhav',
    role: 'CTO',
    bio: 'Architecte technique passionné par l\'innovation et les technologies web modernes.',
    image: imgRectangle46,
  },
  {
    name: 'James Rodd',
    role: 'CMO',
    bio: 'Expert en marketing digital et en stratégie de marque avec une vision créative unique.',
    image: imgRectangle47,
  },
  {
    name: 'David Silvester',
    role: 'Head of Research & BD',
    bio: 'Leader en recherche et développement commercial avec une expertise en innovation.',
    image: imgRectangle53,
  },
];

const advisors = [
  {
    name: 'Sam Maz',
    company: 'Vespertine Capital',
    bio: 'Conseiller stratégique avec une expérience approfondie en investissement et capital-risque.',
    image: imgRectangle48,
  },
  {
    name: 'Alex Philippine',
    company: 'Samurai Launch Pad',
    bio: 'Expert en lancement de projets digitaux et en stratégie de croissance.',
    image: imgRectangle49,
  },
  {
    name: 'Sundeep',
    company: 'Trustswap',
    bio: 'Spécialiste en technologies blockchain et en solutions financières décentralisées.',
    image: imgRectangle50,
  },
  {
    name: 'Willy',
    company: 'Equinox',
    bio: 'Entrepreneur et investisseur avec une vision globale du digital.',
    image: imgRectangle51,
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/portfolio" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#f5f9fa] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-['ABeeZee:Regular',sans-serif] text-[64px] md:text-[96px] text-[#273a41] mb-4">
              Notre Équipe
            </h1>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[24px] text-[#38484e] max-w-3xl mx-auto">
              Des professionnels passionnés qui transforment vos idées en réalité digitale
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-[#273a41] mb-4">
              Leadership
            </h2>
            <div className="h-1 w-24 bg-[#00b3e8]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[24px] text-[#00b3e8] mb-2">
                      {member.name}
                    </h3>
                    <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4] mb-4">
                      {member.role}
                    </p>
                    <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#38484e] leading-[1.6]">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-20 bg-[#f5f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-[#273a41] mb-4">
              Conseillers & Partenaires
            </h2>
            <div className="h-1 w-24 bg-[#00b3e8]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisors.map((advisor, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[18px] text-[#00b3e8] mb-1">
                    {advisor.name}
                  </h3>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#9ba1a4] mb-3">
                    {advisor.company}
                  </p>
                  <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[12px] text-[#38484e] leading-[1.5]">
                    {advisor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#00b3e8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Medula_One:Regular',sans-serif] text-[48px] tracking-[4.8px] uppercase text-white mb-6">
            Rejoignez-nous
          </h2>
          <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[20px] text-white/90 mb-8">
            Vous souhaitez faire partie de l'aventure SMOVE ? Nous sommes toujours à la recherche de talents passionnés.
          </p>
          <a
            href="#contact"
            className="inline-block bg-[#34c759] text-white px-8 py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px] hover:bg-[#2da84a] transition-colors"
          >
            Postuler maintenant
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
