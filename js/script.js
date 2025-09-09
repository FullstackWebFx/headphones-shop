/* ===========================================
   script.js – Інтерактивність для EarStore
   =========================================== */

// Обгортка, щоб уникнути глобальних змінних
document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Show/Hide on Scroll
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;

  const toggleHeader = () => {
    if (window.scrollY > lastScrollY) {
      // Скрол вниз – приховати
      header.classList.add('header-hidden');
    } else {
      // Скрол вверх – показати
      header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
  };
  window.addEventListener('scroll', throttle(toggleHeader, 200));

  // 2. Smooth Scroll для навігації
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 3. Lazy Loading Images (Intersection Observer)
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '0px 0px 200px 0px' });
  lazyImages.forEach(img => imgObserver.observe(img));

  // 4. Sections Reveal on Scroll
  const sections = document.querySelectorAll('section');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(sec => revealObserver.observe(sec));

  // 5. Reviews Carousel
  const carousel = document.querySelector('.reviews-list');
  const slides = Array.from(carousel.children);
  const prevBtn = createControl('prev');
  const nextBtn = createControl('next');
  carousel.append(prevBtn, nextBtn);

  let currentIndex = 0;
  const showSlide = idx => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
  };
  showSlide(currentIndex);

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    resetAutoPlay();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    resetAutoPlay();
  });

  // Авто-слайд кожні 5 секунд
  let autoPlayId = setInterval(() => {
    nextBtn.click();
  }, 5000);
  const resetAutoPlay = () => {
    clearInterval(autoPlayId);
    autoPlayId = setInterval(() => nextBtn.click(), 5000);
  };

  // Хелпери
  function throttle(fn, wait) {
    let time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  function createControl(dir) {
    const btn = document.createElement('button');
    btn.classList.add('carousel-control', dir === 'prev' ? 'carousel-prev' : 'carousel-next');
    btn.innerHTML = dir === 'prev' ? '&#10094;' : '&#10095;';
    return btn;
  }

  // 6. Dark Mode Toggle (секретна функція)
  const darkModeBtn = document.createElement('button');
  darkModeBtn.className = 'darkmode-toggle';
  darkModeBtn.textContent = '';
  document.body.append(darkModeBtn);
  const root = document.documentElement;
  darkModeBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
  // Прийняття попереднього вибору
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;

  const toggleHeader = () => {
    const currentScroll = window.scrollY;

    // 1) Якщо ми майже в самому топі — обов'язково показуємо хедер
    if (currentScroll < 50) {
      header.classList.remove('header-hidden');
    }
    else {
      // 2) Інакше: якщо скрол вниз — ховаємо, якщо вгору — показуємо
      if (currentScroll > lastScrollY) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
    }

    lastScrollY = currentScroll;
  };

  // throttling, щоб не дергало надто часто
  window.addEventListener('scroll', throttle(toggleHeader, 200));

  // ваша існуюча throttle-функція
  function throttle(fn, wait) {
    let time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    };
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;

  const toggleHeader = () => {
    const currentScroll = window.scrollY;

    // Якщо знаходимося в самому топі (менше 10px) — хедер завжди видно:
    if (currentScroll <= 10) {
      header.classList.remove('header-hidden');
    } else {
      // Якщо прокручуємо вниз — ховаємо, якщо вгору — показуємо:
      if (currentScroll > lastScrollY) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
    }

    lastScrollY = currentScroll;
  };

  // throttle, щоб не викликати на кожному «пікселі» прокрутки
  window.addEventListener('scroll', throttle(toggleHeader, 100));

  function throttle(fn, wait) {
    let time = Date.now();
    return function () {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    };
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Якщо будь-який прокрут вниз (після 0) — ховаємо
    if (currentScroll > lastScrollY && currentScroll > 0) {
      header.classList.add('header-hidden');
    }
    // У будь-якому іншому випадку — показуємо
    else {
      header.classList.remove('header-hidden');
    }

    // Оновлюємо попередню позицію
    lastScrollY = currentScroll;
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const phrases = [
    'Безкомпромісна якість у кожному проекті',
    'Чітке дотримання дедлайнів та бюджетів',
    'Індивідуальні рішення під ваш бізнес-запит',
    'Технічна точність і увага до деталей',
    'Понад 5 років досвіду: від концепту до релізу',
    'Гарантія підтримки та розвитку після запуску'
  ];
  const el = document.querySelector('.hero-typing');
  let p = 0, l = 0, dir = 1;

  setInterval(() => {
    const text = phrases[p];
    el.textContent = text.substring(0, l);
    l += dir;

    if (l > text.length) {
      dir = -1;
      l = text.length;
      setTimeout(() => {}, 800); // пауза в кінці рядка
    } else if (l < 0) {
      dir = 1;
      p = (p + 1) % phrases.length;
      l = 0;
    }
  }, 100);
});


  // 2) Імітуємо відправку
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();                 // блокуємо реальний submit
    form.classList.add('hidden');       // ховаємо форму
    document.getElementById('success-message')
            .classList.remove('hidden'); // показуємо повідомлення
  });
(function() {
  const track = document.querySelector('.reviews-track');
  const items = Array.from(track.children);
  const prev = document.querySelector('.arrow.prev');
  const next = document.querySelector('.arrow.next');
  let index = 0;

  function update() {
    const shift = -index * items[0].clientWidth;
    track.style.transform = `translateX(${shift}px)`;
  }

  prev.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    update();
  });

  next.addEventListener('click', () => {
    index = (index + 1) % items.length;
    update();
  });

  window.addEventListener('resize', update);

  // Ініціалізуємо позицію
  update();
})();

(function(){
  const track = document.querySelector('.reviews-track');
  const items = Array.from(document.querySelectorAll('.review-item'));
  const prevBtn = document.querySelector('.arrow.prev');
  const nextBtn = document.querySelector('.arrow.next');

  let visibleCount = 1;   // скільки карток відображається
  let index = 0;          // поточний індекс (зсув)

  // Визначаємо visibleCount на основі ширини екрану
  function calcVisible() {
    const w = window.innerWidth;
    if (w >= 1200)       visibleCount = 3;
    else if (w >= 768)   visibleCount = 2;
    else                 visibleCount = 1;
  }

  // Обмежуємо індекс і зрушуємо трек
  function update() {
    calcVisible();
    const maxIndex = items.length - visibleCount;
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
    const shift = -index * (items[0].clientWidth + parseFloat(getComputedStyle(items[0]).marginRight) + parseFloat(getComputedStyle(items[0]).marginLeft));
    track.style.transform = `translateX(${shift}px)`;
  }

  prevBtn.addEventListener('click', () => { index--; update(); });
  nextBtn.addEventListener('click', () => { index++; update(); });

  window.addEventListener('resize', update);

  // Ініціалізуємо при завантаженні
  update();
})();
(function(){
  const track = document.querySelector('.reviews-track');
  const items = document.querySelectorAll('.review-item');
  const prev = document.querySelector('.arrow.prev');
  const next = document.querySelector('.arrow.next');
  let index = 0;
  let visible = 1;

  // Визначаємо visible count залежно від ширини
  function calcVisible() {
    const w = window.innerWidth;
    visible = w >= 1200 ? 3 : (w >= 768 ? 2 : 1);
  }

  // Позиціюємо трек
  function update() {
    calcVisible();
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight) + parseInt(getComputedStyle(items[0]).marginLeft);
    const maxIndex = items.length - visible;
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
    const shift = -index * itemWidth;
    track.style.transform = `translateX(${shift}px)`;
  }

  prev.addEventListener('click', () => { index--; update(); });
  next.addEventListener('click', () => { index++; update(); });
  window.addEventListener('resize', update);

  // Ініціалізація
  update();
})();
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.querySelector('.reviews-carousel__viewport');
  const btnPrev = document.querySelector('.reviews-carousel__btn--prev');
  const btnNext = document.querySelector('.reviews-carousel__btn--next');
  const getScrollAmt = () => {
    const item = document.querySelector('.reviews-carousel__item');
    const style = getComputedStyle(item);
    const gap = parseFloat(style.marginRight) + parseFloat(style.marginLeft) || 16;
    return item.offsetWidth + gap;
  };

  btnPrev.addEventListener('click', () => {
    viewport.scrollBy({ left: -getScrollAmt(), behavior: 'smooth' });
  });
  btnNext.addEventListener('click', () => {
    viewport.scrollBy({ left: getScrollAmt(), behavior: 'smooth' });
  });
});

  const viewport = document.querySelector('.reviews-carousel__viewport');
  const prevBtn = document.querySelector('.carousel-button--prev');
  const nextBtn = document.querySelector('.carousel-button--next');
  const itemWidth = viewport.querySelector('.reviews-carousel__item').offsetWidth + parseInt(getComputedStyle(viewport.querySelector('.reviews-carousel__track')).gap);

  prevBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: itemWidth, behavior: 'smooth' });
  });


