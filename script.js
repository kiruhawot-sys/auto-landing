// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Smooth Scroll with header offset
function scrollToElement(element, offset = 120) {
    if (element) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToForm() {
    const form = document.querySelector('.cta');
    scrollToElement(form, 120);
}

function scrollToVideo() {
    const video = document.getElementById('video');
    scrollToElement(video, 120);
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .timeline-item, .review-card, .pricing-card, .faq-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Form Submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send data to your server
    // For demo purposes, we'll show an alert
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    
    // Reset form
    form.reset();
    
    // In a real scenario, you would do something like:
    // fetch('/api/submit', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     alert('Спасибо за заявку!');
    //     form.reset();
    // })
    // .catch(error => {
    //     alert('Произошла ошибка. Попробуйте еще раз.');
    // });
}

// Plan Selection
function selectPlan(plan) {
    scrollToForm();
    
    // You can pre-fill the form or add plan info
    // For example, add a hidden input with the selected plan
    const form = document.getElementById('ctaForm');
    if (form) {
        // Remove any existing plan input
        const existingPlanInput = form.querySelector('input[name="plan"]');
        if (existingPlanInput) {
            existingPlanInput.remove();
        }
        
        // Add new plan input
        const planInput = document.createElement('input');
        planInput.type = 'hidden';
        planInput.name = 'plan';
        planInput.value = plan;
        form.appendChild(planInput);
    }
}

// Video Modal (placeholder)
function openVideo() {
    // In a real implementation, you would open a video modal
    // For now, we'll just show an alert
    alert('Здесь будет открыто видео с презентацией курса.\n\nДля интеграции можно использовать:\n- YouTube embed\n- Vimeo embed\n- Custom video player');
    
    // Example implementation:
    // const modal = document.createElement('div');
    // modal.className = 'video-modal';
    // modal.innerHTML = `
    //     <div class="modal-content">
    //         <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
    //         <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
    //     </div>
    // `;
    // document.body.appendChild(modal);
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k+';
    }
    return num.toString();
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (number) {
                    statNumber.dataset.animated = 'true';
                    statNumber.textContent = '0';
                    animateCounter(statNumber, number);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
});

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                scrollToElement(target, 120);
            }
        }
    });
});

// Parallax effect for hero section (optional) - DISABLED to prevent overlap
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero && scrolled < hero.offsetHeight) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

