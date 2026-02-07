import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#02033b] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <h3 className="font-['Medula_One:Regular',sans-serif] text-[20px] tracking-[2px] uppercase text-[#00b3e8] mb-6">
              SMOVE
            </h3>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] leading-[1.6] text-white/80 mb-6">
              Agence de communication digitale spécialisée dans la création de contenu, le développement web et la stratégie digitale.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#00b3e8] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#4aa0eb] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#1a8bd8] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#5869ea] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-['Medula_One:Regular',sans-serif] text-[16px] tracking-[1.6px] uppercase mb-6">
              Services
            </h3>
            <ul className="space-y-3 font-['Abhaya_Libre:Regular',sans-serif] text-[14px]">
              <li><a href="#services" className="hover:text-[#00b3e8] transition-colors">Design & Branding</a></li>
              <li><a href="#services" className="hover:text-[#00b3e8] transition-colors">Développement Web</a></li>
              <li><a href="#services" className="hover:text-[#00b3e8] transition-colors">Communication Digitale</a></li>
              <li><a href="#services" className="hover:text-[#00b3e8] transition-colors">Production Vidéo</a></li>
              <li><a href="#services" className="hover:text-[#00b3e8] transition-colors">Création 3D</a></li>
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-['Medula_One:Regular',sans-serif] text-[16px] tracking-[1.6px] uppercase mb-6">
              Liens Rapides
            </h3>
            <ul className="space-y-3 font-['Abhaya_Libre:Regular',sans-serif] text-[14px]">
              <li><a href="#home" className="hover:text-[#00b3e8] transition-colors">Accueil</a></li>
              <li><a href="#apropos" className="hover:text-[#00b3e8] transition-colors">À Propos</a></li>
              <li><a href="#portfolio" className="hover:text-[#00b3e8] transition-colors">Portfolio</a></li>
              <li><a href="#blog" className="hover:text-[#00b3e8] transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-[#00b3e8] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-['Medula_One:Regular',sans-serif] text-[16px] tracking-[1.6px] uppercase mb-6">
              Contact
            </h3>
            <ul className="space-y-4 font-['Abhaya_Libre:Regular',sans-serif] text-[14px]">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#00b3e8] mt-1 flex-shrink-0" />
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-[#00b3e8] flex-shrink-0" />
                <span>+225 XX XX XX XX XX</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-[#00b3e8] flex-shrink-0" />
                <span>contact@smove-communication.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-[#ffc247] rounded-[42px] p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-['Inter:Extra_Bold',sans-serif] text-[23px] text-[#02033b] mb-4">
              Abonnez-vous à la Newsletter
            </h3>
            <p className="font-['Inter:Regular',sans-serif] text-[15px] text-[#02033b] mb-6">
              Ne manquez rien de nos offres et informations
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-6 py-3 rounded-full text-[#02033b] placeholder:text-[#02033b]/50"
              />
              <button className="bg-[#02033b] text-white px-8 py-3 rounded-full font-['Inter:Extra_Bold',sans-serif] hover:bg-[#030424] transition-colors">
                Souscrire
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[13px] text-white/65">
            © {currentYear} SMOVE Communication. Tous droits réservés.
          </p>
          <div className="flex gap-6 font-['Abhaya_Libre:Regular',sans-serif] text-[13px] text-white/65">
            <a href="/privacy" className="hover:text-white underline transition-colors">
              Politique de Confidentialité
            </a>
            <a href="/terms" className="hover:text-white underline transition-colors">
              Conditions d'Utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}