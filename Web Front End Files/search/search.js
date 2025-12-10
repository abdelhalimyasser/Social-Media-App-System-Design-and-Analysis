document.addEventListener('DOMContentLoaded', async () => {
    Router.checkAuth();
    
    // Load Components
    const navbar = await fetch('../components/navbar.html').then(r => r.text());
    const bottomNav = await fetch('../components/bottom-nav.html').then(r => r.text());
    
    document.getElementById('navbar-placeholder').innerHTML = navbar;
    document.getElementById('bottom-nav-placeholder').innerHTML = bottomNav;

    document.getElementById('nav-search').classList.add('active');

    // Mock Suggested People
    const people = [
        { name: "Alex Chen", handle: "@alexc", avatar: "https://i.pravatar.cc/150?img=12" },
        { name: "Jessica Wu", handle: "@jessw", avatar: "https://i.pravatar.cc/150?img=9" }
    ];

    const container = document.getElementById('suggested-people');
    people.forEach(p => {
        const el = document.createElement('div');
        el.style.cssText = `
            display: flex;
            align-items: center;
            padding: 12px;
            background: var(--surface-color);
            border-radius: var(--radius-md);
            margin-bottom: 8px;
        `;
        el.innerHTML = `
            <img src="${p.avatar}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px;">
            <div style="flex: 1;">
                <div style="font-weight: 600;">${p.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">${p.handle}</div>
            </div>
            <button class="btn-primary" style="padding: 4px 12px; font-size: 0.8rem;">Follow</button>
        `;
        container.appendChild(el);
    });

    // Filter Chips Logic
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });
});
