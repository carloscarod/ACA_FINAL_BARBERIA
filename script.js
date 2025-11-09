// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Lista estática de nombres para simular los barberos
    const nombresBarberos = [
        { name: "Carlos David Caro Díaz", especialidad: "Cortes de Autor" },
        { name: "Andrés 'El Clásico' López", especialidad: "Afeitados a Navaja" },
        { name: "Javier Soto", especialidad: "Diseño de Barba" },
        { name: "Miguel Ángel Ruiz", especialidad: "Tratamientos Capilares" }
    ];

    // ----------------------------------------------------------------------
    // 1. CONSUMO DE API (Sección dinámica)
    // Se usa la API para obtener datos base (emails, IDs) y se mezclan con nombres locales.
    // ----------------------------------------------------------------------
    const barberosContainer = document.getElementById('barberos-dinamicos');
    
    const cargarBarberos = async () => {
        // La API aún se consume para demostrar el requisito técnico (fetch)
        const API_URL = 'https://jsonplaceholder.typicode.com/users'; 
        
        try {
            const response = await fetch(API_URL); // Consumo de API con fetch
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const dataAPI = await response.json();
            
            barberosContainer.innerHTML = ''; 

            // Tomamos los datos de los primeros 4 usuarios de la API y los combinamos con nombres españoles
            nombresBarberos.slice(0, 4).forEach((barberoLocal, index) => {
                const barberoAPI = dataAPI[index] || { email: "contacto@barberflow.com" }; // Usa email de la API o uno por defecto
                
                const card = document.createElement('article');
                card.classList.add('barbero-card');
                
                // Generamos un número aleatorio para simular una calificación
                const rating = (Math.random() * (5 - 4) + 4).toFixed(1); 
                
                card.innerHTML = `
                    <h3>${barberoLocal.name}</h3>
                    <p>Especialidad: ${barberoLocal.especialidad}</p>
                    <p>Calificación: <i class="fas fa-star"></i> ${rating}</p>
                    <a href="mailto:${barberoAPI.email}">Contactar</a>
                `;
                barberosContainer.appendChild(card);
            });
            
        } catch (error) {
            console.error('Error al cargar los barberos:', error);
            barberosContainer.innerHTML = '<p class="error-message">No se pudieron cargar los datos de los barberos. Intente de nuevo más tarde.</p>';
        }
    };

    // Solo cargamos los barberos si estamos en la página de inicio
    if (barberosContainer) {
        cargarBarberos();
    }


    // ----------------------------------------------------------------------
    // 2. VALIDACIÓN DE FORMULARIO (Página citas.html)
    // (El código de validación del formulario queda igual, ya que es funcional)
    // ----------------------------------------------------------------------
    const citaForm = document.getElementById('cita-form');

    if (citaForm) {
        citaForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const edad = parseInt(document.getElementById('edad').value);
            const emailError = document.getElementById('email-error');
            const edadError = document.getElementById('edad-error');
            let isValid = true;

            // Validación de Edad Numérica y Mínimo
            edadError.textContent = '';
            if (isNaN(edad) || edad < 18) {
                edadError.textContent = 'Debe ser mayor de 18 años para reservar.';
                isValid = false;
            }

            // Validación de Correo Válido
            emailError.textContent = '';
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (!emailPattern.test(email)) {
                emailError.textContent = 'Por favor, introduce un correo electrónico válido.';
                isValid = false;
            }

            if (isValid) {
                alert('¡Reserva confirmada con éxito! Revisa tu correo.');
                citaForm.reset(); 
            } else {
                alert('Por favor, corrige los errores del formulario.');
            }
        });
    }
});