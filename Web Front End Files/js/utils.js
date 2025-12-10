const Utils = {
    // DOM Helper
    $(selector) {
        return document.querySelector(selector);
    },
    $$(selector) {
        return document.querySelectorAll(selector);
    },

    // LocalStorage Wrapper
    store(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    retrieve(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },

    // Date formatter
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }).format(new Date(date));
    },

    // Simple ID generator
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
