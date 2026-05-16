document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load Animation
    setTimeout(() => {
        document.body.classList.remove('loading');
        triggerInitialReveal();
    }, 500);

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    function triggerInitialReveal() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }

    // 4. Parallax Effect
    const parallaxItems = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallaxItems.forEach(item => {
            const speed = item.getAttribute('data-speed') || 0.05;
            const yPos = -(scrolled * speed);
            item.style.transform = `translateY(${yPos}px)`;
        });
    });

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetPosition = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Scroll to Top
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Magnetic Button Effect (Refined)
    const hoverTriggers = document.querySelectorAll('.hover-trigger');
    hoverTriggers.forEach(trigger => {
        trigger.addEventListener('mousemove', (e) => {
            const rect = trigger.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 15;
            const moveX = x / strength;
            const moveY = y / strength;
            
            trigger.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        trigger.addEventListener('mouseleave', () => {
            trigger.style.transform = `translate(0px, 0px)`;
        });
    });

    // 8. Newsletter Form Mock
    const newsForm = document.querySelector('.newsletter-form');
    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsForm.querySelector('.submit-btn span');
            const originalText = btn.textContent;
            
            btn.textContent = 'CONNECTING...';
            
            setTimeout(() => {
                btn.textContent = 'SYSTEM UPDATED';
                newsForm.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 3000);
            }, 1200);
        });
    }
});
