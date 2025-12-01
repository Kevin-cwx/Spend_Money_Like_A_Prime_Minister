let currentToastTimeout;

function showToast(message, type = 'general') {
    const container = document.getElementById('toast-container');
    const existingToast = container.querySelector('.toast-message');

    // Check if the same message is already being displayed
    if (existingToast && existingToast.textContent === message) {
        return; // Do nothing if the same message is already visible
    }

    // Remove any existing toast immediately (singleton behavior)
    if (existingToast) {
        if (currentToastTimeout) {
            clearTimeout(currentToastTimeout);
        }
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast-message ${type === 'error' ? 'toast-error' : 'toast-general'}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 5 minutes (300,000 ms)
    currentToastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode === container) {
                container.removeChild(toast);
            }
        }, 300);
    }, 300000);
}