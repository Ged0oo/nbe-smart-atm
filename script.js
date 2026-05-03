/* ============================================
   🏛️ NBE ATM ROUTING - SCRIPT
   Smart ATM Routing System
   National Bank of Egypt (NBE)
============================================= */

(function () {
    'use strict';

    // ============================================
    // 🚀 INITIALIZATION
    // ============================================
    document.addEventListener('DOMContentLoaded', function () {
        initNavbar();
        initMobileMenu();
        initFAQ();
        initScrollAnimations();
        initStatsCounter();
        initSmoothScroll();
        initPhoneMockupAnimation();
        initParallaxEffect();
        initTypewriter();
        initLoadingAnimations();
        console.log('%c🏛️ ماكينتك - البنك الأهلي المصري', 'color: #006A4E; font-size: 20px; font-weight: bold;');
        console.log('%cNBE Smart ATM Routing System v1.0', 'color: #C9A961; font-size: 14px;');
    });

    // ============================================
    // 🏛️ NAVBAR SCROLL EFFECT
    // ============================================
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        if (!navbar) return;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Add shadow on scroll
            if (currentScroll > 50) {
                navbar.style.padding = '8px 0';
                navbar.style.boxShadow = '0 5px 30px rgba(0, 106, 78, 0.12)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.padding = '0';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 106, 78, 0.05)';
                navbar.style.background = 'rgba(255, 255, 255, 0.97)';
            }

            // Hide/Show navbar on scroll direction
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }

    // ============================================
    // 📱 MOBILE MENU
    // ============================================
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ============================================
    // ❓ FAQ ACCORDION
    // ============================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            if (!question) return;

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all FAQ items
                faqItems.forEach(i => i.classList.remove('active'));

                // Open clicked item if it wasn't already active
                if (!isActive) {
                    item.classList.add('active');

                    // Smooth scroll to question
                    setTimeout(() => {
                        const offset = 100;
                        const elementPosition = item.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;

                        if (elementPosition < 0) {
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                }
            });
        });
    }

    // ============================================
    // 🎬 SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.problem-card, .feature-card, .step-card, .testimonial-card, .stat-card, .agent-card, .faq-item'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    // ============================================
    // 📊 STATS COUNTER ANIMATION
    // ============================================
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');

        if (!statNumbers.length) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, 0, target, 2000);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => counterObserver.observe(stat));
    }

    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + range * easeOut);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ============================================
    // 🔗 SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                if (href === '#' || href === '') return;

                const targetSection = document.querySelector(href);

                if (targetSection) {
                    e.preventDefault();
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                    const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // 📱 PHONE MOCKUP DYNAMIC ANIMATION
    // ============================================
    function initPhoneMockupAnimation() {
        const atmCards = document.querySelectorAll('.phone-screen .atm-card');

        atmCards.forEach((card, index) => {
            card.style.animationDelay = `${0.3 + (index * 0.2)}s`;
        });

        // Simulate live ATM updates
        const recommendedCard = document.querySelector('.atm-card.recommended');
        if (recommendedCard) {
            setInterval(() => {
                recommendedCard.style.transform = 'scale(1.02)';
                recommendedCard.style.boxShadow = '0 10px 40px rgba(201, 169, 97, 0.4)';

                setTimeout(() => {
                    recommendedCard.style.transform = 'scale(1)';
                    recommendedCard.style.boxShadow = '0 5px 20px rgba(0, 106, 78, 0.06)';
                }, 600);
            }, 3500);
        }

        // Simulate floating cards animation
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            card.style.animationDelay = `${0.5 + (index * 0.3)}s`;
        });
    }

    // ============================================
    // 🌊 PARALLAX EFFECT FOR HERO
    // ============================================
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        const phoneMockup = document.querySelector('.phone-mockup');

        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const parallaxSpeed = scrolled * 0.3;

                if (phoneMockup) {
                    phoneMockup.style.transform = `translateY(${-parallaxSpeed * 0.2}px)`;
                }

                // Fade hero pattern
                const heroPattern = document.querySelector('.hero-pattern');
                if (heroPattern) {
                    heroPattern.style.opacity = 1 - (scrolled / heroHeight);
                }
            }
        });

        // Mouse parallax for hero (Desktop only)
        if (window.innerWidth > 968) {
            hero.addEventListener('mousemove', (e) => {
                if (!phoneMockup) return;

                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;

                phoneMockup.style.transform = `translate(${x}px, ${y}px) rotate(-1deg)`;
            });

            hero.addEventListener('mouseleave', () => {
                if (phoneMockup) {
                    phoneMockup.style.transform = 'translate(0, 0) rotate(0deg)';
                }
            });
        }
    }

    // ============================================
    // ⌨️ TYPEWRITER EFFECT (Optional Enhancement)
    // ============================================
    function initTypewriter() {
        const searchBox = document.querySelector('.search-box span');
        if (!searchBox) return;

        const messages = [
            'سحب 5,000 جنيه - دائرة 5 كم',
            'إيداع 10,000 جنيه - أقرب فرع',
            'تحويل لحساب آخر - الأهلي',
            'استعلام عن الرصيد - أي ماكينة'
        ];

        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function type() {
            const currentMessage = messages[messageIndex];

            if (isDeleting) {
                searchBox.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30;
            } else {
                searchBox.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentMessage.length) {
                typingSpeed = 2500; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        // Start typewriter after delay
        setTimeout(type, 2000);
    }

    // ============================================
    // 🎨 LOADING ANIMATIONS
    // ============================================
    function initLoadingAnimations() {
        // Hero text animation on load
        const heroText = document.querySelector('.hero-text');
        const heroVisual = document.querySelector('.hero-visual');

        if (heroText) {
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateX(30px)';
            heroText.style.transition = 'opacity 1s ease, transform 1s ease';

            setTimeout(() => {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateX(0)';
            }, 200);
        }

        if (heroVisual) {
            heroVisual.style.opacity = '0';
            heroVisual.style.transform = 'translateX(-30px) scale(0.95)';
            heroVisual.style.transition = 'opacity 1.2s ease, transform 1.2s ease';

            setTimeout(() => {
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateX(0) scale(1)';
            }, 400);
        }
    }

    // ============================================
    // 🎯 BUTTON RIPPLE EFFECT
    // ============================================
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-white, .btn-outline-white').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to stylesheet
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ============================================
    // 🎬 DYNAMIC ATM LIVE UPDATES (Demo)
    // ============================================
    function simulateLiveATMUpdates() {
        const atmCards = document.querySelectorAll('.phone-screen .atm-card:not(.recommended)');
        const statuses = [
            { text: 'متاحة', color: 'rgba(0, 106, 78, 0.15)', textColor: '#006A4E' },
            { text: 'فيها فلوس', color: 'rgba(201, 169, 97, 0.2)', textColor: '#C9A961' }
        ];

        let updateInterval = setInterval(() => {
            atmCards.forEach(card => {
                const badge = card.querySelector('.badge-info');
                if (badge && Math.random() > 0.5) {
                    const status = statuses[Math.floor(Math.random() * statuses.length)];
                    badge.style.background = status.color;
                    badge.style.color = status.textColor;
                    badge.textContent = status.text;

                    // Pulse effect
                    badge.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        badge.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        }, 4000);

        // Stop updates if user scrolls away from hero
        window.addEventListener('scroll', () => {
            const hero = document.querySelector('.hero');
            if (hero) {
                const heroBottom = hero.getBoundingClientRect().bottom;
                if (heroBottom < 0 && updateInterval) {
                    clearInterval(updateInterval);
                    updateInterval = null;
                }
            }
        });
    }

    setTimeout(simulateLiveATMUpdates, 3000);

    // ============================================
    // 🌐 LOCATION DETECTION (Demo)
    // ============================================
    function detectUserLocation() {
        const trustItems = document.querySelectorAll('.trust-item');

        if ('geolocation' in navigator) {
            // Add location badge dynamically (just for demo)
            const heroBadge = document.querySelector('.hero-badge');
            if (heroBadge) {
                heroBadge.title = 'متاح في كل محافظات مصر';
            }
        }
    }

    detectUserLocation();

    // ============================================
    // 📊 SCROLL PROGRESS INDICATOR
    // ============================================
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #006A4E, #C9A961);
            z-index: 9999;
            transition: width 0.1s ease;
            width: 0%;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    initScrollProgress();

    // ============================================
    // 🎯 ACTIVE NAV LINK ON SCROLL
    // ============================================
    function initActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        if (!sections.length || !navLinks.length) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 120;
                const sectionId = section.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.style.color = '';
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.style.color = '#006A4E';
                        }
                    });
                }
            });
        });
    }

    initActiveNavLink();

    // ============================================
    // 🎁 EASTER EGG (Konami Code)
    // ============================================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            showEasterEgg();
        }
    });

    function showEasterEgg() {
        const egg = document.createElement('div');
        egg.innerHTML = '🏛️ تحية من البنك الأهلي المصري! 1898 ❤️';
        egg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #006A4E, #C9A961);
            color: white;
            padding: 30px 50px;
            border-radius: 20px;
            font-size: 24px;
            font-weight: bold;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 99999;
            animation: easterEgg 3s ease-out forwards;
        `;

        const eggStyle = document.createElement('style');
        eggStyle.textContent = `
            @keyframes easterEgg {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                30% { transform: translate(-50%, -50%) scale(1); }
                90% { opacity: 1; }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            }
        `;
        document.head.appendChild(eggStyle);
        document.body.appendChild(egg);

        setTimeout(() => egg.remove(), 3000);
    }

    // ============================================
    // 🔧 PERFORMANCE: LAZY LOADING
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // 🎯 BUTTON CLICK HANDLERS (Demo)
    // ============================================
    document.querySelectorAll('.btn-primary, .btn-white').forEach(btn => {
        if (btn.textContent.includes('حمّل') || btn.textContent.includes('ابدأ')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showDownloadModal();
            });
        }
    });

    function showDownloadModal() {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'download-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-icon">
                    <i class="fas fa-university"></i>
                </div>
                <h3>قريباً على متاجر التطبيقات!</h3>
                <p>تطبيق "ماكينتك" من البنك الأهلي المصري قيد التطوير حالياً. سجّل بريدك الإلكتروني وهنبعتلك أول ما يكون متاح!</p>
                <div class="modal-form">
                    <input type="email" placeholder="بريدك الإلكتروني" class="modal-input">
                    <button class="btn-primary modal-submit">سجّلني</button>
                </div>
                <div class="modal-stores">
                    <span><i class="fab fa-google-play"></i> Android</span>
                    <span><i class="fab fa-apple"></i> iOS</span>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .download-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 99998;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: modalFadeIn 0.3s ease-out;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(5px);
            }
            .modal-content {
                position: relative;
                background: white;
                padding: 50px 40px;
                border-radius: 25px;
                max-width: 480px;
                width: 90%;
                text-align: center;
                box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
                animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border-top: 5px solid #C9A961;
            }
            .modal-close {
                position: absolute;
                top: 15px;
                left: 20px;
                background: none;
                border: none;
                font-size: 32px;
                color: #6B7C75;
                cursor: pointer;
                transition: color 0.3s;
            }
            .modal-close:hover {
                color: #D4321C;
            }
            .modal-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #006A4E, #00A876);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                color: white;
                font-size: 36px;
                box-shadow: 0 10px 30px rgba(0, 106, 78, 0.3);
            }
            .modal-content h3 {
                color: #006A4E;
                font-size: 24px;
                margin-bottom: 12px;
                font-weight: 900;
            }
            .modal-content p {
                color: #6B7C75;
                font-size: 15px;
                margin-bottom: 25px;
                line-height: 1.7;
            }
            .modal-form {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
            }
            .modal-input {
                flex: 1;
                padding: 14px 18px;
                border: 2px solid #E8EDE9;
                border-radius: 50px;
                font-family: 'Cairo', sans-serif;
                font-size: 14px;
                outline: none;
                transition: border-color 0.3s;
                text-align: right;
            }
            .modal-input:focus {
                border-color: #006A4E;
            }
            .modal-submit {
                padding: 14px 24px !important;
            }
            .modal-stores {
                display: flex;
                justify-content: center;
                gap: 25px;
                padding-top: 20px;
                border-top: 1px solid #E8EDE9;
                color: #6B7C75;
                font-size: 14px;
                font-weight: 600;
            }
            .modal-stores span {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .modal-stores i {
                color: #006A4E;
                font-size: 18px;
            }
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalSlideIn {
                from { opacity: 0; transform: translateY(-50px) scale(0.9); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @media (max-width: 600px) {
                .modal-form { flex-direction: column; }
                .modal-content { padding: 40px 25px; }
            }
        `;
        document.head.appendChild(modalStyle);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close handlers
        const closeModal = () => {
            modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

        modal.querySelector('.modal-submit').addEventListener('click', (e) => {
            e.preventDefault();
            const input = modal.querySelector('.modal-input');
            const email = input.value.trim();

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                input.style.borderColor = '#D4321C';
                input.placeholder = 'من فضلك أدخل بريد صحيح';
                input.value = '';
                return;
            }

            // Success animation
            const submitBtn = modal.querySelector('.modal-submit');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> تم التسجيل!';
            submitBtn.style.background = '#006A4E';

            setTimeout(closeModal, 1500);
        });

        // ESC to close
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // ============================================
    // 🎨 CURSOR EFFECT (Premium Feel)
    // ============================================
    if (window.innerWidth > 968 && window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(201, 169, 97, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease, width 0.2s, height 0.2s;
            transform: translate(-50%, -50%);
            mix-blend-mode: multiply;
            display: none;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Enlarge cursor on hover
        document.querySelectorAll('a, button, .feature-card, .problem-card, .step-card, .agent-card, .stat-card, .testimonial-card, .faq-question').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.background = 'rgba(0, 106, 78, 0.3)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.background = 'rgba(201, 169, 97, 0.5)';
            });
        });
    }

    // ============================================
    // 🌙 PRELOADER (Optional)
    // ============================================
    window.addEventListener('load', () => {
        // Remove any loading states
        document.body.classList.add('loaded');

        // Trigger initial animations
        const heroElements = document.querySelectorAll('.hero-badge, .hero h1, .hero-description, .hero-buttons, .hero-trust, .hero-stats');
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.15}s`;
            el.classList.add('fade-in', 'visible');
        });
    });

})();