// ====== SLIDER JS V2 ======
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const success = document.getElementById('success-message');

    form.addEventListener('submit', function(e) {
      e.preventDefault();               // скасовуємо реальну відправку
      form.classList.add('hidden');     // ховаємо форму
      success.classList.remove('hidden'); // показуємо повідомлення
    });
  });
    // чекаємо, поки вся сторінка завантажиться
  window.addEventListener('DOMContentLoaded', function() {
    var form    = document.getElementById('fake-form');
    var success = document.getElementById('fake-success');

    form.addEventListener('submit', function(e) {
      e.preventDefault();             // відміняємо реальну відправку
      form.classList.add('hidden');   // ховаємо форму
      success.classList.remove('hidden'); // показуємо повідомлення
    });
  });
  // 1) Налаштування:
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2 // спрацьовує, коли 20% елемента в зоні видимості
});

// 2) Прикріплюємо до всіх .fade-in
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.parallax-js').forEach(el => {
    el.style.backgroundPositionY = `${scrolled * 0.5}px`;
  });
});
function throttle(fn, limit) {
  let inThrottle;
  return function() {
    if (!inThrottle) {
      fn.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

window.addEventListener('scroll', throttle(() => {
  // важка логіка
}, 100));
const btn = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 400) btn.classList.add('show');
  else btn.classList.remove('show');
});
btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let scrollY = window.pageYOffset;
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
});
window.addEventListener('DOMContentLoaded', () => {
  // 1) Вибираємо ВСІ елементи всередині <body> (крім скриптів)
  const items = Array.from(document.body.querySelectorAll('*:not(script)'));

  // 2) Додаємо їм клас .fade-item + ставимо індивідуальну затримку
  items.forEach((el, i) => {
    el.classList.add('fade-item');
    // кожен наступний трохи пізніше (затримка 30ms)
    el.style.transitionDelay = `${i * 30}ms`;
  });

  // 3) Через коротку паузу вмикаємо .show — всі fade-item почнуть анімацію
  setTimeout(() => {
    items.forEach(el => el.classList.add('show'));
  }, 100);
});
function filterProducts() {
  const term = document
    .getElementById('product-search')
    .value
    .trim()
    .toLowerCase();

  document.querySelectorAll('.product-card').forEach(card => {
    const title = card
      .querySelector('h4')
      .textContent
      .toLowerCase();
    // Якщо у назві є пошуковий термін – показуємо, інакше ховаємо
    card.style.display = title.includes(term) ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  // Закриваємо меню при кліку поза ним
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});


  function filterProducts() {
    const query = document.getElementById('product-search').value.toLowerCase();
    const products = document.querySelectorAll('.product-card'); // або .product, залежно від класу

    products.forEach(product => {
      const text = product.textContent.toLowerCase();
      product.style.display = text.includes(query) ? 'block' : 'none';
    });
  }


  // Запускається після завантаження сторінки
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function () {
      const filter = searchInput.value.toLowerCase();
      const products = document.querySelectorAll(".product-card");

      products.forEach(function (product) {
        const title = product.querySelector(".product-title").textContent.toLowerCase();
        if (title.includes(filter)) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  });
  // Зчитуємо поточне значення лічильника
function getCartCount() {
  return parseInt(document.getElementById('cart-count').textContent) || 0;
}

// Встановлюємо нове значення і запускаємо «pop»-анімацію
function setCartCount(count) {
  const badge = document.getElementById('cart-count');
  badge.textContent = count;
  badge.classList.add('pop');
  setTimeout(() => badge.classList.remove('pop'), 300);
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#products .grid');
  const cards = Array.from(grid.children);
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');
  const sortSelect = document.getElementById('sort-select');

  [minInput, maxInput, sortSelect].forEach(el =>
    el.addEventListener('input', updateGrid)
  );

  function updateGrid() {
    let items = cards.slice();

    const min = parseFloat(minInput.value);
    const max = parseFloat(maxInput.value);

    // Фільтрація по ціні
    items = items.filter(card => {
      const price = parseFloat(card.dataset.price);
      if (!isNaN(min) && price < min) return false;
      if (!isNaN(max) && price > max) return false;
      return true;
    });

    // Сортування
    const order = sortSelect.value;
    if (order === 'price-asc') {
      items.sort((a, b) => a.dataset.price - b.dataset.price);
    } else if (order === 'price-desc') {
      items.sort((a, b) => b.dataset.price - a.dataset.price);
    }

    // Оновлення DOM
    grid.innerHTML = '';
    items.forEach(el => grid.appendChild(el));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#products .grid');
  const cards = Array.from(grid.children);
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');
  const sortSelect = document.getElementById('sort-select');
  const form = document.getElementById('filter-form');

  function updateGrid() {
    let items = cards.slice();

    const min = parseFloat(minInput.value) || 0;
    const max = parseFloat(maxInput.value) || Infinity;

    // Фільтрація
    items = items.filter(card => {
      const price = parseFloat(card.dataset.price);
      return price >= min && price <= max;
    });

    // Сортування
    const order = sortSelect.value;
    if (order === 'price-asc') {
      items.sort((a, b) => a.dataset.price - b.dataset.price);
    } else if (order === 'price-desc') {
      items.sort((a, b) => b.dataset.price - a.dataset.price);
    }

    // Оновлення DOM
    grid.innerHTML = '';
    items.forEach(el => grid.appendChild(el));
  }

  // Слухачі подій
  [minInput, maxInput, sortSelect].forEach(el =>
    el.addEventListener('input', updateGrid)
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    updateGrid();
  });
});


   console.log('🟢 script.js підключено');

document.addEventListener('DOMContentLoaded', () => {
  console.log('📦 DOM готовий');

  const cartCountEl = document.getElementById('cart-count');
  if (!cartCountEl) {
    console.error('❌ Не знайдено #cart-count!');
    return;
  }

  let cartCount = parseInt(cartCountEl.textContent, 10) || 0;
  console.log('Початковий лічильник:', cartCount);

  // Створюємо елемент попапа, якщо ще немає
  let popup = document.getElementById('added-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'added-popup';
    document.body.appendChild(popup);
  }

  function showAddedPopup(message = 'Товар додано до кошика') {
    popup.textContent = message;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 1500);
  }

  const buttons = document.querySelectorAll('.btn-add');
  console.log('Знайдено кнопок .btn-add:', buttons.length);

  if (buttons.length === 0) {
    console.warn('⚠️ Неможливо прив’язати обробники – кнопок .btn-add не знайдено.');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount += 1;
      cartCountEl.textContent = cartCount;
      console.log('🛒 Новий лічильник:', cartCount);
      showAddedPopup();
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const cartCountEl = document.getElementById('cart-count');
  if (!cartCountEl) return;

  // Функція показу попапа (якщо у вас вона вже є — вона використається; інакше своя)
  const popupFn = typeof showAddedPopup === 'function'
    ? showAddedPopup
    : (msg = 'Товар додано до кошика') => {
        let p = document.getElementById('added-popup');
        if (!p) {
          p = document.createElement('div');
          p.id = 'added-popup';
          document.body.appendChild(p);
        }
        p.textContent = msg;
        p.classList.add('show');
        setTimeout(() => p.classList.remove('show'), 1500);
      };

  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopImmediatePropagation();    // зупиняємо всі інші обробники для цієї події
      e.preventDefault();             // блокуємо дефолтну дію (якщо є)

      // Збільшуємо лічильник
      let cnt = parseInt(cartCountEl.textContent, 10) || 0;
      cnt += 1;
      cartCountEl.textContent = cnt;

      // Відображаємо попап
      popupFn();
    }, { capture: true });
  });
});
// renderBreadcrumbs(selector, items)
// items = [{name: 'Головна', url: '/'}, {name: 'Категорії', url:'/categories'}, {name:'Навушники'}]
function renderBreadcrumbs(selector, items = []) {
  const container = document.querySelector(selector);
  if (!container) return;
  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';
  nav.setAttribute('aria-label', 'Хлібні крихти');
  const ol = document.createElement('ol');

  items.forEach((it, idx) => {
    const li = document.createElement('li');
    if (it.url && idx !== items.length - 1) {
      const a = document.createElement('a');
      a.href = it.url;
      a.textContent = it.name;
      li.appendChild(a);
    } else {
      li.textContent = it.name;
      if (idx === items.length - 1) li.setAttribute('aria-current', 'page');
    }
    ol.appendChild(li);
  });

  nav.appendChild(ol);

  // Якщо там уже є breadcrumbs — замінимо, інакше вставимо зверху
  const existing = container.querySelector('.breadcrumbs');
  if (existing) existing.replaceWith(nav);
  else container.insertBefore(nav, container.firstChild);
}

