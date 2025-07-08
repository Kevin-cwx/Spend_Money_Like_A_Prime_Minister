function showToast(message, type = 'general') {
    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast-message ${type === 'error' ? 'toast-error' : 'toast-general'}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 3.5s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => container.removeChild(toast), 300);
    }, 3500);
}
  