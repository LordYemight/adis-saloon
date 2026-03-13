'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Star, Quote, Phone, Mail, MapPin, Instagram, Sparkles, Zap, Scissors } from 'lucide-react';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1664549761426-6a1cb1032854?auto=format&fit=crop&w=1920&q=80',
  about: 'https://images.unsplash.com/photo-1686737358171-e6d8ff1e83b7?auto=format&fit=crop&w=800&q=80',
  products: [
    'https://images.unsplash.com/photo-1761317724384-4dbf2d354162?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520336811552-42878b67d25f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1629136627594-428799f827e4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533808232502-bee53575c3af?auto=format&fit=crop&w=800&q=80'
  ],
  gallery: [
    'https://images.unsplash.com/photo-1629397683830-9805395892e8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1656600796191-76101980aba5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
  ]
};

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

export default function Page() {
  const heroReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  return (
    <main className="bg-[#1A1A1A] text-white">
      {/* Header */}
      <nav className="fixed w-full z-50 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md">
        <div className="font-heading text-2xl font-black text-white">ADIS SALOON</div>
        <a href="#contact" className="bg-[#C0C0C0] text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all">Book Now</a>
      </nav>

      {/* Hero */}
      <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <img src={IMAGES.hero} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1A1A]" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="font-heading text-6xl md:text-8xl font-black leading-tight">Define Your Style.</h1>
          <p className="text-xl mt-6 text-white/80">Experience luxury grooming where precision meets passion. Adis Saloon sets the new standard for unisex hair artistry in Lagos.</p>
          <a href="#contact" className="inline-block mt-10 bg-[#C0C0C0] text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all">Book a Session</a>
        </div>
      </section>

      {/* Services */}
      <section id="services" ref={servicesReveal.ref} className={`py-24 px-6 max-w-7xl mx-auto transition-all duration-1000 ${servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-5xl font-heading font-black text-center mb-16">Unisex Service Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "The Signature Cut", price: "₦15,000" },
            { name: "Luxury Color", price: "₦45,000" },
            { name: "Repair Mask", price: "₦12,500" },
            { name: "Royal Shave", price: "₦10,000" }
          ].map((s, i) => (
            <div key={i} className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
              <Scissors className="text-[#C0C0C0] mb-4" />
              <h3 className="font-bold text-xl">{s.name}</h3>
              <p className="text-[#C0C0C0] mt-2 font-bold">{s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <img src={IMAGES.about} alt="About" className="rounded-3xl shadow-2xl" />
          <div>
            <h2 className="text-5xl font-heading font-black">The Adis Difference</h2>
            <p className="mt-6 text-white/70 leading-relaxed text-lg">At Adis Saloon, we see hair as architecture. Our minimalist studio provides the perfect backdrop for creating timeless, modern looks. Quality wey go loud, every single time.</p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[ { n: "200+", l: "Clients/Mo" }, { n: "12+", l: "Years Exp" }, { n: "98%", l: "Retention" } ].map((stat, i) => (
                <div key={i}><p className="text-3xl font-black">{stat.n}</p><p className="text-sm text-white/50">{stat.l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-heading font-black mb-12">Book Your Appointment</h2>
        {formStatus === 'success' ? (
          <div className="p-12 border border-[#C0C0C0] rounded-3xl animate-scaleIn">
            <h3 className="text-3xl font-bold">Message Sent!</h3>
            <p className="mt-4">We will be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setFormStatus('success'); }} className="space-y-6">
            <input type="text" placeholder="Name" className="w-full bg-white/5 p-4 rounded-xl border border-white/10" required />
            <input type="email" placeholder="Email" className="w-full bg-white/5 p-4 rounded-xl border border-white/10" required />
            <textarea placeholder="Message" className="w-full bg-white/5 p-4 rounded-xl border border-white/10 h-32" required />
            <button className="w-full bg-[#C0C0C0] text-black py-4 rounded-xl font-bold hover:brightness-110">Send Request</button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-sm text-white/40">© {new Date().getFullYear()} Adis Saloon. 14 Platinum Way, Victoria Island, Lagos.</p>
        <div className="flex justify-center gap-6 mt-6">
          <a href="https://instagram.com/adis_saloon" className="hover:text-[#C0C0C0]"><Instagram /></a>
          <a href="https://wa.me/2348012345678" className="hover:text-[#C0C0C0]"><Phone /></a>
        </div>
      </footer>
    </main>
  );
}