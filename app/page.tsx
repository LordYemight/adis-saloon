'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  MessageSquare,
  ChevronRight,
  Quote,
  CheckCircle2,
  ImageOff
} from 'lucide-react';

// --- Types ---
interface Product {
  name: string;
  description: string;
  price: string;
  image_url: string;
}

interface Stat {
  number: string;
  label: string;
  icon: string;
}

// --- Constants ---
const BRAND = {
  name: "Adis Saloon",
  tagline: "Define Your Style.",
  description: "Experience luxury grooming where precision meets passion. Adis Saloon sets the new standard for unisex hair artistry in Lagos.",
  industry: "beauty",
  currency: "₦",
  region: "Nigeria"
};

const CONTACT = {
  whatsapp: "+234 801 234 5678",
  instagram: "https://instagram.com/adis_saloon",
  email: "booking@adissaloon.ng",
  address: "14 Platinum Way, Victoria Island, Lagos, Nigeria"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?auto=format&fit=crop&w=1920&q=80",
  about: "https://images.unsplash.com/photo-1686737358171-e6d8ff1e83b7?auto=format&fit=crop&w=1080&q=80",
  products: [
    "https://images.unsplash.com/photo-1761317724384-4dbf2d354162?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520336811552-42878b67d25f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1629136627594-428799f827e4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533808232502-bee53575c3af?auto=format&fit=crop&w=800&q=80"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1629397683830-9805395892e8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1656600796191-76101980aba5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506618403381-77ae408451b7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1648249979033-05b45fad65cf?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1616529484745-85f885b9889a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1654403868650-b67027f3627f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1520338661084-680395057c93?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1713771295889-eacfced8de80?auto=format&fit=crop&w=600&q=80"
  ]
};

const PRODUCTS: Product[] = [
  { name: "The Signature Cut & Style", description: "Precision cut tailored to your facial structure, finished with premium styling.", price: "₦15,000", image_url: IMAGES.products[0] },
  { name: "Luxury Color Transformation", description: "Full head balayage or vivid color session with deep conditioning treatment.", price: "₦45,000", image_url: IMAGES.products[1] },
  { name: "Deep Repair Mask", description: "Intensive protein and moisture therapy to restore shine to damaged hair.", price: "₦12,500", image_url: IMAGES.products[2] },
  { name: "Gentleman's Royal Shave", description: "Hot towel service, straight razor shave, and facial massage ritual.", price: "₦10,000", image_url: IMAGES.products[3] }
];

