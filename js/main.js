/**
 * Guardianes Ambientales - Main JavaScript
 * main.js
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Comportamiento de la barra de navegación al hacer scroll
    const navbar = document.getElementById('mainNav');
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        backToTopButton.classList.add('show');
      } else {
        navbar.classList.remove('navbar-scrolled');
        backToTopButton.classList.remove('show');
      }
    });
    
    // Smooth scrolling para los enlaces de la barra de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Evita scroll si solo es '#'
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Ajusta para el altura de la barra de navegación fija
            behavior: 'smooth'
          });
          
          // Cierra el menú móvil al hacer clic en un enlace
          const navbarCollapse = document.getElementById('navbarResponsive');
          if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }
        }
      });
    });
    
    // Actualiza el enlace de navegación activo según la posición del scroll
   
  
    // ===============================================
    // LÓGICA DE ANIMACIÓN DE LAS LEYENDAS DEL CARRUSEL (REINTRODUCIDA)
    // ===============================================
    const heroCarousel = document.getElementById('carouselExampleIndicators');

    if (heroCarousel) {
        // Función para aplicar la animación a los elementos de la leyenda
        const applyCaptionAnimation = (captions) => {
            captions.forEach((caption, index) => {
                // Eliminar la clase de animación antes de añadirla para asegurar que se reinicie
                caption.classList.remove('animated', 'fadeInUp-active');
                
                // Forzar un "reflow" para que la animación se reinicie correctamente
                // (leyendo una propiedad de diseño como offsetHeight)
                void caption.offsetHeight; 

                // Añadir las clases de animación
                caption.classList.add('animated', 'fadeInUp-active');
                
                // Los retrasos ahora se manejan directamente en el CSS
                // Puedes ajustar los delays en el CSS si quieres un efecto diferente
            });
        };

        // Función para remover la animación de los elementos de la leyenda (resetea a estado oculto por CSS)
        const resetCaptionAnimation = (captions) => {
            captions.forEach(caption => {
                caption.classList.remove('animated', 'fadeInUp-active');
                caption.style.animation = ''; // Limpia cualquier estilo de animación en línea
            });
        };

        // Evento 'slid.bs.carousel': se dispara CUANDO un slide ha terminado de entrar.
        heroCarousel.addEventListener('slid.bs.carousel', function(event) {
            // 1. Resetear las animaciones del slide ANTERIOR (el que acaba de salir)
            const oldSlideElement = heroCarousel.querySelectorAll('.carousel-item')[event.from];
            if (oldSlideElement) {
                const oldCaptions = oldSlideElement.querySelectorAll('.carousel-caption > *');
                resetCaptionAnimation(oldCaptions); // El texto se ocultará después de que el slide salga
            }

            // 2. Aplicar las animaciones al slide NUEVO (el que acaba de entrar)
            const newSlideElement = heroCarousel.querySelectorAll('.carousel-item')[event.to];
            if (newSlideElement) {
                const newCaptions = newSlideElement.querySelectorAll('.carousel-caption > *');
                applyCaptionAnimation(newCaptions); // El texto del nuevo slide se anima al aparecer
            }
        });

        // Evento 'slide.bs.carousel': se dispara CUANDO un slide está a punto de entrar.
        // Usaremos este para resetear rápidamente el slide entrante ANTES de que empiece la transición
        // para que la animación de entrada se vea siempre.
        heroCarousel.addEventListener('slide.bs.carousel', function(event) {
            const newSlideElement = heroCarousel.querySelectorAll('.carousel-item')[event.to];
            if (newSlideElement) {
                const newCaptions = newSlideElement.querySelectorAll('.carousel-caption > *');
                // Resetear las animaciones del slide que está por entrar.
                // Esto es crucial para que la animación se vea cada vez que el slide entra.
                resetCaptionAnimation(newCaptions); 
            }
        });

        // Animación inicial para el primer slide al cargar la página
        // setTimeout para asegurar que se ejecuta después de que el DOM está completamente renderizado
        // y Bootstrap haya activado el primer item.
        setTimeout(() => {
            const initialActiveItem = document.querySelector('.carousel-item.active');
            if (initialActiveItem) {
                const initialCaptions = initialActiveItem.querySelectorAll('.carousel-caption > *');
                applyCaptionAnimation(initialCaptions); 
            }
        }, 100); // Pequeño retraso para asegurar que Bootstrap haya inicializado
    }
    // ===============================================
    // FIN DE LÓGICA DE ANIMACIÓN DE LAS LEYENDAS DEL CARRUSEL
    // ===============================================
    
    // Validación del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación simple del lado del cliente
        let valid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            valid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });
        
        const emailField = contactForm.querySelector('#email');
        if (emailField && emailField.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailField.value.trim())) {
            valid = false;
            emailField.classList.add('is-invalid');
          }
        }
        
        if (valid) {
          // Simula un envío de formulario exitoso
          const formElements = contactForm.elements;
          for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = true;
          }
          
          // Reinicia el formulario después de la "sumisión"
          setTimeout(() => {
            console.log('¡Gracias por contactarnos! Le responderemos a la brevedad.');
            
            contactForm.reset();
            for (let i = 0; i < formElements.length; i++) {
              formElements[i].disabled = false;
              formElements[i].classList.remove('is-invalid');
            }
          }, 1000);
        }
      });
      
      // Validación en tiempo real al escribir
      const inputs = contactForm.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('input', function() {
          if (this.hasAttribute('required') && !this.value.trim()) {
            this.classList.add('is-invalid');
          } else {
            this.classList.remove('is-invalid');
          }
          
          if (this.id === 'email' && this.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value.trim())) {
              this.classList.add('is-invalid');
            } else {
              this.classList.remove('is-invalid');
            }
          }
        });
      });
    }
    
    // Mejora la animación al pasar el ratón por las tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
    
    // Añade animaciones de scroll tipo AOS a los elementos
    function revealOnScroll() {
      const elements = document.querySelectorAll('.benefit-card, .service-card, .section-header, .testimonial-card, .cta-content, .contact-form-container');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Cuando el elemento está a 150px del borde inferior de la ventana
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('fadeIn');
        }
      });
    }
    
    // Añade el CSS para la animación fadeIn dinámicamente al head (si no está ya en style.css)
    const style = document.createElement('style');
    style.textContent = `
      .benefit-card, .service-card, .section-header, .testimonial-card, .cta-content, .contact-form-container {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .fadeIn {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Ejecuta una vez al cargar la página
});

