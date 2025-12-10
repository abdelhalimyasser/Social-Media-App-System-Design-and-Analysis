document.addEventListener('DOMContentLoaded', () => {
    Router.checkAuth();

    // Theme Selection
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.querySelector(`.theme-option[data-theme="${currentTheme}"]`).classList.add('active');

    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            ThemeManager.setTheme(opt.dataset.theme);
        });
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = '../auth/login.html';
    });
});
