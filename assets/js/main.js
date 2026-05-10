document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Page Reveal Animations
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach((el) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

    // Parallax Effects
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const parallaxItems = document.querySelectorAll('.parallax');
        parallaxItems.forEach((item) => {
            const speed = item.dataset.speed || 0.5;
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: (i, target) => -ScrollTrigger.maxScroll(window) * speed * 0.1
            });
        });
    }

    // Mouse Reactive Depth (Desktop only)
    if (window.innerWidth > 1024 && typeof gsap !== 'undefined') {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.tilt-card');
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                
                const rotateX = (clientY - cardCenterY) * 0.01;
                const rotateY = (clientX - cardCenterX) * -0.01;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Component Loader
    loadComponents();

    // Scroll to top visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(20px)';
            }
        });
    }

    // Re-initialize Lucide icons
    lucide.createIcons();
});

async function loadComponents() {
    const header = document.querySelector('header-component');
    const footer = document.querySelector('footer-component');

    if (header) {
        header.innerHTML = `
            <header class="fixed top-0 left-0 w-full z-50 transition-all duration-300 sticky-nav">
                <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="index.html" class="flex items-center gap-2">
                        <div class="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-lg flex items-center justify-center">
                            <i data-lucide="music-4" class="text-white w-6 h-6"></i>
                        </div>
                        <span class="text-xl font-bold font-sora tracking-tight">Notation<span class="text-cyan-400">Pro</span></span>
                    </a>

                    <div class="hidden lg:flex items-center gap-4 xl:gap-8">
                        <a href="index.html" class="nav-link text-[13px] xl:text-sm font-medium hover:text-cyan-400 transition-colors">Home</a>
                        <a href="home2.html" class="nav-link text-[13px] xl:text-sm font-medium hover:text-cyan-400 transition-colors">Home 2</a>
                        <a href="about.html" class="nav-link text-[13px] xl:text-sm font-medium hover:text-cyan-400 transition-colors">About</a>
                        <a href="services.html" class="nav-link text-[13px] xl:text-sm font-medium hover:text-cyan-400 transition-colors">Services</a>
                        <a href="portfolio.html" class="nav-link text-[13px] xl:text-sm font-medium hover:text-cyan-400 transition-colors">Portfolio</a>
                        <a href="genres.html" class="nav-link text-[13px] xl:text-sm font-medium hover:text-cyan-400 transition-colors">Genres</a>
                        <a href="pricing.html" class="nav-link text-[13px] xl:text-sm font-medium hover:text-cyan-400 transition-colors">Pricing</a>
                        <a href="contact.html" class="nav-link text-[13px] xl:text-sm font-medium hover:text-cyan-400 transition-colors">Contact</a>
                        <a href="dashboard.html" class="nav-link text-[13px] xl:text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">Dashboard</a>
                    </div>

                    <div class="flex items-center gap-4">
                        <div class="hidden lg:flex items-center gap-3 bg-white/5 p-1 rounded-full border border-white/10 theme-controls">
                            <button id="themeToggle" class="p-2 hover:bg-white/10 rounded-full transition-colors"><i data-lucide="moon" class="w-4 h-4"></i></button>
                            <button id="rtlToggle" class="p-2 hover:bg-white/10 rounded-full transition-colors"><span class="text-[10px] font-black tracking-tighter">RTL</span></button>
                            <a href="login.html" class="p-2 hover:bg-white/10 rounded-full transition-colors"><i data-lucide="user" class="w-4 h-4"></i></a>
                        </div>
                        <button id="mobileMenuBtn" class="lg:hidden p-2"><i data-lucide="menu" class="w-6 h-6"></i></button>
                    </div>
                </nav>

                <!-- Mobile Menu Overlay -->
                <div id="mobileMenu" style="position: fixed; inset: 0; z-index: 999999; background: #020617; transform: translateX(100%); transition: transform 0.3s ease-out; overflow-y: auto;" class="lg:hidden">
                    <div id="mobileMenuInner" style="display: flex; flex-direction: column; min-height: 100%; padding: 2rem; background: inherit;">
                        <div class="flex items-center justify-between mb-10">
                            <span class="text-xl font-bold font-sora">Menu</span>
                            <button id="mobileMenuClose" class="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <i data-lucide="x" class="w-6 h-6"></i>
                            </button>
                        </div>
                        <div class="flex flex-col gap-8 flex-grow">
                            <a href="index.html" class="nav-link mobile-nav-link text-3xl font-black hover:text-cyan-400 transition-colors">Home</a>
                            <a href="home2.html" class="nav-link mobile-nav-link text-3xl font-black hover:text-cyan-400 transition-colors">Home 2</a>
                            <a href="about.html" class="nav-link mobile-nav-link text-3xl font-black hover:text-cyan-400 transition-colors">About</a>
                            <a href="services.html" class="nav-link mobile-nav-link text-3xl font-black hover:text-cyan-400 transition-colors">Services</a>
                            <a href="portfolio.html" class="nav-link mobile-nav-link text-3xl font-black hover:text-cyan-400 transition-colors">Portfolio</a>
                            <a href="genres.html" class="nav-link mobile-nav-link text-3xl font-black hover:text-cyan-400 transition-colors">Genres</a>
                            <a href="pricing.html" class="nav-link mobile-nav-link text-3xl font-black hover:text-cyan-400 transition-colors">Pricing</a>
                            <a href="contact.html" class="nav-link mobile-nav-link text-3xl font-black hover:text-cyan-400 transition-colors">Contact</a>
                            <a href="dashboard.html" class="nav-link mobile-nav-link text-3xl font-black text-purple-400 hover:text-purple-300 transition-colors">Dashboard</a>
                        </div>
                        <div class="flex items-center gap-4 pt-6 border-t border-white/10">
                            <button id="themeToggleMobile" class="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><i data-lucide="moon" class="w-5 h-5"></i></button>
                            <button id="rtlToggleMobile" class="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><span class="text-xs font-bold">RTL</span></button>
                            <a href="login.html" class="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><i data-lucide="user" class="w-5 h-5"></i></a>
                        </div>
                    </div>
                </div>
            </header>
        `;

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const theme = document.documentElement.getAttribute('data-theme');
                mobileMenu.style.background = theme === 'light' ? '#FFFFFF' : '#020617';
                mobileMenu.style.color = theme === 'light' ? '#000000' : '#FFFFFF';
                mobileMenu.style.transform = 'translateX(0)';
                document.body.style.overflow = 'hidden';
            });
        }
        if (mobileMenuClose && mobileMenu) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.style.transform = 'translateX(100%)';
                document.body.style.overflow = '';
            });
        }

        // Mobile Theme Toggle
        const themeToggleMobile = document.getElementById('themeToggleMobile');
        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                setTheme(newTheme);
            });
        }

        // Mobile RTL Toggle
        const rtlToggleMobile = document.getElementById('rtlToggleMobile');
        if (rtlToggleMobile) {
            rtlToggleMobile.addEventListener('click', () => {
                const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
                const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
                document.documentElement.setAttribute('dir', newDir);
                localStorage.setItem('dir', newDir);
            });
        }

        // Highlight Active Link
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';
        const navLinks = header.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('active');
                if (link.classList.contains('mobile-nav-link')) {
                    link.style.color = 'var(--accent-primary)';
                    link.classList.add('text-cyan-400');
                }
            }
        });
    }

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Initialize RTL
    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        document.documentElement.setAttribute('dir', savedDir);
    }

    // Global Toggles (Login/Register/Header)
    const themeToggles = document.querySelectorAll('#themeToggle, #themeToggleMobile');
    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    });

    const rtlToggles = document.querySelectorAll('#rtlToggle, #rtlToggleMobile');
    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    });

    if (footer) {

        footer.innerHTML = `
            <footer class="relative pt-20 pb-10 bg-slate-950 border-t border-white/5 overflow-hidden">
                <div class="orb orb-2"></div>
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div>
                            <div class="flex items-center gap-2 mb-6">
                                <div class="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-400 rounded flex items-center justify-center">
                                    <i data-lucide="music-4" class="text-white w-5 h-5"></i>
                                </div>
                                <span class="text-lg font-bold font-sora">Notation<span class="text-cyan-400">Pro</span></span>
                            </div>
                            <p class="text-slate-400 text-sm leading-relaxed mb-6">
                                Premium music transcription and notation services for world-class composers and film scorers.
                            </p>
                            <div class="flex gap-4">
                                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 transition-all border border-white/10 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-400 group-hover:text-cyan-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-2.6.6-5.6 3.4-6.6 2.7-.6 5.3 1 6.6 3.4.7-.2 1.5-.4 2.2-.6-.5.8-1.1 1.5-1.8 2.1z"/></svg>
                                </a>
                                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 transition-all border border-white/10 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-400 group-hover:text-cyan-400"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                                </a>
                                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 transition-all border border-white/10 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-400 group-hover:text-cyan-400"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                                </a>
                            </div>
                        </div>

                        <div class="footer-col">
                            <h4 class="text-white font-semibold mb-6 flex items-center justify-between cursor-pointer md:cursor-default" onclick="toggleFooter(this)">
                                Services 
                                <i data-lucide="chevron-down" class="w-4 h-4 md:hidden transition-transform"></i>
                            </h4>
                            <ul class="space-y-4 text-sm text-slate-400 footer-list">
                                <li><a href="#" class="hover:text-cyan-400 transition-colors">Piano Transcription</a></li>
                                <li><a href="#" class="hover:text-cyan-400 transition-colors">Orchestral Scoring</a></li>
                                <li><a href="#" class="hover:text-cyan-400 transition-colors">MIDI Conversion</a></li>
                                <li><a href="#" class="hover:text-cyan-400 transition-colors">Guitar Tabs</a></li>
                            </ul>
                        </div>

                        <div class="footer-col">
                            <h4 class="text-white font-semibold mb-6 flex items-center justify-between cursor-pointer md:cursor-default" onclick="toggleFooter(this)">
                                Quick Links 
                                <i data-lucide="chevron-down" class="w-4 h-4 md:hidden transition-transform"></i>
                            </h4>
                            <ul class="space-y-4 text-sm text-slate-400 footer-list">
                                <li><a href="portfolio.html" class="hover:text-cyan-400 transition-colors">Our Portfolio</a></li>
                                <li><a href="pricing.html" class="hover:text-cyan-400 transition-colors">Pricing Plans</a></li>
                                <li><a href="about.html" class="hover:text-cyan-400 transition-colors">Story & Vision</a></li>
                                <li><a href="contact.html" class="hover:text-cyan-400 transition-colors">Get in Touch</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="text-white font-semibold mb-6">Newsletter</h4>
                            <p class="text-sm text-slate-400 mb-6">Stay updated with the latest in music notation technology.</p>
                            <form class="flex gap-2">
                                <input type="email" placeholder="Your email" class="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-400 w-full">
                                <button type="submit" class="bg-cyan-500 p-2 rounded-lg hover:bg-cyan-400 transition-colors">
                                    <i data-lucide="send" class="w-4 h-4"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div class="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p class="text-slate-500 text-xs">© 2026 NotationPro Specialist. All rights reserved.</p>
                        <div class="flex gap-8 text-xs text-slate-500">
                            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" class="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
                <div class="waveform-bg">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                        <path d="M0 120V60C100 40 200 80 300 60C400 40 500 80 600 60C700 40 800 80 900 60C1000 40 1100 80 1200 60C1300 40 1400 80 1440 60V120H0Z" fill="url(#waveGradient)" fill-opacity="0.1"/>
                        <defs>
                            <linearGradient id="waveGradient" x1="720" y1="0" x2="720" y2="120" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#38BDF8"/>
                                <stop offset="1" stop-color="#8B5CF6"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </footer>
        `;
    }

    // Icons are now initialized in the DOMContentLoaded listener
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeToggles = document.querySelectorAll('#themeToggle, #themeToggleMobile');
    themeToggles.forEach(toggle => {
        const icon = theme === 'light' ? 'moon' : 'sun';
        toggle.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i>`;
    });
    
    // Always re-create icons after theme change
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function toggleFooter(element) {
    if (window.innerWidth >= 768) return;
    const col = element.parentElement;
    const list = col.querySelector('.footer-list');
    const icon = element.querySelector('i');
    
    col.classList.toggle('active');
    if (col.classList.contains('active')) {
        list.style.maxHeight = list.scrollHeight + "px";
        list.style.opacity = "1";
        if (icon) icon.style.transform = "rotate(180deg)";
    } else {
        list.style.maxHeight = "0";
        list.style.opacity = "0";
        if (icon) icon.style.transform = "rotate(0deg)";
    }
}
