document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEVICE CHOOSER ---
    const chooserOverlay = document.getElementById('device-chooser-overlay');
    const btnComputer = document.getElementById('btn-computer');
    const btnMobile = document.getElementById('btn-mobile');
    const body = document.body;

    // Function to hide chooser and start animations
    const initPage = () => {
        chooserOverlay.style.display = 'none';
        // Start other initializations after user has chosen
        initializeScripts();
    };

    btnComputer.addEventListener('click', () => {
        // Default state, no class needed
        initPage();
    });

    btnMobile.addEventListener('click', () => {
        body.classList.add('mobile-view');
        initPage();
    });


    // --- WRAP ALL OTHER SCRIPTS IN A FUNCTION TO RUN AFTER CHOICE ---
    const initializeScripts = () => {

    // --- 2. LOADER ---
    // This logic is improved to handle cases where the 'load' event has already fired.
    const loader = document.getElementById('loader');

    const hideLoader = () => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.classList.remove('loading');
    };

    if (document.readyState === 'complete') {
        // If the page is already loaded, hide the loader directly.
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

    // --- 3. STICKY NAVBAR ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 4. MOBILE NAVIGATION (BURGER MENU) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    const navAnimation = () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    };

    burger.addEventListener('click', navAnimation);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                navAnimation();
            }
        });
    });

    // --- 5. SCROLL-IN ANIMATIONS (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- 6. COUNTER ANIMATION ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const updateCount = () => {
            const increment = target / speed;
            count += increment;

            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- 7. SEAMLESS TICKER ---
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        const tickerItems = ticker.innerHTML;
        ticker.innerHTML += tickerItems; // Duplicate items for seamless loop
    }

    // --- 8. CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('span').innerText;
            const icon = submitBtn.querySelector('i');

            // Show feedback
            submitBtn.querySelector('span').innerText = 'Message Sent!';
            icon.className = 'fas fa-check';
            submitBtn.style.backgroundColor = '#27c93f'; // Green color

            // Reset after a few seconds
            setTimeout(() => {
                submitBtn.querySelector('span').innerText = originalText;
                icon.className = 'fas fa-paper-plane';
                submitBtn.style.backgroundColor = ''; // Revert to original color
                contactForm.reset(); // Clear form fields
            }, 3000);
        });
    }

    }; // End of initializeScripts function
});

// Keyframes for nav links fade-in (needs to be in JS for dynamic delays)
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes navLinkFade {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
}`;
document.head.appendChild(styleSheet);
