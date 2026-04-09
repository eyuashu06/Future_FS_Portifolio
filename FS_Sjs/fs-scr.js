// ============================================
// PORTFOLIO WEBSITE - COMPLETE ANIMATIONS
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  
  // ========== LOADER ANIMATION ==========
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1500);
  }

  // ========== SMOOTH SCROLLING ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // ========== HAMBURGER MENU TOGGLE ==========
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // ========== HEADER SCROLL EFFECT ==========
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ========== TYPING ANIMATION FOR HERO ==========
  const heroText = document.querySelector('.typing-text');
  if (heroText) {
    const words = ['Full-Stack Developer', 'Software Engineer', 'Problem Solver', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        heroText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        heroText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
      }
    }
    typeEffect();
  }

  // ========== SCROLL REVEAL ANIMATIONS ==========
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // ========== SKILL CARDS STAGGERED ANIMATION ==========
  const skillCards = document.querySelectorAll('.skill-card');
  
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = document.querySelectorAll('.skill-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate');
          }, index * 100);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (skillCards.length > 0) {
    staggerObserver.observe(document.querySelector('.skills-grid'));
  }

  // ========== PROJECT CARDS HOVER ENHANCEMENT ==========
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ========== COUNTER ANIMATION FOR STATS ==========
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'));
        let currentValue = 0;
        const increment = targetValue / 50;
        
        const updateCounter = () => {
          currentValue += increment;
          if (currentValue < targetValue) {
            target.textContent = Math.ceil(currentValue);
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = targetValue;
          }
        };
        updateCounter();
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  // ========== CONTACT FORM HANDLING ==========
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        if (name && email && message) {
          formStatus.textContent = '✓ Thank you! Your message has been sent.';
          formStatus.className = 'form-status success';
          contactForm.reset();
          
          // Add bounce animation to success message
          formStatus.style.animation = 'bounceIn 0.5s ease';
          setTimeout(() => {
            formStatus.style.animation = '';
          }, 500);
        } else {
          formStatus.textContent = '✗ Please fill in all fields.';
          formStatus.className = 'form-status error';
          formStatus.style.animation = 'shake 0.5s ease';
          setTimeout(() => {
            formStatus.style.animation = '';
          }, 500);
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        setTimeout(() => {
          formStatus.style.opacity = '0';
          setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            formStatus.style.opacity = '1';
          }, 300);
        }, 5000);
      }, 1000);
    });
  }

  // ========== PARALLAX EFFECT ON HERO ==========
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const avatar = document.querySelector('.avatar-placeholder');
    
    if (hero && avatar) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      avatar.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
  });

  // ========== ACTIVE NAV LINK HIGHLIGHT ==========
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ========== FLOATING ANIMATION FOR AVATAR ==========
  const avatar = document.querySelector('.avatar-placeholder');
  if (avatar) {
    setInterval(() => {
      avatar.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        avatar.style.transform = 'translateY(0)';
      }, 500);
    }, 3000);
  }

  // ========== TOOLTIP FOR SOCIAL LINKS ==========
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.textContent = link.getAttribute('href').includes('github') ? 'GitHub' : 
                            link.getAttribute('href').includes('linkedin') ? 'LinkedIn' : 'Email';
      tooltip.style.position = 'absolute';
      tooltip.style.background = '#2563eb';
      tooltip.style.color = 'white';
      tooltip.style.padding = '4px 8px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '12px';
      tooltip.style.top = '-30px';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.whiteSpace = 'nowrap';
      link.style.position = 'relative';
      link.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 1000);
    });
  });

  // ========== BACKGROUND PARTICLE EFFECT ==========
  function createParticles() {
    const body = document.body;
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'fixed';
      particle.style.width = '3px';
      particle.style.height = '3px';
      particle.style.background = '#2563eb';
      particle.style.borderRadius = '50%';
      particle.style.opacity = Math.random() * 0.3;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '-1';
      
      const duration = 10 + Math.random() * 10;
      particle.style.animation = `float ${duration}s linear infinite`;
      
      body.appendChild(particle);
    }
  }
  createParticles();

  // ========== SCROLL PROGRESS BAR ==========
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.width = '0%';
  progressBar.style.height = '3px';
  progressBar.style.background = 'linear-gradient(90deg, #2563eb, #7c3aed)';
  progressBar.style.zIndex = '1000';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // ========== BACK TO TOP BUTTON ==========
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.className = 'back-to-top';
  backToTop.style.position = 'fixed';
  backToTop.style.bottom = '30px';
  backToTop.style.right = '30px';
  backToTop.style.width = '50px';
  backToTop.style.height = '50px';
  backToTop.style.borderRadius = '50%';
  backToTop.style.background = '#2563eb';
  backToTop.style.color = 'white';
  backToTop.style.border = 'none';
  backToTop.style.cursor = 'pointer';
  backToTop.style.fontSize = '20px';
  backToTop.style.opacity = '0';
  backToTop.style.visibility = 'hidden';
  backToTop.style.transition = 'all 0.3s';
  backToTop.style.zIndex = '999';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ========== GLOW EFFECT ON BUTTONS ==========
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
      btn.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.5)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.boxShadow = 'none';
    });
  });

  // ========== IMAGE LAZY LOADING ==========
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  images.forEach(img => imageObserver.observe(img));

  console.log('Portfolio animations loaded successfully!');
});

// ========== ADD CSS ANIMATIONS DYNAMICALLY ==========
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(-100vh) translateX(100px);
      opacity: 0;
    }
  }
  
  @keyframes bounceIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s;
  }
  
  .loader.fade-out {
    opacity: 0;
  }
  
  .loader-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }
  
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .skill-card {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .skill-card.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .nav-links a.active {
    color: #2563eb;
    font-weight: 600;
  }
  
  header.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .back-to-top:hover {
    transform: scale(1.1);
    background: #1e40af;
  }
  
  .project-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
document.head.appendChild(styleSheet);