const TESTIMONIALS = [
  { name: "Tunde Williams", role: "Creative Director", text: "The most precise fade I've ever received in Lagos. The attention to detail is unmatched." },
  { name: "Amaka Okafor", role: "Model", text: "They completely transformed my hair health. Their color work is truly international standard." },
  { name: "Femi Adebayo", role: "Entrepreneur", text: "Premium vibes from the moment you walk in. Adis is my only choice for grooming." },
  { name: "Zainab Yusuf", role: "Stylist", text: "Clean lines and master craftsmanship. The consultation alone is worth the visit." }
];

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary to-accent/20 ${className}`}>
        <ImageOff size={32} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

const useScrollReveal = () => {
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 80) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- Main Page ---

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const typedHeadline = useTypewriter(BRAND.tagline);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <main className="relative bg-primary text-secondary selection:bg-accent selection:text-primary">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="font-heading text-3xl font-black text-accent tracking-tighter">AS</span>
            <span className="text-white text-sm font-mono tracking-[0.3em] uppercase hidden sm:block group-hover:text-accent transition-colors">ADIS SALOON</span>
          </a>

          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium tracking-widest uppercase hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 bg-secondary text-primary px-6 py-2.5 rounded-none font-bold text-xs tracking-[0.2em] uppercase hover:bg-accent transition-all">
              Book Session <ArrowRight size={14} />
            </a>
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] bg-primary border-l border-white/10 p-10 flex flex-col animate-slideIn">
            <button onClick={() => setIsMenuOpen(false)} className="self-end mb-16">
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-4xl font-heading font-light tracking-tight hover:text-accent transition-colors">
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mt-10 bg-accent text-primary p-5 text-center font-bold tracking-widest uppercase">
                Book Session
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-primary px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <SafeImage src={IMAGES.hero} alt="Luxury Salon" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl">
          <h1 className="font-heading text-7xl md:text-[10vw] font-black text-white leading-[0.85] tracking-tighter">
            {typedHeadline}<span className="text-accent animate-pulse">|</span>
          </h1>
          <p className="text-white/60 mt-8 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            {BRAND.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="#services" className="bg-accent text-primary px-10 py-5 font-black text-sm tracking-[0.2em] uppercase hover:scale-105 transition-all">
              Explore Services
            </a>
            <a href="#contact" className="border border-white/20 text-white px-10 py-5 font-black text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-primary transition-all">
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      {/* Stats / Keyword Divider */}
      <div className="py-16 border-y border-white/5 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Precision', 'Luxury', 'Innovation', 'Mastery'].map((word, i) => (
            <div key={i} className="flex items-center justify-center gap-4 group">
              <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform" />
              <span className="font-heading text-2xl font-light tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">{word}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <section id="services" className="py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6">Unisex Service Menu</h2>
              <p className="text-white/50 text-xl font-light leading-relaxed">Masterfully executed services for every hair type and style preference.</p>
            </div>
            <a href="#contact" className="group flex items-center gap-4 text-accent font-bold tracking-widest uppercase text-sm border-b-2 border-accent/20 pb-2 hover:border-accent transition-all">
              See Full Menu <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, idx) => (
              <div key={idx} className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-accent/40 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <SafeImage src={product.image_url} alt={product.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-60" />
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-3">{product.name}</h3>
                  <p className="text-white/40 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="text-xl font-heading font-bold text-accent">{product.price}</span>
                    <a href="#contact" className="text-white/50 hover:text-white transition-colors"><Scissors size={20} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[700px]">
            <SafeImage src={IMAGES.about} alt="Adis Interior" fill className="object-cover rounded-none grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/10 backdrop-blur-xl border border-white/10 p-8 flex flex-col justify-center animate-float">
              <span className="text-4xl font-heading font-bold text-accent">12+</span>
              <span className="text-xs font-mono uppercase tracking-widest text-white/60">Years of Craft</span>
            </div>
          </div>
          
          <div>
            <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase mb-6 block">The Adis Difference</span>
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-10 leading-[0.9]">Where Hair Becomes Architecture.</h2>
            <p className="text-white/60 text-xl font-light leading-relaxed mb-12">
              At Adis Saloon, we see hair not just as a service, but as structure. Our minimalist, sophisticated studio provides the perfect backdrop for creating timeless, modern looks that transition seamlessly from the boardroom to the social scene.
            </p>
            
            <div className="space-y-8">
              {[
                { title: "Bespoke Consultation", desc: "One-on-one sessions for execution." },
                { title: "Platinum Certified", desc: "Internationally trained master experts." },
                { title: "Exclusive Products", desc: "Cruelty-free, high-end imported range." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-all">
                    <CheckCircle2 size={20} className="text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-white/40 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="font-heading text-5xl font-bold mb-4">Client Transformations</h2>
          <p className="text-white/40 uppercase tracking-[0.2em] text-xs">Stories from our discerning clientele</p>
        </div>
        
        <div className="flex w-[200%] gap-8 animate-slide-left hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="w-[400px] shrink-0 bg-primary p-12 border border-white/5 relative group">
              <Quote className="absolute top-10 right-10 text-white/5 group-hover:text-accent/10 transition-colors" size={60} />
              <div className="flex text-accent mb-8">
                {[1,2,3,4,5].map(n => <Star key={n} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xl font-light italic leading-relaxed mb-10 text-white/80">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-widest uppercase">{t.name}</h4>
                  <p className="text-white/40 text-xs mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section id="gallery" className="py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6">The Gallery</h2>
            <p className="text-white/40 tracking-[0.3em] uppercase text-sm">Fresh cuts & artistry</p>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.gallery.map((url, i) => (
              <div key={i} className="relative group overflow-hidden break-inside-avoid">
                <SafeImage src={url} alt={`Gallery ${i}`} className="w-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="font-heading text-6xl md:text-8xl font-bold mb-10 leading-none">Book Your Appointment</h2>
              <p className="text-white/50 text-xl font-light mb-16 max-w-md">
                Secure your session today. Experience the pinnacle of Nigerian hair artistry.
              </p>
              
              <div className="space-y-12">
                <div className="flex gap-8 group">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Location</h4>
                    <p className="text-lg font-medium">{CONTACT.address}</p>
                  </div>
                </div>
                
                <div className="flex gap-8 group">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Connect</h4>
                    <p className="text-lg font-medium">{CONTACT.whatsapp}</p>
                    <p className="text-white/40 text-sm mt-1">{CONTACT.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 md:p-16 relative">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn py-20">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="font-heading text-4xl font-bold mb-4">Request Received</h3>
                  <p className="text-white/60">Our concierge will contact you shortly to confirm your booking.</p>
                  <button onClick={() => setFormSubmitted(false)} className="mt-8 text-accent font-bold tracking-widest uppercase text-xs border-b border-accent">Book Another</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Full Name</label>
                      <input required type="text" className="w-full bg-transparent border-b border-white/20 py-4 focus:border-accent outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Phone Number</label>
                      <input required type="tel" className="w-full bg-transparent border-b border-white/20 py-4 focus:border-accent outline-none transition-colors" placeholder="+234" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Service Preferred</label>
                    <select className="w-full bg-transparent border-b border-white/20 py-4 focus:border-accent outline-none transition-colors appearance-none">
                      {PRODUCTS.map(p => <option key={p.name} className="bg-primary">{p.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Additional Requests</label>
                    <textarea className="w-full bg-transparent border-b border-white/20 py-4 focus:border-accent outline-none transition-colors h-32 resize-none" placeholder="Tell us about your style vision..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-white text-primary py-6 font-black tracking-[0.3em] uppercase text-sm hover:bg-accent transition-all">
                    Send Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <div className="text-center md:text-left">
              <a href="#home" className="font-heading text-4xl font-black text-white tracking-tighter">ADIS SALOON</a>
              <p className="text-white/40 mt-4 max-w-xs font-light">Quality service wey go loud for VI.</p>
            </div>
            
            <div className="flex gap-10">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Phone size={20} />
              </a>
              <a href={`mailto:${CONTACT.email}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 text-[10px] font-mono tracking-widest text-white/30 uppercase text-center gap-6">
            <p>© {new Date().getFullYear()} Adis Saloon. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-accent transition-colors">Privacy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms</a>
              <a href="#" className="hover:text-accent transition-colors">Credits</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}