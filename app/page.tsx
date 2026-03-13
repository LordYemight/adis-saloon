'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Sparkles, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Clock, 
  ShieldCheck,
  ImageOff,
  ChevronRight,
  Quote
} from 'lucide-react';

/**
 * HOOKS & UTILS
 */

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
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

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

function SafeImage({ src, alt, fill, width, height, className, priority }: SafeImageProps) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/5 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
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

/**
 * DATA
 */

const IMAGES = [
  "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1686737358171-e6d8ff1e83b7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1761317724384-4dbf2d354162?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1520336811552-42878b67d25f?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1629136627594-428799f827e4?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1533808232502-bee53575c3af?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1629397683830-9805395892e8?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1656600796191-76101980aba5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506618403381-77ae408451b7?auto=format&fit=crop&q=80"
];

const PRODUCTS = [
  { 
    name: "The Signature Cut & Style", 
    desc: "Precision cut tailored to your facial structure, finished with a premium style product.", 
    price: "₦15,000", 
    image: IMAGES[2] 
  },
  { 
    name: "Luxury Color Transformation", 
    desc: "Full head balayage or vivid color session with deep conditioning treatment.", 
    price: "₦45,000", 
    image: IMAGES[3] 
  },
  { 
    name: "Deep Repair Hair Mask", 
    desc: "Intensive protein and moisture therapy to restore shine and health to damaged hair.", 
    price: "₦12,500", 
    image: IMAGES[4] 
  },
  { 
    name: "Gentleman's Royal Shave", 
    desc: "Hot towel service, straight razor shave, and post-shave balm ritual.", 
    price: "₦10,000", 
    image: IMAGES[5] 
  }
];

const TESTIMONIALS = [
  { name: "Yusuf K.", role: "Creative Director", text: "The attention to detail at Adis is unmatched in Lagos. Best fade I've ever had." },
  { name: "Titi A.", role: "Fashion Designer", text: "My balayage looks incredible and my hair still feels healthy. Truly platinum standards." },
  { name: "Chidi O.", role: "Banker", text: "A sanctuary for grooming. The Royal Shave is the highlight of my week." },
  { name: "Amara E.", role: "Entrepreneur", text: "Premium vibes and world-class stylists. Sharp styling, every single time." }
];

