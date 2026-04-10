document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to major sections
    const sections = document.querySelectorAll('section');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Set up initial state
    sections.forEach(sec => {
        if (!sec.classList.contains('hero')) {
            sec.classList.add('fade-in');
        }
    });

    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add visible to hero immediately
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.animation = `fadeUp 0.6s ease forwards ${index * 0.15}s`;
        });
        
        // Start counters animation
        setTimeout(() => {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2500; // 2.5 seconds
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    // easeOutQuart smooth easing so it slows down near end
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    counter.innerText = Math.floor(easeProgress * target);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        counter.innerText = target;
                    }
                };
                window.requestAnimationFrame(step);
            });
        }, 500); // Wait for the element to start fading in
    }, 100);
});

// Aadd CSS for hero animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
