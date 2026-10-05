// ===== MENU MOBILE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav ul');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== REVEAL ANIMATION (Intersection Observer) =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== CARTÃO DE VISITA 3D (movimento com mouse) =====
const businessCard = document.getElementById('businessCard');

if (businessCard) {
    const cardWrapper = businessCard.parentElement;

    cardWrapper.addEventListener('mousemove', (e) => {
        const rect = cardWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        businessCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    cardWrapper.addEventListener('mouseleave', () => {
        businessCard.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
    });
}

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
        formFeedback.textContent = '⚠️ Por favor, preencha todos os campos obrigatórios.';
        formFeedback.className = 'form-feedback error';
        return;
    }

    // Simulação de envio
    formFeedback.textContent = '⏳ Enviando mensagem...';
    formFeedback.className = 'form-feedback';

    setTimeout(() => {
        formFeedback.textContent = `✅ Obrigado, ${nome.split(' ')[0]}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`;
        formFeedback.className = 'form-feedback success';
        contactForm.reset();

        setTimeout(() => {
            formFeedback.textContent = '';
        }, 6000);
    }, 1500);
});

// ===== ANO NO FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== PARALLAX SUAVE NO HERO BG =====
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
});

// ===== EFEITO DE DIGITAÇÃO NO TAGLINE (opcional) =====
const tagline = document.querySelector('.tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        }
    };
    setTimeout(typeWriter, 500);
}
