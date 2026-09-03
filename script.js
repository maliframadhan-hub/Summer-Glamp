document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     Mobile menu (hamburger)
     --------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    };

    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

    /* ---------------------------------------------------------------------
     Nav link aktif hanya saat diklik (bukan scroll-spy)
     --------------------------------------------------------------------- */
  const navItems = document.querySelectorAll('#nav-links a[data-nav]');

  navItems.forEach(link => {
    link.addEventListener('click', () => {
      navItems.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ---------------------------------------------------------------------
     Nav shadow on scroll
     --------------------------------------------------------------------- */
  const nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10 ? '0 6px 20px rgba(33,46,28,0.06)' : 'none';
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Real-time clock in the footer (WIB / Asia-Jakarta)
     --------------------------------------------------------------------- */
  const clockEl = document.getElementById('live-clock');
  if (clockEl) {
    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    const timeFormatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const updateClock = () => {
      const now = new Date();
      clockEl.textContent = `${dateFormatter.format(now)} • ${timeFormatter.format(now)} WIB`;
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

});