"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
// --- Import Font Awesome ---
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPaperPlane, faCommentDots } from "@fortawesome/free-solid-svg-icons";
// ---------------------------

// --- Komponen Slider Proyek ---
const ProjectSlider = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="h-48 md:h-64 w-full bg-slate-100 flex items-center justify-center border-b border-slate-100">
        <span className="text-slate-500 text-sm font-medium">No Images Available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-56 md:h-64 bg-slate-50 overflow-hidden border-b border-slate-100 group">
      <motion.div
        className="flex w-full h-full"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
      >
        {images.map((imgSrc, idx) => (
          <div
            key={idx}
            className="w-full shrink-0 h-full bg-white p-3 flex items-center justify-center border-r-4 border-slate-50"
          >
            <img
              src={imgSrc}
              alt={`${title} screenshot ${idx + 1}`}
              className="max-w-full max-h-full object-contain drop-shadow-sm"
            />
          </div>
        ))}
      </motion.div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1.5 rounded-full z-10 pointer-events-none">
          {images.map((_, dotIdx) => (
            <div
              key={dotIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === dotIdx ? "w-3.5 bg-blue-500" : "w-1.5 bg-white opacity-70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
// ----------------------------

export default function Home() {
  const [guestName, setGuestName] = useState("");
  const [guestMsg, setGuestMsg] = useState("");
  const [guestbook, setGuestbook] = useState([]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePostGuestbook = (e) => {
    e.preventDefault();
    if(!guestName || !guestMsg) return;
    const newEntry = { name: guestName, date: new Date().toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric'}).toUpperCase(), msg: guestMsg };
    setGuestbook([newEntry, ...guestbook]);
    setGuestName("");
    setGuestMsg("");
  };

  const handleSendDM = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const bodyText = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:sitifatiharh@gmail.com?subject=${encodeURIComponent(subject)}&body=${bodyText}`;
    
    e.target.reset(); 
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-hidden selection:bg-blue-200">
      
      {/* --- DECORATIVE BACKGROUND BLOBS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-300/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-300/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-indigo-300/30 rounded-full blur-[100px] pointer-events-none"></div>
      {/* ----------------------------------- */}

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white/60 backdrop-blur-lg border-b border-white/40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer">
            Portofolio.
          </a>
          
          <ul className="hidden md:flex gap-8 font-medium text-sm text-slate-600">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="hover:text-blue-600 transition">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="flex-grow relative z-10 max-w-6xl mx-auto w-full px-6 pt-32 pb-20 space-y-32">
        
        {/* HERO / ABOUT SECTION */}
        <motion.section id="about" initial="hidden" animate="visible" variants={fadeUp} className="scroll-mt-32 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Hello, I'm <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Siti Fatiha Rahmah.</span>
              </h1>
              <p className="text-xl text-blue-600 font-semibold tracking-wide">Software Developer</p>
            </div>
            <p className="text-lg leading-relaxed text-slate-600 max-w-2xl">
              I'm an Information Technology fresh graduate specializing in mobile and web software development. Experienced in building frontend interfaces, backend systems for Android and Web applications, and deploying Machine Learning models. I enjoy translating system requirements into structured architectures, and I always personally test the features at the end to guarantee a reliable, bug-free experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" onClick={(e) => scrollToSection(e, "#projects")} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-3.5 rounded-full font-medium hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all transform">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="/cv_rahma.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-slate-300 bg-white/50 backdrop-blur-sm px-7 py-3.5 rounded-full font-medium hover:bg-white hover:shadow-md transition-all">
                Download CV <Download size={18} />
              </a>
            </div>
          </div>
          <div className="w-56 h-56 md:w-80 md:h-80 shrink-0 rounded-full overflow-hidden border-[6px] border-white shadow-2xl shadow-purple-500/20 hover:-translate-y-4 transition-all duration-500">
            <img src="/profile.JPG" alt="Siti Fatiha Rahmah" className="w-full h-full object-cover" />
          </div>
        </motion.section>

        {/* TECHNICAL SKILLS SECTION */}
        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="scroll-mt-32">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 text-center md:text-left">What I Do</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            {[
              { title: "Web & Frontend", tools: ["HTML", "CSS", "JavaScript", "PHP"] },
              { title: "Android Mobile", tools: ["Kotlin", "Jetpack Compose", "Android Studio"] },
              { title: "Backend & Databases", tools: ["Express.js", "Flask", "MySQL", "SQL Server", "Realm"] },
              { title: "AI & Data Science", tools: ["Python", "Scikit-Learn", "TensorFlow", "NLP", "Google ML Kit"] },
              { title: "Tools", tools: ["VS Code", "Git/GitHub", "Figma", "Draw.io", "Spreadsheets"] }
            ].map((skill, i) => (
              <div key={i} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <h3 className="font-bold text-lg mb-4 text-slate-900">{skill.title}</h3>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {skill.tools.map((tool, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-white border border-slate-100 text-slate-700 shadow-sm text-sm font-medium rounded-lg">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* EXPERIENCE SECTION */}
        <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="scroll-mt-32">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Experience</h2>
          <div className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row gap-4 justify-between">
              <div>
                <h4 className="font-bold text-xl text-slate-900">Software Developer Intern</h4>
                <p className="text-blue-600 font-medium mb-3">PT Sumitomo Electric Wintec Indonesia</p>
                <p className="text-slate-600">Digitilized internal operational workflows, successfully transitioning manual procedures into a streamlined, paperless reporting system.</p>
              </div>
              <div className="md:text-right shrink-0">
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100">Oct 2025 – Jan 2026</span>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row gap-4 justify-between">
              <div>
                <h4 className="font-bold text-xl text-slate-900">Organization Member</h4>
                <p className="text-purple-600 font-medium mb-3">LDK IKMI</p>
                <p className="text-slate-600">Served progressively over 3 periods as Media & Network Member, Vice Head of Media & Network, and Secretary 1, managing digital communications and administrative workflows.</p>
              </div>
              <div className="md:text-right shrink-0">
                <span className="inline-block px-4 py-1.5 bg-purple-50 text-purple-700 text-sm font-semibold rounded-full border border-purple-100">2022 – 2025</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* EDUCATION SECTION */}
        <motion.section id="education" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="scroll-mt-32">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Education</h2>
          <div className="p-6 md:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row gap-4 justify-between">
              <div>
                <h4 className="font-bold text-xl text-slate-900">B.Sc. in Computer Science (Information Technology)</h4>
                <p className="text-blue-600 font-medium mb-3">Universitas Esa Unggul | GPA: 3.86 / 4.00</p>
                <p className="text-slate-600"><strong>Final Thesis:</strong> "Rancang Bangun Sistem Pelacakan Biaya Berbasis Acara dengan Input Nota Belanja Menggunakan OCR dan Penganalisa Semantik."</p>
              </div>
              <div className="md:text-right shrink-0">
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100">Agt 2022 – Agt 2026</span>
              </div>
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="scroll-mt-32">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "NotaCara (Event-Based Expense Tracker)",
                desc: "An Android app to automate event expense tracking via receipt scanning. It integrates TensorFlow Lite (BiLSTM-CRF) and Google ML Kit for offline OCR and AI with 92% accuracy, utilizing a Realm database to manage automated expense accumulation and dynamic date filtering.",
                tech: ["Kotlin", "Jetpack Compose", "TFLite", "BiLSTM-CRF", "Google ML Kit", "Realm"],
                github: "https://github.com/sitifatiharh/notacara-app",
                images: ["/nota1.jpg", "/nota2.jpg", "/nota2.1.jpg", "/nota3.jpg", "/nota4.jpg"]
              },
              {
                title: "Patrol App (Operational Tracking)",
                desc: "An Android application developed to digitize internal operational inspections and defect tracking. It features a Role-Based Access Control (RBAC) system for three permission levels and a 4-stage hierarchical tracking workflow with dynamic input forms (text, choices, images) to accelerate reporting.",
                tech: ["Kotlin", "Jetpack Compose", "Express.js", "SQL Server", "RBAC", "Dynamic Forms"],
                github: "https://github.com/sitifatiharh/patrol-app-android",
                images: ["/patrol1.jpg", "/patrol2.jpg", "/patrol3.jpg", "/patrol4.jpg"]
              },
              {
                title: "Library Management Web System",
                desc: "A full-stack web application to manage digital book catalogs and loan circulation. It implements RBAC system enabling librarians to securely manage book inventories and multi-state loan statuses, alongside user interfaces for catalog browsing and borrowing requests.",
                tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Web Flow"],
                github: "https://github.com/sitifatiharh/perpus-web",
                images: ["/web1.jpeg", "/web2.jpeg", "/web3.jpeg", "/web4.jpeg"]
              },
              {
                title: "U.S. Tariff Sentiment Analysis",
                desc: "A data science research analyzing sentiment on U.S. import tariff policies using 10,154 Twitter records. It compares SVM baseline against a BiLSTM architecture, achieving a peak accuracy of 91%.",
                tech: ["Python", "BiLSTM", "SVM", "NLP"],
                github: "https://github.com/sitifatiharh/sentiment-analysis-import-trump",
                images: ["/sentiment1.png"]
              }
            ].map((project, i) => (
                <div key={i} className={`flex flex-col rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden group relative`}>
                  
                  <ProjectSlider images={project.images} title={project.title} />

                  <div className="p-8 flex flex-col flex-1 pb-16">
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{project.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{project.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 p-2 rounded-full bg-white/50 text-slate-400 hover:text-slate-900 hover:bg-white shadow-sm transition-all duration-300 z-10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                    </a>
                  )}
                </div>
              ))}
          </div>
        </motion.section>

        {/* CONTACT & GUESTBOOK SECTION */}
        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="scroll-mt-32">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Let's Connect</h2>
            <p className="text-lg text-slate-600">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Drop me a message or leave your mark in the guestbook!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Bagian Kiri: Send a Direct Message */}
            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl shadow-slate-200/50 flex flex-col">
              <div className="flex items-center gap-3 mb-6 text-slate-900">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 w-6 h-6" />
                <h3 className="text-2xl font-bold">Send a Direct Message</h3>
              </div>
              <form className="space-y-5" onSubmit={handleSendDM}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Your Name</label>
                  <input required name="name" type="text" placeholder="Name" className="scroll-mt-50 w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Email</label>
                  <input required name="email" type="email" placeholder="you@example.com" className="scroll-mt-50 w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Subject</label>
                  <input required name="subject" type="text" placeholder="Opportunity / collaboration" className="scroll-mt-50 w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Message</label>
                  <textarea required name="message" rows="4" placeholder="Tell me about the opportunity..." className="scroll-mt-50 w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none shadow-sm"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl hover:shadow-blue-500/30">
                  Send Message <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bagian Kanan: Guestbook */}
            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl shadow-slate-200/50 flex flex-col">
              <div className="flex items-center gap-3 mb-6 text-slate-900">
                <FontAwesomeIcon icon={faCommentDots} className="text-purple-600 w-6 h-6" />
                <h3 className="text-2xl font-bold flex items-center gap-2">Guestbook <span className="text-sm font-semibold bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full shadow-sm">{guestbook.length}</span></h3>
              </div>
              
              <form className="space-y-5 mb-8" onSubmit={handlePostGuestbook}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Name</label>
                  <input required value={guestName} onChange={(e)=>setGuestName(e.target.value)} type="text" placeholder="Enter your name" className="scroll-mt-50 w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Message</label>
                  <textarea required value={guestMsg} onChange={(e)=>setGuestMsg(e.target.value)} rows="3" placeholder="Write your message here..." className="scroll-mt-50 w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none shadow-sm"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl hover:shadow-purple-500/30">
                  Post Comment <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                </button>
              </form>

              {/* List Komentar Guestbook */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[300px] scrollbar-thin scrollbar-thumb-slate-300">
                {guestbook.map((entry, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white shadow-sm border-l-4 border-l-purple-500">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-sm text-white flex items-center justify-center font-bold text-sm">
                          {entry.name.charAt(0).toUpperCase()}
                        </div>
                        <h5 className="font-bold text-sm text-slate-900">{entry.name}</h5>
                      </div>
                      <span className="text-xs text-slate-400 font-semibold tracking-wide">{entry.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed ml-11">{entry.msg}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full pt-12 pb-8 flex flex-col items-center gap-4 mt-auto">
        <div className="flex gap-4">
          <a href="https://github.com/sitifatiharh" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center">
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/sitifatiharh" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center">
            <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
          </a>
          <a href="mailto:sitifatiharh@gmail.com" className="p-3 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center">
            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
          </a>
        </div>
        <p className="text-slate-500 text-sm font-medium">© 2026 sitifatiharh. All Rights Reserved.</p>
      </footer>
    </div>
  );
}