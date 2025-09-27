const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const formContainer = document.getElementById('formContainer');
const successContainer = document.getElementById('successContainer');

// Form validation
function validateForm() {
    let isValid = true;

    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!name.value.trim()) {
        nameError.classList.add('show');
        isValid = false;
    } else {
        nameError.classList.remove('show');
    }

    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        emailError.classList.add('show');
        emailError.textContent = !email.value.trim()
            ? 'El correo electrónico es obligatorio'
            : 'Por favor ingresa un correo válido';
        isValid = false;
    } else {
        emailError.classList.remove('show');
    }

    // Country validation
    const country = document.getElementById('country');
    const countryError = document.getElementById('countryError');
    const validCountries = [
        'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba',
        'Ecuador', 'El Salvador', 'España', 'Guatemala', 'Honduras',
        'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico',
        'República Dominicana', 'Uruguay', 'Venezuela', 'Otro'
    ];

    const normalizedInput = country.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const isValidCountryInput = validCountries.some(c =>
        c.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalizedInput
    );

    if (!country.value.trim() || !isValidCountryInput) {
        countryError.classList.add('show');
        countryError.textContent = !country.value.trim()
            ? 'Por favor selecciona tu país'
            : 'Por favor selecciona un país de la lista';
        isValid = false;
    } else {
        countryError.classList.remove('show');
    }

    return isValid;
}

// Remove error on input
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim()) {
        document.getElementById('nameError').classList.remove('show');
    }
});

document.getElementById('email').addEventListener('input', function() {
    if (this.value.trim()) {
        document.getElementById('emailError').classList.remove('show');
    }
});

document.getElementById('country').addEventListener('input', function() {
    if (this.value.trim()) {
        document.getElementById('countryError').classList.remove('show');
    }
});

// Autocomplete functionality
const countryInput = document.getElementById('country');
const countryDropdown = document.getElementById('countryDropdown');
let selectedIndex = -1;
let filteredCountries = [];
let isValidCountry = false;

const countries = [
    'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba',
    'Ecuador', 'El Salvador', 'España', 'Guatemala', 'Honduras',
    'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico',
    'República Dominicana', 'Uruguay', 'Venezuela', 'Otro'
];

// Normalize text for better matching (remove accents)
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Highlight matching text
function highlightMatch(text, search) {
    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(search);
    const index = normalizedText.indexOf(normalizedSearch);

    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + search.length);
    const after = text.substring(index + search.length);

    return `${before}<mark>${match}</mark>${after}`;
}

// Show dropdown with filtered results
function showDropdown(searchTerm) {
    const normalizedSearch = normalizeText(searchTerm);

    // Filter countries
    filteredCountries = countries.filter(country =>
        normalizeText(country).includes(normalizedSearch)
    );

    // Clear dropdown
    countryDropdown.innerHTML = '';

    if (filteredCountries.length === 0) {
        countryDropdown.innerHTML = '<div class="no-results">No se encontraron países</div>';
        countryDropdown.classList.add('open');
        isValidCountry = false;
        return;
    }

    // Add filtered options
    filteredCountries.forEach((country, index) => {
        const option = document.createElement('div');
        option.className = 'select-option';
        option.innerHTML = highlightMatch(country, searchTerm);
        option.dataset.value = country;

        if (index === selectedIndex) {
            option.classList.add('selected');
        }

        option.addEventListener('click', function() {
            selectCountry(country);
        });

        option.addEventListener('mouseenter', function() {
            selectedIndex = index;
            updateSelection();
        });

        countryDropdown.appendChild(option);
    });

    countryDropdown.classList.add('open');

    // Check if current value is valid
    isValidCountry = countries.some(country =>
        normalizeText(country) === normalizeText(searchTerm)
    );
}

// Hide dropdown
function hideDropdown() {
    setTimeout(() => {
        countryDropdown.classList.remove('open');
        selectedIndex = -1;
    }, 200);
}

// Select a country
function selectCountry(country) {
    countryInput.value = country;
    isValidCountry = true;
    hideDropdown();
    document.getElementById('countryError').classList.remove('show');
}

// Update visual selection
function updateSelection() {
    const options = countryDropdown.querySelectorAll('.select-option');
    options.forEach((option, index) => {
        if (index === selectedIndex) {
            option.classList.add('selected');
            option.scrollIntoView({ block: 'nearest' });
        } else {
            option.classList.remove('selected');
        }
    });
}

// Input event - show filtered dropdown
countryInput.addEventListener('input', function() {
    const value = this.value.trim();
    if (value.length > 0) {
        showDropdown(value);
    } else {
        hideDropdown();
        isValidCountry = false;
    }
});

// Focus event - show all countries if empty
countryInput.addEventListener('focus', function() {
    if (this.value.trim().length === 0) {
        showDropdown('');
    }
});

// Blur event - hide dropdown
countryInput.addEventListener('blur', function() {
    hideDropdown();
});

// Keyboard navigation
countryInput.addEventListener('keydown', function(e) {
    const options = countryDropdown.querySelectorAll('.select-option');

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, filteredCountries.length - 1);
        updateSelection();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelection();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredCountries.length) {
            selectCountry(filteredCountries[selectedIndex]);
        }
    } else if (e.key === 'Escape') {
        hideDropdown();
    }
});

// Form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    btnText.textContent = 'Enviando...';

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        country: document.getElementById('country').value
    };

    try {
        const response = await fetch('https://idir-test.app.n8n.cloud/webhook/free-n8n-qnda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Show success state regardless of response
        setTimeout(() => {
            formContainer.style.display = 'none';
            successContainer.classList.add('show');
        }, 500);

    } catch (error) {
        console.error('Error:', error);
        // Even if there's an error, show success to user
        setTimeout(() => {
            formContainer.style.display = 'none';
            successContainer.classList.add('show');
        }, 500);
    } finally {
        submitBtn.classList.remove('loading');
        btnText.textContent = 'Registrarme Ahora';
    }
});