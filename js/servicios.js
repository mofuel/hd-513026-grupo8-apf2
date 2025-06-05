document.addEventListener('DOMContentLoaded', function () {
    // Inicializar Swiper para el Carrusel de Servicios
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 1, // Por defecto, una slide en móviles
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        breakpoints: {
            // Cuando el ancho de la ventana sea >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // Cuando el ancho de la ventana sea >= 992px (ideal para 3 slides)
            992: {
                slidesPerView: 3, // *** CAMBIO AQUI: Mostrar 3 slides ***
                spaceBetween: 30,
            },
            // Cuando el ancho de la ventana sea >= 1200px (opcional, si quieres un comportamiento diferente en pantallas muy grandes)
            1200: {
                slidesPerView: 3, /* Asegura que 3 diapositivas permanezcan visibles en pantallas más grandes */
                spaceBetween: 30,
            }
        },
    });

    // Animar al hacer scroll para las secciones
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate__animated[data-animation]');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Comprobar si el elemento está en la ventana gráfica
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const animationName = el.dataset.animation;
                const animationDelay = el.dataset.animationDelay || '0s';

                el.style.animationDelay = animationDelay;
                el.classList.add(animationName, 'animate__active');
            } else {
                // Opcionalmente, eliminar clases si está fuera de la vista para permitir la reanimación al volver a desplazarse
                // Esto puede ser útil si el usuario se desplaza rápidamente y luego vuelve.
                // el.classList.remove(el.dataset.animation, 'animate__active');
            }
        });
    }

    // Ejecutar animación en la carga inicial para elementos ya visibles
    animateOnScroll();

    // Ejecutar animación al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
});