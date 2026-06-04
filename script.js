// Pronto para interações futuras ou efeitos de animação
document.addEventListener('DOMContentLoaded', () => {
    console.log('Downstairs Counter Landing Page Ready.');

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
});