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

function adjustSkillsLayout() {
  const skillsSection = document.getElementById('skills');
  const dnaContainer = document.querySelector('.dna-container');
  
  if (window.innerWidth < 768) {
    dnaContainer.style.height = '600px';
    // Riorganizza le skill per mobile
    document.querySelectorAll('.skill-card-dna').forEach((card, index) => {
      card.style.position = 'relative';
      card.style.top = 'auto';
      card.style.left = 'auto';
      card.style.display = 'inline-block';
      card.style.margin = '10px';
    });
  } else {
    dnaContainer.style.height = '400px';
    // Ripristina layout desktop
    document.querySelectorAll('.skill-card-dna').forEach((card, index) => {
      card.style.position = 'absolute';
      card.style.display = 'flex';
      // Ripristina le posizioni originali
      const positions = [
        { top: '10%', left: '20%' }, { top: '15%', right: '25%' },
        // ... altre posizioni ...
      ];
      if (positions[index]) {
        Object.assign(card.style, positions[index]);
      }
    });
  }
}

window.addEventListener('resize', adjustSkillsLayout);
window.addEventListener('load', adjustSkillsLayout);
