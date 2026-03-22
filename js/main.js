document.addEventListener('DOMContentLoaded', () => {
    
    // --- Selectors ---
    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('nav-list');
    const filterBtns = document.querySelectorAll('.btn-filter');
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('booking-modal');
    const openModalBtns = document.querySelectorAll('.btn-book');
    const closeModalBtn = document.getElementById('close-modal');

    // --- 1. Mobile Menu Toggle ---
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('active'); // Styled in style.scss
            menuBtn.classList.toggle('is-open');
        });
    }

    // --- 2. Service Filtering ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
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

    // --- 3. Modal Functionality ---
    const toggleModal = (state) => {
        if (modal) {
            modal.style.display = state ? 'flex' : 'none';
        }
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleModal(true));
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => toggleModal(false));
    }

    // Close modal if clicking outside the content area
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });

    // Optional: Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleModal(false);
    });
});
