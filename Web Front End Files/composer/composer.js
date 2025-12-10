document.addEventListener('DOMContentLoaded', () => {
    Router.checkAuth();

    const contentArea = document.getElementById('post-content');
    const voiceBtn = document.getElementById('voice-btn');
    const recordingUI = document.getElementById('recording-ui');
    const stopRecordingBtn = document.getElementById('stop-recording-btn');
    const aiDraftBtn = document.getElementById('ai-draft-btn');
    const postBtn = document.getElementById('post-btn');

    // --- Voice Recording Logic ---
    voiceBtn.addEventListener('click', async () => {
        const started = await AudioManager.startRecording();
        if (started) {
            recordingUI.classList.add('active');
            voiceBtn.classList.add('active');
            let seconds = 0;
            window.recordTimer = setInterval(() => {
                seconds++;
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                document.getElementById('recording-timer').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            }, 1000);
        } else {
            alert('Microphone access denied or not available.');
        }
    });

    stopRecordingBtn.addEventListener('click', async () => {
        const result = await AudioManager.stopRecording();
        clearInterval(window.recordTimer);
        recordingUI.classList.remove('active');
        voiceBtn.classList.remove('active');
        
        if (result) {
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.unshift({
                id: Date.now(),
                user: "Me",
                avatar: "https://ui-avatars.com/api/?name=Me&background=eee",
                time: "Just now",
                content: contentArea.value.trim(),
                type: "voice",
                audioUrl: result.url,
                likes: 0,
                comments: 0
            });
            localStorage.setItem('posts', JSON.stringify(posts));
            
            // CHANGED: Redirect to Profile instead of Feed
            window.location.href = '../feed/feed.html';
        }
    });

    // --- AI Draft Logic ---
    aiDraftBtn.addEventListener('click', async () => {
        const currentText = contentArea.value;
        if (!currentText) {
            alert('Please enter some bullet points first.');
            return;
        }
        aiDraftBtn.textContent = 'Generating...';
        const generated = await AI.generatePostFromIdeas(currentText);
        contentArea.value = generated;
        aiDraftBtn.textContent = 'Draft from bullet points';
    });

    // --- Text Post Logic ---
    postBtn.addEventListener('click', () => {
        const content = contentArea.value.trim();
        if (!content) return;

        const newPost = {
            id: Date.now(),
            user: "Me",
            avatar: "https://ui-avatars.com/api/?name=Me&background=eee",
            time: "Just now",
            content: content,
            type: "text",
            likes: 0,
            comments: 0
        };

        const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
        existingPosts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(existingPosts));

        // CHANGED: Redirect to Profile instead of Feed
            window.location.href = '../feed/feed.html';
    });
});