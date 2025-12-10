const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    },

    setTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
    },

    toggleTheme() {
        const current = localStorage.getItem('theme') || 'light';
        const next = current === 'light' ? 'dark' : (current === 'dark' ? 'mood' : 'light');
        this.setTheme(next);
        return next;
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
