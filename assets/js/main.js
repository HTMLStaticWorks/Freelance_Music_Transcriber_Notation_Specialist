document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

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

    // Parallax Effects
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

    // Mouse Reactive Depth (Desktop only)
    if (window.innerWidth > 1024) {
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

                    <div class="hidden lg:flex items-center gap-8">
                        <a href="index.html" class="nav-link text-sm font-medium hover:text-cyan-400 transition-colors">Home</a>
                        <a href="home2.html" class="nav-link text-sm font-medium hover:text-cyan-400 transition-colors">Home 2</a>
                        <a href="about.html" class="nav-link text-sm font-medium hover:text-cyan-400 transition-colors">About</a>
                        <a href="services.html" class="nav-link text-sm font-medium hover:text-cyan-400 transition-colors">Services</a>
                        <a href="portfolio.html" class="nav-link text-sm font-medium hover:text-cyan-400 transition-colors">Portfolio</a>
                        <a href="genres.html" class="nav-link text-sm font-medium hover:text-cyan-400 transition-colors">Genres</a>
                        <a href="pricing.html" class="nav-link text-sm font-medium hover:text-cyan-400 transition-colors">Pricing</a>
                        <a href="contact.html" class="nav-link text-sm font-medium hover:text-cyan-400 transition-colors">Contact</a>
                        <a href="dashboard.html" class="nav-link text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">Dashboard</a>
                    </div>

                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-3 bg-white/5 p-1 rounded-full border border-white/10">
                            <button id="themeToggle" class="p-2 hover:bg-white/10 rounded-full transition-colors"><i data-lucide="moon" class="w-4 h-4"></i></button>
                            <button id="rtlToggle" class="p-2 hover:bg-white/10 rounded-full transition-colors"><span class="text-[10px] font-bold">RTL</span></button>
                            <a href="login.html" class="p-2 hover:bg-white/10 rounded-full transition-colors"><i data-lucide="user" class="w-4 h-4"></i></a>
                        </div>
                        <button class="lg:hidden p-2 text-white"><i data-lucide="menu" class="w-6 h-6"></i></button>
                    </div>
                </nav>
            </header>
        `;
    }

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
                                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 transition-all border border-white/10">
                                    <i data-lucide="twitter" class="w-4 h-4"></i>
                                </a>
                                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 transition-all border border-white/10">
                                    <i data-lucide="instagram" class="w-4 h-4"></i>
                                </a>
                                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 transition-all border border-white/10">
                                    <i data-lucide="linkedin" class="w-4 h-4"></i>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 class="text-white font-semibold mb-6">Services</h4>
                            <ul class="space-y-4 text-sm text-slate-400">
                                <li><a href="#" class="hover:text-cyan-400 transition-colors">Piano Transcription</a></li>
                                <li><a href="#" class="hover:text-cyan-400 transition-colors">Orchestral Scoring</a></li>
                                <li><a href="#" class="hover:text-cyan-400 transition-colors">MIDI Conversion</a></li>
                                <li><a href="#" class="hover:text-cyan-400 transition-colors">Guitar Tabs</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="text-white font-semibold mb-6">Quick Links</h4>
                            <ul class="space-y-4 text-sm text-slate-400">
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

    // Re-initialize Lucide icons
    lucide.createIcons();
}
