import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Shield, BookOpen, Target, Flag, Search, ArrowRight, 
  Activity, Terminal, Mail, Lock, User, Award, Lightbulb, 
  ChevronDown, Send, Phone, MapPin, X, HelpCircle, Check, Info,
  Clock, Calendar
} from 'lucide-react';
import './index.css';

// Scroll to Top on Page Navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Navbar component
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on navigate
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo text-gradient" onClick={handleNavLinkClick}>
          <Shield size={24} />
          CYBER NEXUS
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Terminal size={24} />}
        </button>

        {/* Desktop Links (Hidden on mobile via CSS) */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/arena">Arena</Link>
          <Link to="/certifications">Certifications</Link>
          <Link to="/weapons">Weapons</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          
          <div 
            className="nav-dropdown-wrapper" 
            ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              className={`nav-dropdown-trigger ${dropdownOpen ? 'active' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ background: 'transparent', border: 'none', color: 'inherit', font: 'inherit', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', outline: 'none' }}
            >
              Services
              <ChevronDown size={14} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
            </button>
            
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <Link to="/services?type=dfir" onClick={() => setDropdownOpen(false)}>DFIR</Link>
                <Link to="/services?type=ctf" onClick={() => setDropdownOpen(false)}>CTF</Link>
                <Link to="/services?type=workshops" onClick={() => setDropdownOpen(false)}>Workshops</Link>
                <Link to="/services?type=industrial" onClick={() => setDropdownOpen(false)}>Industrial Training</Link>
                <Link to="/services?type=awareness" onClick={() => setDropdownOpen(false)}>Cybersecurity Awareness</Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Actions (Hidden on mobile via CSS) */}
        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline" style={{ padding: '0.6rem 1.2rem' }}>Sign In</Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Sign Up</Link>
        </div>

        {/* Mobile Menu Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="nav-mobile-menu">
            <Link to="/" onClick={handleNavLinkClick}>Home</Link>
            <Link to="/arena" onClick={handleNavLinkClick}>Arena</Link>
            <Link to="/certifications" onClick={handleNavLinkClick}>Certifications</Link>
            <Link to="/weapons" onClick={handleNavLinkClick}>Weapons</Link>
            <Link to="/about" onClick={handleNavLinkClick}>About</Link>
            <Link to="/blog" onClick={handleNavLinkClick}>Blog</Link>
            <Link to="/contact" onClick={handleNavLinkClick}>Contact</Link>
            
            {/* Collapsible Services block in mobile menu */}
            <div className="mobile-services-section">
              <div className="mobile-services-header">
                Services
              </div>
              <div className="mobile-services-links">
                <Link to="/services?type=dfir" onClick={handleNavLinkClick}>DFIR</Link>
                <Link to="/services?type=ctf" onClick={handleNavLinkClick}>CTF</Link>
                <Link to="/services?type=workshops" onClick={handleNavLinkClick}>Workshops</Link>
                <Link to="/services?type=industrial" onClick={handleNavLinkClick}>Industrial Training</Link>
                <Link to="/services?type=awareness" onClick={handleNavLinkClick}>Cybersecurity Awareness</Link>
              </div>
            </div>

            <div className="mobile-actions">
              <Link to="/login" className="btn btn-outline" onClick={handleNavLinkClick} style={{ width: '100%', justifyContent: 'center' }}>Sign In</Link>
              <Link to="/register" className="btn btn-primary" onClick={handleNavLinkClick} style={{ width: '100%', justifyContent: 'center' }}>Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => (
  <section className="hero">
    <div className="container animate-fade-in">
      <div className="hero-subtitle">From Novice to Vanguard</div>
      <h1 className="hero-title">
        UNLEASH THE <br />
        <span className="text-gradient">CYBER NEXUS</span>
      </h1>
      <p className="hero-description">
        Forge your cybersecurity portfolio, master offensive hacker simulation scopes, and transform into a certified cyber engineer.
      </p>
      
      <div className="hero-stats">
        <div className="stat-item"><Shield size={20} /> 100+ Skills</div>
        <div className="stat-item"><Terminal size={20} /> Custom Sandboxes</div>
        <div className="stat-item"><Target size={20} /> Certified Mentors</div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/register" className="btn btn-primary">
          Join Nexus Now <ArrowRight size={18} />
        </Link>
        <Link to="/services" className="btn btn-outline">View Courses</Link>
      </div>
    </div>
  </section>
);

// Mission & Stats Section
const MissionStats = () => (
  <section className="section-padding" style={{ backgroundColor: 'var(--bg-card)' }}>
    <div className="container">
      <div className="section-icon-header">
        <div className="icon-wrap"><Shield size={32} /></div>
        <h2 className="section-title">Our Mission</h2>
        <p className="section-desc">To provide world-class cybersecurity services that empower businesses and individuals to operate securely in the digital age. We combine advanced offensive techniques with defensive strategies to cultivate ready-to-deploy cyber security professionals.</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-box-value">5</div>
          <div className="stat-box-label">Lead Instructors</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value">500+</div>
          <div className="stat-box-label">Students Trained</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value">50+</div>
          <div className="stat-box-label">Capture the Flags Hosted</div>
        </div>
      </div>
    </div>
  </section>
);

// Core Values Section
const CoreValues = () => (
  <section className="section-padding">
    <div className="container values-grid">
      <div className="value-card">
        <div className="value-icon"><Shield size={32} /></div>
        <h3 className="value-title">Skill First</h3>
        <p className="value-desc">Every lesson we design focuses on building practical, job-ready cybersecurity skills for real-world challenges.</p>
      </div>
      <div className="value-card">
        <div className="value-icon"><Award size={32} /></div>
        <h3 className="value-title">Excellence</h3>
        <p className="value-desc">We uphold the highest standards in training, ensuring every student gains both knowledge and confidence.</p>
      </div>
      <div className="value-card">
        <div className="value-icon"><Lightbulb size={32} /></div>
        <h3 className="value-title">Innovation</h3>
        <p className="value-desc">We constantly adapt our teaching methods and labs to reflect the latest cyber tactics and technologies.</p>
      </div>
    </div>
  </section>
);

// Skills Matrix Section
const SkillsMatrix = () => {
  const skills = [
    "OSINT & Reconnaissance", "Social Engineering Attacks", "Spear Phishing Campaigns",
    "Web Application Penetration Testing", "Network Penetration Testing", "Wireless Network Attacks",
    "Breach & Attack Simulation", "Red Team Infrastructure Setup", "OPSEC for Red Teamers",
    "Bypassing Firewalls & IDS/IPS", "Physical Security Assessments", "Malware Analysis",
    "Timeline Reconstruction", "Mobile Forensics (Android)", "Mobile Forensics (iOS)",
    "Cloud Forensics", "File Carving & Data Recovery", "Threat Actor Profiling",
    "Ransomware Incident Analysis", "Cloud Security Fundamentals", "AWS Security Best Practices",
    "Azure Security Best Practices"
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Master These Skills</h2>
          <p className="section-desc">100+ Cybersecurity Skills to Transform You into a Vanguard</p>
        </div>
        <div className="skills-container">
          {skills.map((skill, idx) => (
            <div key={idx} className="skill-pill">{skill}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call To Action Section
const CallToAction = () => (
  <section className="cta-section">
    <div className="container">
      <h2 className="section-title">Ready to Start Your Cybersecurity Career?</h2>
      <p className="section-desc" style={{ marginBottom: '2rem' }}>Transform from a cybersecurity beginner to an expert. Join thousands of students who have launched successful careers in ethical hacking and cybersecurity.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/register" className="btn btn-primary">
          Enter Training Arena <ArrowRight size={18} />
        </Link>
        <Link to="/contact" className="btn btn-outline">
          Get Free Consultation <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

// Enhanced Footer component
const FooterEnhanced = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Cyber Nexus updates!');
    e.target.reset();
  };

  return (
    <footer className="footer-enhanced">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="nav-logo text-gradient" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              <Shield size={22} style={{ marginRight: '4px' }} />
              CYBER NEXUS
            </Link>
            <p>Forge Your Cyber Defense Portfolio – Step Into the Nexus.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} style={{ color: 'var(--neon-primary)' }} /> info@cybernexus.io
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} style={{ color: 'var(--neon-primary)' }} /> +91 22 6908 5541
              </span>
              <span style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={22} style={{ color: 'var(--neon-primary)', flexShrink: 0, marginTop: '2px' }} /> 
                Suite 404, Cyber Heights, Bandra Kurla Complex, Mumbai, Maharashtra 400051
              </span>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Navigation</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/arena">Arena</Link>
              <Link to="/certifications">Certifications</Link>
              <Link to="/weapons">Weapons</Link>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Services</h4>
            <div className="footer-links">
              <Link to="/services?type=industrial">Industrial Training</Link>
              <Link to="/services?type=workshops">Workshops</Link>
              <Link to="/services?type=ctf">Capture The Flag (CTFs)</Link>
              <Link to="/services?type=dfir">Digital Forensics & Incident Response</Link>
              <Link to="/services?type=awareness">Cybersecurity Awareness Programs</Link>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Stay Updated</h4>
            <p>Get the latest cybersecurity news, training updates, and exclusive offers.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <Send size={15} /> Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Cyber Nexus. All rights reserved. Developed by Cyber Nexus.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <svg size={20} fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg size={20} fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg size={20} fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9H7.12v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Services Page Component
const ServiceCard = ({ icon: Icon, badge, title, desc, features }) => (
  <div className="service-card animate-fade-in">
    <div className="service-header">
      <div className="service-icon"><Icon size={24} /></div>
      <span className="badge">{badge}</span>
    </div>
    <h3 className="service-title">{title}</h3>
    <p className="service-desc">{desc}</p>
    <div className="features">
      <div style={{ fontSize: '0.88rem', color: 'var(--neon-primary)', marginBottom: '0.75rem', fontWeight: 600 }}>Key Features:</div>
      <ul className="features-list">
        {features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
  </div>
);

const Services = () => {
  const [services, setServices] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filterType = queryParams.get('type');
  
  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(() => {
        setServices([
          { id: 1, type: 'TRAINING', title: 'Cybersecurity Training', description: 'Comprehensive training programs to build strong foundations in cybersecurity.', features: ['Beginner to Advanced Tracks', 'Practical Hands-on Labs', 'Career-Focused Learning'], icon: 'BookOpen' },
          { id: 2, type: 'TRAINING', title: 'Industrial Training', description: 'Specialized training tailored for students and professionals entering the industry.', features: ['Real-World Case Studies', 'Industry-Recognized Practices', 'Project-Based Learning'], icon: 'Target' },
          { id: 3, type: 'WORKSHOP', title: 'Workshops', description: 'Short-term, intensive sessions designed to cover specific cybersecurity topics.', features: ['Ethical Hacking Workshops', 'Cloud Security Sessions', 'Emerging Threats'], icon: 'Activity' },
          { id: 4, type: 'COMPETITION', title: 'Capture The Flag (CTFs)', description: 'Gamified challenges that help learners apply their knowledge in real-world attack/defense scenarios.', features: ['Jeopardy-Style CTFs', 'Attack/Defense Scenarios', 'Prizes & Leaderboards'], icon: 'Flag' },
          { id: 5, type: 'SPECIALIZED', title: 'Digital Forensics & Incident Response', description: 'Training on investigating, analyzing, and responding to cyber incidents.', features: ['Malware Analysis', 'Network Forensics', 'Incident Handling'], icon: 'Search' }
        ]);
      });
  }, []);

  const getIcon = (name) => {
    switch(name) { 
      case 'BookOpen': return BookOpen; 
      case 'Target': return Target; 
      case 'Activity': return Activity; 
      case 'Flag': return Flag; 
      case 'Search': return Search; 
      default: return Shield; 
    }
  };

  const filteredServices = services.filter(service => {
    if (!filterType) return true;
    const tag = filterType.toLowerCase();
    if (tag === 'dfir') return service.type === 'SPECIALIZED' || service.title.toLowerCase().includes('forensics');
    if (tag === 'ctf') return service.type === 'COMPETITION' || service.title.toLowerCase().includes('flag');
    if (tag === 'workshops') return service.type === 'WORKSHOP' || service.title.toLowerCase().includes('workshop');
    if (tag === 'industrial') return service.title.toLowerCase().includes('industrial');
    if (tag === 'awareness') return service.title.toLowerCase().includes('training') && !service.title.toLowerCase().includes('industrial');
    return true;
  });

  return (
    <section className="section-padding animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our <span className="text-gradient">Services</span></h2>
          <p className="section-desc">Comprehensive cybersecurity training and offensive simulation models to prepare you or your enterprise to battle modern cyber threats.</p>
          {filterType && (
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/services" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                Show All Services
              </Link>
            </div>
          )}
        </div>
        <div className="services-grid">
          {filteredServices.map(service => (
            <ServiceCard 
              key={service.id} 
              icon={getIcon(service.icon)} 
              badge={service.type} 
              title={service.title} 
              desc={service.description} 
              features={service.features} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================================
// About Page Component (Redesigned)
// ========================================
const About = () => {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      {/* Intro section */}
      <section className="section-padding" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About <span className="text-gradient">Cyber Nexus</span></h2>
            <p className="section-desc">This isn't theory - it's cyber warfare. Cyber Nexus introduces you to real attacks, real defense, and real consequences, preparing you for the challenging cybersecurity industry.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              <Link to="/services" className="btn btn-primary">Our Services</Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-story-text">
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: '#fff', fontFamily: 'Outfit' }}>Our Story</h3>
              <p>Founded by offensive security professionals, Cyber Nexus was born out of a critical industry gap: traditional learning formats emphasize passive viewing, whereas actual enterprise compromises demand swift, defensive, and offensive tactical coordination.</p>
              <p>We built our customized cloud infrastructure sandboxes to deliver true-to-life training environments. From simulating Advanced Persistent Threats (APTs) to active directory compromises, we provide learners with authentic challenges that breed real-world competency.</p>
              <p>Today, we train hundreds of university students and corporate advisors, assisting organizations in implementing secure group policies and securing corporate data assets against sophisticated hacker vectors.</p>
            </div>
            
            <div className="about-stats-container">
              <div className="about-stat-card">
                <strong>2024</strong>
                <span>Founded</span>
              </div>
              <div className="about-stat-card">
                <strong>5+</strong>
                <span>Expert Advisors</span>
              </div>
              <div className="about-stat-card">
                <strong>500+</strong>
                <span>Students Trained</span>
              </div>
              <div className="about-stat-card">
                <strong>20+</strong>
                <span>Live Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mv-card">
              <div className="mv-header">
                <Shield size={22} />
                <h3>Our Mission</h3>
              </div>
              <p>To cultivate exceptional cyber defense and penetration testing talent. By constructing interactive sandboxes and practical time-bound certification environments, we bridge academic concepts and real-world industrial security demands, producing elite analysts ready for modern SOCs.</p>
            </div>

            <div className="mv-card">
              <div className="mv-header">
                <Target size={22} />
                <h3>Our Vision</h3>
              </div>
              <p>To become a premier global platform for offensive cybersecurity simulations and training. We envision a world where organizations have access to highly competent defense operators capable of preemptively identifying vulnerabilities and mitigating threats with absolute confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Core <span className="text-gradient">Values</span></h2>
            <p className="section-desc">These principles guide everything we do and shape how we prepare students to join security engineering teams.</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><Shield size={28} /></div>
              <h3 className="value-title">Security First</h3>
              <p className="value-desc">Everything we do focuses on building defensive or offensive capabilities that immediately contribute to securing real networks and environments.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Award size={28} /></div>
              <h3 className="value-title">Excellence</h3>
              <p className="value-desc">We commit to presenting high-fidelity lab environments, providing professional support, and engineering realistic network exploit scenarios.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Lightbulb size={28} /></div>
              <h3 className="value-title">Innovation</h3>
              <p className="value-desc">We continuously update our course structures, modules, and weapons arsenal to reflect current real-world hacker tactics and emerging vulnerabilities.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><User size={28} /></div>
              <h3 className="value-title">Collaboration</h3>
              <p className="value-desc">Cyber defense is a team sport. We encourage student collaboration, red-vs-blue simulations, and knowledge-sharing throughout our arena.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="cta-section text-center">
        <div className="container">
          <h2 className="section-title">Ready to Launch Your Cybersecurity Career?</h2>
          <p className="section-desc" style={{ marginBottom: '2rem' }}>Join the growing community of students at Cyber Nexus to master real-world hacking. Active challenges, and cutting-edge labs. Step into the simulations, face authentic challenges, and build the skills employers demand.</p>
          <Link to="/contact" className="btn btn-primary">Schedule Consultation <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
};

// ========================================
// Contact Page Component (Redesigned)
// ========================================
const Contact = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', reason: 'Select a reason', message: '', agree: false });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert('Please check the agreement box to consent to being contacted.');
      return;
    }
    alert(`Thank you for contacting Cyber Nexus, ${form.firstName}! A learning advisor will reach out to you at ${form.email} within 1 hour.`);
    setForm({ firstName: '', lastName: '', email: '', phone: '', reason: 'Select a reason', message: '', agree: false });
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">Contact Our <span className="text-gradient">Experts</span></h2>
          <p className="section-desc">Ready to level up your cybersecurity skills? Get in touch with our learning team for guidance on courses, lab subscriptions, and professional learning paths that fit your goals.</p>
          <button className="btn btn-outline" style={{ marginTop: '1.5rem' }} onClick={() => alert('Mocking calendar call! Please write to info@cybernexus.io to book a video consultation.')}>
            <Calendar size={16} /> Schedule Call
          </button>
        </div>

        {/* Form and Sidebar */}
        <div className="contact-layout-grid">
          <div className="form-container" style={{ maxWidth: 'none', margin: '0', padding: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '2rem', fontFamily: 'Outfit' }}>Send Us a Message</h3>
            <form onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name*</label>
                  <input type="text" className="form-input" required placeholder="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name*</label>
                  <input type="text" className="form-input" required placeholder="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address*</label>
                  <input type="email" className="form-input" required placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-input" placeholder="+91 22 6908-5541" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Reason for Inquiry*</label>
                <select className="form-input" style={{ appearance: 'auto' }} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}>
                  <option>Select a reason</option>
                  <option>Course Information</option>
                  <option>Lab Sandbox Subscription</option>
                  <option>Certification Exam</option>
                  <option>Corporate Team Training</option>
                  <option>Other / General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message*</label>
                <textarea className="form-input" required placeholder="Describe your request or training goals..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}></textarea>
              </div>

              <label className="checkbox-group">
                <input type="checkbox" required checked={form.agree} onChange={e => setForm({ ...form, agree: e.target.checked })} />
                <span>I agree to the <span style={{ color: 'var(--neon-primary)' }}>Privacy Policy</span> and consent to being contacted regarding my inquiry.</span>
              </label>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>

          <div className="contact-sidebar">
            <div className="sidebar-box">
              <h3>Quick Contact</h3>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <Mail size={18} />
                  <div>
                    <span>Email Address</span>
                    <strong>info@cybernexus.io</strong>
                  </div>
                </div>

                <div className="contact-info-item">
                  <Phone size={18} />
                  <div>
                    <span>Phone Number</span>
                    <strong>+91 22 6908 5541</strong>
                  </div>
                </div>

                <div className="contact-info-item">
                  <MapPin size={28} />
                  <div>
                    <span>Our Location</span>
                    <strong>Suite 404, Cyber Heights, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India</strong>
                  </div>
                </div>

                <div className="contact-info-item" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                  <Clock size={18} />
                  <div>
                    <span>Business Hours</span>
                    <strong>Monday - Friday: 9:00 AM - 6:00 PM IST</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="rapid-response-card">
              <div className="response-icon-wrap">
                <Clock size={20} />
              </div>
              <div className="response-content">
                <h4>Rapid Response</h4>
                <p>We usually reply in less than 1 Hour</p>
              </div>
            </div>
          </div>
        </div>

        {/* How Can We Train You Grid */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem', marginTop: '5rem' }}>
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ fontSize: '2.25rem' }}>How Can We <span className="text-gradient">Train You?</span></h2>
            <p className="section-desc">Discover the interactive training formats available for security professionals, absolute beginners, and corporate groups.</p>
          </div>

          <div className="training-matrix-grid">
            <div className="training-matrix-card">
              <h3>Cybersecurity Training</h3>
              <p>Step-by-step professional training paths to master infrastructure penetration testing, ethical hacking, and network defenses.</p>
            </div>
            
            <div className="training-matrix-card">
              <h3>Cybersecurity Awareness</h3>
              <p>Interactive corporate awareness sessions training teams against social engineering threats, tailgating, and spear-phishing.</p>
            </div>

            <div className="training-matrix-card">
              <h3>Instructor Training</h3>
              <p>Train-the-trainer workshops designed to elevate internal corporate educators with modern offensive cybersecurity concepts.</p>
            </div>

            <div className="training-matrix-card">
              <h3>Digital Forensics (DFIR)</h3>
              <p>Investigate active attacks, reverse malware binaries, extract memory artifacts, and reconstruct host hack timelines.</p>
            </div>

            <div className="training-matrix-card">
              <h3>Capture the Flag (CTFs)</h3>
              <p>Offensive security hacking challenges customized for company tech teams to test defensive responsiveness inside a sandbox.</p>
            </div>

            <div className="training-matrix-card">
              <h3>Workshops</h3>
              <p>Intensive 1-2 day bootcamps centered around highly specific threats like cloud network bypasses or IoT vulnerabilities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================
// Blog Page Component (NEW)
// ========================================
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/blog')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(() => {
        setBlogs([
          {
            id: 1,
            title: 'How to Start a Career in Cybersecurity in 2026: A Complete Guide for Beginners',
            category: 'Cybersecurity Training',
            snippet: 'Start your journey in offensive and defensive security. Learn the absolute foundations, essential certificates, and career paths that will get you hired.',
            content: 'The demand for cybersecurity talent is at an all-time high. This comprehensive guide covers: 1. Core fundamentals (networking, Linux, coding). 2. Hands-on learning sandbox strategies. 3. Building an offensive vs defensive portfolio. 4. Obtaining recognized certifications. 5. Navigating your first job application process.',
            date: 'June 01, 2026',
            readTime: '8 Min Read',
            author: 'Alex Vance',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            isFeatured: true
          },
          {
            id: 2,
            title: 'Understanding and Preventing SQL Injection Attacks',
            category: 'Web Security',
            snippet: 'Learn how SQL Injection vulnerabilities arise in backend databases and how you can implement robust parameterized queries to secure your web applications.',
            content: 'SQL Injection (SQLi) remains one of the most critical web vulnerabilities. This post breaks down: 1. How SQLi happens (concatenating raw input with queries). 2. Examples of authentication bypasses and data extraction. 3. Code patterns in PHP, Node.js, and Python that are vulnerable. 4. Defensive coding using Parameterized Queries and ORM systems.',
            date: 'May 28, 2026',
            readTime: '5 Min Read',
            author: 'Sarah Chen',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400',
            isFeatured: false
          },
          {
            id: 3,
            title: 'Incident Response Playbooks: Active Directory Ransomware',
            category: 'DFIR',
            snippet: 'Detailed guide on scoping, isolating, and neutralizing a ransomware infection inside an Active Directory domain controller architecture.',
            content: 'When ransomware hits, minutes matter. This incident response playbook walks you through: 1. Identifying the initial access vector (phishing, remote desktop). 2. Isolating compromised domain controllers. 3. Reconstructing network attack paths using Event Logs. 4. Recovering AD infrastructure from clean backups. 5. Strengthening group policies post-breach.',
            date: 'May 20, 2026',
            readTime: '6 Min Read',
            author: 'Marcus Reid',
            image: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&q=80&w=400',
            isFeatured: false
          }
        ]);
      });
  }, []);

  const featuredPost = blogs.find(post => post.isFeatured);
  const latestPosts = blogs.filter(post => !post.isFeatured);

  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">Cybersecurity <span className="text-gradient">Blog</span></h2>
          <p className="section-desc">Stay updated with the latest cybersecurity trends, threat analysis, vulnerability alerts, and practical lab tutorials from our expert instructors.</p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--neon-primary)', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Featured Article</h3>
            <div className="featured-article-card">
              <img src={featuredPost.image} alt="Featured Post" className="featured-article-img" />
              <div className="featured-article-content">
                <div className="blog-badge-row">
                  <span className="blog-badge">{featuredPost.category}</span>
                  <span className="blog-badge">Featured</span>
                </div>
                <h4 className="featured-article-title">{featuredPost.title}</h4>
                <p className="featured-article-snippet">{featuredPost.snippet}</p>
                
                <div className="blog-meta">
                  <span>Date: <strong>{featuredPost.date}</strong></span>
                  <span>Time: <strong>{featuredPost.readTime}</strong></span>
                  <span>Author: <strong>{featuredPost.author}</strong></span>
                </div>

                <button className="blog-read-link" onClick={() => setSelectedPost(featuredPost)} style={{ background: 'transparent', border: 'none', font: 'inherit', outline: 'none' }}>
                  Read Full Article <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Latest Posts Grid */}
        <h3 style={{ fontSize: '1.25rem', color: 'var(--neon-primary)', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '3rem' }}>Latest Articles</h3>
        {latestPosts.length > 0 ? (
          <div className="latest-articles-grid">
            {latestPosts.map(post => (
              <div key={post.id} className="article-card">
                <img src={post.image} alt={post.title} className="article-img" />
                <div className="article-content">
                  <div>
                    <div className="blog-badge-row">
                      <span className="blog-badge">{post.category}</span>
                    </div>
                    <h4 className="article-title">{post.title}</h4>
                  </div>
                  
                  <div>
                    <div className="blog-meta" style={{ marginBottom: '1.25rem', fontSize: '0.8rem', paddingPoint: '0.75rem' }}>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <button className="blog-read-link" onClick={() => setSelectedPost(post)} style={{ background: 'transparent', border: 'none', font: 'inherit', outline: 'none' }}>
                      Read Article <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No articles found.</p>
        )}

        {/* Bottom CTA Banner */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem', marginTop: '5rem', textAlign: 'center' }}>
          <h2 className="section-title">Ready to Start Your Cybersecurity Journey?</h2>
          <p className="section-desc" style={{ marginBottom: '2.5rem' }}>Get hands-on training with our simulated labs and secure your credentials inside the cyber arena.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/arena" className="btn btn-primary">Explore Training Arena <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="modal-backdrop" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" style={{ maxWidth: '750px', padding: '3.5rem' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPost(null)} aria-label="Close">
              <X size={18} />
            </button>
            <span className="modal-badge">{selectedPost.category}</span>
            <h2 className="modal-title" style={{ fontSize: '2.25rem', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>{selectedPost.title}</h2>
            
            <div className="modal-body">
              <div className="blog-meta" style={{ borderTop: 'none', borderBottom: '1px solid var(--border-color)', padding: '0 0 1.25rem 0', margin: '0 0 1.5rem 0' }}>
                <span>Published: <strong>{selectedPost.date}</strong></span>
                <span>Time to Read: <strong>{selectedPost.readTime}</strong></span>
                <span>Author: <strong>{selectedPost.author}</strong></span>
              </div>
              
              <div style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {selectedPost.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Login Page Component (Unchanged)
const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login successful! Welcome back to Cyber Nexus Arena.');
    e.target.reset();
  };

  return (
    <section className="section-padding animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Welcome <span className="text-gradient">Back</span></h2>
          <p className="section-desc">Access your personalized cyber training dashboard and cloud labs.</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.25rem' }}>
              <Lock size={18} /> Sign In
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Don't have an account? <Link to="/register" className="text-gradient">Register in the arena here</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// Register Page Component (Unchanged)
const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    alert('Account created! Welcome to Cyber Nexus Arena. Please check your email to verify your email address.');
    e.target.reset();
  };

  return (
    <section className="section-padding animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Join the <span className="text-gradient">Arena</span></h2>
          <p className="section-desc">Deploy your details and create a secure profile to start learning ethical hacking.</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="Create a strong password" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.25rem' }}>
              <User size={18} /> Create Account
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Already registered? <Link to="/login" className="text-gradient">Sign in here</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// HomePage Composite Component
const HomePage = () => (
  <>
    <Hero />
    <MissionStats />
    <CoreValues />
    <SkillsMatrix />
    <CallToAction />
  </>
);

// ========================================
// Arena Page (with Progressive Timeline & FAQs)
// ========================================
const Arena = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/faqs')
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(() => {
        setFaqs([
          { id: 1, question: 'What prerequisites do I need to join this program?', answer: 'No strict prerequisites! Beginners are welcome. A basic understanding of computers and networks is helpful but not required as we start from scratch.' },
          { id: 2, question: 'Do you provide labs access?', answer: 'Yes! You will get access to our online interactive virtual labs, featuring hands-on exercises for practical application of concepts.' },
          { id: 3, question: 'What kind of jobs can I expect after this?', answer: 'Roles include Cybersecurity Analyst, Penetration Tester, Security Consultant, Incident Responder, and Junior Red Teamer.' },
          { id: 4, question: 'Are these courses updated?', answer: 'Yes! We continuously update our content and laboratory environments to incorporate the latest vulnerabilities and security threats.' },
          { id: 5, question: 'What is the difference between Industrial Training and workshops?', answer: 'Industrial Training is a comprehensive, multi-month program with in-depth modules, whereas workshops are focused, fast-paced 1-2 day bootcamps on specific topics.' },
          { id: 6, question: 'Can absolute beginners participate?', answer: 'Absolutely! Our training programs are designed with a "Novice to Vanguard" approach, moving from absolute basic concepts to expert-level techniques.' },
          { id: 7, question: 'Who runs these courses?', answer: 'The courses are developed and run by certified offensive security experts with years of real-world industry experience.' },
          { id: 8, question: 'Do your programs prepare me for certifications?', answer: 'Yes, our training prepares you for leading industry certifications as well as our custom professional certifications like CNSA, CPTE, and CNRE.' }
        ]);
      });
  }, []);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      {/* Roadmap Intro Section */}
      <section className="section-padding" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">THE TRAINING <span className="text-gradient">ROADMAP</span></h2>
            <p className="section-desc">Our battle-tested roadmap structures your learning flow from fundamental security theory to advanced physical and cloud network exploitation.</p>
          </div>

          <div className="roadmap-container">
            <div className="roadmap-step">
              <div className="roadmap-icon-wrap">20%</div>
              <div className="roadmap-content">
                <div className="roadmap-percent">Milestone 1</div>
                <h3 className="roadmap-title">Tactical Theory</h3>
                <p className="roadmap-desc">Build a rock-solid foundation with cutting-edge theoretical modules covering cyber vulnerabilities, threat vectors, cryptographic structures, and modern defense compliance frameworks.</p>
              </div>
            </div>

            <div className="roadmap-step">
              <div className="roadmap-icon-wrap">80%</div>
              <div className="roadmap-content">
                <div className="roadmap-percent">Milestone 2</div>
                <h3 className="roadmap-title">Battle-Tested Practice</h3>
                <p className="roadmap-desc">Deep dive into custom hands-on laboratory modules replicating real-world enterprise breaches, malware analysis scenarios, network compromises, and web application exploitation.</p>
              </div>
            </div>

            <div className="roadmap-step">
              <div className="roadmap-icon-wrap">100%</div>
              <div className="roadmap-content">
                <div className="roadmap-percent">Milestone 3</div>
                <h3 className="roadmap-title">Industry-Ready Results</h3>
                <p className="roadmap-desc">Emerge with certified professional credentials, a portfolio of realistic exploit reports, and direct readiness to enter high-demand cyber security consulting or red-teaming jobs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked <span className="text-gradient">Questions</span></h2>
            <p className="section-desc">Everything you need to know about our cyber training programs, lab sandboxes, and registration support.</p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, idx) => {
              const isActive = activeFaq === idx;
              return (
                <div key={faq.id || idx} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                    <span>{faq.question}</span>
                    <ChevronDown className="faq-icon" size={18} />
                  </button>
                  <div 
                    className="faq-answer-wrap" 
                    style={{ maxHeight: isActive ? '300px' : '0px' }}
                  >
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arena CTA Section */}
      <section className="section-padding text-center">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Ready to Master Cybersecurity?</h2>
          <p className="section-desc" style={{ marginBottom: '2.5rem' }}>Join our global community of security professionals training inside our cloud sandbox environment. Launch your ethical hacking career today.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary">Enroll Now <ArrowRight size={18} /></Link>
            <Link to="/services" className="btn btn-outline">Explore Courses</Link>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '4rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neon-primary)' }}>500+</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Students Trained</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neon-primary)' }}>95%</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Success Rate</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neon-primary)' }}>6+ Years</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Industry Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ========================================
// Certifications Page (CNSA, CPTE, CNRE cards)
// ========================================
const Certifications = () => {
  const [certs, setCerts] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [registeringCert, setRegisteringCert] = useState(null);
  const [regForm, setRegForm] = useState({ fullName: '', email: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/certifications')
      .then(res => res.json())
      .then(data => setCerts(data))
      .catch(() => {
        setCerts([
          {
            id: 1,
            code: 'CNSA',
            title: 'Certified Network Security Analyst',
            price: 1800,
            level: 'Beginner',
            validity: '1 Month',
            examType: 'MCQ & Practical Exam',
            features: ['Offensive Security Basics', 'Network Security Fundamentals', 'Industry Standard Cert']
          },
          {
            id: 2,
            code: 'CPTE',
            title: 'Certified Penetration Testing Expert',
            price: 2900,
            level: 'Intermediate',
            validity: '3 Months',
            examType: 'Practical Hands-on Exam',
            features: ['Web Application Pentesting', 'Infrastructure Security Basics', 'Hands-on Exam']
          },
          {
            id: 3,
            code: 'CNRE',
            title: 'Certified Nexus Red Team Engineer',
            price: 5900,
            level: 'Advanced',
            validity: '6 Months',
            examType: 'Practical Exam (Hardened)',
            features: ['Active Directory Attacks', 'Hardened Environments', 'Advanced Red Teaming']
          }
        ]);
      });
  }, []);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert(`Success! Registration request for ${registeringCert.code} has been logged. We have sent verification details to ${regForm.email}.`);
    setRegisteringCert(null);
    setRegForm({ fullName: '', email: '' });
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Professional <span className="text-gradient">Certifications</span></h2>
          <p className="section-desc">Earn industry-recognized offensive security credentials. Test your capabilities under real-world, time-bound sandbox conditions.</p>
        </div>

        <div className="certs-grid">
          {certs.map(cert => (
            <div key={cert.id} className="cert-card">
              <div>
                <div className="cert-card-header">
                  <div className="cert-code-wrap">
                    <span className="cert-code">{cert.code}</span>
                    <span className="cert-level-badge">{cert.level}</span>
                  </div>
                  <div className="cert-card-price">
                    ₹{cert.price.toLocaleString('en-IN')}
                  </div>
                </div>
                
                <h3 className="cert-title">{cert.title}</h3>
                
                <div className="cert-details-mini">
                  <span><strong>Validity:</strong> {cert.validity}</span>
                  <span><strong>Exam:</strong> {cert.examType}</span>
                </div>
                
                <ul className="cert-features-list">
                  {cert.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div className="cert-card-actions">
                <button className="btn btn-primary" onClick={() => setRegisteringCert(cert)}>
                  Register Now
                </button>
                <button className="btn btn-secondary-outline" onClick={() => setSelectedCert(cert)}>
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cert-footer-banner">
          <span>🛡️ <strong>Lifetime Access Included:</strong> All certification learning resources and prep material are yours forever with no recurring fees.</span>
        </div>
      </div>

      {/* Certification Details Modal */}
      {selectedCert && (
        <div className="modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCert(null)} aria-label="Close">
              <X size={18} />
            </button>
            <span className="modal-badge">{selectedCert.code} • {selectedCert.level}</span>
            <h2 className="modal-title">{selectedCert.title}</h2>
            
            <div className="modal-body">
              <div>
                <h4 className="modal-section-title">Exam Overview</h4>
                <p className="modal-desc">
                  This exam is fully practical and structured to test real-world deployment skills. Candidates will be granted VPN access to a remote cyber range containing multiple network machines. To pass, candidates must identify security vulnerabilities, exploit target machines, and document findings in a professional penetration testing report.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Exam duration</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>24 Hours</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Passing score</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>70% (Practical Tasks)</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <h4 className="modal-section-title">Certification Benefits</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} style={{ color: 'var(--neon-primary)' }} /> Access to pre-exam sandbox labs
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} style={{ color: 'var(--neon-primary)' }} /> Verifiable digital badge on credly / linkedin
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} style={{ color: 'var(--neon-primary)' }} /> Priority recommendation to partner recruiting agencies
                  </li>
                </ul>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={() => {
                  setRegisteringCert(selectedCert);
                  setSelectedCert(null);
                }}
              >
                Register for Certification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certification Registration Modal */}
      {registeringCert && (
        <div className="modal-backdrop" onClick={() => setRegisteringCert(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setRegisteringCert(null)} aria-label="Close">
              <X size={18} />
            </button>
            <span className="modal-badge">Registration</span>
            <h2 className="modal-title">Sign Up for {registeringCert.code}</h2>
            
            <form onSubmit={handleRegisterSubmit}>
              <div className="modal-body">
                <div style={{ background: 'rgba(255, 106, 0, 0.05)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '6px', fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Selected: <strong>{registeringCert.title}</strong><br />
                  Total Fee: <strong>₹{registeringCert.price.toLocaleString('en-IN')}</strong> (Inc. Taxes)
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter your full name" 
                    required 
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="you@example.com" 
                    required 
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit & Proceed to Mock Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// Weapons Page (Filterable Arsenal + details modals)
// ========================================
const Weapons = () => {
  const [weapons, setWeapons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const categories = [
    'All', 'Reconnaissance', 'Web Security', 'Exploitation', 
    'Network Analysis', 'Cryptography', 'Defense', 'DFIR'
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/weapons')
      .then(res => res.json())
      .then(data => setWeapons(data))
      .catch(() => {
        setWeapons([
          { id: 1, title: 'Nmap', category: 'Reconnaissance', description: 'Free and open source utility for network discovery and security auditing.', type: 'Tools & Labs', downloads: '50k+', difficulty: 'Beginner', icon: 'Search', command: 'nmap -sV -sC -T4 target-ip', details: 'Network Mapper is an industry-standard scanner used to discover hosts and services on a computer network by sending packets and analyzing the responses.' },
          { id: 2, title: 'Wireshark', category: 'Network Analysis', description: 'The world\'s foremost and widely-used network protocol analyzer.', type: 'Tools & Labs', downloads: '40k+', difficulty: 'Beginner', icon: 'Activity', command: 'tshark -i eth0 -w capture.pcap', details: 'Wireshark lets you see what\'s happening on your network at a microscopic level. It is the de facto standard across many commercial and non-profit enterprises.' },
          { id: 3, title: 'Burp Suite', category: 'Web Security', description: 'An integrated platform for performing security testing of web applications.', type: 'Tools & Labs', downloads: '30k+', difficulty: 'Intermediate', icon: 'Shield', command: 'Configure browser to proxy HTTP traffic via 127.0.0.1:8080', details: 'Burp Suite contains an intercepting proxy, application-aware web scanner, repeater, intruder, and sequencer to map and analyze an application\'s attack surface.' },
          { id: 4, title: 'Metasploit', category: 'Exploitation', description: 'Computer security project that provides information about security vulnerabilities.', type: 'Tools & Labs', downloads: '25k+', difficulty: 'Intermediate', icon: 'Terminal', command: 'msfconsole -q', details: 'Metasploit Framework is a modular penetration testing platform that enables security professionals to write, test, and execute exploit code against target systems.' },
          { id: 5, title: 'John the Ripper', category: 'Cryptography', description: 'Fast password cracker, currently available for many flavors of Unix, Windows, and DOS.', type: 'Tools & Labs', downloads: '20k+', difficulty: 'Intermediate', icon: 'Lock', command: 'john --wordlist=passwords.txt hash.txt', details: 'Its primary purpose is to detect weak Unix passwords. Besides several crypt password hash types, it supports custom hashes out of the box.' },
          { id: 6, title: 'Hydra', category: 'Exploitation', description: 'A very fast network logon cracker which supports numerous protocols.', type: 'Tools & Labs', downloads: '15k+', difficulty: 'Intermediate', icon: 'Target', command: 'hydra -l admin -P passwords.txt target-ip ssh', details: 'Hydra is a parallelized login cracker which supports numerous protocols to attack. It is very fast and flexible, allowing new modules to be added easily.' },
          { id: 7, title: 'Nikto', category: 'Web Security', description: 'Open source web server scanner which performs comprehensive tests against web servers.', type: 'Tools & Labs', downloads: '12k+', difficulty: 'Beginner', icon: 'Search', command: 'nikto -h http://target-ip', details: 'Nikto scans for over 6700 potentially dangerous files/programs, checks for outdated versions of over 1250 servers, and checks for specific server configuration items.' },
          { id: 8, title: 'Gobuster', category: 'Reconnaissance', description: 'Tool used to brute-force URIs, DNS subdomains, Virtual Host names, and Open S3 buckets.', type: 'Tools & Labs', downloads: '18k+', difficulty: 'Beginner', icon: 'Terminal', command: 'gobuster dir -u http://target-ip -w directory-list.txt', details: 'Written in Go, Gobuster is exceptionally fast at discovering hidden directories, files, and subdomains in target web and DNS servers.' },
          { id: 9, title: 'Sqlmap', category: 'Exploitation', description: 'Open source penetration testing tool that automates detecting SQL injection flaws.', type: 'Tools & Labs', downloads: '22k+', difficulty: 'Intermediate', icon: 'Target', command: 'sqlmap -u "http://target-ip/index.php?id=1" --dbs', details: 'Sqlmap comes with a powerful detection engine and supports direct database connections, password hashes fingerprinting, and privilege escalation.' },
          { id: 10, title: 'Snort', category: 'Defense', description: 'Open-source, free and lightweight network intrusion detection system.', type: 'Tools & Labs', downloads: '8k+', difficulty: 'Advanced', icon: 'Shield', command: 'snort -A console -q -c /etc/snort/snort.conf -i eth0', details: 'Snort is an IDS capable of performing real-time traffic analysis and packet logging on IP networks, helping identify probes and attacks.' },
          { id: 11, title: 'Autopsy', category: 'DFIR', description: 'Digital forensics platform and graphical interface to The Sleuth Kit and other tools.', type: 'Tools & Labs', downloads: '5k+', difficulty: 'Intermediate', icon: 'Award', command: 'Open Autopsy GUI and load disk image analysis module', details: 'Autopsy is used by law enforcement, military, and corporate examiners to investigate what happened on a computer, supporting timeline analysis and web artifact extraction.' },
          { id: 12, title: 'Hashcat', category: 'Cryptography', description: 'The world\'s fastest and most advanced password recovery utility.', type: 'Tools & Labs', downloads: '10k+', difficulty: 'Advanced', icon: 'Lock', command: 'hashcat -m 1800 hash.txt rockyou.txt', details: 'Hashcat supports five unique modes of attack for over 300 highly-optimized hashing algorithms, taking full advantage of CPU and GPU parallel execution.' }
        ]);
      });
  }, []);

  const filteredWeapons = weapons.filter(weapon => {
    const matchesSearch = weapon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          weapon.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          weapon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || weapon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (name) => {
    switch(name) {
      case 'Search': return Search;
      case 'Activity': return Activity;
      case 'Shield': return Shield;
      case 'Terminal': return Terminal;
      case 'Lock': return Lock;
      case 'Target': return Target;
      case 'Award': return Award;
      default: return Shield;
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Cybersecurity <span className="text-gradient">Weapons</span></h2>
          <p className="section-desc">Access our curated arsenal of cybersecurity tools and hands-on learning resources. Everything you need to master offensive and defensive security tactics.</p>
        </div>

        {/* Search & Filters */}
        <div className="weapons-filter-bar">
          <div className="search-wrapper">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search weapons..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Weapons Grid */}
        {filteredWeapons.length > 0 ? (
          <div className="weapons-grid">
            {filteredWeapons.map(weapon => {
              const IconComp = getIcon(weapon.icon);
              return (
                <div key={weapon.id} className="weapon-card">
                  <div>
                    <div className="weapon-card-header">
                      <div className="weapon-card-icon">
                        <IconComp size={20} />
                      </div>
                      <span className="weapon-card-badge">{weapon.category}</span>
                    </div>

                    <h3 className="weapon-card-title">{weapon.title}</h3>
                    <p className="weapon-card-desc">{weapon.description}</p>
                    
                    <div className="weapon-card-meta">
                      <div className="meta-row">
                        <span>Type:</span>
                        <strong>{weapon.type}</strong>
                      </div>
                      <div className="meta-row">
                        <span>Downloads:</span>
                        <strong>{weapon.downloads}</strong>
                      </div>
                      <div className="meta-row">
                        <span>Difficulty:</span>
                        <strong>{weapon.difficulty}</strong>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="btn btn-outline" 
                    style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem' }}
                    onClick={() => setSelectedWeapon(weapon)}
                  >
                    View Tool
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <HelpCircle size={48} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }} />
            <h3>No weapons matching your search criteria found.</h3>
            <p style={{ marginTop: '0.5rem' }}>Try clearing your filters or checking your spelling.</p>
          </div>
        )}
      </div>

      {/* Weapon Details Modal */}
      {selectedWeapon && (
        <div className="modal-backdrop" onClick={() => setSelectedWeapon(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedWeapon(null)} aria-label="Close">
              <X size={18} />
            </button>
            
            <span className="modal-badge">{selectedWeapon.category} • {selectedWeapon.difficulty}</span>
            <h2 className="modal-title">{selectedWeapon.title}</h2>
            
            <div className="modal-body">
              <div>
                <h4 className="modal-section-title">Description</h4>
                <p className="modal-desc">{selectedWeapon.details}</p>
              </div>

              <div>
                <h4 className="modal-section-title">Common Usage Command</h4>
                <div className="modal-command-box">
                  <code>{selectedWeapon.command}</code>
                  <button 
                    style={{ background: 'transparent', border: 'none', color: 'var(--neon-primary)', cursor: 'pointer' }}
                    onClick={() => {
                      navigator.clipboard.writeText(selectedWeapon.command);
                      alert('Command copied to clipboard!');
                    }}
                    title="Copy command"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Difficulty Level:</span>
                  <span style={{ display: 'block', fontWeight: 600, color: 'var(--neon-primary)', marginTop: '0.25rem' }}>{selectedWeapon.difficulty}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Downloads Count:</span>
                  <span style={{ display: 'block', fontWeight: 600, color: '#fff', marginTop: '0.25rem' }}>{selectedWeapon.downloads}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/weapons" element={<Weapons />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <FooterEnhanced />
      </div>
    </Router>
  );
}

export default App;
