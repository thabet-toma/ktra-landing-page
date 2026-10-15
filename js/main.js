/**
 * KTRA SMART SOLUTIONS — Core JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll visual elevation
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Products Bento Tabs Filtering
  const tabButtons = document.querySelectorAll('.tab-btn');
  const bentoCards = document.querySelectorAll('.bento-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all tabs
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      bentoCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInDown 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Smooth Anchor Link Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Social Hub Filter Tabs
  const socialTabs = document.querySelectorAll('.social-tab-btn');
  const socialCards = document.querySelectorAll('.social-card');

  if (socialTabs.length > 0 && socialCards.length > 0) {
    socialTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        socialTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        socialCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-brand') === filter) {
            card.style.display = '';
            card.style.animation = 'fadeInDown 0.3s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Direct WhatsApp Consultation Builder
  const inquiryForm = document.getElementById('quick-inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inquiry-name')?.value.trim() || 'عميل مهتم';
      const service = document.getElementById('inquiry-service')?.value || 'استفسار عام';
      const details = document.getElementById('inquiry-message')?.value.trim() || 'أرغب في الحصول على مزيد من التفاصيل.';

      const text = `مرحباً شركة كترا للحلول الذكية،\n👤 الاسم: ${name}\n🎯 الخدمة / المنصة: ${service}\n📝 تفاصيل الاستفسار: ${details}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/972586812330?text=${encodedText}`;

      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
});
