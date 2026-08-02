document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // 2. Mobile Responsive Menu
    // ==========================================
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    };

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close menu when screen size changes to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
            toggleMenu();
        }
    });

    // ==========================================
    // 3. Dynamic Typewriter Effect
    // ==========================================
    const typewriter = document.getElementById('typewriter');
    const words = [
        "Data Intelligence Solutions", 
        "Full-Stack AI Software", 
        "Predictive Web Platforms", 
        "Scalable Data Pipelines"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Small delay before typing new word
        }

        setTimeout(type, typingSpeed);
    };

    if (typewriter) {
        setTimeout(type, 1000);
    }

    // ==========================================
    // 4. Skills Category Filtering
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetCategory = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                const cats = card.getAttribute('data-cats').split(' ');
                
                if (targetCategory === 'all' || cats.includes(targetCategory)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // ==========================================
    // 5. Scroll Animations & Nav Link Sync
    // ==========================================
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal');
    const navLinks = document.querySelectorAll('.nav-link');
    const skillsSection = document.getElementById('skills');

    const handleScroll = () => {
        const scrollPosition = window.scrollY + 200;

        // Reveal sections on scroll
        scrollRevealSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY + window.innerHeight > sectionTop + 100) {
                section.classList.add('reveal');
                
                // If it is the skills section, animate progress bars
                if (section === skillsSection) {
                    skillsSection.classList.add('loaded');
                }
            }
        });

        // Sync active nav links
        const homeSection = document.getElementById('home');
        let currentSectionId = 'home';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to reveal sections already visible
    handleScroll();

    // ==========================================
    // 6. Copy Email to Clipboard & Toast
    // ==========================================
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    const toast = document.getElementById('toast');
    const emailToCopy = 'smkarpagam2025@gmail.com';

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(emailToCopy)
                .then(() => {
                    // Show toast
                    toast.classList.add('show');
                    
                    // Hide after 3s
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    });

    // ==========================================
    // 7. Contact Form Handling (Simulation)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Sending...</span>
                <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-left: 4px;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style="opacity: 0.75;"></path>
                </svg>
            `;
            
            // Simulate API request delay
            setTimeout(() => {
                // Success message
                alert('Thank you for your message! Karpagam will get back to you soon.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
});
