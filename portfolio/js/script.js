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
