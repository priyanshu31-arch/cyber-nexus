import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cyber-nexus';

app.use(cors());
app.use(express.json());

// ----------------------------------------
// Mongoose Schemas & Models
// ----------------------------------------

const serviceSchema = new mongoose.Schema({
  id: Number,
  type: String,
  title: String,
  description: String,
  features: [String],
  icon: String
});

const certificationSchema = new mongoose.Schema({
  id: Number,
  code: String,
  title: String,
  price: Number,
  level: String,
  validity: String,
  examType: String,
  features: [String]
});

const weaponSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  description: String,
  type: String,
  downloads: String,
  difficulty: String,
  icon: String,
  command: String,
  details: String
});

const faqSchema = new mongoose.Schema({
  id: Number,
  question: String,
  answer: String
});

const blogPostSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  snippet: String,
  content: String,
  date: String,
  readTime: String,
  author: String,
  image: String,
  isFeatured: Boolean
});

const Service = mongoose.model('Service', serviceSchema);
const Certification = mongoose.model('Certification', certificationSchema);
const Weapon = mongoose.model('Weapon', weaponSchema);
const FAQ = mongoose.model('FAQ', faqSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Connection Status Flag
let isDbConnected = false;

// ----------------------------------------
// Mock Data Fallbacks
// ----------------------------------------

const mockServices = [
  { id: 1, type: 'TRAINING', title: 'Cybersecurity Training', description: 'Comprehensive training programs to build strong foundations in cybersecurity.', features: ['Beginner to Advanced Tracks', 'Practical Hands-on Labs', 'Career-Focused Learning'], icon: 'BookOpen' },
  { id: 2, type: 'TRAINING', title: 'Industrial Training', description: 'Specialized training tailored for students and professionals entering the industry.', features: ['Real-World Case Studies', 'Industry-Recognized Practices', 'Project-Based Learning'], icon: 'Target' },
  { id: 3, type: 'WORKSHOP', title: 'Workshops', description: 'Short-term, intensive sessions designed to cover specific cybersecurity topics.', features: ['Ethical Hacking Workshops', 'Cloud Security Sessions', 'Emerging Threats'], icon: 'Activity' },
  { id: 4, type: 'COMPETITION', title: 'Capture The Flag (CTFs)', description: 'Gamified challenges that help learners apply their knowledge in real-world attack/defense scenarios.', features: ['Jeopardy-Style CTFs', 'Attack/Defense Scenarios', 'Prizes & Leaderboards'], icon: 'Flag' },
  { id: 5, type: 'SPECIALIZED', title: 'Digital Forensics & Incident Response', description: 'Training on investigating, analyzing, and responding to cyber incidents.', features: ['Malware Analysis', 'Network Forensics', 'Incident Handling'], icon: 'Search' }
];

const mockCertifications = [
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
];

const mockWeapons = [
  {
    id: 1,
    title: 'Nmap',
    category: 'Reconnaissance',
    description: 'Free and open source utility for network discovery and security auditing.',
    type: 'Tools & Labs',
    downloads: '50k+',
    difficulty: 'Beginner',
    icon: 'Search',
    command: 'nmap -sV -sC -T4 target-ip',
    details: 'Network Mapper is an industry-standard scanner used to discover hosts and services on a computer network by sending packets and analyzing the responses.'
  },
  {
    id: 2,
    title: 'Wireshark',
    category: 'Network Analysis',
    description: 'The world\'s foremost and widely-used network protocol analyzer.',
    type: 'Tools & Labs',
    downloads: '40k+',
    difficulty: 'Beginner',
    icon: 'Activity',
    command: 'tshark -i eth0 -w capture.pcap',
    details: 'Wireshark lets you see what\'s happening on your network at a microscopic level. It is the de facto standard across many commercial and non-profit enterprises.'
  },
  {
    id: 3,
    title: 'Burp Suite',
    category: 'Web Security',
    description: 'An integrated platform for performing security testing of web applications.',
    type: 'Tools & Labs',
    downloads: '30k+',
    difficulty: 'Intermediate',
    icon: 'Shield',
    command: 'Configure browser to proxy HTTP traffic via 127.0.0.1:8080',
    details: 'Burp Suite contains an intercepting proxy, application-aware web scanner, repeater, intruder, and sequencer to map and analyze an application\'s attack surface.'
  },
  {
    id: 4,
    title: 'Metasploit',
    category: 'Exploitation',
    description: 'Computer security project that provides information about security vulnerabilities.',
    type: 'Tools & Labs',
    downloads: '25k+',
    difficulty: 'Intermediate',
    icon: 'Terminal',
    command: 'msfconsole -q',
    details: 'Metasploit Framework is a modular penetration testing platform that enables security professionals to write, test, and execute exploit code against target systems.'
  },
  {
    id: 5,
    title: 'John the Ripper',
    category: 'Cryptography',
    description: 'Fast password cracker, currently available for many flavors of Unix, Windows, and DOS.',
    type: 'Tools & Labs',
    downloads: '20k+',
    difficulty: 'Intermediate',
    icon: 'Lock',
    command: 'john --wordlist=passwords.txt hash.txt',
    details: 'Its primary purpose is to detect weak Unix passwords. Besides several crypt password hash types, it supports custom hashes out of the box.'
  },
  {
    id: 6,
    title: 'Hydra',
    category: 'Exploitation',
    description: 'A very fast network logon cracker which supports numerous protocols.',
    type: 'Tools & Labs',
    downloads: '15k+',
    difficulty: 'Intermediate',
    icon: 'Target',
    command: 'hydra -l admin -P passwords.txt target-ip ssh',
    details: 'Hydra is a parallelized login cracker which supports numerous protocols to attack. It is very fast and flexible, allowing new modules to be added easily.'
  },
  {
    id: 7,
    title: 'Nikto',
    category: 'Web Security',
    description: 'Open source web server scanner which performs comprehensive tests against web servers.',
    type: 'Tools & Labs',
    downloads: '12k+',
    difficulty: 'Beginner',
    icon: 'Search',
    command: 'nikto -h http://target-ip',
    details: 'Nikto scans for over 6700 potentially dangerous files/programs, checks for outdated versions of over 1250 servers, and checks for specific server configuration items.'
  },
  {
    id: 8,
    title: 'Gobuster',
    category: 'Reconnaissance',
    description: 'Tool used to brute-force URIs, DNS subdomains, Virtual Host names, and Open S3 buckets.',
    type: 'Tools & Labs',
    downloads: '18k+',
    difficulty: 'Beginner',
    icon: 'Terminal',
    command: 'gobuster dir -u http://target-ip -w directory-list.txt',
    details: 'Written in Go, Gobuster is exceptionally fast at discovering hidden directories, files, and subdomains in target web and DNS servers.'
  },
  {
    id: 9,
    title: 'Sqlmap',
    category: 'Exploitation',
    description: 'Open source penetration testing tool that automates detecting SQL injection flaws.',
    type: 'Tools & Labs',
    downloads: '22k+',
    difficulty: 'Intermediate',
    icon: 'Target',
    command: 'sqlmap -u "http://target-ip/index.php?id=1" --dbs',
    details: 'Sqlmap comes with a powerful detection engine and supports direct database connections, password hashes fingerprinting, and privilege escalation.'
  },
  {
    id: 10,
    title: 'Snort',
    category: 'Defense',
    description: 'Open-source, free and lightweight network intrusion detection system.',
    type: 'Tools & Labs',
    downloads: '8k+',
    difficulty: 'Advanced',
    icon: 'Shield',
    command: 'snort -A console -q -c /etc/snort/snort.conf -i eth0',
    details: 'Snort is an IDS capable of performing real-time traffic analysis and packet logging on IP networks, helping identify probes and attacks.'
  },
  {
    id: 11,
    title: 'Autopsy',
    category: 'DFIR',
    description: 'Digital forensics platform and graphical interface to The Sleuth Kit and other tools.',
    type: 'Tools & Labs',
    downloads: '5k+',
    difficulty: 'Intermediate',
    icon: 'Award',
    command: 'Open Autopsy GUI and load disk image analysis module',
    details: 'Autopsy is used by law enforcement, military, and corporate examiners to investigate what happened on a computer, supporting timeline analysis and web artifact extraction.'
  },
  {
    id: 12,
    title: 'Hashcat',
    category: 'Cryptography',
    description: 'The world\'s fastest and most advanced password recovery utility.',
    type: 'Tools & Labs',
    downloads: '10k+',
    difficulty: 'Advanced',
    icon: 'Lock',
    command: 'hashcat -m 1800 hash.txt rockyou.txt',
    details: 'Hashcat supports five unique modes of attack for over 300 highly-optimized hashing algorithms, taking full advantage of GPU and GPU parallel execution.'
  }
];

const mockFAQs = [
  {
    id: 1,
    question: 'What prerequisites do I need to join this program?',
    answer: 'No strict prerequisites! Beginners are welcome. A basic understanding of computers and networks is helpful but not required as we start from scratch.'
  },
  {
    id: 2,
    question: 'Do you provide labs access?',
    answer: 'Yes! You will get access to our online interactive virtual labs, featuring hands-on exercises for practical application of concepts.'
  },
  {
    id: 3,
    question: 'What kind of jobs can I expect after this?',
    answer: 'Roles include Cybersecurity Analyst, Penetration Tester, Security Consultant, Incident Responder, and Junior Red Teamer.'
  },
  {
    id: 4,
    question: 'Are these courses updated?',
    answer: 'Yes! We continuously update our content and laboratory environments to incorporate the latest vulnerabilities and security threats.'
  },
  {
    id: 5,
    question: 'What is the difference between Industrial Training and workshops?',
    answer: 'Industrial Training is a comprehensive, multi-month program with in-depth modules, whereas workshops are focused, fast-paced 1-2 day bootcamps on specific topics.'
  },
  {
    id: 6,
    question: 'Can absolute beginners participate?',
    answer: 'Absolutely! Our training programs are designed with a "Novice to Vanguard" approach, moving from absolute basic concepts to expert-level techniques.'
  },
  {
    id: 7,
    question: 'Who runs these courses?',
    answer: 'The courses are developed and run by certified offensive security experts with years of real-world industry experience.'
  },
  {
    id: 8,
    question: 'Do your programs prepare me for certifications?',
    answer: 'Yes, our training prepares you for leading industry certifications as well as our custom professional certifications like CNSA, CPTE, and CNRE.'
  }
];

const mockBlogPosts = [
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
];

// Seed function for DB
const seedDB = async () => {
  try {
    // Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(mockServices);
      console.log('Database seeded with initial services.');
    }

    // Seed Certifications
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      await Certification.insertMany(mockCertifications);
      console.log('Database seeded with certifications.');
    }

    // Seed Weapons
    const weaponCount = await Weapon.countDocuments();
    if (weaponCount === 0) {
      await Weapon.insertMany(mockWeapons);
      console.log('Database seeded with weapons.');
    }

    // Seed FAQs
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      await FAQ.insertMany(mockFAQs);
      console.log('Database seeded with FAQs.');
    }

    // Seed Blog
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      await BlogPost.insertMany(mockBlogPosts);
      console.log('Database seeded with blog posts.');
    }
  } catch (error) {
    console.error('Error seeding DB:', error);
  }
};

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    isDbConnected = true;
    seedDB();
  })
  .catch((err) => {
    console.log('MongoDB connection error, using mock data fallback.', err.message);
  });

// ----------------------------------------
// API Routes
// ----------------------------------------

app.get('/api/services', async (req, res) => {
  if (isDbConnected) {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch services from DB' });
    }
  } else {
    res.json(mockServices);
  }
});

app.get('/api/certifications', async (req, res) => {
  if (isDbConnected) {
    try {
      const certifications = await Certification.find();
      res.json(certifications);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch certifications from DB' });
    }
  } else {
    res.json(mockCertifications);
  }
});

app.get('/api/weapons', async (req, res) => {
  if (isDbConnected) {
    try {
      const weapons = await Weapon.find();
      res.json(weapons);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch weapons from DB' });
    }
  } else {
    res.json(mockWeapons);
  }
});

app.get('/api/faqs', async (req, res) => {
  if (isDbConnected) {
    try {
      const faqs = await FAQ.find();
      res.json(faqs);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch faqs from DB' });
    }
  } else {
    res.json(mockFAQs);
  }
});

app.get('/api/blog', async (req, res) => {
  if (isDbConnected) {
    try {
      const blogs = await BlogPost.find();
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch blogs from DB' });
    }
  } else {
    res.json(mockBlogPosts);
  }
});

app.get('/', (req, res) => {
  res.send('Cyber Nexus API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
