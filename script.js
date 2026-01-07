// Optimized JavaScript for ToneFlow Landing Page
(function() {
    'use strict';

    // Navigation
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll handler for navigation
    let lastScroll = 0;
    let ticking = false;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '#download' || href === '#features' ||
                href === '#how-it-works' || href === '#benefits') {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animated counter for stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Observe and animate stats
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));

                if (number && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber, number);
                }

                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        statObserver.observe(stat);
    });

    // Chart animation
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.animation = 'fillBar 1.5s ease-out forwards';
                    }, index * 200);
                });
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const chart = document.querySelector('.chart-container');
    if (chart) {
        chartObserver.observe(chart);
    }

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Page load optimization
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Prefetch important links on hover
    const importantLinks = document.querySelectorAll('a[href^="http"]');
    importantLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.href;
            if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        }, { once: true });
    });

    // Performance monitoring
    if ('PerformanceObserver' in window) {
        try {
            const perfObserver = new PerformanceObserver(function(list) {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.renderTime || entry.loadTime);
                    }
                }
            });

            perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.log('Performance monitoring not supported');
        }
    }

    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle window resize
    const handleResize = debounce(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // Accessibility improvements
    // Trap focus in mobile menu when open
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }

            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.classList.remove('active');
                    navToggle.focus();
                }
            }
        });
    }

    if (navMenu) {
        trapFocus(navMenu);
    }

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
                navToggle.focus();
            }
        }
    });

    // Add loading state management
    const addLoadingState = function(button) {
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = '로딩 중...';

        return function removeLoadingState() {
            button.disabled = false;
            button.textContent = originalText;
        };
    };

    // Store buttons click handlers (for demo purposes)
    const storeButtons = document.querySelectorAll('.store-button');
    storeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // In production, you would navigate to the actual store
            // For now, we'll just show a demo message
            console.log('Navigating to app store...');
        });
    });

    // Add subtle parallax effect to hero section
    const hero = document.querySelector('.hero');
    const heroPattern = document.querySelector('.hero-pattern');

    if (hero && heroPattern) {
        window.addEventListener('scroll', function() {
            if (!ticking && window.innerWidth > 768) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const heroHeight = hero.offsetHeight;

                    if (scrolled < heroHeight) {
                        const parallaxValue = scrolled * 0.3;
                        heroPattern.style.transform = `translateY(${parallaxValue}px)`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const wasActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (wasActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Testimonials scroll animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Pricing cards animation
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
    });

    // Demo video placeholder interaction
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In production, this would open a modal with the actual video
            console.log('Video modal would open here');

            // Add a pulse animation
            this.style.animation = 'pulse 0.5s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }

    // Add pulse animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(0.98); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Enhanced smooth scroll for pricing and testimonials sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '#download' || href === '#features' ||
                href === '#how-it-works' || href === '#benefits' ||
                href === '#demo' || href === '#testimonials' || href === '#pricing' || href === '#faq') {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add hover effect to pricing cards
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = 'var(--primary)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = '';
            }
        });
    });

    // Testimonial star rating animation on scroll
    const testimonialRatings = document.querySelectorAll('.testimonial-rating');
    const ratingObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stars = entry.target.querySelectorAll('.star');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.animation = 'starPop 0.3s ease-out';
                    }, index * 100);
                });
                ratingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    testimonialRatings.forEach(rating => {
        ratingObserver.observe(rating);
    });

    // Add star pop animation
    const starStyle = document.createElement('style');
    starStyle.textContent = `
        @keyframes starPop {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(starStyle);

    // Demo features animation
    const demoFeatures = document.querySelectorAll('.demo-feature');
    demoFeatures.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-30px)';
        feature.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
        observer.observe(feature);
    });

    // Add number counting animation for pricing
    function animatePriceCounter(element, target, duration = 1000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Observe and animate pricing amounts
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceAmount = entry.target.querySelector('.price-amount');
                const text = priceAmount.textContent;
                const number = parseInt(text.replace(/\D/g, ''));

                if (number && !priceAmount.classList.contains('animated')) {
                    priceAmount.classList.add('animated');
                    if (number > 0) {
                        animatePriceCounter(priceAmount, number, 1500);
                    }
                }

                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    pricingCards.forEach(card => {
        priceObserver.observe(card);
    });

    // Add keyboard accessibility for FAQ
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }

            // Arrow key navigation
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextItem = faqItems[Math.min(index + 1, faqItems.length - 1)];
                nextItem.querySelector('.faq-question').focus();
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevItem = faqItems[Math.max(index - 1, 0)];
                prevItem.querySelector('.faq-question').focus();
            }
        });
    });

    // Add testimonial carousel/slider on mobile (swipe support)
    let touchStartX = 0;
    let touchEndX = 0;
    const testimonialGrid = document.querySelector('.testimonials-grid');

    if (testimonialGrid && window.innerWidth <= 768) {
        testimonialGrid.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialGrid.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                console.log('Swiped left on testimonials');
            } else {
                // Swipe right
                console.log('Swiped right on testimonials');
            }
        }
    }

    // Add scroll progress indicator for long page
    const createScrollProgress = function() {
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)';
        progressBar.style.width = '0%';
        progressBar.style.zIndex = '10000';
        progressBar.style.transition = 'width 0.1s ease';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }, { passive: true });
    };

    createScrollProgress();

    // Initialize
    console.log('ToneFlow Landing Page initialized');
    console.log('Performance optimizations active');
    console.log('New sections added: Demo, Testimonials, Pricing, FAQ');
})();
