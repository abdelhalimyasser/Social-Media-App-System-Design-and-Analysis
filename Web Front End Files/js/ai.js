const AI = {
    async summarizePost(text) {
        // Mock delay
        await new Promise(r => setTimeout(r, 1000));
        return "AI Summary: This post discusses the importance of modern UI design trends.";
    },

    async voiceToText(audioBlob) {
        await new Promise(r => setTimeout(r, 1500));
        return "This is a simulated transcription of the voice message.";
    },

    async textToVoice(text) {
        await new Promise(r => setTimeout(r, 1000));
        console.log("Playing audio for:", text);
        // In a real app, this would return an audio URL or play it
        return true;
    },

    async generatePostFromIdeas(ideas) {
        await new Promise(r => setTimeout(r, 2000));
        return `Here's a drafted post based on your ideas:\n\n${ideas}\n\n#AI #Generated`;
    },

    async getRecommendations() {
        return [
            { id: 1, title: "Design Trends 2025" },
            { id: 2, title: "Voice Interfaces" }
        ];
    }
};