/**
 * COMPONENTS
 */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-black font-black text-xl leading-none">A</span>
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight text-white uppercase">Adis Saloon</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Gallery', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-white/70 hover:text-accent font-medium text-sm uppercase tracking-widest transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-accent transition-all duration-300 transform hover:scale-105">
            BOOK A SESSION
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${mobileOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button className="self-end text-white mb-10" onClick={() => setMobileOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Services', 'Gallery', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-3xl font-heading font-bold text-white hover:text-accent transition-colors" onClick={() => setMobileOpen(false)}>
                {item}
              </a>
            ))}
            <a href="#contact" className="mt-6 bg-accent text-black px-8 py-4 rounded-xl font-bold text-center text-lg" onClick={() => setMobileOpen(false)}>
              BOOK NOW
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function Page() {
  const typedText = useTypewriter("Define Your Style.", 100);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const heroReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-6">
        <div className="absolute inset-0 opacity-40">
           <SafeImage src={IMAGES[0]} alt="Saloon Atmosphere" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        
        <div className="relative z-10 text-center max-w-5xl">
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-[0.9] tracking-tighter">
            {typedText}<span className="text-accent animate-pulse">_</span>
          </h1>
          <p className="text-white/60 mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Experience luxury grooming where precision meets passion. Adis Saloon sets the new standard for unisex hair artistry in Lagos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="#contact" className="bg-white text-black px-12 py-5 font-bold text-lg rounded-full hover:bg-accent hover:scale-105 transition-all duration-300">
              BOOK AN APPOINTMENT
            </a>
            <a href="#services" className="border border-white/20 text-white px-12 py-5 font-bold text-lg rounded-full hover:bg-white/10 transition-all">
              SEE SERVICES
            </a>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] tracking-[0.5em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesReveal.ref} className={`py-32 px-6 transition-all duration-1000 ${servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">Unisex Service Menu</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-white/50 text-xl max-w-2xl mx-auto">Masterfully executed services for every hair type and style preference.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 hover:border-accent/30 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <SafeImage src={item.image} alt={item.name} fill className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-heading font-bold mb-3">{item.name}</h3>
                  <p className="text-white/40 text-sm mb-6 line-clamp-2">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent text-xl font-bold">{item.price}</span>
                    <a href="#contact" className="text-white hover:text-accent transition-colors">
                      <ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Masonry */}
      <section id="gallery" ref={galleryReveal.ref} className={`py-32 bg-zinc-900/50 transition-all duration-1000 ${galleryReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-5xl font-heading font-bold">The Gallery: Fresh Cuts</h2>
            <p className="text-white/40 mt-4 uppercase tracking-widest text-sm">Our Curated Lookbook</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.slice(6, 15).map((img, i) => (
              <div key={i} className="relative group overflow-hidden rounded-2xl break-inside-avoid">
                <SafeImage src={img} alt="Hair styling result" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="p-4 bg-white rounded-full text-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Scissors size={24} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Scissors, title: "Bespoke Consultation", desc: "Every service begins with a one-on-one style session." },
            { icon: ShieldCheck, title: "Platinum Certified", desc: "Internationally trained experts at the top of their game." },
            { icon: Sparkles, title: "Exclusive Products", desc: "Only high-end, cruelty-free lines imported for hair health." }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                <f.icon size={32} />
              </div>
              <h4 className="text-xl font-heading font-bold mb-2">{f.title}</h4>
              <p className="text-white/40 text-sm max-w-[250px]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutReveal.ref} className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 delay-200 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">The Adis Difference</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              At Adis Saloon, we see hair not just as a service, but as architecture. Our minimalist, sophisticated studio provides the perfect backdrop for creating timeless, modern looks that transition seamlessly from the boardroom to the social scene.
            </p>
            <div className="grid grid-cols-3 gap-8">
              {[
                { n: "200+", l: "Happy Clients" },
                { n: "12+", l: "Years Mastery" },
                { n: "98%", l: "Retention" }
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-4xl font-heading font-bold text-accent">{s.n}</p>
                  <p className="text-white/30 text-xs uppercase tracking-widest mt-2">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative h-[600px] rounded-3xl overflow-hidden transition-all duration-1000 delay-400 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
             <SafeImage src={IMAGES[1]} alt="Interior" fill className="object-cover" />
             <div className="absolute inset-0 bg-primary/20" />
             <div className="absolute bottom-8 left-8 right-8 p-8 glass rounded-2xl border border-white/10">
                <p className="text-white/90 italic text-lg leading-relaxed">
                  "Sharp styling, nationwide standards. We don't just cut hair; we sculpt confidence."
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Auto Scroll */}
      <section className="py-24 bg-zinc-900 overflow-hidden border-y border-white/5">
        <div className="flex animate-slide-left hover:[animation-play-state:paused] gap-6 px-6 w-[200%]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="min-w-[350px] md:min-w-[450px] p-10 bg-white/5 rounded-3xl border border-white/5 relative">
              <Quote className="absolute top-6 right-6 text-white/5" size={48} />
              <div className="flex gap-1 mb-6 text-accent">
                {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
              </div>
              <p className="text-lg text-white/80 leading-relaxed mb-8 font-light italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-white/40 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactReveal.ref} className={`py-32 px-6 transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">Book Your Appointment</h2>
              <p className="text-white/50 text-xl mb-12">
                Join our exclusive circle of discerning clients. Reserve your time for a transformation that speaks volumes.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Victoria Island, Lagos</h4>
                    <p className="text-white/40">14 Platinum Way, Victoria Island, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Direct Line</h4>
                    <p className="text-white/40">+234 801 234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Reservations</h4>
                    <p className="text-white/40">booking@adissaloon.ng</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-10 rounded-3xl border border-white/10 relative">
              {formSubmitted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 animate-scale-in">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-black mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-4">Message Received</h3>
                  <p className="text-white/60 mb-8">One of our stylists will contact you shortly to confirm your booking.</p>
                  <button onClick={() => setFormSubmitted(false)} className="text-accent underline font-bold">Send another message</button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40">Full Name</label>
                      <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40">Phone Number</label>
                      <input type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-all" placeholder="+234..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">Desired Service</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-all appearance-none">
                      {PRODUCTS.map(p => <option key={p.name} className="bg-primary">{p.name}</option>)}
                      <option className="bg-primary">Other Consultation</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">Message</label>
                    <textarea required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-all h-32" placeholder="Tell us about your hair goals..." />
                  </div>
                  <button type="submit" className="w-full bg-accent text-black font-black py-5 rounded-xl hover:bg-white hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3">
                    SEND REQUEST <ChevronRight size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-black font-black">A</div>
                <span className="font-heading font-bold text-xl uppercase tracking-tighter">Adis Saloon</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Bespoke grooming and avant-garde hair styling in the heart of Victoria Island, Lagos.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Explore</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">The studio</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Reservations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li>14 Platinum Way, VI</li>
                <li>Lagos, Nigeria</li>
                <li>+234 801 234 5678</li>
                <li>booking@adissaloon.ng</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} Adis Saloon. All rights reserved. 
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/20">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}