/* ===== Приклад використання на сторінці каталогу =====
   Вставити під час ініціалізації сторінки:
*/
document.addEventListener('DOMContentLoaded', () => {
  // Якщо у тебе є контейнер .container в секції products — вставимо в нього
  renderBreadcrumbs('#products .container', [
    {name: 'Головна', url: '/'},
    {name: 'Категорії', url: '/categories'},
    {name: 'Навушники'} // останній = поточна сторінка
  ]);

  /* ===== Приклад: при кліку на картку товару (SPA) ставити breadcrumb з назвою товару =====
     Для цього додай в HTML кожного товару атрибут data-category (наприклад data-category="Навушники")
     і можна використовувати цей код: */
  document.querySelectorAll('#products .product-card, #offers .product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Не спрацьовує при кліку на кнопку "Додати"
      if (e.target.closest('.btn-add')) return;
      const titleEl = card.querySelector('.product-title');
      const title = titleEl ? titleEl.textContent.trim() : 'Товар';
      const category = card.dataset.category || 'Навушники';
      // Припустимо що відкриваємо детальний view: поставимо crumbs
      renderBreadcrumbs('#product-detail-header' /*якщо є контейнер на сторінці товару*/, [
        {name:'Головна', url:'/'},
        {name:'Категорії', url:'/categories'},
        {name: category, url:`/categories/${category.toLowerCase()}`},
        {name: title}
      ]);
      // тут можна додати навігацію до сторінки товару
    });
  });
});
// PRODUCT MODAL JS
// ===== PRODUCT MODAL: відкриття / заповнення / закриття (overlay / X / ESC) =====
(function(){
  const modal = document.getElementById('product-modal');
  if (!modal) return; // якщо немає модалки — не робимо нічого

  const overlay = modal.querySelector('.modal-overlay');
  const closeButtons = modal.querySelectorAll('[data-close]');
  const modalCloseBtn = modal.querySelector('.modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalShort = document.getElementById('modal-short');
  const modalDesc = document.getElementById('modal-desc');
  const modalSpecs = document.getElementById('modal-specs');
  const modalMainImage = document.getElementById('modal-main-image');
  const modalThumbs = document.getElementById('modal-thumbs');
  const modalAddBtn = document.getElementById('modal-add');
  const modalBuyBtn = document.getElementById('modal-buy');

  let lastFocused = null;

  function safeParseSpecs(str) {
    try { return JSON.parse(str); } catch(e) { return null; }
  }

  function fillModalFromCard(card) {
    // title & price
    const titleEl = card.querySelector('.product-title');
    const priceEl = card.querySelector('.price');
    modalTitle.textContent = titleEl ? titleEl.textContent.trim() : 'Товар';
    modalPrice.textContent = priceEl ? priceEl.textContent.trim() : '';

    // short & description
    modalShort.textContent = card.dataset.short || '';
    modalDesc.textContent = card.dataset.description || '';

    // specs (JSON in data-specs)
    modalSpecs.innerHTML = '';
    const specs = safeParseSpecs(card.dataset.specs || '{}');
    if (specs && typeof specs === 'object') {
      for (const key of Object.keys(specs)) {
        const tr = document.createElement('tr');
        const tdKey = document.createElement('td');
        const tdVal = document.createElement('td');
        tdKey.textContent = key;
        tdVal.textContent = specs[key];
        tr.appendChild(tdKey);
        tr.appendChild(tdVal);
        modalSpecs.appendChild(tr);
      }
    } else {
      modalSpecs.innerHTML = '<tr><td>Характеристики</td><td>Немає</td></tr>';
    }

    // images (data-images can be single src or comma-separated)
    modalThumbs.innerHTML = '';
    const rawImgs = (card.dataset.images || '').split(',').map(s => s.trim()).filter(Boolean);
    const first = rawImgs[0] || (card.querySelector('img') && card.querySelector('img').src) || '';
    modalMainImage.src = first;
    modalMainImage.alt = modalTitle.textContent;

    rawImgs.forEach((src, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.title = 'Переглянути зображення ' + (i+1);
      const img = document.createElement('img');
      img.src = src;
      img.alt = modalTitle.textContent + ' ' + (i+1);
      btn.appendChild(img);
      btn.addEventListener('click', () => {
        modalMainImage.src = src;
      });
      modalThumbs.appendChild(btn);
    });
  }

  function openModal(card) {
    lastFocused = document.activeElement;
    fillModalFromCard(card);
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // поставить фокус на закриття для доступності
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // повернути фокус туди, де був користувач
    try { if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus(); } catch(e){}
  }

  // прив'язка закриттів
  if (overlay) overlay.addEventListener('click', closeModal);
  closeButtons.forEach(b => b.addEventListener('click', closeModal));
  // клавіша Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Якщо хочеш — при натисканні на всю карточку відкривати модалку
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // ігнорувати клік по кнопці "Додати"
      if (e.target.closest('.btn-add')) return;
      openModal(card);
    });
  });

  // також дозволити додати товар у кошик з модалки (викликає клік на кнопку кошика)
  if (modalAddBtn) {
    modalAddBtn.addEventListener('click', () => {
      // Якщо на сторінці є елемент для оновлення кошика, просто симулюємо додавання
      const cartCountEl = document.getElementById('cart-count');
      if (cartCountEl) cartCountEl.textContent = (parseInt(cartCountEl.textContent || '0', 10) + 1);
      // показати короткий фідбек (як у тебе є функція showPopup — викликай її)
      // закриваємо модалку
      closeModal();
    });
  }

  // якщо користувач натискає всередині панелі, не закривати (overlay вже обробляє закриття)
  const panel = modal.querySelector('.modal-panel');
  if (panel) panel.addEventListener('click', (e) => e.stopPropagation());
})();
document.addEventListener('DOMContentLoaded', () => {
  if (!('ontouchstart' in window)) return;
  document.querySelectorAll('.product-card').forEach(card => {
    let t;
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
      clearTimeout(t);
      t = setTimeout(() => card.classList.remove('touch-active'), 350);
    }, {passive: true});
    card.addEventListener('touchmove', () => {
      clearTimeout(t);
      card.classList.remove('touch-active');
    }, {passive: true});
  });
});
document.addEventListener('DOMContentLoaded', () => {
  if (!('ontouchstart' in window)) return;
  document.querySelectorAll('.offers-grid .product-card').forEach(card => {
    let t;
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
      clearTimeout(t);
      t = setTimeout(() => card.classList.remove('touch-active'), 350);
    }, {passive: true});
    card.addEventListener('touchmove', () => {
      clearTimeout(t);
      card.classList.remove('touch-active');
    }, {passive: true});
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // 1) IntersectionObserver для fade-in (секції і картки)
  const ioOptions = { threshold: 0.12 };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        // Якщо хочеш — перестаємо спостерігати після появи:
        io.unobserve(e.target);
      }
    });
  }, ioOptions);

  // додаємо .fade-in до основних секцій і карток якщо їх нема
  const sections = document.querySelectorAll('section, .product-card');
  sections.forEach(el => {
    // не чіпай елементи, що вже явно приховані
    if (el.classList.contains('no-anim')) return;
    if (!el.classList.contains('fade-in')) el.classList.add('fade-in');
    io.observe(el);
  });

  // 2) Додатково: touch devices — ставимо touch-active на tap для UX
  let touchTimer = null;
  document.body.addEventListener('touchstart', (ev) => {
    const el = ev.target.closest('.product-card');
    if (!el) return;
    el.classList.add('touch-active');
    clearTimeout(touchTimer);
    touchTimer = setTimeout(() => el.classList.remove('touch-active'), 350);
  }, { passive: true });

  // 3) Слухаємо зміни aria-hidden у модалки — (якщо інші скрипти керують aria-hidden)
  const modal = document.getElementById('product-modal');
  if (modal) {
    const mo = new MutationObserver(muts => {
      muts.forEach(m => {
        if (m.attributeName === 'aria-hidden') {
          const val = modal.getAttribute('aria-hidden');
          // якщо модал відкрита, фокусуємо кнопку закриття для доступності
          if (val === 'false') {
            // фокус на кнопці close після анімації
            setTimeout(() => {
              const btn = modal.querySelector('.modal-close');
              if (btn) btn.focus();
            }, 170);
          }
        }
      });
    });
    mo.observe(modal, { attributes: true });
  }

  // 4) Optional: плавні підказки — прибираємо "стрибок" при resize
  let resizeTO;
  window.addEventListener('resize', () => {
    document.body.classList.add('resizing');
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => document.body.classList.remove('resizing'), 200);
  });
});


