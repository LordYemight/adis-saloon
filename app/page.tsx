'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck,
  ImageOff,
  Clock,
  User
} from 'lucide-react';

// --- Components ---

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const SafeImage = ({ src, alt, fill, width, height, className, priority }: any) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-accent/20 ${className}`}>
        <ImageOff size={32} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
};

// --- Data ---

const BRAND = {
  name: "Adis Saloon",
  tagline: "Experience the Art of Hair",
  description: "Lagos' premier unisex salon and styling boutique, offering premium services in a sophisticated, high-end atmosphere.",
  industry: "Premium Unisex Salon & Stylistry",
  region: "Lagos, Nigeria",
  currency: "₦"
};

const PRODUCTS = [
  { name: "Haircut", desc: "Expertly crafted haircut services for both men and women.", price: "₦1,500", icon: Scissors },
  { name: "Hair Coloring", desc: "Experience the best in hair coloring services, from subtle highlights to bold, vibrant colors.", price: "₦2,000", icon: Sparkles },
  { name: "Men's Barbering", desc: "Premium men's barbering services, including haircuts, shaves, and beard styling.", price: "₦1,800", icon: Zap },
  { name: "Women's Styling", desc: "Expert women's styling services, including haircuts, color, and treatments.", price: "₦2,200", icon: Star },
  { name: "Treatments", desc: "Relax and rejuvenate with our premium hair and scalp treatments.", price: "₦1,000", icon: ShieldCheck }
];

const FEATURES = [
  { title: "Expert Stylists", desc: "Our team of expert stylists are dedicated to delivering the highest level of service and quality.", icon: User },
  { title: "Premium Products", desc: "We only use the highest quality hair products, ensuring the best results for our clients.", icon: Sparkles },
  { title: "Clean Environment", desc: "Our salon is designed to provide a clean, comfortable, and relaxing environment.", icon: ShieldCheck }
];

const TESTIMONIALS = [
  { name: "John Doe", text: "Adis Saloon is the best salon in Lagos! The attention to detail is unmatched.", role: "Client" },
  { name: "Jane Doe", text: "I've never felt more confident after a haircut than I do after visiting Adis Saloon!", role: "Client" },
  { name: "Bob Smith", text: "The stylists at Adis Saloon are truly experts in their craft! High-end vibe all through.", role: "Client" },
  { name: "Maria Rodriguez", text: "I love the atmosphere at Adis Saloon - so relaxing and welcoming!", role: "Client" }
];

const CONTACT = {
  whatsapp: "+234 123 456 789",
  instagram: "@adis_saloon",
  email: "hello@adis-salon.com",
  address: "Lagos, Nigeria"
};

// --- Page Content ---

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-primary text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 py-6 transition-all duration-300 bg-primary/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-primary font-black text-xl leading-none">A</span>
            </div>
            <span className="font-heading font-black text-white text-xl tracking-tight uppercase">
              Adis Saloon
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-accent transition">Services</a>
            <a href="#gallery" className="text-sm font-medium hover:text-accent transition">Gallery</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-accent transition">Reviews</a>
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">
              Book Fresh Look
            </a>
          </div>

          {/* Mobile Trigger */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col gap-8 shadow-2xl">
            <button className="self-end text-white" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-6 text-2xl font-heading font-bold">
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
              <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="text-accent">Book Now</a>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        id="home"
        ref={heroRef}
        className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden pt-20"
      >
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[20vw] h-[20vw] bg-white/5 rounded-full blur-[100px]" />
        
        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="font-heading text-6xl md:text-8xl lg:text-[7rem] font-black text-white leading-[0.9] tracking-tighter uppercase">
            {BRAND.tagline}
          </h1>
          <p className="text-white/60 mt-8 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
            {BRAND.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="#contact" className="bg-accent text-primary px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl shadow-accent/10 flex items-center justify-center gap-2">
              Book Your Fresh Look <ArrowRight size={20} />
            </a>
            <a href="#services" className="border-2 border-white/20 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center">
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Feature Divider */}
      <div className="py-20 bg-accent/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-12">
          {FEATURES.map((feat, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                <feat.icon size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">{feat.title}</h3>
                <p className="text-white/40 text-sm">Lagos Premium Quality</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <section 
        id="services" 
        ref={servicesRef}
        className={`py-32 px-6 transition-all duration-1000 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black uppercase mb-4">Unisex Services</h2>
            <div className="w-24 h-1.5 bg-accent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((prod, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-accent/40 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8">
                    <prod.icon size={28} />
                  </div>
                  <h3 className="font-heading text-3xl font-bold mb-4">{prod.name}</h3>
                  <p className="text-white/50 mb-8 leading-relaxed line-clamp-3">{prod.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-accent">{prod.price}</span>
                    <a href="#contact" className="text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                      BOOK NOW <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Divider (A6c) */}
      <section ref={statsRef} className="bg-accent py-20 overflow-hidden">
        <div className={`max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-6 text-center transition-all duration-1000 ${statsVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div>
            <p className="text-5xl font-black text-primary">5k+</p>
            <p className="text-primary/70 text-sm mt-1 font-bold uppercase tracking-widest">Happy Clients</p>
          </div>
          <div>
            <p className="text-5xl font-black text-primary">15+</p>
            <p className="text-primary/70 text-sm mt-1 font-bold uppercase tracking-widest">Stylists</p>
          </div>
          <div>
            <p className="text-5xl font-black text-primary">02</p>
            <p className="text-primary/70 text-sm mt-1 font-bold uppercase tracking-widest">Locations</p>
          </div>
          <div>
            <p className="text-5xl font-black text-primary">100%</p>
            <p className="text-primary/70 text-sm mt-1 font-bold uppercase tracking-widest">Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Testimonials Infinite Scroll */}
      <section id="testimonials" className="py-32 overflow-hidden bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-4xl md:text-6xl font-black uppercase text-center">What Our Clients Say</h2>
        </div>
        
        <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="flex text-accent mb-6 gap-1">
                {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={16} />)}
              </div>
              <p className="text-white/80 text-lg leading-relaxed italic mb-8">"{t.text}"</p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg border border-accent/30">
                   {t.name.charAt(0)}
                 </div>
                 <div>
                   <h4 className="font-bold text-white text-md">{t.name}</h4>
                   <p className="text-accent/60 text-xs uppercase tracking-widest">{t.role}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef}
        className={`py-32 px-6 transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-heading text-5xl md:text-7xl font-black uppercase mb-8">Get in Touch</h2>
            <p className="text-white/50 text-xl mb-12 max-w-md">Ready for a transformation? Visit us or book a slot through our form. Sharp cuts only.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest">Our Studio</p>
                  <p className="text-xl font-bold">{CONTACT.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest">Call or WhatsApp</p>
                  <p className="text-xl font-bold">{CONTACT.whatsapp}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest">Email Us</p>
                  <p className="text-xl font-bold">{CONTACT.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fadeIn">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-heading font-bold mb-4">Request Sent!</h3>
                <p className="text-white/60">We will confirm your booking shortly via WhatsApp.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-accent font-bold underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleForm} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-accent outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Phone Number</label>
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-accent outline-none transition" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Service</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-accent outline-none transition text-white">
                    {PRODUCTS.map(p => <option key={p.name} value={p.name.toLowerCase()} className="bg-primary">{p.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Preferred Time</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 focus:border-accent outline-none transition" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message (Optional)</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-accent outline-none transition" />
                </div>
                <button type="submit" className="w-full bg-white text-primary font-black py-5 rounded-xl hover:bg-accent transition-all uppercase tracking-tighter text-lg">
                  Confirm Booking Slot
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <a href="#home" className="flex items-center gap-2 mb-8">
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-primary font-black text-lg">A</span>
                </div>
                <span className="font-heading font-black text-white text-xl uppercase tracking-widest">
                  Adis Saloon
                </span>
              </a>
              <p className="text-white/40 max-w-sm leading-relaxed">
                Experience the art of grooming in the heart of Lagos. Our quality wey go loud ensures you leave feeling like royalty every single time.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-accent">Quick Links</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><a href="#gallery" className="hover:text-white transition">Gallery</a></li>
                <li><a href="#testimonials" className="hover:text-white transition">Reviews</a></li>
                <li><a href="#contact" className="hover:text-white transition">Booking</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-accent">Social</h4>
              <div className="flex gap-4">
                {CONTACT.instagram && (
                  <a href={`https://instagram.com/${CONTACT.instagram}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Instagram size={18} />
                  </a>
                )}
                <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\+/g, '')}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
            <p>&copy; {new Date().getFullYear()} Adis Saloon. All Rights Reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </footer>
    </main>
  );
}