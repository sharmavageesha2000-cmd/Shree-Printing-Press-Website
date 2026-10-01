/* ==========================================================================
   PRINTCRAFT PRO STUDIO - JAVASCRIPT ENGINE
   Full Vanilla JS Feature Suite: Lightbox, Counter Anim, Scroll-To-Top & Filters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollToTop();
  initScrollAnimations();
  initCounterAnimations();
  initPrintEstimator();
  initPortfolioFilter();
  initLightboxModal();
  initFaqSearchAndAccordion();
  initTestimonialSlider();
  initContactFormValidation();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & STICKY HEADER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Header Shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Drawer Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '☰';
      }
    });
  }

  // Active Navigation Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   2. SCROLL-TO-TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  let scrollTopBtn = document.getElementById('scrollTopBtn');
  
  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollTopBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .card, .service-item-card, .portfolio-item');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* --------------------------------------------------------------------------
   4. COUNTER ANIMATION FOR STATISTICS
   -------------------------------------------------------------------------- */
function initCounterAnimations() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const text = stat.textContent.trim();
          const target = parseInt(text.replace(/[^0-9]/g, ''));
          const prefix = text.match(/^[^\d]*/) ? text.match(/^[^\d]*/)[0] : '';
          const suffix = text.replace(/^[^\d]*[\d,]+/, '');

          if (isNaN(target)) return;

          let start = 0;
          const duration = 2000;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              stat.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
              clearInterval(timer);
            } else {
              stat.textContent = `${prefix}${Math.floor(start).toLocaleString()}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) observer.observe(statsStrip);
}

/* --------------------------------------------------------------------------
   5. IMAGE LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initLightboxModal() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (portfolioItems.length === 0) return;

  // Create Lightbox Container if missing
  let lightbox = document.getElementById('lightboxModal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightboxModal';
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close Lightbox">✕</button>
        <div class="lightbox-img-wrapper">
          <img id="lightboxImg" src="" alt="Enlarged Portfolio Preview">
        </div>
        <div class="lightbox-caption">
          <span id="lightboxCategory" class="badge">Category</span>
          <h3 id="lightboxTitle" style="margin-top: 0.5rem; margin-bottom: 0.3rem;">Project Title</h3>
          <p id="lightboxDesc" style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">Project Description</p>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.portfolio-title')?.textContent || 'Print Specimen';
      const category = item.querySelector('.portfolio-category')?.textContent || 'Portfolio';
      const desc = item.querySelector('p')?.textContent || '';

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCategory) lightboxCategory.textContent = category;
      if (lightboxDesc) lightboxDesc.textContent = desc;

      lightbox.classList.add('active');
    });
  });

  closeBtn?.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   6. PRINT COST ESTIMATOR
   -------------------------------------------------------------------------- */
function initPrintEstimator() {
  const productSelect = document.getElementById('calc-product');
  const quantityInput = document.getElementById('calc-quantity');
  const paperSelect = document.getElementById('calc-paper');
  const finishSelect = document.getElementById('calc-finish');
  const turnaroundSelect = document.getElementById('calc-turnaround');

  const summaryUnit = document.getElementById('summary-unit-price');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryFinish = document.getElementById('summary-finish-cost');
  const summaryTotal = document.getElementById('summary-total-price');

  if (!productSelect || !quantityInput || !summaryTotal) return;

  const productBaseRates = {
    'business-cards': 0.15,
    'flyers': 0.25,
    'brochures': 0.45,
    'packaging-box': 1.80,
    'banners': 8.50,
    'wedding-cards': 1.20,
    'letterheads': 0.20,
    'stickers': 0.12
  };

  const paperMultipliers = {
    'standard-100gsm': 1.0,
    'premium-300gsm': 1.25,
    'ultra-cotton-400gsm': 1.60,
    'recycled-eco': 1.15
  };

  const finishRates = {
    'none': 0,
    'gloss-laminate': 0.05,
    'matte-laminate': 0.08,
    'gold-foil': 0.25,
    'spot-uv': 0.20
  };

  const turnaroundMultipliers = {
    'standard-5days': 1.0,
    'express-2days': 1.30,
    'same-day': 1.75
  };

  function calculatePrice() {
    const product = productSelect.value || 'business-cards';
    const qty = parseInt(quantityInput.value) || 100;
    const paper = paperSelect ? paperSelect.value : 'premium-300gsm';
    const finish = finishSelect ? finishSelect.value : 'none';
    const turnaround = turnaroundSelect ? turnaroundSelect.value : 'standard-5days';

    const baseRate = productBaseRates[product] || 0.20;
    const paperMult = paperMultipliers[paper] || 1.0;
    const finishAddon = finishRates[finish] || 0;
    const speedMult = turnaroundMultipliers[turnaround] || 1.0;

    let discountMult = 1.0;
    if (qty >= 5000) discountMult = 0.55;
    else if (qty >= 2500) discountMult = 0.65;
    else if (qty >= 1000) discountMult = 0.75;
    else if (qty >= 500) discountMult = 0.85;

    const unitPrice = ((baseRate * paperMult) + finishAddon) * discountMult * speedMult;
    const subtotal = unitPrice * qty;
    const total = Math.max(subtotal, 25.00);

    if (summaryUnit) summaryUnit.textContent = `$${unitPrice.toFixed(3)}`;
    if (summarySubtotal) summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (summaryFinish) summaryFinish.textContent = finishAddon > 0 ? `+$${(finishAddon * qty).toFixed(2)}` : 'Included';
    if (summaryTotal) summaryTotal.textContent = `$${total.toFixed(2)}`;
  }

  [productSelect, quantityInput, paperSelect, finishSelect, turnaroundSelect].forEach(element => {
    element?.addEventListener('input', calculatePrice);
    element?.addEventListener('change', calculatePrice);
  });

  calculatePrice();
}

/* --------------------------------------------------------------------------
   7. PORTFOLIO FILTER
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length === 0 || portfolioItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. TESTIMONIAL SLIDER
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  if (dotsContainer && dotsContainer.children.length === 0) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlides() {
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex >= slides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    updateSlides();
    resetAutoplay();
  }

  prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlides();
    }, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/* --------------------------------------------------------------------------
   9. FAQ SEARCH & ACCORDION
   -------------------------------------------------------------------------- */
function initFaqSearchAndAccordion() {
  const searchInput = document.getElementById('faq-search');
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBody = otherItem.querySelector('.faq-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isActive && body) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
        const content = item.querySelector('.faq-content')?.textContent.toLowerCase() || '';

        if (question.includes(query) || content.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   10. FRONT-END FORM VALIDATION
   -------------------------------------------------------------------------- */
function initContactFormValidation() {
  const forms = document.querySelectorAll('.validated-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const inputs = form.querySelectorAll('[required]');

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = '';
        }
      });

      if (isValid) {
        showToast('Thank you! Your quote request has been submitted successfully.', 'success');
        form.reset();
      } else {
        showToast('Please complete all required fields.', 'error');
      }
    });
  });
}

/* Toast Notifications */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : 'ℹ️'}</span>
    <div>${message}</div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
