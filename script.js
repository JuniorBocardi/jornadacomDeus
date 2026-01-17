/* ============================================
   JORNADA DE VOLTA - SCRIPT ANIMADO PREMIUM
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // EFEITO "ANTIGRAVITY" REMOVIDO
    // ============================================
    // O código de swarm foi removido conforme solicitado.

    // ============================================
    // FUNDO ANIMADO (DENSIDADE AUMENTADA)
    // ============================================
    const spiritualBg = document.getElementById('spiritualBg');
    if (spiritualBg) {
        // Mais itens religiosos e de céu
        const items = ['✝', '✨', '🕊️', '☁️', '✝', '⭐', '🙌'];
        const itemCount = 25; // Aumentado de 15 para 25 para preencher mais

        for (let i = 0; i < itemCount; i++) {
            const el = document.createElement('div');
            el.classList.add('floating-item');
            el.innerText = items[Math.floor(Math.random() * items.length)];

            // Randomizar posição e animação
            const left = Math.random() * 100;
            // Tamanho MUITO MENOR: entre 0.5rem e 1.2rem (antes era 1 a 3rem)
            const size = Math.random() * 0.7 + 0.5;
            const duration = Math.random() * 20 + 15; // Mais lento para ser calmo
            const delay = Math.random() * 30;

            if (Math.random() > 0.6) el.classList.add('gold');

            el.style.left = `${left}%`;
            el.style.fontSize = `${size}rem`;
            el.style.animationDuration = `${duration}s`;
            el.style.animationDelay = `-${delay}s`; // Começar já no meio do caminho

            spiritualBg.appendChild(el);
        }
    }


    // ============================================
    // CARROSSEL DE DEPOIMENTOS
    // ============================================
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoplay;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function nextCard() {
        showCard((currentIndex + 1) % cards.length);
    }

    function startAutoplay() {
        autoplay = setInterval(3500, nextCard);
    }

    function resetAutoplay() {
        clearInterval(autoplay);
        startAutoplay();
    }

    // Dot clicks
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showCard(i);
            resetAutoplay();
        });
    });

    // Swipe support
    const carousel = document.getElementById('carousel');
    let startX = 0;

    if (carousel) {
        carousel.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextCard(); // Swipe Left -> Next
                } else {
                    showCard((currentIndex - 1 + cards.length) % cards.length); // Swipe Right -> Prev
                }
                resetAutoplay();
            }
        }, { passive: true });
    }

    startAutoplay();

    // ============================================
    // FAQ ACCORDION
    // ============================================
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // ANIMAÇÃO DE ENTRADA (Scroll Reveal)
    // ============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.offer-card, .guarantee-box, .faq-item, .pain-list-styled li, .solution-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});
