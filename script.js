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

// Tab System for Service Pages
document.addEventListener('DOMContentLoaded', function() {
    // Method tabs (App vs USSD)
    const methodTabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    methodTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            methodTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Bundle tabs (Network selection)
    const bundleTabs = document.querySelectorAll('.bundle-tab');
    const bundleContents = document.querySelectorAll('.bundle-content');
    
    bundleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetNetwork = this.getAttribute('data-network');
            
            // Remove active class from all tabs and contents
            bundleTabs.forEach(t => t.classList.remove('active'));
            bundleContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetNetwork);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// Enhanced App Gallery Hover Effects
const serviceGalleryItems = document.querySelectorAll('.gallery-item');
serviceGalleryItems.forEach(item => {
    const screenshot = item.querySelector('.app-screenshot');
    
    item.addEventListener('mouseenter', () => {
        screenshot.style.transform = 'scale(1.05) rotateY(5deg)';
        screenshot.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        screenshot.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// Service Features Animation
const serviceFeatures = document.querySelectorAll('.service-feature, .benefit-card, .bundle-card');
serviceFeatures.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(30px)';
    feature.style.transition = 'all 0.6s ease';
    feature.style.transitionDelay = `${index * 0.1}s`;
    
    observer.observe(feature);
});

// Transfer Animation
const transferArrows = document.querySelectorAll('.transfer-arrow');
transferArrows.forEach(arrow => {
    setInterval(() => {
        arrow.style.transform = 'scale(1.2)';
        setTimeout(() => {
            arrow.style.transform = 'scale(1)';
        }, 300);
    }, 2000);
});

// Network Logo Animations
const networkLogos = document.querySelectorAll('.network-logo, .bill-icon');
networkLogos.forEach((logo, index) => {
    logo.style.animationDelay = `${index * 0.2}s`;
    logo.classList.add('float-animation');
});

// Add CSS for float animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    .float-animation {
        animation: float-gentle 3s ease-in-out infinite;
    }
    
    @keyframes float-gentle {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(floatStyle);

// Bundle Card Interactions
const bundleOptions = document.querySelectorAll('.bundle-option');
bundleOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove selected class from siblings
        const siblings = this.parentElement.querySelectorAll('.bundle-option');
        siblings.forEach(sibling => sibling.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Add visual feedback
        this.style.background = '#8b5cf6';
        this.style.color = 'white';
        this.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            this.style.background = '';
            this.style.color = '';
            this.style.transform = '';
        }, 200);
    });
});

// eVoucher Code Animation
const voucherCodes = document.querySelectorAll('.code, .voucher-code-large');
voucherCodes.forEach(code => {
    let currentCode = '1234567890';
    
    setInterval(() => {
        // Generate random 10-digit code
        const newCode = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
        
        // Animate code change
        code.style.opacity = '0.5';
        setTimeout(() => {
            code.textContent = newCode;
            code.style.opacity = '1';
        }, 150);
    }, 5000);
});

// ATM Network Card Hover Effects
const networkCards = document.querySelectorAll('.network-card');
networkCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeftWidth = '8px';
        this.style.paddingLeft = '27px';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeftWidth = '5px';
        this.style.paddingLeft = '30px';
    });
});

// Service Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (typeof target === 'number') {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = target; // For non-numeric values like "24/7"
        }
    }, 16);
};

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const originalText = statNumber.textContent;
            
            // Extract number if present
            const numberMatch = originalText.match(/\d+/);
            if (numberMatch) {
                const targetNumber = parseInt(numberMatch[0]);
                animateCounter(statNumber, targetNumber);
            }
            
            statsObserver.unobserve(statNumber);
        }
    });
});

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
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