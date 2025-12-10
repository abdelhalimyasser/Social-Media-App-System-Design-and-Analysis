document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    // Mock Login Logic
    if (identifier && password) {
        // In a real app, validate against server
        const user = {
            id: Utils.generateId(),
            username: identifier,
            name: "Demo User",
            avatar: "https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff"
        };

        Utils.store('currentUser', user);
        window.location.href = '../feed/feed.html';
    } else {
        alert('Please fill in all fields');
    }
});
