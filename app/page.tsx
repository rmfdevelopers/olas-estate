'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Building2, MapPin, ShieldCheck, Wallet, Home, Map, 
  Smile, Mail, Phone, ArrowRight, CheckCheck, Loader2, 
  ImageOff, Menu, X, Instagram, Facebook, Twitter
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: editorial

const brand = {
  name: "Ola's Estate",
  tagline: "Bold Living. Prime Locations. Unmatched Value.",
  description: "Leading the frontier of Nigerian real estate, Ola's Estate offers premium residential and commercial properties across the most sought-after addresses in Abuja and Lagos.",
  industry: "real estate",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/realestate-hero/1920/1080",
  products: [
    "https://picsum.photos/seed/abuja-terrace/800/600",
    "https://picsum.photos/seed/lagos-penthouse/800/600",
    "https://picsum.photos/seed/commercial-hub/800/600",
    "https://picsum.photos/seed/suburban-villa/800/600"
  ]
};

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-primary/20 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-primary/40" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section Reveal Hooks
  const heroReveal = useScrollReveal(0);
  const aboutReveal = useScrollReveal(0.2);
  const productReveal = useScrollReveal(0.1);
  const galleryReveal = useScrollReveal(0.1);
  const featureReveal = useScrollReveal(0.2);
  const testimonialReveal = useScrollReveal(0.2);
  const contactReveal = useScrollReveal(0.1);

  return (
    <main className="relative">
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg group-hover:bg-highlight transition-colors duration-300">
              <span className="text-white font-black text-xl leading-none">O</span>
            </div>
            <span className="text-white font-heading font-black text-2xl tracking-tighter uppercase">Ola's Estate</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Properties', 'Our Vision', 'The Advantage'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-white/80 hover:text-highlight font-medium text-sm tracking-wide transition-colors uppercase">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-highlight hover:text-primary transition-all duration-300">
              Get Started
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col">
          <button className="self-end text-white mb-12" onClick={() => setMobileMenu(false)}><X size={32} /></button>
          <div className="flex flex-col gap-8">
            {['Properties', 'Our Vision', 'The Advantage'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenu(false)} className="text-white text-3xl font-heading font-black tracking-tighter">
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="bg-accent text-white py-4 px-8 rounded-xl font-black text-center mt-8">
              Inquire Now
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION - Pattern HR-B */}
      <section id="home" className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt="Luxury Real Estate" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
        
        <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} ref={heroReveal.ref}>
          <span className="inline-block px-4 py-1.5 bg-accent/90 text-white font-bold text-xs tracking-[0.2em] uppercase rounded mb-6">
            Lagos & Abuja Premier Real Estate
          </span>
          <h1 className="font-heading text-6xl md:text-[7rem] font-black text-white leading-[0.85] tracking-tighter">
            Own Your Piece <br/> of the Nigerian <span className="text-highlight">Dream.</span>
          </h1>
          <p className="text-white/70 mt-8 text-xl max-w-xl leading-relaxed">
            From the quiet streets of Abuja to the vibrant energy of Lagos, we bring you the finest real estate opportunities. Sharp investment, nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 mt-12">
            <a href="#properties" className="bg-accent text-white px-10 py-5 font-black text-lg hover:scale-105 transition-all duration-300 rounded-full shadow-2xl flex items-center justify-center gap-3 group">
              View Our Portfolio <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Pattern V3 Split */}
      <section id="our-vision" ref={aboutReveal.ref} className="py-32 px-6 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className={`w-full md:w-1/2 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-[30px_30px_0px_0px_#D32F2F]">
                <SafeImage src="https://picsum.photos/seed/realestate-about/800/1000" alt="About Ola's Estate" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-highlight p-10 rounded-2xl hidden lg:block">
                <p className="font-heading text-6xl font-black text-primary leading-none">12+</p>
                <p className="text-primary/70 font-bold uppercase tracking-widest text-xs mt-2">Years Excellence</p>
              </div>
            </div>
          </div>
          <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-primary leading-tight">Beyond <br/> Four Walls</h2>
            <div className="w-20 h-2 bg-accent mt-8 mb-10" />
            <p className="text-primary/70 text-lg leading-relaxed mb-12">
              Ola's Estate isn't just about selling property; it's about building legacies. We bridge the gap between aspirational living and attainable reality for Nigerians at home and in the diaspora. Our footprint in Maitama and Ikoyi stands as a testament to our commitment to excellence.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <p className="font-heading text-4xl font-black text-primary">500+</p>
                <p className="text-primary/50 text-xs uppercase tracking-widest mt-1">Homes Delivered</p>
              </div>
              <div className="flex flex-col">
                <p className="font-heading text-4xl font-black text-primary">98%</p>
                <p className="text-primary/50 text-xs uppercase tracking-widest mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D-STAT DIVIDER */}
      <div className="bg-primary py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          {[
            { number: '500+', label: 'Verified Titles' },
            { number: '12',  label: 'Prime Estates' },
            { number: '100%', label: 'Capital Growth' }
          ].map((s, i) => (
            <div key={i} className="px-8 py-8 md:py-4">
              <p className="text-5xl font-black text-highlight tracking-tight">{s.number}</p>
              <p className="text-white/50 text-sm mt-2 font-medium uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS SECTION - Pattern P-EDITORIAL */}
      <section id="properties" ref={productReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <h2 className="font-heading text-6xl font-black text-primary tracking-tighter">Featured <br/> Listings</h2>
              <p className="text-primary/50 mt-4 text-lg">Hand-picked residential and commercial opportunities.</p>
            </div>
            <a href="#contact" className="text-accent font-black text-lg border-b-4 border-accent pb-1 hover:text-primary hover:border-primary transition-all duration-300">
              See All Listings
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "The Abuja Terrace", price: "₦125M", desc: "Maitama smart home features", img: IMAGES.products[0] },
              { name: "Lagos Penthouse", price: "₦350M", desc: "Panoramic Atlantic views", img: IMAGES.products[1] },
              { name: "Commercial Hub", price: "₦85M", desc: "High-growth office space", img: IMAGES.products[2] },
              { name: "Ikeja Suburban Villa", price: "₦180M", desc: "Family-centric luxury", img: IMAGES.products[3] }
            ].map((p, i) => (
              <div key={i} 
                className={`group relative h-[500px] rounded-[2.5rem] overflow-hidden transition-all duration-700 ${productReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute top-6 right-6">
                  <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full font-bold text-sm">
                    Verified Asset
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-10 flex flex-col justify-end">
                  <h3 className="font-heading text-4xl font-black text-white">{p.name}</h3>
                  <p className="text-white/60 mt-2 font-medium">{p.desc}</p>
                  <div className="flex items-center justify-between mt-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-highlight text-3xl font-black">{p.price}</span>
                    <a href="#contact" className="bg-accent text-white px-8 py-3 rounded-full font-bold hover:bg-highlight hover:text-primary transition-all">
                      Secure Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - Pattern G-MASONRY */}
      <section id="the-visual-tour" ref={galleryReveal.ref} className="py-32 px-6 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-6xl font-black text-white tracking-tighter">The Visual Tour</h2>
            <p className="text-white/40 mt-4 text-lg">Experience the craftsmanship of our developments.</p>
          </div>
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {[...IMAGES.products, ...IMAGES.products].map((src, i) => (
              <div key={i} className={`break-inside-avoid relative rounded-3xl overflow-hidden group transition-all duration-1000 ${galleryReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={src} alt={`Project ${i}`} width={500} height={i % 2 === 0 ? 700 : 400} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Pattern F-ICON-GRID */}
      <section id="the-advantage" ref={featureReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-20 items-start">
            <div className="sticky top-32">
              <h2 className="font-heading text-6xl font-black text-primary leading-[0.9] tracking-tighter">
                The Ola <br/> <span className="text-accent">Advantage.</span>
              </h2>
              <p className="text-primary/50 mt-8 text-xl leading-relaxed">
                We combine local expertise with international standards to ensure your real estate journey is profitable and stress-free.
              </p>
              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-4 text-primary font-black">
                  <div className="w-6 h-6 rounded-full bg-highlight flex items-center justify-center"><CheckCheck size={14} /></div>
                  Legal Vetting Included
                </div>
                <div className="flex items-center gap-4 text-primary font-black">
                  <div className="w-6 h-6 rounded-full bg-highlight flex items-center justify-center"><CheckCheck size={14} /></div>
                  Prime Appreciation Zones
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: 'Verified Titles', desc: 'Every property undergoes rigorous legal vetting for your peace of mind.', icon: ShieldCheck },
                { title: 'Prime Locations', desc: 'We secure assets in high-appreciation zones across Abuja and Lagos.', icon: MapPin },
                { title: 'Modern Design', desc: 'Architecture that blends functional aesthetics with sustainable practices.', icon: Building2 },
                { title: 'Flexible Financing', desc: 'Tailored payment plans that make homeownership a reality.', icon: Wallet }
              ].map((f, i) => (
                <div key={i} 
                  className={`bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 group border border-primary/5 ${featureReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="w-16 h-16 bg-primary text-highlight rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <f.icon size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-primary mb-4">{f.title}</h3>
                  <p className="text-primary/60 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Pattern T-MASONRY */}
      <section ref={testimonialReveal.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-6xl font-black text-white text-center mb-20 tracking-tighter">Voices of <br/> Trust</h2>
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {[
              { name: "Tunde Balogun", text: "Ola's Estate made my relocation from the UK seamless. The title was verified and the property exceeds expectations.", role: "Lagos Island Homeowner" },
              { name: "Amina Okon", text: "Finding a reliable realtor in Abuja is tough, but Ola's team were professional from the first viewing to the final signature.", role: "Investment Partner" }
            ].map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-white/5 border border-white/10 p-10 rounded-[3rem] transition-all duration-700 ${testimonialReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 200}ms` }}>
                <p className="text-white/80 text-xl italic leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-highlight rounded-full flex items-center justify-center font-black text-primary text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-black text-white text-lg">{t.name}</p>
                    <p className="text-highlight text-xs uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - Pattern C4 */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-accent relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-[12vw] md:text-[8vw] font-black text-primary leading-[0.8] tracking-tighter mb-12">
              Let's <br/> Start.
            </h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-primary/60 font-bold uppercase text-xs tracking-widest">Email Us</p>
                  <p className="text-primary font-black text-xl">hello@olasestate.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-primary/60 font-bold uppercase text-xs tracking-widest">Location</p>
                  <p className="text-primary font-black text-xl">Abuja & Lagos, Nigeria</p>
                </div>
              </div>
            </div>
            <div className="mt-16 flex gap-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <a href="#home" className="flex items-center gap-2 mb-8">
                <div className="w-12 h-12 bg-accent flex items-center justify-center rounded-xl">
                  <span className="text-white font-black text-2xl">O</span>
                </div>
                <span className="text-white font-heading font-black text-3xl tracking-tighter uppercase">Ola's Estate</span>
              </a>
              <p className="text-white/40 max-w-sm text-lg leading-relaxed">
                Empowering Nigerians through premium real estate ownership. Sharp delivery, nationwide since 2012.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black text-xl mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Properties', 'Our Vision', 'The Advantage', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/40 hover:text-highlight transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black text-xl mb-8">Legal</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/40 hover:text-highlight transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-sm">
              &copy; {new Date().getFullYear()} Ola's Estate. All rights reserved.
            </p>
            <p className="text-white/20 text-sm font-mono uppercase tracking-widest">
              Built for Excellence in Nigeria
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="bg-primary p-12 rounded-[3rem] text-center animate-scaleIn shadow-2xl">
        <div className="w-24 h-24 bg-highlight rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,179,0,0.3)]">
          <CheckCheck size={40} className="text-primary" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4">Request Sent!</h3>
        <p className="text-white/60 text-lg">Our Abuja or Lagos team will reach out to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-primary p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
      <h3 className="font-heading text-3xl font-black text-white mb-10">Property Inquiry</h3>
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Your Full Name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          required
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none focus:border-highlight focus:ring-1 focus:ring-highlight transition-all"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none focus:border-highlight transition-all"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none focus:border-highlight transition-all"
          />
        </div>
        <textarea
          rows={4}
          placeholder="Which property are you interested in?"
          value={form.message}
          onChange={e => setForm({...form, message: e.target.value})}
          required
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 outline-none focus:border-highlight transition-all resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-highlight text-primary py-5 rounded-2xl font-black text-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
        </button>
      </div>
    </form>
  );
}