// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Active Navigation Link
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !phone || !subject || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Phone number validation (basic South African format)
        const phoneRegex = /^\+?27[0-9]{9}$|^0[0-9]{9}$/;
        if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
            showMessage('Please enter a valid South African phone number.', 'error');
            return;
        }

        // Email validation (if provided)
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
        }

        // Show success message (in real app, this would submit to server)
        showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Message Display Function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.style.cssText = `
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-weight: 500;
        text-align: center;
        ${type === 'success' ? 
            'background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' : 
            'background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;'
        }
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;
    message.textContent = text;

    // Insert message
    const form = document.getElementById('contactForm');
    if (form) {
        form.insertBefore(message, form.firstChild);
        
        // Animate in
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 5 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(-10px)';
            setTimeout(() => message.remove(), 300);
        }, 5000);
    }
}

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.feature-card, .options-card, .step, .value-card, .faq-item, .different-item, .stat-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add animation class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Phone Number Formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('27')) {
            value = '+' + value;
        } else if (value.startsWith('0') && value.length === 10) {
            value = '+27' + value.substring(1);
        }
        
        // Format as +27 XX XXX XXXX
        if (value.startsWith('+27')) {
            const digits = value.substring(3);
            if (digits.length >= 2) {
                let formatted = '+27 ' + digits.substring(0, 2);
                if (digits.length >= 5) {
                    formatted += ' ' + digits.substring(2, 5);
                    if (digits.length >= 9) {
                        formatted += ' ' + digits.substring(5, 9);
                    } else if (digits.length > 5) {
                        formatted += ' ' + digits.substring(5);
                    }
                } else if (digits.length > 2) {
                    formatted += ' ' + digits.substring(2);
                }
                e.target.value = formatted;
            } else {
                e.target.value = value;
            }
        }
    });
});

// Download Button Tracking (placeholder for analytics)
const downloadButtons = document.querySelectorAll('.download-btn');
downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('img').alt.includes('Google') ? 'Android' : 'iOS';
        console.log(`Download clicked: ${platform}`);
        
        // Show coming soon message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
            font-weight: 500;
        `;
        message.textContent = `${platform} app coming soon! We'll notify you when it's available.`;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 3000);
        
        message.style.transition = 'opacity 0.3s ease';
    });
});

// USSD Demo Animation
const ussdDemo = document.querySelector('.ussd-display');
if (ussdDemo) {
    const ussdMenus = [
        {
            header: 'E-Smart USSD',
            menu: [
                '1. Check Balance',
                '2. Send Money', 
                '3. Buy Airtime',
                '4. Buy Data',
                '5. Pay Bills',
                '6. eVoucher',
                '0. More Options'
            ],
            footer: 'Reply with option number'
        },
        {
            header: 'Balance Inquiry',
            menu: [
                'Available Balance:',
                'R 2,450.00',
                '',
                'Last Transaction:',
                'Deposit +R200.00',
                'Today 14:30'
            ],
            footer: 'Press 0 for main menu'
        },
        {
            header: 'Send Money',
            menu: [
                'Enter phone number:',
                '+27 XX XXX XXXX',
                '',
                'Enter amount:',
                'R 0.00',
                '',
                '1. Continue',
                '0. Back'
            ],
            footer: 'Reply with option'
        }
    ];
    
    let currentMenu = 0;
    
    function updateUSSDDisplay() {
        const menu = ussdMenus[currentMenu];
        const headerEl = ussdDemo.querySelector('.ussd-header');
        const menuEl = ussdDemo.querySelector('.ussd-menu');
        const footerEl = ussdDemo.querySelector('.ussd-footer');
        
        if (headerEl && menuEl && footerEl) {
            headerEl.textContent = menu.header;
            menuEl.innerHTML = menu.menu.map(item => `<p>${item}</p>`).join('');
            footerEl.textContent = menu.footer;
        }
        
        currentMenu = (currentMenu + 1) % ussdMenus.length;
    }
    
    // Update USSD display every 4 seconds
    setInterval(updateUSSDDisplay, 4000);
}

// App Gallery Hover Effects
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    const screenshot = item.querySelector('.app-screenshot');
    
    item.addEventListener('mouseenter', () => {
        screenshot.style.transform = 'scale(1.05) rotateY(5deg)';
        screenshot.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        screenshot.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// App Interface Animation
const appInterface = document.querySelector('.app-interface');
if (appInterface) {
    setInterval(() => {
        const balanceElement = appInterface.querySelector('.balance-card h3');
        if (balanceElement) {
            const currentAmount = parseFloat(balanceElement.textContent.replace('R ', '').replace(',', ''));
            const newAmount = (currentAmount + Math.random() * 100 - 50).toFixed(2);
            if (newAmount > 0) {
                balanceElement.textContent = `R ${parseFloat(newAmount).toLocaleString('en-ZA', {minimumFractionDigits: 2})}`;
            }
        }
    }, 5000);
}