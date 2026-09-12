/* ==========================================================================
   AATHITHYA GROUPS - Interactive Scripts (js/main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header with Scroll Detection
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileDrawer) {
    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    hamburgerBtn.addEventListener('click', () => {
      const willOpen = !mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', willOpen);
      hamburgerBtn.classList.toggle('active', willOpen);
      hamburgerBtn.setAttribute('aria-expanded', willOpen);
      document.body.style.overflow = willOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close on resize if switching back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 868 && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // 3. Hero Video Play / Pause & Sound Control
  const heroVideo = document.getElementById('heroVideo');
  const videoControlBtn = document.getElementById('videoControlBtn');

  if (heroVideo && videoControlBtn) {
    videoControlBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoControlBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        `;
        videoControlBtn.setAttribute('title', 'Pause Video');
      } else {
        heroVideo.pause();
        videoControlBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `;
        videoControlBtn.setAttribute('title', 'Play Video');
      }
    });
  }

  // 4. Animated Milestone Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const targetStr = stat.getAttribute('data-target') || stat.innerText;
      // Extract number and suffix/prefix
      const match = targetStr.match(/([^\d.]*)([\d.]+)([^\d.]*)/);
      if (!match) return;

      const prefix = match[1] || '';
      const targetVal = parseFloat(match[2]);
      const suffix = match[3] || '';
      const isDecimal = match[2].includes('.');

      let startVal = 0;
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuad
        const ease = 1 - (1 - progress) * (1 - progress);
        const current = startVal + (targetVal - startVal) * ease;

        stat.innerText = prefix + (isDecimal ? current.toFixed(2) : Math.floor(current)) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.innerText = targetStr;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  // Observe when stats section comes into view
  const statsSection = document.querySelector('.about-stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(statsSection);
  }

  // 5. Contact Modal Handler
  const contactModal = document.getElementById('contactModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal="contact"]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');

  if (contactModal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
