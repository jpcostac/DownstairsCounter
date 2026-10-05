// Pronto para interações futuras ou efeitos de animação
document.addEventListener('DOMContentLoaded', () => {
    console.log('Downstairs Counter Landing Page Ready.');

    // Navigation Menu Toggle (Mobile)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    let intervalId;

    const updateCarousel = (index) => {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });
        indicators.forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx === index);
        });
        currentIndex = index;
    };

    const showNext = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        updateCarousel(nextIndex);
    };

    const showPrev = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(prevIndex);
    };

    const startAutoPlay = () => {
        intervalId = setInterval(showNext, 5000);
    };

    const resetAutoPlay = () => {
        clearInterval(intervalId);
        startAutoPlay();
    };

    nextButton?.addEventListener('click', () => {
        showNext();
        resetAutoPlay();
    });

    prevButton?.addEventListener('click', () => {
        showPrev();
        resetAutoPlay();
    });

    indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            const slide = Number(indicator.dataset.slide);
            updateCarousel(slide);
            resetAutoPlay();
        });
    });

    if (slides.length > 0) {
        updateCarousel(0);
        startAutoPlay();
    }

    // Touch Swipe Support for Mobile
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        let touchStartX = 0;
        let touchEndX = 0;

        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 40;
            if (touchEndX < touchStartX - swipeThreshold) {
                showNext();
                resetAutoPlay();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                showPrev();
                resetAutoPlay();
            }
        };
    }
});