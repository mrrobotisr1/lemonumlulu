// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active') && 
            !mainNav.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Gallery slider
    const galleryTrack = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (galleryTrack && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.gallery-item');
        const slideWidth = slides[0].offsetWidth + 25; // width + gap
        
        // Calculate number of visible slides
        function getVisibleSlides() {
            const containerWidth = galleryTrack.parentElement.offsetWidth;
            const slideWidthWithGap = slides[0].offsetWidth + 25;
            return Math.floor(containerWidth / slideWidthWithGap);
        }
        
        // Calculate max slides
        const maxSlides = slides.length - getVisibleSlides();
        
        nextBtn.addEventListener('click', function() {
            if (currentSlide < maxSlides) {
                currentSlide++;
                galleryTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            }
        });
        
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                galleryTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            }
        });
        
        // Update slider on window resize
        window.addEventListener('resize', function() {
            const newSlideWidth = slides[0].offsetWidth + 25;
            galleryTrack.style.transform = `translateX(-${currentSlide * newSlideWidth}px)`;
        });
    }
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.category-card, .feature-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
    
    // Telegram button animation
    const telegramBtns = document.querySelectorAll('.btn-primary, .btn-telegram');
    telegramBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(20deg) scale(1.2)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
});