// припустимо у вас є елементи:
// convert-images.js  (запусти через node)
  // ---------- helper: нормалізація id з карточки ----------
  function idFromCard(card){
    if(!card) return '';
    return String(card.dataset.id || card.dataset.productId ||
      (card.querySelector('.product-title')?.textContent || '')
        .trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,''));
  }

  // ---------- помітити товар в UI як "в кошику" ----------
  function markProductInUI(id){
    if(!id) return;
    const norm = String(id);

    // 1) карточки товарів
    document.querySelectorAll('.product-card').forEach(card => {
      const cid = idFromCard(card);
      if(!cid) return;
      if(String(cid) === norm){
        const btn = card.querySelector('.btn-add');
        if(btn){
          btn.disabled = true;
          btn.classList.add('in-cart');
          try { btn.textContent = 'В кошику'; } catch(e){}
        }
      }
    });

    // 2) елементи з data-product-id (на випадок кнопок поза карточкою)
    document.querySelectorAll('[data-product-id]').forEach(el => {
      const pid = el.getAttribute('data-product-id');
      if(String(pid) === norm){
        el.disabled = true;
        el.classList.add('in-cart');
        if(el.classList.contains('btn-add')) try { el.textContent = 'В кошику'; } catch(e){}
      }
    });

    // 3) модалка: якщо відкрита для цього товару — відключаємо кнопку "Додати в кошик"
    const modal = document.getElementById('product-modal');
    if(modal && modal.dataset && String(modal.dataset.productId) === norm){
      const modalAdd = document.getElementById('modal-add');
      if(modalAdd){
        modalAdd.disabled = true;
        modalAdd.classList.add('in-cart');
        try { modalAdd.textContent = 'В кошику'; } catch(e){}
      }
    }
  }

  // ---------- помітити всі товари, що вже в кошику (при завантаженні) ----------
  function markAllInCart(){
    try {
      const cart = getCart() || [];
      cart.forEach(item => markProductInUI(item.id));
    } catch(e){}
  }

  // ---------- addToCartOnce (оновлена) ----------
  function addToCartOnce(product){
    if(!product || !product.id) return;
    const pid = String(product.id);

    // Якщо товар вже в кошику — не додаємо
    const cart = getCart();
    if(cart.some(i => String(i.id) === pid)){
      showSmallPopup('Товар уже в кошику');
      // також помітимо UI на випадок, якщо не помічено
      markProductInUI(pid);
      return;
    }

    // додаємо (qty = 1)
    cart.push(Object.assign({}, product, { qty: 1 }));
    saveCart(cart);
    updateHeaderCount();

    // помічаємо UI — відключаємо кнопки "Додати" для цього товару
    markProductInUI(pid);

    showSmallPopup('Товар додано до кошику');
  }

  // ---------- Ініціалізація: після завантаження сторінки помітити існуючі товари ----------
  document.addEventListener('DOMContentLoaded', function(){
    // якщо інші ініціалізації теж підписані - це не зашкодить
    markAllInCart();
  });
  // script.js — UI enhancements + cart recalculation + filters
