// Modern Portfolio Website JavaScript
// Marcel van Duijn Portfolio - Enhanced with performance optimizations

document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    
    // Performance optimization: Use requestAnimationFrame for smooth animations
    const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { setTimeout(callback, 16); };
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
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
    
    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Enhanced navigation with keyboard support
    const navigation = document.querySelector('nav');
    if (navigation) {
        const navItems = navigation.querySelectorAll('li');
        
        navItems.forEach((item, index) => {
            const link = item.querySelector('a');
            if (link) {
                // Add keyboard navigation
                link.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
                
                // Add focus management for dropdowns
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) {
                    item.addEventListener('mouseenter', function() {
                        this.classList.add('dropdown-open');
                    });
                    
                    item.addEventListener('mouseleave', function() {
                        this.classList.remove('dropdown-open');
                    });
                    
                    item.addEventListener('focusin', function() {
                        this.classList.add('dropdown-open');
                    });
                    
                    item.addEventListener('focusout', function(e) {
                        // Check if focus is moving to a child element
                        if (!this.contains(e.relatedTarget)) {
                            this.classList.remove('dropdown-open');
                        }
                    });
                }
            }
        });
    }
    
    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
                console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
            }
        });
    });
    
    if ('PerformanceObserver' in window) {
        performanceObserver.observe({ entryTypes: ['navigation'] });
    }
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.textContent = 'Loading...';
                
                // Simulate loading state (remove in production)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = this.dataset.originalText || 'Click Me';
                }, 1000);
            }
        });
        
        // Store original text
        button.dataset.originalText = button.textContent;
    });
    
    // Add fade-in animations for content
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in
    const fadeElements = document.querySelectorAll('.terminal-container, .terminal-container-selection, .homepage-container');
    fadeElements.forEach(el => fadeObserver.observe(el));
    
    // Add scroll-to-top functionality
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide scroll-to-top button
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
    });
    
    // Observe the first section to determine when to show scroll-to-top
    const firstSection = document.querySelector('main > section:first-child');
    if (firstSection) {
        scrollObserver.observe(firstSection);
    }
    
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search (if implemented)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Focus search functionality could be added here
        }
        
        // Escape key to close dropdowns
        if (e.key === 'Escape') {
            const openDropdowns = document.querySelectorAll('.dropdown-open');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('dropdown-open');
            });
        }
    });
    
    // Add service worker registration for offline functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Add error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
    
    // Add analytics tracking (example - replace with your analytics)
    function trackEvent(eventName, eventData = {}) {
        // Replace with your analytics implementation
        console.log('Event tracked:', eventName, eventData);
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }
    
    // Track page views
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
    
    // Track outbound links
    const outboundLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    outboundLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('click_external_link', {
                link_url: this.href,
                link_text: this.textContent.trim()
            });
        });
    });
    
    console.log('Portfolio website enhanced with modern JavaScript features');
});

// Add CSS for new elements
const additionalStyles = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--background-darker);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 24px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        display: none;
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        transform: translateY(0);
        display: block;
    }
    
    .scroll-to-top:hover {
        background: var(--accent-color);
        transform: translateY(-2px);
    }
    
    .cta-button.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .dropdown-open .dropdown {
        display: block;
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            display: none !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
