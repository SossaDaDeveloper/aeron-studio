/**
 * AERON STUDIO | PROJECT AW/26
 * Pure Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. Initial Load / State Management
    // ---------------------------------------------------------
    const initApp = () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            triggerInitialAnims();
        }, 600);
    };

    // ---------------------------------------------------------
    // 2. Navigation & Sticky Header
    // ---------------------------------------------------------
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---------------------------------------------------------
    // 3. Reveal Animations (Intersection Observer)
    // ---------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Standard practice for reveal
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-up');
    revealElements.forEach(el => revealObserver.observe(el));

    const triggerInitialAnims = () => {
        // Double check elements in viewport on load
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    };

    // ---------------------------------------------------------
    // 4. Parallax Image Motion
    // ---------------------------------------------------------
    const parallaxItems = document.querySelectorAll('.parallax');
    const handleParallax = () => {
        const scrolled = window.scrollY;
        parallaxItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed')) || 0.05;
            const yPos = -(scrolled * speed);
            item.style.transform = `translateY(${yPos}px)`;
        });
    };
    window.addEventListener('scroll', handleParallax, { passive: true });

    // ---------------------------------------------------------
    // 5. Smooth Internal Scrolling
    // ---------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------------------------------------------------------
    // 6. Scroll to Top
    // ---------------------------------------------------------
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ---------------------------------------------------------
    // 7. Refined Magnetic/Hover Effects
    // ---------------------------------------------------------
    const hoverTriggers = document.querySelectorAll('.hover-trigger');
    hoverTriggers.forEach(target => {
        target.addEventListener('mousemove', (e) => {
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const sensitivity = 0.4;
            const moveX = x * sensitivity;
            const moveY = y * sensitivity;
            
            target.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        target.addEventListener('mouseleave', () => {
            target.style.transform = 'translate(0px, 0px)';
        });
    });

    // ---------------------------------------------------------
    // 8. Newsletter Simulation
    // ---------------------------------------------------------
    const newsForm = document.querySelector('.newsletter-form');
    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtnText = newsForm.querySelector('.submit-btn span');
            const input = newsForm.querySelector('.newsletter-input');
            const originalText = submitBtnText.textContent;
            
            submitBtnText.textContent = 'CONNECTING...';
            input.disabled = true;

            setTimeout(() => {
                submitBtnText.textContent = 'SYSTEM REGISTERED';
                newsForm.reset();
                input.disabled = false;
                
                setTimeout(() => {
                    submitBtnText.textContent = originalText;
                }, 4000);
            }, 1500);
        });
    }

    // Start
    initApp();
});
