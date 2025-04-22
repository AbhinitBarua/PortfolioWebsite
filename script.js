
// Custom Cursor
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.borderColor = 'var(--accent)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'var(--primary)';
    });
    
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(item => {
        item.addEventListener('mouseenter', function() {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'var(--accent)';
            cursorFollower.style.opacity = '0';
        });
        
        item.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'var(--primary)';
            cursorFollower.style.opacity = '1';
        });
    });
});

// Navigation
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.nav-links');
const header = document.querySelector('header');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Active Link On Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Typing Animation
const dynamicText = document.querySelector('.dynamic-text');
const words = ["Full-Stack Developer", "Ethical Hacker", "Tech Enthusiast", "Founder"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    
    if (!isDeleting && charIndex < currentWord.length) {
        // If in typing mode and haven't reached end of word
        charIndex++;
        setTimeout(typeEffect, 150);
    } else if (isDeleting && charIndex > 0) {
        // If in deleting mode and haven't removed entire word
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // Switch between typing and deleting
        isDeleting = !isDeleting;
        
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        setTimeout(typeEffect, isDeleting ? 1000 : 500);
    }
};

setTimeout(typeEffect, 1000);

// Matrix Effect
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charSize = 14;
    const columns = canvas.width / charSize;
    const rows = canvas.height / charSize;
    
    // Setting up the columns
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Drawing the characters
    function draw() {
        ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff9d';
        ctx.font = `${charSize}px monospace`;
        
        // Drawing the characters
        for (let i = 0; i < drops.length; i++) {
            // Random character to print
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            ctx.fillText(text, i * charSize, drops[i] * charSize);
            
            // Randomly reset the end of the column if it's at least 100px high
            if (drops[i] * charSize > 100 && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Increment y coordinate
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    // Resize canvas when window is resized
    window.addEventListener('resize', () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    });
});

// Skills Filter
const skillCategories = document.querySelectorAll('.category');
const skillCards = document.querySelectorAll('.skill-card');

skillCategories.forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories
        skillCategories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked category
        category.classList.add('active');
        
        const filter = category.getAttribute('data-category');
        
        skillCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-type') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Project Filter
const projectFilters = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        projectFilters.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked filter
        filter.classList.add('active');
        
        const filterValue = filter.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Scroll To Top Button
const scrollTop = document.createElement('div');
scrollTop.classList.add('scroll-top');
scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTop);

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

// Scroll Down Button
const scrollDown = document.querySelector('.scroll-down');
scrollDown.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For now, let's just show an alert
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Page Loader
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.classList.add('page-loader');
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Node Orbis</div>
        </div>
    `;
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// Add some CSS for the new elements
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text);
        cursor: pointer;
        z-index: 99;
        opacity: 0;
        transform: translateY(100px);
        transition: var(--transition);
        box-shadow: var(--shadow);
    }
    
    .scroll-top.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loader-content {
        text-align: center;
    }
    
    .loader-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(0, 255, 157, 0.3);
        border-top: 4px solid var(--primary);
        border-radius: 50%;
        margin: 0 auto;
        animation: spin 1s linear infinite;
    }
    
    .loader-text {
        margin-top: 20px;
        font-size: 24px;
        font-weight: 700;
        color: var(--primary);
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-header, .about-text, .skill-categories, .skills-grid, .project-card, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

// Add animation classes
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .section-header, .about-text, .skill-categories, .skills-grid, .project-card, .contact-info, .contact-form {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section-header.animate, .about-text.animate, .skill-categories.animate, .skills-grid.animate, .project-card.animate, .contact-info.animate, .contact-form.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyle);

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
