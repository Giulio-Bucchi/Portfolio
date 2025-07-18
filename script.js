// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for fade-in animations
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

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Animate skill progress bars when they come into view
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target.querySelector('.skill-progress');
      if (progress) {
        const width = progress.style.width;
        progress.style.width = '0%';
        setTimeout(() => {
          progress.style.width = width;
        }, 100);
      }
    }
  });
}, observerOptions);

skillCards.forEach(card => {
  skillObserver.observe(card);
});

// Add floating animation to hero section
const hero = document.querySelector('.hero h1');
if (hero) {
  setInterval(() => {
    hero.style.transform = 'translateY(-5px)';
    setTimeout(() => {
      hero.style.transform = 'translateY(0)';
    }, 1000);
  }, 3000);
}

// Add project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.background = 'rgba(26, 26, 26, 0.8)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--card-bg)';
  });
});

// Header background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(0, 0, 0, 0.95)';
  } else {
    header.style.background = 'rgba(0, 0, 0, 0.8)';
  }
});

// Add typing effect to hero subtitle
const subtitle = document.querySelector('.hero p');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };
  
  setTimeout(typeWriter, 1000);
}