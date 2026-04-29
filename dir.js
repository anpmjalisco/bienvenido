(function () {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');

    // Configuración para el scroll suave con flechas
    let cardElements = Array.from(document.querySelectorAll('.team-member'));

    // Función para actualizar los dots según scroll
    function updateDots() {
        if (!dotsContainer) return;
        const containerRect = carousel.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        let closestIndex = 0;
        let minDistance = Infinity;

        cardElements.forEach((card, idx) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = idx;
            }
        });

        // Marcar dot activo
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === closestIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Generar dots dinámicamente según el número de miembros
    function generateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        cardElements.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                // scroll al elemento clickeado
                cardElements[idx].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Función para mover el carrusel hacia la izquierda (anterior)
    function scrollPrev() {
        if (!carousel || cardElements.length === 0) return;

        // Determinar qué tarjeta está actualmente más centrada
        const containerRect = carousel.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        let currentIndex = 0;
        let minDist = Infinity;

        cardElements.forEach((card, idx) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const dist = Math.abs(containerCenter - cardCenter);
            if (dist < minDist) {
                minDist = dist;
                currentIndex = idx;
            }
        });

        // Determinar el índice anterior (teniendo en cuenta la cantidad de tarjetas visibles parcialmente)
        let targetIndex = Math.max(0, currentIndex - 1);

        // Si estamos en desktop y queremos un mejor agarre (con flexibilidad)
        // buscar la tarjeta anterior a la actual centrada
        if (targetIndex === currentIndex && currentIndex > 0) targetIndex = currentIndex - 1;

        cardElements[targetIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    function scrollNext() {
        if (!carousel || cardElements.length === 0) return;

        const containerRect = carousel.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        let currentIndex = 0;
        let minDist = Infinity;

        cardElements.forEach((card, idx) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const dist = Math.abs(containerCenter - cardCenter);
            if (dist < minDist) {
                minDist = dist;
                currentIndex = idx;
            }
        });

        let targetIndex = Math.min(cardElements.length - 1, currentIndex + 1);
        if (targetIndex === currentIndex && currentIndex < cardElements.length - 1) targetIndex = currentIndex + 1;

        cardElements[targetIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    // Eventos de flechas
    if (prevButton) prevButton.addEventListener('click', scrollPrev);
    if (nextButton) nextButton.addEventListener('click', scrollNext);

    // Evento de scroll para actualizar los dots
    if (carousel) {
        carousel.addEventListener('scroll', () => {
            requestAnimationFrame(updateDots);
        });
        // Actualizar también después de redimensionar ventana (resize)
        window.addEventListener('resize', () => {
            updateDots();
            // re-validar tarjetas por si hubieran cambiado dimensiones
            cardElements = Array.from(document.querySelectorAll('.team-member'));
            generateDots();
            updateDots();
        });
    }

    // Inicialización: generar dots, actualizar y forzar un scroll suave al primer elemento sin brusquedad
    setTimeout(() => {
        cardElements = Array.from(document.querySelectorAll('.team-member'));
        generateDots();
        updateDots();
        // Asegurar que el primer elemento quede centrado (sin scroll violento)
        // COMENTADO PARA EVITAR SCROLL AUTOMÁTICO AL INICIO
        /*
        if (cardElements.length > 0 && carousel) {
            // solo para estética, centrar primer elemento
            cardElements[0].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'auto' });
            setTimeout(updateDots, 50);
        }
        */
    }, 50);

    // Soporte para teclado (flechas izquierda/derecha)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollPrev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollNext();
        }
    });

    // Opcional: Mejorar la experiencia táctil evitando que el scroll nativo interfiera con las flechas
    // Todo listo: sin barra de scroll visible, solo las flechas elegantes.
})();
