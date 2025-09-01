document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value.trim();
    const chatContent = document.getElementById('chat-content');

    if (!userInput) return;

    chatContent.innerHTML += `<div class="user-message">${userInput}</div>`;

    try {
        const response = await fetch('/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: userInput })
        });

        const data = await response.json();
        chatContent.innerHTML += `<div class="bot-message">${data.response}</div>`;
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        chatContent.innerHTML += `<div class="bot-message error">Error: Unable to fetch response. Please try again.</div>`;
    }
});

async function fetchChatbotResponse(userMessage) {
    const endpoint = `https://manomitra.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-10-21`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': '7EXec5WYk8eZwNDnE4Hp9pZPCqILeZbWGFTyfrdrXyP2sIcKGiMyJQQJ99BCAC77bzfXJ3w3AAABACOGwsnj'  // Store API key securely
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: "You are a mental health companion named Mano Mitra." },
                    { role: 'user', content: userMessage }
                ]
            })
        });

        const data = await response.json();
        const chatbotResponse = data.choices[0]?.message?.content || "Sorry, I'm unable to respond right now.";
        
        document.getElementById("chatbox").innerHTML += `<div class="bot-response">${chatbotResponse}</div>`;
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        document.getElementById("chatbox").innerHTML += `<div class="bot-response error">Error: Unable to fetch response. Please try again.</div>`;
    }
}

function handleSendMessage() {
    const userMessage = document.getElementById('user-input').value.trim();
    if (!userMessage) return;

    document.getElementById('chatbox').innerHTML += `<div class="user-message">${userMessage}</div>`;
    fetchChatbotResponse(userMessage);

    document.getElementById('user-input').value = '';
}
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents page refresh
        sendMessage(); // Calls your send message function
    }
});

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    
    if (userInput !== "") {
        const chatBox = document.getElementById("chat-box");
        const userMessage = `<div class="user-message">${userInput}</div>`;
        
        chatBox.innerHTML += userMessage;
        document.getElementById("user-input").value = ""; // Clear input after sending

        // Logic to process and display bot response
        const botResponse = `<div class="bot-message">I'm here to help you!</div>`;
        setTimeout(() => chatBox.innerHTML += botResponse, 500);
        
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
    }
}
