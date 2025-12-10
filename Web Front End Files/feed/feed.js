document.addEventListener('DOMContentLoaded', async () => {
    Router.checkAuth();
    
    // Load Components
    const navbar = await fetch('../components/navbar.html').then(r => r.text());
    const bottomNav = await fetch('../components/bottom-nav.html').then(r => r.text());
    
    document.getElementById('navbar-placeholder').innerHTML = navbar;
    document.getElementById('bottom-nav-placeholder').innerHTML = bottomNav;

    // Highlight active nav
    document.getElementById('nav-feed').classList.add('active');
    

    // Initialize Theme Toggle
    setTimeout(() => {
        document.getElementById('theme-toggle').addEventListener('click', () => {
            ThemeManager.toggleTheme();
        });
    }, 100);
    

    // Mock Posts Data
    // Get posts from localStorage or use mock data if empty
    
// Default posts
const defaultPosts = [
    {
        id: 1,
        user: "Sarah Jenkins",
        avatar: "https://i.pravatar.cc/150?img=5",
        time: "2h ago",
        content: "Just tried the new voice feature! It's amazing 🎙️",
        type: "voice",
        audioUrl: "../assets/audio/demo.mp3",
        likes: 24,
        comments: 5
    },
    {
        id: 2,
        user: "Mike Ross",
        avatar: "https://i.pravatar.cc/150?img=11",
        time: "4h ago",
        content: "Designing the future of social media. #design #ui #ux",
        type: "text",
        likes: 156,
        comments: 32
    }
];

// Get posts from localStorage
let posts = [];
try {
    posts = JSON.parse(localStorage.getItem('posts')) || [];
} catch (e) {
    posts = [];
}

// Merge default posts if they aren't already saved
defaultPosts.forEach(defPost => {
    if (!posts.find(p => p.id === defPost.id)) {
        posts.push(defPost);
    }
});

// Save back to localStorage so defaults persist
localStorage.setItem('posts', JSON.stringify(posts));



    const feedContainer = document.getElementById('feed-container');

    // --- START OF REPLACEMENT CODE ---
    
    for (const post of posts) {
        const postEl = document.createElement('div');
        postEl.className = 'post-card animate-fade-in';
        
        // 1. Check if the post is already liked to set the initial color
        const likedClass = post.isLiked ? 'liked' : '';
        
        let contentHtml = '';
        if (post.type === 'voice') {
            // Mock AI Summary
            const summary = await AI.summarizePost(post.content);
            
            contentHtml = `
                <div class="post-content">${post.content}</div>
                <div class="voice-player">
                    <button class="btn-icon play-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </button>
                    <div class="waveform">
                        ${Array(20).fill(0).map(() => `<div class="bar" style="height: ${Math.random() * 20 + 5}px; animation-duration: ${Math.random() * 0.5 + 0.5}s"></div>`).join('')}
                    </div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">0:42</span>
                </div>
                <div class="ai-summary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    ${summary}
                </div>
            `;
        } else {
            contentHtml = `<div class="post-content">${post.content}</div>`;
        }

        postEl.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" class="post-avatar" alt="${post.user}">
                <div class="post-meta">
                    <h4>${post.user}</h4>
                    <span>${post.time}</span>
                </div>
            </div>
            ${contentHtml}
            <div class="post-actions">
                <!-- Added 'likedClass' variable and wrapped number in span -->
                <div class="action-btn like-trigger ${likedClass}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span class="like-count">${post.likes}</span>
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
        `;
        
        // 2. Add the Click Logic (Logic to save to database/localStorage)
        const likeBtn = postEl.querySelector('.like-trigger');
        const countSpan = likeBtn.querySelector('.like-count');

        likeBtn.addEventListener('click', () => {
            // Toggle the state in the data object
            post.isLiked = !post.isLiked;

            // Update the count in the data object
            if (post.isLiked) {
                post.likes++;
                likeBtn.classList.add('liked');
            } else {
                post.likes--;
                likeBtn.classList.remove('liked');
            }

            // Update the number on screen
            countSpan.textContent = post.likes;

            // SAVE to LocalStorage (This makes it persist on reload)
            localStorage.setItem('posts', JSON.stringify(posts));
        });
        
        feedContainer.appendChild(postEl);
    }
    // --- END OF REPLACEMENT CODE ---
});

