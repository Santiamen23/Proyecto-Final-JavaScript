document.addEventListener('DOMContentLoaded', () => {

    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-links a');
    const filterBtns = document.querySelectorAll('.btn-filter');
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('booking-modal');
    const openModalBtns = document.querySelectorAll('.service-card .btn-gold-ghost');
    const closeModalBtn = document.getElementById('close-modal');
    const contactForm = document.querySelector('.contact-form');

    const closeMobileMenu = () => {
        if (menuBtn && navList) {
            navList.classList.remove('active');
            menuBtn.classList.remove('is-open');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    };

    // --- 1. Menu movil ---
    if (menuBtn && navList) {
        menuBtn.setAttribute('aria-expanded', 'false');

        menuBtn.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('active');
            menuBtn.classList.toggle('is-open', isOpen);
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            serviceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const toggleModal = (shouldOpen) => {
        if (modal) {
            modal.style.display = shouldOpen ? 'flex' : 'none';
            modal.setAttribute('aria-hidden', String(!shouldOpen));
            document.body.style.overflow = shouldOpen ? 'hidden' : '';
        }
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleModal(true);
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => toggleModal(false));
    }

    if (modal) {
        modal.setAttribute('aria-hidden', 'true');
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleModal(false);
            closeMobileMenu();
        }
    });

    // --- 4. Formulario de contacto ---
    if (contactForm) {
        const statusMessage = document.createElement('p');
        statusMessage.className = 'form-status-message';
        statusMessage.setAttribute('aria-live', 'polite');
        contactForm.appendChild(statusMessage);

        const fields = {
            name: document.getElementById('full-name'),
            email: document.getElementById('email-address'),
            phone: document.getElementById('phone-number'),
            guests: document.getElementById('guest-count'),
            arrival: document.getElementById('arrival-date'),
            departure: document.getElementById('departure-date'),
            message: document.getElementById('guest-message')
        };

        const showFieldError = (field, message) => {
            if (!field) return false;
            field.setCustomValidity(message);
            field.reportValidity();
            return true;
        };

        const clearFieldError = field => {
            if (field) {
                field.setCustomValidity('');
            }
        };

        Object.values(fields).forEach(field => {
            if (!field) return;
            field.addEventListener('input', () => {
                clearFieldError(field);
                statusMessage.textContent = '';
            });
        });

        contactForm.addEventListener('submit', event => {
            event.preventDefault();

            Object.values(fields).forEach(clearFieldError);
            statusMessage.textContent = '';

            const nameValue = fields.name?.value.trim() || '';
            const emailValue = fields.email?.value.trim() || '';
            const phoneValue = fields.phone?.value.trim() || '';
            const guestsValue = Number(fields.guests?.value || 0);
            const arrivalValue = fields.arrival?.value || '';
            const departureValue = fields.departure?.value || '';
            const messageValue = fields.message?.value.trim() || '';

            if (nameValue.length < 3) {
                showFieldError(fields.name, 'Ingresa un nombre valido de al menos 3 caracteres.');
                return;
            }

            if (!emailValue || !fields.email.checkValidity()) {
                showFieldError(fields.email, 'Ingresa un correo electronico valido.');
                return;
            }

            if (phoneValue && !/^[0-9+()\\-\\s]{7,20}$/.test(phoneValue)) {
                showFieldError(fields.phone, 'Ingresa un numero de telefono valido.');
                return;
            }

            if (fields.guests?.value && guestsValue < 1) {
                showFieldError(fields.guests, 'El numero de huespedes debe ser mayor a 0.');
                return;
            }

            if (arrivalValue && departureValue && arrivalValue > departureValue) {
                showFieldError(fields.departure, 'La fecha de salida no puede ser anterior a la fecha de llegada.');
                return;
            }

            if (messageValue.length > 0 && messageValue.length < 10) {
                showFieldError(fields.message, 'Describe tu solicitud con un poco mas de detalle.');
                return;
            }

            statusMessage.textContent = 'Consulta enviada correctamente. El equipo se pondra en contacto contigo pronto.';
            contactForm.reset();
        });
    }
});
