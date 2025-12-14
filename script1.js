// Preloader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1500);
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Sticky Navbar
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.padding = '10px 0';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
        nav.style.padding = '20px 0';
    }
});

// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Simple Form Logic
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Xabar yuborildi! Firdavs tez orada siz bilan bog'lanadi.");
});

// Dynamic Text Effect
const revealText = document.querySelector('.reveal');
if (revealText) {
    revealText.style.opacity = '0';
    revealText.style.transform = 'translateY(30px)';
    setTimeout(() => {
        revealText.style.transition = 'all 1s ease';
        revealText.style.opacity = '1';
        revealText.style.transform = 'translateY(0)';
    }, 2000);
}
// 3D Card tilt effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});

// Cursor Glow (Ixtiyoriy: sichqoncha atrofida ko'k nur yurishi)
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});
// Sayt skroll bo'lganda elementlarni "ko'rinish" effekti
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY;
    
    // Parallax effekti rasmlar uchun
    document.querySelectorAll('.project-card img').forEach(img => {
        img.style.transform = `translateY(${scrollPos * 0.05}px) scale(1.1)`;
    });
});

// Ticker tezligini o'zgartirish (ixtiyoriy)
const ticker = document.querySelector('.ticker');
ticker.style.animationDuration = '30s';
// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Scroll orqali counter-ni boshqarish
let started = false;
window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats-section');
    if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && !started) {
            startCounters();
            started = true;
        }
    }
});