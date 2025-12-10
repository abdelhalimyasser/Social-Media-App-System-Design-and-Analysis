const Router = {
    checkAuth() {
        const user = Utils.retrieve('currentUser');
        const isAuthPage = window.location.pathname.includes('/auth/');
        
        if (!user && !isAuthPage) {
            window.location.href = '/project-root/auth/login.html';
        } else if (user && isAuthPage) {
            window.location.href = '/project-root/index.html'; // Or feed
        }
    },

    navigateTo(path) {
        window.location.href = path;
    }
};
