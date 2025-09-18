# Formulario de Registro para Sesión Q&A de n8n

Un hermoso formulario de registro responsivo para sesiones de Q&A de n8n con validación en tiempo real y animaciones suaves.

## Características

- 🎨 Diseño moderno con gradientes y efectos glassmorphism
- 📱 Completamente responsivo (compatible con móviles)
- ✅ Validación de formulario en tiempo real
- 🌍 Selección integral de países
- 🎯 Animaciones e interacciones suaves
- 📊 Recolección de datos del formulario (nombre, correo, país)
- 🚀 Listo para despliegue en GitHub Pages

## Inicio Rápido

1. Clona o descarga este repositorio
2. Abre `index.html` en tu navegador para probar localmente
3. Despliega en GitHub Pages (ver instrucciones de despliegue abajo)

## Despliegue en GitHub Pages

1. **Crea un nuevo repositorio** en GitHub (o usa uno existente)
2. **Sube los archivos** a tu repositorio:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. **Habilita GitHub Pages**:
   - Ve a la configuración del repositorio (Settings)
   - Desplázate a la sección "Pages"
   - Selecciona "Deploy from a branch"
   - Elige la rama "main" y la carpeta "/ (root)"
   - Haz clic en "Save"
4. **Accede a tu formulario** en: `https://tuusuario.github.io/nombredelrepositorio`

## Datos del Formulario

El formulario recolecta:
- **Nombre**: Nombre completo con validación (solo letras, espacios, guiones y apostrofes)
- **Correo Electrónico**: Dirección de correo válida con validación en tiempo real
- **País**: Lista desplegable completa con 195+ países

### Manejo de Datos

Actualmente, el formulario:
- Valida todas las entradas en tiempo real
- Almacena los datos en el localStorage del navegador (para pruebas)
- Registra envíos exitosos en la consola

### Integración con Backend

Para conectar con tu backend:

1. Reemplaza la función `simulateFormSubmission()` en `script.js`
2. Agrega tu endpoint de API:

```javascript
function submitToAPI(formData) {
    return fetch('TU_ENDPOINT_API', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json());
}
```

## Personalización

### Colores
Edita las variables CSS en `styles.css`:
- Gradiente principal: `#667eea` a `#764ba2`
- Color de acento: `#EA4B71`
- Color de éxito: `#10b981`

### Contenido
Actualiza el título y descripción del formulario en `index.html`:
```html
<h1>Únete a Nuestra Sesión Gratuita de Q&A sobre n8n</h1>
<p>Obtén respuestas a tus preguntas de automatización</p>
```

### Países
La lista de países es completa pero puede modificarse en el elemento `<select>` en `index.html`.

## Compatibilidad de Navegadores

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Navegadores móviles (iOS Safari, Chrome Mobile)

## Estructura de Archivos

```
formulario-registro-n8n/
├── index.html          # Estructura HTML principal
├── styles.css          # Todos los estilos CSS y animaciones
├── script.js           # Validación del formulario e interactividad
└── README.md           # Documentación
```

## Demo en Vivo

Una vez desplegado en GitHub Pages, tu formulario será accesible en:
`https://tuusuario.github.io/nombredelrepositorio`

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.