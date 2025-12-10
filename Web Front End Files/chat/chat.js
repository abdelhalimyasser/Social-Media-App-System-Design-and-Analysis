document.addEventListener('DOMContentLoaded', async () => {
    Router.checkAuth();
    
    // Load Components
    const navbar = await fetch('../components/navbar.html').then(r => r.text());
    const bottomNav = await fetch('../components/bottom-nav.html').then(r => r.text());
    
    document.getElementById('navbar-placeholder').innerHTML = navbar;
    document.getElementById('bottom-nav-placeholder').innerHTML = bottomNav;

    // document.getElementById('nav-chat').classList.add('active');

    // Mock Chats
    const chats = [
        {
            id: 1,
            name: "Sarah Jenkins",
            avatar: "https://i.pravatar.cc/150?img=5",
            lastMessage: "Voice message (0:42)",
            time: "2m",
            unread: 2
        },
        {
            id: 2,
            name: "Mike Ross",
            avatar: "https://i.pravatar.cc/150?img=11",
            lastMessage: "See you tomorrow!",
            time: "1h",
            unread: 0
        }
    ];

    const chatList = document.getElementById('chat-list');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');

    // Render Chat List
    chats.forEach(chat => {
        const el = document.createElement('div');
        el.className = 'chat-item animate-fade-in';
        el.innerHTML = `
            <img src="${chat.avatar}" class="chat-avatar">
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-preview">${chat.lastMessage}</div>
            </div>
            <div class="chat-meta">
                <span class="chat-time">${chat.time}</span>
                ${chat.unread ? `<div class="unread-badge">${chat.unread}</div>` : ''}
            </div>
        `;
        el.addEventListener('click', () => openChat(chat));
        chatList.appendChild(el);
    });

    function openChat(chat) {
        document.getElementById('active-chat-name').textContent = chat.name;
        document.getElementById('active-chat-avatar').src = chat.avatar;
        
        // Mock Messages
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = `
            <div class="message received">Hey! How are you?</div>
            <div class="message sent">I'm doing great, thanks!</div>
            <div class="message received">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Voice message
                </div>
            </div>
        `;

        chatWindow.classList.add('active');
    }

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
});
