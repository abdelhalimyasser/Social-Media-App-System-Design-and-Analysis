const AudioManager = {
    isRecording: false,
    mediaRecorder: null,
    audioChunks: [],

    async startRecording() {
        if (!navigator.mediaDevices) return false;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            return true;
        } catch (e) {
            console.error("Error accessing microphone:", e);
            return false;
        }
    },

    stopRecording() {
        return new Promise((resolve) => {
            if (!this.mediaRecorder) resolve(null);

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                this.isRecording = false;
                resolve({ blob: audioBlob, url: audioUrl });
            };

            this.mediaRecorder.stop();
        });
    },

    play(url) {
        const audio = new Audio(url);
        audio.play();
        return audio;
    }
};
