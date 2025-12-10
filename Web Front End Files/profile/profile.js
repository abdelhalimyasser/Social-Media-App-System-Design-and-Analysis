document.addEventListener('DOMContentLoaded', async () => {
    Router.checkAuth();
    
    // 1. Load Components
    const navbar = await fetch('../components/navbar.html').then(r => r.text());
    const bottomNav = await fetch('../components/bottom-nav.html').then(r => r.text());
    
    document.getElementById('navbar-placeholder').innerHTML = navbar;
    document.getElementById('bottom-nav-placeholder').innerHTML = bottomNav;

    // Highlight current nav item
    const navProfile = document.getElementById('nav-profile');
    if(navProfile) navProfile.classList.add('active');

// 2. Load User Data
    const user = Utils.retrieve('currentUser');
    if (user) {
        // Force name to be "User" if you prefer
        document.getElementById('profile-name').textContent = "User"; 
        // Or keep dynamic: user.firstName ? `${user.firstName} ${user.lastName}` : user.name;
        
    }

    // 3. Load and Render Posts
    renderProfilePosts();
});

function renderProfilePosts() {
    const contentDiv = document.getElementById('profile-content');
    
    // Get posts from local storage
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];

    // Filter to show only "Me" posts
    const myPosts = allPosts.filter(post => post.user === "Me");

    // Check if we have posts
    if (myPosts.length === 0) {
        contentDiv.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 40px;">
                No posts yet.
            </div>
        `;
        return;
    }

    // Clear the loading message
    contentDiv.innerHTML = '';

    // Generate HTML for each post (Using Feed Style)
    myPosts.forEach(post => {
        
        let contentHtml = '';
        
        // 1. Handle Voice Content vs Text Content
        if (post.type === 'voice') {
            // Generate waveform bars randomly like in feed.js
            const waveformHtml = Array(20).fill(0).map(() => 
                `<div class="bar" style="height: ${Math.random() * 20 + 5}px; animation-duration: ${Math.random() * 0.5 + 0.5}s"></div>`
            ).join('');

            contentHtml = `
                <div class="post-content">${post.content}</div>
                <div class="voice-player">
                    <button class="btn-icon play-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </button>
                    <div class="waveform">
                        ${waveformHtml}
                    </div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">0:42</span>
                </div>
                <div class="ai-summary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    AI Summary of audio...
                </div>
            `;
        } else {
            contentHtml = `<div class="post-content">${post.content}</div>`;
        }

        // 2. Build the Full Post Card (Identical to Feed)
        const postHTML = `
            <div class="post-card animate-fade-in">
                <div class="post-header">
                    <img src="${post.avatar}" class="post-avatar" alt="${post.user}">
                    <div class="post-meta">
                        <h4>${post.user}</h4>
                        <span>${post.time}</span>
                    </div>
                </div>
                
                ${contentHtml}
                
                <div class="post-actions">
                    <div class="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        ${post.likes}
                    </div>
                    <div class="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        ${post.comments}
                    </div>
                    <div class="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                        Share
                    </div>
                </div>
            </div>
        `;

        // Append to the container
        contentDiv.innerHTML += postHTML;
    });
}