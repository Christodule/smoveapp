import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/contact" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#f5f9fa] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-['ABeeZee:Regular',sans-serif] text-[64px] md:text-[96px] text-[#273a41] mb-4">
              Contactez-nous
            </h1>
            <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[24px] text-[#38484e] max-w-2xl mx-auto">
              Prêt à donner vie à votre projet digital ? Parlons-en ensemble.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-[#273a41] mb-8">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#eef3f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b3e8]"
                    placeholder="Votre nom"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#eef3f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b3e8]"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#eef3f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b3e8]"
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#eef3f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b3e8]"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="design">Design & Branding</option>
                    <option value="web">Développement Web</option>
                    <option value="communication">Communication Digitale</option>
                    <option value="video">Production Vidéo</option>
                    <option value="3d">Création 3D</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-['Abhaya_Libre:Bold',sans-serif] text-[16px] text-[#273a41] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-[#eef3f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b3e8] resize-none"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#34c759] text-white py-4 rounded-[15px] font-['Abhaya_Libre:Bold',sans-serif] text-[18px] hover:bg-[#2da84a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Envoi en cours...' : (
                    <>
                      <Send size={20} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-['Medula_One:Regular',sans-serif] text-[36px] tracking-[3.6px] uppercase text-[#273a41] mb-8">
                Nos coordonnées
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="bg-[#ebf9ff] p-8 rounded-[16px]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#00b3e8] p-4 rounded-lg">
                      <MapPin className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-2">
                        Adresse
                      </h3>
                      <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e]">
                        Cocody, Abidjan
                        <br />
                        Côte d'Ivoire
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-[#ebf9ff] p-8 rounded-[16px]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#00b3e8] p-4 rounded-lg">
                      <Phone className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-2">
                        Téléphone
                      </h3>
                      <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e]">
                        +225 XX XX XX XX XX
                        <br />
                        Lun - Ven: 9h - 18h
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-[#ebf9ff] p-8 rounded-[16px]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#00b3e8] p-4 rounded-lg">
                      <Mail className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-2">
                        Email
                      </h3>
                      <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[16px] text-[#38484e]">
                        contact@smove-communication.com
                        <br />
                        Réponse sous 24h
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-[#ebf9ff] p-8 rounded-[16px]">
                  <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[20px] text-[#273a41] mb-4">
                    Suivez-nous
                  </h3>
                  <div className="flex gap-4">
                    <a href="#" className="bg-[#5869ea] p-3 rounded-lg text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-[#4aa0eb] p-3 rounded-lg text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-[#1a8bd8] p-3 rounded-lg text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c.18 1.897-.962 6.502-1.359 8.627-.168.9-.499 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.154.232.17.326.016.094.036.308.02.476z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