(() => {
  'use strict';

  /* ---------- Конфіг / селектори ---------- */
  const REVEAL_SELECTORS = ['.product-card', '.product', '.card', '.reveal', '.cart-row', 'tr[data-id]'];
  const ADD_BTN_SELECTOR = '.btn-add, button.btn-add, .btn.btn-add';
  const IMAGE_SEL = 'img';
  const CART_ICON_CANDIDATES = ['#cart-icon', '.cart-icon', '.header .cart', '.cart-toggle', '.cart-btn', 'a[href*="cart"]', 'button[data-cart]'];
  const HEADER_CANDIDATES = ['header', '.site-header', '.main-header', '.topbar'];
  const CART_STORAGE_KEY = 'shop_cart_v1'; // якщо використовуєш localStorage

  /* ---------- Утиліти ---------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = v => new Intl.NumberFormat('uk-UA').format(Math.round(v));
  const findFirst = (arr) => arr.map(s => document.querySelector(s)).find(x => !!x) || null;
  const q = sel => document.querySelector(sel);
  const qa = sel => Array.from(document.querySelectorAll(sel));

  /* ---------- Вставка CSS (щоб не чіпати HTML) ---------- */
  (function injectCSS(){
    const css = `
      :root{--accent:#0b6eff;--muted:#6b7280}
      html{scroll-behavior:smooth}
      .ue-reveal{opacity:0;transform:translateY(14px);transition:opacity .6s ease, transform .6s ease;will-change:transform,opacity}
      .ue-visible{opacity:1;transform:none}
      .ue-fly-clone{position:fixed;z-index:9999;border-radius:8px;object-fit:cover;box-shadow:0 10px 30px rgba(2,6,23,.12)}
      .ue-tip{position:absolute;left:50%;top:-18px;transform:translateX(-50%);font-weight:700;color:var(--accent);pointer-events:none}
      .ue-toast{position:fixed;right:20px;bottom:20px;padding:10px 14px;border-radius:8px;background:#0b6eff;color:#fff;box-shadow:0 8px 24px rgba(2,6,23,.12);z-index:99999}
      .ue-cart-flash{animation:ue-pulse .36s ease}
      @keyframes ue-pulse{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
      .ue-hidden{display:none !important}
      .ue-qty-input{width:64px;padding:8px;border-radius:8px;border:1px solid #e6e6e6;text-align:center}
      /* polite fallback */
      @media (prefers-reduced-motion: reduce){ .ue-reveal, .ue-fly-clone, .ue-tip { transition: none !important } }
    `;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  })();

  /* ---------- Lazy-loading for images ---------- */
  function initLazyImages(){
    qa(IMAGE_SEL).forEach(img => {
      try { img.loading = 'lazy'; } catch(e){}
    });
    // fallback handled by browser / IntersectionObserver not necessary here
  }

  /* ---------- Reveal-on-scroll ---------- */
  function initReveal(){
    if (prefersReduced) {
      REVEAL_SELECTORS.forEach(sel => qa(sel).forEach(el => el.classList.add('ue-visible')));
      return;
    }
    const targets = REVEAL_SELECTORS.flatMap(s => qa(s));
    if (!targets.length) return;
    targets.forEach(t => t.classList.add('ue-reveal'));
    if (!('IntersectionObserver' in window)){
      targets.forEach(t => t.classList.add('ue-visible'));
      return;
    }
    const io = new IntersectionObserver((entries, o) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('ue-visible'); o.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(t => io.observe(t));
  }

  /* ---------- Flying image animation when adding to cart ---------- */
  function initFlyingAddToCart(){
    const cartEl = findFirst(CART_ICON_CANDIDATES);
    const addBtns = qa(ADD_BTN_SELECTOR);
    if (!addBtns.length) return;

    function findImage(btn){
      // try common card shapes
      let card = btn.closest('.product-card, .product, .card, article, .product-item');
      if (!card) card = btn.parentElement;
      if (!card) return null;
      const img = card.querySelector('img');
      return img || null;
    }

    addBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // +1 microtip
        showPlusOne(btn);

        const img = findImage(btn);
        if (!img || !cartEl) return;
        const imgRect = img.getBoundingClientRect();
        const cartRect = cartEl.getBoundingClientRect();
        const clone = img.cloneNode(true);
        clone.className = 'ue-fly-clone';
        clone.style.left = imgRect.left + 'px';
        clone.style.top = imgRect.top + 'px';
        clone.style.width = imgRect.width + 'px';
        clone.style.height = imgRect.height + 'px';
        document.body.appendChild(clone);
        requestAnimationFrame(() => {
          const tx = (cartRect.left + cartRect.width/2) - (imgRect.left + imgRect.width/2);
          const ty = (cartRect.top + cartRect.height/2) - (imgRect.top + imgRect.height/2);
          clone.style.transition = 'transform .85s cubic-bezier(.18,.9,.22,1), opacity .85s ease';
          clone.style.transform = `translate(${tx}px, ${ty}px) scale(.18)`;
          clone.style.opacity = '0.3';
        });
        setTimeout(()=> clone.remove(), 900);
        // flash cart
        cartEl.classList.add('ue-cart-flash');
        setTimeout(()=> cartEl.classList.remove('ue-cart-flash'), 360);
      });
    });
  }

  function showPlusOne(btn){
    try {
      const tip = document.createElement('span');
      tip.className = 'ue-tip';
      tip.textContent = '+1';
      tip.style.opacity = '1';
      tip.style.transition = 'transform .6s ease, opacity .6s ease';
      btn.style.position = 'relative';
      btn.appendChild(tip);
      requestAnimationFrame(()=> {
        tip.style.transform = 'translate(-50%,-26px)';
        tip.style.opacity = '0';
      });
      setTimeout(()=> tip.remove(), 700);
    } catch(e){}
  }

  /* ---------- Smart header (hide on scroll down) ---------- */
  function initSmartHeader(){
    const header = findFirst(HEADER_CANDIDATES);
    if (!header) return;
    if (prefersReduced) return;
    let lastY = window.scrollY;
    let ticking = false;
    header.style.transition = 'transform .28s ease';
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(()=> {
        const y = window.scrollY;
        if (y > lastY && y > 120) header.style.transform = 'translateY(-105%)';
        else header.style.transform = 'translateY(0)';
        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Animated counters (data-animate-number) ---------- */
  function initAnimatedCounters(){
    const els = qa('[data-animate-number]');
    if (!els.length) return;
    function animate(el, to, duration=900){
      const start = 0;
      const diff = to - start;
      let startTime = null;
      function step(ts){
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / duration, 1);
        const val = Math.round(start + diff * p);
        el.textContent = fmt(val) + (el.dataset.suffix || '');
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)){
      els.forEach(el => animate(el, Number(el.dataset.animateNumber || 0)));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting){
          const el = en.target;
          animate(el, Number(el.dataset.animateNumber || 0), Number(el.dataset.duration || 900));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
  }

  /* ---------- CONTACT FORM fake submit (shows small toast + message) ---------- */
  function initContactForm(){
    const form = q('#fake-form') || q('.contact-form') || q('form.contact-form');
    if (!form) return;
    const success = q('#fake-success');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // small toast
      const toast = document.createElement('div');
      toast.className = 'ue-toast';
      toast.innerText = 'Запит надіслано';
      document.body.appendChild(toast);
      setTimeout(()=> toast.remove(), 2200);
      // show success block if present
      if (success) {
        success.classList.remove('ue-hidden');
        success.style.opacity = '0';
        success.style.transition = 'opacity .4s ease';
        requestAnimationFrame(()=> success.style.opacity = '1');
        setTimeout(()=> { success.style.opacity = '0'; setTimeout(()=> success.classList.add('ue-hidden'), 400); }, 2800);
      }
      form.reset();
    });
  }

  /* ---------- Catalog filter & sort (products) ---------- */
  function initCatalogControls(){
    const form = q('#filter-form-products');
    if (!form) return;
    const container = form.closest('.container') || document;
    const grid = container.querySelector('.grid, .products-grid, .catalog-grid');
    if (!grid) return;
    const cards = () => Array.from(grid.children).filter(n => n.nodeType === 1 && n.matches('.product-card, .product'));
    const refresh = () => {
      const min = Number(q('#price-min-products')?.value || q('#price-min-products')?.dataset?.value || 0) || 0;
      const max = Number(q('#price-max-products')?.value || q('#price-max-products')?.dataset?.value || 0) || 0;
      const sort = q('#sort-select-products')?.value || 'none';
      let arr = cards();
      // filter
      if (min || max) {
        arr = arr.filter(c => {
          const p = Number(c.dataset.price || (c.querySelector('.price') ? (c.dataset.price || c.querySelector('.price').textContent.replace(/\D/g,'')) : 0));
          if (min && p < min) return false;
          if (max && max > 0 && p > max) return false;
          return true;
        });
      }
      // sort
      if (sort === 'price-asc' || sort === 'price-desc'){
        arr.sort((a,b) => {
          const pa = Number(a.dataset.price || (a.querySelector('.price')?.textContent.replace(/\D/g,'') || 0));
          const pb = Number(b.dataset.price || (b.querySelector('.price')?.textContent.replace(/\D/g,'') || 0));
          return sort === 'price-asc' ? pa - pb : pb - pa;
        });
      }
      // reattach in new order
      grid.innerHTML = '';
      arr.forEach(n => grid.appendChild(n));
    };

    // wire events
    ['#price-min-products','#price-max-products','#sort-select-products'].forEach(s => {
      const el = q(s);
      if (!el) return;
      el.addEventListener('input', debounce(refresh, 180));
      el.addEventListener('change', debounce(refresh, 180));
    });
  }

  /* ---------- Debounce utility ---------- */
  function debounce(fn, wait){
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(()=> fn(...a), wait); };
  }

  /* ---------- CART recalculation logic ---------- */
  function initCartCalculation(){
    // finds rows in cart and recalculates subtotal / total
    // supports: tr[data-id] rows, .cart-row, .cart-item
    const cartRoot = q('#cart-root') || q('.cart-root') || q('.cart-table') || q('table.cart') || document;
    if (!cartRoot) return;

    function parsePrice(text){
      if (text === undefined || text === null) return 0;
      // possible sources: data-price attr, element text "5 499 ₴", or "5499"
      const n = String(text).replace(/[^\d\-,.]/g, '').replace(',', '.');
      const parsed = parseFloat(n);
      return isNaN(parsed) ? 0 : parsed;
    }

    function findRows(){
      // prefer table rows
      let rows = Array.from(cartRoot.querySelectorAll('tr[data-id], .cart-row, .cart-item, .cart-list-item'));
      if (!rows.length) {
        // maybe each product is in a div with data-id
        rows = Array.from(cartRoot.querySelectorAll('[data-id]')).filter(el => el.closest('table') || el.querySelector('input[data-qty], .qty'));
      }
      return rows;
    }

    function updateRowSubtotal(row){
      // price: from row.dataset.price or .price element inside
      let price = 0;
      if (row.dataset && row.dataset.price) price = Number(row.dataset.price);
      else {
        const pEl = row.querySelector('[data-price], .price, .item-price');
        if (pEl) price = parsePrice(pEl.dataset?.price || pEl.getAttribute('data-price') || pEl.textContent);
      }
      // qty from input[data-qty] or input.qty
      const qtyEl = row.querySelector('input[data-qty], input.qty, input[type="number"]');
      let qty = qtyEl ? (Number(qtyEl.value) || 0) : (Number(row.dataset.qty) || 0);
      if (!qty) qty = 0;
      const subtotal = (Number(price) || 0) * (Number(qty) || 0);
      // set .subtotal element if exists or create one
      let subEl = row.querySelector('.subtotal');
      if (!subEl) {
        // try to create or find a cell
        subEl = document.createElement('div');
        subEl.className = 'subtotal';
        // append to row in sensible place
        const last = row.querySelector('td:last-child, .actions') || row;
        last.appendChild(subEl);
      }
      subEl.textContent = fmt(subtotal) + ' ₴';
      return { price, qty, subtotal };
    }

    function updateCartSummary(){
      const rows = findRows();
      let total = 0;
      let totalQty = 0;
      let positions = 0;
      rows.forEach(r => {
        const info = updateRowSubtotal(r);
        if (info.qty > 0) { positions += 1; totalQty += info.qty; }
        total += info.subtotal;
      });
      // find summary elements on page and update
      const totalEls = qa('#cart-total, .cart-total, #cart-sum, .order-summary .total, .summary-total');
      const qtyEls = qa('#cart-qty, .cart-count, .summary-qty, .order-summary .qty');
      const posEls = qa('#cart-positions, .cart-positions, .summary-positions');

      if (totalEls.length) totalEls.forEach(e => e.textContent = fmt(total) + ' ₴');
      else {
        // try to update any element containing 'Всього' nearby
        const guess = document.querySelector('[data-cart-total], .summary .total');
        if (guess) guess.textContent = fmt(total) + ' ₴';
      }

      if (qtyEls.length) qtyEls.forEach(e => e.textContent = fmt(totalQty));
      if (posEls.length) posEls.forEach(e => e.textContent = fmt(positions));

      // if you keep cart in localStorage, update it here too (best-effort)
      try {
        const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
        if (Array.isArray(stored) && stored.length) {
          // update qtys by matching id
          const newStored = stored.map(item => {
            const r = rows.find(rr => String(rr.dataset.id) === String(item.id) || String(rr.querySelector('[data-id]')?.dataset?.id) === String(item.id));
            if (r) {
              const qEl = r.querySelector('input[data-qty], input.qty, input[type="number"]');
              if (qEl) item.qty = Number(qEl.value) || item.qty;
            }
            return item;
          });
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newStored));
          // dispatch event for other tabs/scripts
          window.dispatchEvent(new Event('cart:changed'));
        }
      } catch (e){}
    }

    // Delegated listeners for inc/dec/remove buttons and qty inputs
    document.addEventListener('click', (ev) => {
      const btn = ev.target.closest('button, a');
      if (!btn) return;
      const row = btn.closest('tr[data-id], .cart-row, .cart-item, [data-id]');
      if (!row) return;
      const act = btn.dataset.action || btn.className || '';
      if (/remove|delete|del|видалити|trash/i.test(act + btn.textContent)) {
        // remove row from DOM
        row.remove();
        updateCartSummary();
        return;
      }
      // inc/dec buttons (look for data-action)
      if (btn.dataset.action === 'inc' || /(?:\+|add|плюс)/i.test(btn.textContent)) {
        const qEl = row.querySelector('input[data-qty], input.qty, input[type="number"]');
        if (qEl) { qEl.value = Number(qEl.value || 0) + 1; qEl.dispatchEvent(new Event('input')); }
        updateCartSummary();
        return;
      }
      if (btn.dataset.action === 'dec' || /(?:\-|minus|мінус)/i.test(btn.textContent)) {
        const qEl = row.querySelector('input[data-qty], input.qty, input[type="number"]');
        if (qEl) { qEl.value = Math.max(0, Number(qEl.value || 0) - 1); qEl.dispatchEvent(new Event('input')); }
        updateCartSummary();
        return;
      }
    });

    // input change
    document.addEventListener('input', (ev) => {
      const input = ev.target;
      if (!input.matches('input[data-qty], input.qty, input[type="number"]')) return;
      // sanitize
      input.value = String(Math.max(0, Math.floor(Number(input.value || 0))));
      updateCartSummary();
    });

    // initial run
    setTimeout(updateCartSummary, 260);
    // also when storage changes from other tab
    window.addEventListener('storage', (e) => { if (e.key === CART_STORAGE_KEY) updateCartSummary(); });
    // custom event
    window.addEventListener('cart:changed', updateCartSummary);
  }

  /* ---------- Add-to-cart (localStorage) from product cards ---------- */
  function initAddToCartStorage(){
    const addBtns = qa(ADD_BTN_SELECTOR);
    if (!addBtns.length) return;
    addBtns.forEach(btn => btn.addEventListener('click', () => {
      // read product card info
      const card = btn.closest('.product-card, .product, .card, article, .product-item');
      if (!card) return;
      const id = card.dataset.id || card.querySelector('.product-title')?.textContent?.trim()?.toLowerCase().replace(/\s+/g,'-') || Date.now();
      const title = card.querySelector('.product-title')?.textContent?.trim() || card.querySelector('h3, h4, h2')?.textContent?.trim() || id;
      const price = Number(card.dataset.price || (card.querySelector('.price')?.textContent.replace(/[^\d]/g,'') || 0)) || 0;
      const image = card.dataset.images || (card.querySelector('img')?.getAttribute('src')) || '';
      // load current cart
      let cart = [];
      try { cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'); } catch(e){ cart = []; }
      const idx = cart.findIndex(i => String(i.id) === String(id));
      if (idx >= 0) {
        cart[idx].qty = (Number(cart[idx].qty)||0) + 1;
      } else {
        cart.push({ id, title, price, image, qty: 1 });
      }
      try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch(e){}
      // dispatch event for cart page
      window.dispatchEvent(new Event('cart:changed'));
    }));
  }

  /* ---------- Small helper: update any 'price' text on product card to formatted value ---------- */
  function normalizeProductPrices(){
    qa('.product-card, .product').forEach(card => {
      const pEl = card.querySelector('.price');
      if (!pEl) return;
      const raw = pEl.textContent || pEl.dataset.price || '';
      const num = Number(String(raw).replace(/[^\d]/g,'')) || 0;
      pEl.textContent = fmt(num) + ' ₴';
      // also set dataset.price
      card.dataset.price = num;
    });
  }

  /* ---------- Filters for offers (same controls if exist) ---------- */
  function initOffersControls(){
    // reuse logic for products: just look for #filter-form-offers
    const form = q('#filter-form-offers');
    if (!form) return;
    const grid = form.closest('.container')?.querySelector('.offers-grid') || document.querySelector('.offers-grid') || null;
    if (!grid) return;
    // same logic as products
    // simply call initCatalogControls() afterward — but this function targets #filter-form-products
    // so implement minimal: listen to inputs and perform simple DOM filter/sort
    const minEl = q('#price-min-offers');
    const maxEl = q('#price-max-offers');
    const sortEl = q('#sort-select-offers');

    function getCards(){ return Array.from(grid.children).filter(n=> n.matches && n.matches('.product-card, .product')); }
    function refresh(){
      let cards = getCards();
      const min = Number(minEl?.value || 0) || 0;
      const max = Number(maxEl?.value || 0) || 0;
      const sort = sortEl?.value || 'none';
      if (min || max) {
        cards = cards.filter(c => {
          const p = Number(c.dataset.price || (c.querySelector('.price')?.textContent.replace(/\D/g,'')||0));
          if (min && p < min) return false;
          if (max && max > 0 && p > max) return false;
          return true;
        });
      }
      if (sort === 'price-asc' || sort === 'price-desc') {
        cards.sort((a,b) => {
          const pa = Number(a.dataset.price || 0), pb = Number(b.dataset.price || 0);
          return sort === 'price-asc' ? pa - pb : pb - pa;
        });
      }
      grid.innerHTML = '';
      cards.forEach(c => grid.appendChild(c));
    }

    [minEl, maxEl, sortEl].forEach(el => { if (!el) return; el.addEventListener('input', debounce(refresh, 160)); el.addEventListener('change', debounce(refresh, 160)); });
  }

  /* ---------- Init everything on DOM ready ---------- */
  function initAll(){
    try { initLazyImages(); } catch(e){ console.warn('lazy failed', e); }
    try { initReveal(); } catch(e){ console.warn('reveal failed', e); }
    try { initFlyingAddToCart(); } catch(e){ console.warn('fly failed', e); }
    try { initSmartHeader(); } catch(e){ console.warn('header failed', e); }
    try { initAnimatedCounters(); } catch(e){ console.warn('counters failed', e); }
    try { initContactForm(); } catch(e){ console.warn('contact failed', e); }
    try { initCatalogControls(); } catch(e){ console.warn('catalog controls failed', e); }
    try { initOffersControls(); } catch(e){ console.warn('offers controls failed', e); }
    try { initCartCalculation(); } catch(e){ console.warn('cart calc failed', e); }
    try { initAddToCartStorage(); } catch(e){ console.warn('add-to-cart storage failed', e); }
    try { normalizeProductPrices(); } catch(e){ console.warn('normalize prices failed', e); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();

})();
// js/script.js
(function(){
  // --- налаштування (змінюй при потребі) ---
  const CARD_IMG_SELECTOR = '.product-card img';
  const MIN_VISUAL_HEIGHT = 160; // px - мінімальна висота/шахматка для картинок
  const TRANSITION_BAILOUT_MS = 1200; // макс час очікування, потім розблокуємо трансформації

  // --- інжект штук у head щоб не чіпати HTML файли ---
  const css = `
    /* тимчасово вимикаємо переходи під час ініціалізації */
    body.js-no-transitions * { transition: none !important; animation: none !important; }

    /* стабільний вигляд картинок у product-card */
    .product-card img {
      display: block;
      width: 160px;                 /* фіксований візуальний розмір - можна поміняти */
      height: ${MIN_VISUAL_HEIGHT}px;
      object-fit: contain;          /* показує всю картинку без обрізання */
      border-radius: 10px;
      background: linear-gradient(90deg,#fff,#f6f8fb); /* легкий скелетон */
      box-shadow: 0 0 0 6px rgba(255,255,255,0.6) inset;
      transition: opacity .25s ease;
    }
    /* контейнер контенту поруч із картинкою - щоб не змінювався розмір */
    .product-card { display:flex; gap:20px; align-items:center; }
    .product-card .text { flex:1; min-height: ${MIN_VISUAL_HEIGHT}px; }

    /* якщо ми вказали aspect-ratio - робимо зображення гнучким */
    .product-card img[style*="aspect-ratio"] { width: 160px; height: auto; }

    /* маленький клас-затінення поки картинка не завантажилась */
    .img-loading { opacity: 0.45; filter: blur(1px); }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // --- блокування переходів поки ставимо розміри ---
  document.documentElement.classList.add('js-no-transitions');

  // знайдемо всі картинки в карточках
  const imgs = Array.from(document.querySelectorAll(CARD_IMG_SELECTOR));

  // якщо немає картинок - знімемо блокування через таймаут
  if (!imgs.length) {
    setTimeout(()=> document.documentElement.classList.remove('js-no-transitions'), 300);
    return;
  }

  // функція для обробки однієї картинки
  function preserveImageSpace(img){
    // додамо lazy якщо немає
    try { img.loading = img.loading || 'lazy'; } catch(e){ /* ignore */ }

    // візуально позначимо, що картинка ще ініціалізується
    img.classList.add('img-loading');

    // створюємо offscreen Image щоб дізнатись natural sizes
    const pre = new Image();
    pre.src = img.src;

    const applyDefaults = () => {
      // якщо preload не дав розмірів — просто виставимо aspect-ratio 1/1
      if (!pre.naturalWidth || !pre.naturalHeight) {
        img.style.aspectRatio = '1 / 1';
        img.removeAttribute('width');
        img.removeAttribute('height');
      } else {
        // ставимо width/height attrs — браузер зарезервує простір і не буде shift-у
        img.setAttribute('width', pre.naturalWidth);
        img.setAttribute('height', pre.naturalHeight);
        img.style.aspectRatio = `${pre.naturalWidth} / ${pre.naturalHeight}`;
      }
      // прибираємо скелетон через невелику затримку (щоб плавніше)
      setTimeout(()=> img.classList.remove('img-loading'), 120);
    };

    // якщо вже завантажена
    if (pre.complete) {
      applyDefaults();
      return Promise.resolve();
    }

    return new Promise(resolve=>{
      pre.onload = () => { applyDefaults(); resolve(); };
      pre.onerror = () => { applyDefaults(); resolve(); };
      // на випадок, якщо onload не спрацьовує - таймаут
      setTimeout(()=> { applyDefaults(); resolve(); }, 900);
    });
  }

  // обробимо всі картинки, потім знімемо глобальний no-transitions
  Promise.all(imgs.map(preserveImageSpace)).then(()=>{
    // невелика затримка щоб усе відмалювалося плавно
    setTimeout(()=> document.documentElement.classList.remove('js-no-transitions'), 80);
  });

  // додатковий захист: через максимум TRANSITION_BAILOUT_MS знімемо клас навіть якщо щось зависло
  setTimeout(()=> document.documentElement.classList.remove('js-no-transitions'), TRANSITION_BAILOUT_MS);

  // --- optional: якщо у тебе є grid, вмикаємо плавні reveal-ефекти без "стрибаючих" layout changes ---
  // (ми не вмикаємо тут великі анімації — просто мікро-покращення)
  document.addEventListener('DOMContentLoaded', ()=>{
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((c,i)=> {
      c.style.transform = 'translateY(6px)';
      c.style.opacity = '0';
      c.style.transition = 'transform .35s ease, opacity .35s ease';
      setTimeout(()=> { c.style.transform='none'; c.style.opacity='1'; }, 60 + i*20);
    });
  });

})();
// js/script.js
(() => {
  // --- Налаштування ---
  const REVEAL_SELECTOR = '.product-card, section, .product-card *'; // що робити reveal (див. стилі)
  const TILT_SELECTOR = '.product-card';     // елементи з hover-tilt
  const PARALLAX_SELECTOR = '[data-parallax]'; // елементи з data-parallax="0.2" (0.2 = сила)
  const SCROLL_PROGRESS_ID = 'site-scroll-progress';
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Вставка CSS (сучасний плавний стиль) ---
  const css = `
  /* Загальні плавні налаштування */
  :root {
    --ease-1: cubic-bezier(.22,.9,.35,1);
    --ease-2: cubic-bezier(.16,.8,.24,1);
    --accent: #0b69ff;
    --soft-shadow: 0 6px 18px rgba(20,30,40,0.06);
  }
  html.smooth-loaded { scroll-behavior: smooth; }

  /* Reveal */
  .reveal {
    opacity: 0;
    transform: translateY(14px) scale(.995);
    transition: opacity .55s var(--ease-2), transform .55s var(--ease-2);
    will-change: transform, opacity;
  }
  .reveal.is-visible {
    opacity: 1;
    transform: none;
  }

  /* Subtle floating for images or banners */
  .float-slow {
    transform-origin: center;
    transition: transform 2.8s var(--ease-1);
  }

  /* Hover-tilt for cards */
  ${TILT_SELECTOR} {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: transform .28s var(--ease-1), box-shadow .28s var(--ease-1);
    will-change: transform;
    cursor: pointer;
  }
  ${TILT_SELECTOR}:hover {
    box-shadow: 0 18px 40px rgba(14,30,60,0.09);
  }

  /* Button micro-animations */
  button, .btn {
    transition: transform .18s var(--ease-1), box-shadow .18s var(--ease-1);
    will-change: transform;
  }
  button:active, .btn:active { transform: translateY(1px) scale(.998); }

  /* Small scale-in for clickable chips */
  .micro-pop {
    transition: transform .25s var(--ease-2), opacity .25s var(--ease-2);
    will-change: transform;
  }

  /* Scroll progress bar */
  #${SCROLL_PROGRESS_ID} {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg,var(--accent), #4dd0ff);
    z-index: 9999;
    transition: width 150ms linear;
    pointer-events:none;
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .reveal,
    ${TILT_SELECTOR},
    button,
    .micro-pop,
    #${SCROLL_PROGRESS_ID} {
      transition: none !important;
      animation: none !important;
    }
  }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // --- Маленький прогрес-бар скролу ---
  const progress = document.createElement('div');
  progress.id = SCROLL_PROGRESS_ID;
  document.body.appendChild(progress);

  // --- Smooth load class ---
  window.addEventListener('load', () => {
    document.documentElement.classList.add('smooth-loaded');
  });

  // --- IntersectionObserver: reveal on scroll (very smooth) ---
  if (!REDUCED && 'IntersectionObserver' in window) {
    const revealElems = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    const observer = new IntersectionObserver((entries) => {
      for (const ent of entries) {
        const el = ent.target;
        if (ent.isIntersecting) {
          el.classList.add('reveal', 'is-visible');
          observer.unobserve(el);
        } else {
          // якщо хочеш знову анімувати при виході/зайденні - видали цю секцію
          // el.classList.remove('is-visible');
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

    // Додаємо всім початковий клас і спостерігаємо
    revealElems.forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    // reduced-motion або відсутній IO -> просто показати все без анімації
    document.querySelectorAll(REVEAL_SELECTOR).forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // --- Scroll progress update (throttled via rAF) ---
  let lastKnownScroll = 0;
  let ticking = false;
  function updateProgress() {
    const docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const winH = window.innerHeight;
    const max = docH - winH;
    const pct = max > 0 ? (lastKnownScroll / max) * 100 : 0;
    progress.style.width = pct + '%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    lastKnownScroll = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  // --- Parallax: elements with data-parallax="0.2" ---
  if (!REDUCED) {
    const parallaxEls = Array.from(document.querySelectorAll(PARALLAX_SELECTOR));
    if (parallaxEls.length) {
      let lastScroll = window.scrollY;
      let rafPending = false;
      function parallaxLoop(){
        const s = window.scrollY;
        parallaxEls.forEach(el => {
          const strength = parseFloat(el.getAttribute('data-parallax')) || 0.12;
          // movement relative to center of viewport
          const rect = el.getBoundingClientRect();
          const offset = (rect.top + rect.height * 0.5) - (window.innerHeight * 0.5);
          const move = -offset * strength;
          // apply transform
          el.style.transform = `translate3d(0, ${move.toFixed(2)}px, 0)`;
        });
        rafPending = false;
      }
      window.addEventListener('scroll', () => {
        if (!rafPending) {
          rafPending = true;
          window.requestAnimationFrame(parallaxLoop);
        }
      }, { passive: true });
      // initial run
      parallaxLoop();
    }
  }

  // --- Hover tilt for cards (mouse move) ---
  if (!REDUCED) {
    const cards = Array.from(document.querySelectorAll(TILT_SELECTOR));
    cards.forEach(card => {
      let rect = null;
      let bound = null;
      const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 8; // градуси
      function onMove(e){
        if (!rect) rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width; // 0..1
        const y = (e.clientY - rect.top) / rect.height;
        const px = (x - 0.5) * 2; // -1..1
        const py = (y - 0.5) * 2;
        const rotY = px * maxTilt * -1;
        const rotX = py * maxTilt;
        card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(6px)`;
      }
      function onLeave(){
        card.style.transform = 'none';
        rect = null;
      }
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('mouseenter', () => { card.style.transition = 'transform .36s var(--ease-1)'; });
      card.addEventListener('mouseleave', () => { card.style.transition = 'transform .48s cubic-bezier(.2,1,.3,1)'; });
    });
  }

  // --- Button ripple (delegated) ---
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .btn');
    if (!btn || REDUCED) return;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    circle.style.position = 'absolute';
    circle.style.pointerEvents = 'none';
    circle.style.borderRadius = '50%';
    circle.style.transform = 'translate(-50%,-50%)';
    circle.style.left = (e.clientX - rect.left) + 'px';
    circle.style.top = (e.clientY - rect.top) + 'px';
    circle.style.width = circle.style.height = Math.max(rect.width, rect.height) * 1.6 + 'px';
    circle.style.background = 'rgba(255,255,255,0.12)';
    circle.style.opacity = '0.9';
    circle.style.transition = 'opacity .6s ease, transform .6s ease';
    circle.style.zIndex = 9999;
    circle.className = 'btn-ripple';
    btn.style.position = btn.style.position || 'relative';
    btn.appendChild(circle);
    requestAnimationFrame(() => {
      circle.style.transform = 'translate(-50%,-50%) scale(1.02)';
      circle.style.opacity = '0';
    });
    setTimeout(()=> circle.remove(), 700);
  });

  // --- Small accessibility: disable animations if user toggles preference live ---
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener && mq.addEventListener('change', (ev) => {
    if (ev.matches) {
      // disable more
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    }
  });

  // --- gentle entrance for header/nav to avoid sudden shifts ---
  window.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('header, nav, .site-header, .topbar');
    headers.forEach(h => { h.style.transition = 'opacity .6s var(--ease-2), transform .6s var(--ease-2)'; h.style.opacity = '0'; h.style.transform = 'translateY(-8px)'; });
    setTimeout(()=> headers.forEach(h => { h.style.opacity = ''; h.style.transform = ''; }), 80);
  });

  // --- End of script ---
})();
// script.js — reveal-on-scroll, без правок HTML
(function () {
  // Додаємо динамічно CSS (щоб нічого не міняти в HTML/CSS)
  const css = `
    /* базовий стан для всіх елементів що будуть "reveal" */
    .reveal {
      opacity: 0;
      transform: translateY(20px) scale(0.995);
      will-change: opacity, transform;
      transition: opacity 800ms cubic-bezier(.2,.9,.3,1), transform 800ms cubic-bezier(.2,.9,.3,1);
      transition-delay: 0ms;
      visibility: visible;
    }
    /* видимий стан */
    .reveal.reveal--visible {
      opacity: 1;
      transform: none;
    }
    /* для дітей контейнера — щоб робити stagger */
    .reveal-child {
      opacity: 0;
      transform: translateY(14px) scale(0.995);
      will-change: opacity, transform;
      transition: opacity 700ms cubic-bezier(.2,.9,.3,1), transform 700ms cubic-bezier(.2,.9,.3,1);
      transition-delay: 0ms;
    }
    .reveal-child.reveal--visible {
      opacity: 1;
      transform: none;
    }
    /* якщо користувач хоче зменшення руху — відключаємо анімації */
    @media (prefers-reduced-motion: reduce) {
      .reveal, .reveal-child {
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);

  // Елементи, які ми хочемо показувати плавно.
  // Можеш додати/змінити селектори — зараз таргетуємо основні блоки.
  const containerSelectors = [
    'section',
    'header',
    'footer',
    '.container',
    '.catalog-controls',
    '.grid',
    '.offers-grid',
    '.product-card',
    '.contact',
    '.contact-form',
    '.product-list',
    '.card'
  ];
  const selectors = Array.from(new Set(containerSelectors)).join(',');

  // Клас для елементів що будуть анімуватись
  const REVEAL_CLASS = 'reveal';
  const CHILD_CLASS = 'reveal-child';
  const VISIBLE_CLASS = 'reveal--visible';

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  document.addEventListener('DOMContentLoaded', () => {
    // зберемо всі можливі елементи
    const all = Array.from(document.querySelectorAll(selectors));

    // Для контейнерів, що містять багато .product-card — поставимо stagger на дітей
    all.forEach(el => {
      // Якщо сам елемент — product-card, теж додамо .reveal (щоб окремі картки теж анімувались)
      if (el.matches('.product-card')) {
        el.classList.add(REVEAL_CLASS);
        return;
      }

      // Якщо контейнер має багато карток — підготовка stagger
      const cards = el.querySelectorAll('.product-card');
      if (cards && cards.length > 0) {
        // маркуємо контейнер (щоб не дублювати) і дітей як reveal-child
        el.classList.add(REVEAL_CLASS);
        cards.forEach(card => card.classList.add(CHILD_CLASS));
      } else {
        // Якщо це звичайний блок без карток — зробимо його одиничним reveal
        el.classList.add(REVEAL_CLASS);
      }
    });

    // Якщо користувач обрав reduced-motion — просто відкриємо всі відразу
    if (prefersReducedMotion()) {
      document.querySelectorAll(`.${REVEAL_CLASS}, .${CHILD_CLASS}`).forEach(e => e.classList.add(VISIBLE_CLASS));
      return;
    }

    // IntersectionObserver для плавного показу
    const ioOptions = {
      root: null,
      rootMargin: '0px 0px -12%', // починаємо трохи раніше ніж повністю в полі видимості
      threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // якщо контейнер має reveal-child — анімувати дітей зі stagger
        const children = el.querySelectorAll && el.querySelectorAll(`.${CHILD_CLASS}`);
        if (children && children.length > 0) {
          // невеликий stagger (залежить від кількості)
          children.forEach((child, idx) => {
            // reset any previous inline delay
            child.style.transitionDelay = `${Math.min(500, idx * 60)}ms`;
            // додати видимість з затримкою
            requestAnimationFrame(() => child.classList.add(VISIBLE_CLASS));
          });
          // також відмітимо сам контейнер як visible (може мати фон/заголовок)
          el.classList.add(VISIBLE_CLASS);
        } else {
          // просто показати елемент
          el.style.transitionDelay = '0ms';
          el.classList.add(VISIBLE_CLASS);
        }

        // коли показано — перестаємо спостерігати
        obs.unobserve(el);
      });
    }, ioOptions);

    // Спостерігаємо або окремі елементи (контейнери) або самі картки, в залежності від структури
    const toObserve = [];

    // Додаємо до спостереження: контейнери з children або одиночні reveal-елементи
    document.querySelectorAll(`.${REVEAL_CLASS}`).forEach(el => {
      // не спостерігаємо ті, що вже повністю в полі (щоб уникнути миттєвих flash)
      toObserve.push(el);
    });

    // Будемо спостерігати лише унікальні елементи (видаляємо вкладені: якщо батько має children, не потрібно спостерігати всі внутрішні product-card окремо)
    const filtered = toObserve.filter(el => {
      // пропустити, якщо є батько в списку toObserve
      return !toObserve.some(other => other !== el && other.contains(el));
    });

    filtered.forEach(el => observer.observe(el));
  });
})();
// script.js - пошук товарів по назві (case-insensitive) з дебаунсом і підсвічуванням

