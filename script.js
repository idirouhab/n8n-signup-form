document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = document.getElementById('btnLoading');
    const formWrapper = document.querySelector('.form-wrapper');
    const successMessage = document.getElementById('successMessage');

    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const countryField = document.getElementById('country');
    const countrySuggestions = document.getElementById('countrySuggestions');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const countryError = document.getElementById('countryError');

    // Validation functions
    function validateName(name) {
        if (!name.trim()) {
            return 'El nombre es obligatorio';
        }
        if (name.trim().length < 2) {
            return 'El nombre debe tener al menos 2 caracteres';
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/.test(name.trim())) {
            return 'El nombre solo puede contener letras, espacios, guiones y apostrofes';
        }
        return '';
    }

    function validateEmail(email) {
        if (!email.trim()) {
            return 'El correo electrónico es obligatorio';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return 'Por favor ingresa una dirección de correo válida';
        }
        return '';
    }

    function validateCountry(country) {
        if (!country || !country.trim()) {
            return 'Por favor ingresa tu país';
        }
        if (country.trim().length < 2) {
            return 'El nombre del país debe tener al menos 2 caracteres';
        }
        return '';
    }

    // Show error function
    function showError(field, errorElement, message) {
        field.parentElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Hide error function
    function hideError(field, errorElement) {
        field.parentElement.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Real-time validation
    nameField.addEventListener('input', function() {
        const error = validateName(this.value);
        if (error) {
            showError(this, nameError, error);
        } else {
            hideError(this, nameError);
        }
    });

    nameField.addEventListener('blur', function() {
        const error = validateName(this.value);
        if (error) {
            showError(this, nameError, error);
        }
    });

    emailField.addEventListener('input', function() {
        const error = validateEmail(this.value);
        if (error && this.value.trim()) {
            showError(this, emailError, error);
        } else if (!error) {
            hideError(this, emailError);
        }
    });

    emailField.addEventListener('blur', function() {
        const error = validateEmail(this.value);
        if (error) {
            showError(this, emailError, error);
        }
    });


    // Country autocomplete functionality
    const countries = [
        'Estados Unidos', 'Canadá', 'Reino Unido', 'Alemania', 'Francia', 'España', 'Italia',
        'Países Bajos', 'Bélgica', 'Suiza', 'Austria', 'Suecia', 'Noruega', 'Dinamarca',
        'Finlandia', 'Polonia', 'República Checa', 'Hungría', 'Rumania', 'Bulgaria',
        'Croacia', 'Eslovenia', 'Eslovaquia', 'Lituania', 'Letonia', 'Estonia', 'Irlanda',
        'Portugal', 'Grecia', 'Chipre', 'Malta', 'Luxemburgo', 'Australia', 'Nueva Zelanda',
        'Japón', 'Corea del Sur', 'China', 'India', 'Singapur', 'Hong Kong', 'Taiwán',
        'Malasia', 'Tailandia', 'Indonesia', 'Filipinas', 'Vietnam', 'Bangladesh', 'Pakistán',
        'Sri Lanka', 'Nepal', 'Myanmar', 'Cambodia', 'Laos', 'Brunei', 'Maldivas', 'Bhutan',
        'Brasil', 'México', 'Argentina', 'Colombia', 'Perú', 'Venezuela', 'Chile', 'Ecuador',
        'Bolivia', 'Paraguay', 'Uruguay', 'Guyana', 'Suriname', 'Guayana Francesa',
        'Sudáfrica', 'Egipto', 'Marruecos', 'Túnez', 'Argelia', 'Libia', 'Sudán', 'Etiopía',
        'Kenia', 'Uganda', 'Tanzania', 'Ruanda', 'Burundi', 'Djibouti', 'Somalia', 'Eritrea',
        'Sudán del Sur', 'República Centroafricana', 'Chad', 'Níger', 'Nigeria', 'Ghana',
        'Costa de Marfil', 'Burkina Faso', 'Mali', 'Senegal', 'Mauritania', 'Gambia',
        'Guinea-Bissau', 'Guinea', 'Sierra Leona', 'Liberia', 'Togo', 'Benin', 'Cabo Verde',
        'Santo Tomé y Príncipe', 'Guinea Ecuatorial', 'Gabón', 'República del Congo',
        'República Democrática del Congo', 'Camerún', 'Angola', 'Zambia', 'Zimbabue',
        'Botsuana', 'Namibia', 'Eswatini', 'Lesotho', 'Malawi', 'Mozambique', 'Madagascar',
        'Mauricio', 'Seychelles', 'Comoras', 'Mayotte', 'Reunión', 'Rusia', 'Turquía',
        'Irán', 'Irak', 'Arabia Saudita', 'Emiratos Árabes Unidos', 'Qatar', 'Kuwait',
        'Bahrein', 'Omán', 'Yemen', 'Jordania', 'Líbano', 'Siria', 'Israel', 'Palestina',
        'Armenia', 'Azerbaiyán', 'Georgia', 'Kazajistán', 'Uzbekistán', 'Turkmenistán',
        'Kirguistán', 'Tayikistán', 'Afganistán', 'Mongolia', 'Otro'
    ];

    let highlightedIndex = -1;
    let filteredCountries = [];

    // Function to remove accents for search comparison
    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    countryField.addEventListener('input', function() {
        const query = removeAccents(this.value.toLowerCase().trim());
        highlightedIndex = -1;

        if (query === '') {
            hideSuggestions();
            return;
        }

        filteredCountries = countries.filter(country =>
            removeAccents(country.toLowerCase()).includes(query)
        );

        showSuggestions(filteredCountries);

        // Validate as user types
        const error = validateCountry(this.value);
        if (error && this.value.length > 2) {
            showError(this, countryError, error);
        } else {
            hideError(this, countryError);
        }
    });

    countryField.addEventListener('keydown', function(e) {
        if (!countrySuggestions.classList.contains('show')) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                highlightedIndex = Math.min(highlightedIndex + 1, filteredCountries.length - 1);
                updateHighlight();
                break;
            case 'ArrowUp':
                e.preventDefault();
                highlightedIndex = Math.max(highlightedIndex - 1, -1);
                updateHighlight();
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    selectCountry(filteredCountries[highlightedIndex]);
                }
                break;
            case 'Escape':
                hideSuggestions();
                break;
        }
    });

    countryField.addEventListener('blur', function() {
        // Delay hiding to allow click on suggestions
        setTimeout(() => {
            hideSuggestions();
            // Final validation on blur
            const error = validateCountry(this.value);
            if (error) {
                showError(this, countryError, error);
            } else {
                hideError(this, countryError);
            }
        }, 150);
    });

    function showSuggestions(countries) {
        if (countries.length === 0) {
            countrySuggestions.innerHTML = '<div class="no-results">No se encontraron países</div>';
        } else {
            countrySuggestions.innerHTML = countries
                .slice(0, 8) // Limit to 8 suggestions
                .map(country => `<div class="country-suggestion">${country}</div>`)
                .join('');
        }
        countrySuggestions.classList.add('show');
    }

    function hideSuggestions() {
        countrySuggestions.classList.remove('show');
        highlightedIndex = -1;
    }

    function updateHighlight() {
        const suggestions = countrySuggestions.querySelectorAll('.country-suggestion');
        suggestions.forEach((suggestion, index) => {
            suggestion.classList.toggle('highlighted', index === highlightedIndex);
        });
    }

    function selectCountry(country) {
        countryField.value = country;
        hideSuggestions();

        // Validate selected country
        const error = validateCountry(country);
        if (error) {
            showError(countryField, countryError, error);
        } else {
            hideError(countryField, countryError);
        }
    }

    // Handle clicks on suggestions
    countrySuggestions.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('country-suggestion')) {
            selectCountry(e.target.textContent);
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            country: countryField.value
        };

        // Validate all fields
        const nameErrorMsg = validateName(formData.name);
        const emailErrorMsg = validateEmail(formData.email);
        const countryErrorMsg = validateCountry(formData.country);

        let hasErrors = false;

        // Show errors if any
        if (nameErrorMsg) {
            showError(nameField, nameError, nameErrorMsg);
            hasErrors = true;
        } else {
            hideError(nameField, nameError);
        }

        if (emailErrorMsg) {
            showError(emailField, emailError, emailErrorMsg);
            hasErrors = true;
        } else {
            hideError(emailField, emailError);
        }

        if (countryErrorMsg) {
            showError(countryField, countryError, countryErrorMsg);
            hasErrors = true;
        } else {
            hideError(countryField, countryError);
        }

        // If there are errors, don't submit
        if (hasErrors) {
            // Focus on the first field with an error
            if (nameErrorMsg) {
                nameField.focus();
            } else if (emailErrorMsg) {
                emailField.focus();
            } else if (countryErrorMsg) {
                countryField.focus();
            }
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        simulateFormSubmission(formData)
            .then(response => {
                if (response.success) {
                    // Show success message
                    formWrapper.classList.add('success-mode');

                    // Opcional: Registrar los datos o enviarlos a tu backend
                    console.log('Formulario enviado exitosamente:', formData);

                    // You can also store the data in localStorage for testing
                    localStorage.setItem('n8nSignupData', JSON.stringify({
                        ...formData,
                        submittedAt: new Date().toISOString()
                    }));
                } else {
                    throw new Error(response.message || 'Submission failed');
                }
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
                alert('Lo siento, hubo un error al enviar tu formulario. Por favor intenta de nuevo.');

                // Reset loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            });
    });

    // Submit form data to backend
    function simulateFormSubmission(data) {
        return fetch('https://idir-test.app.n8n.cloud/webhook/free-n8n-qnda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json().catch(() => ({ success: true }));
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .then(result => {
            return { success: true, message: 'Registro exitoso', data: result };
        });
    }

    // Add some nice interactive effects
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Add floating animation to background decorations
    const decorations = document.querySelectorAll('.background-decoration > div');
    decorations.forEach((decoration, index) => {
        decoration.style.animationDelay = `${index * 2}s`;
    });

    // Smooth scroll to form if coming from a link
    if (window.location.hash === '#signup') {
        form.scrollIntoView({ behavior: 'smooth' });
    }

    // Add keyboard navigation improvements
    form.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            e.preventDefault();
            const formElements = Array.from(form.querySelectorAll('input, select, button'));
            const currentIndex = formElements.indexOf(e.target);
            const nextElement = formElements[currentIndex + 1];

            if (nextElement) {
                nextElement.focus();
            }
        }
    });
});