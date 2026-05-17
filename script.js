document.getElementById('contactForm').addEventListener('submit', function(event) {
    // 1. Evitamos que la página se recargue automáticamente
    event.preventDefault();

    const form = this;
    const button = document.getElementById('btnSubmit');
    const originalButtonText = button.innerHTML;

    // Deshabilitamos el botón temporalmente para evitar múltiples clics
    button.disabled = true;
    button.innerHTML = 'Sending...';

    // 2. Capturamos los datos del formulario
    const formData = new FormData(form);

    // 3. Enviamos los datos en segundo plano usando Fetch
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // StaticForms devuelve { success: true } si todo salió bien
        if (data.success) {
            // 4. Limpiamos todos los campos del formulario
            form.reset();

            // 5. Mostramos el globo de notificación (Toast) de Bootstrap 5
            const toastEl = document.getElementById('toastNotification');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        } else {
            alert('Hubo un problema al enviar el formulario. Inténtalo de nuevo.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error de red. Inténtalo más tarde.');
    })
    .finally(() => {
        // Restauramos el botón a su estado original
        button.disabled = false;
        button.innerHTML = originalButtonText;
    });
});