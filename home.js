    // Function to generate a random meme
    function generateMeme() {
        const totalMemes = 300;  // Total number of memes in your folder
        const randomIndex = Math.floor(Math.random() * totalMemes); 
        document.getElementById('memeImage').src = `memes/${randomIndex}.jpg`;
    }
    document.addEventListener('DOMContentLoaded', () => {
      const emoji = document.getElementById('emoji');
      const slider = document.getElementById('moodSlider');
  
      const foodContent = document.getElementById('food-content');
      const musicContent = document.getElementById('music-content');
      const bookContent = document.getElementById('book-content');
      
      const foodImage = document.getElementById('food-image');
      const musicImage = document.getElementById('music-image');
      const bookImage = document.getElementById('book-image');
  
      const detailedRecommendations = document.getElementById('detailed-recommendations');
  
      slider.addEventListener('input', () => {
  
      
          const moodValue = parseInt(slider.value);
          let moodEmoji = '';
          let moodResponse = '';
          let foodSuggestion = '';
          let musicSuggestion = '';
          let bookSuggestion = '';
          let foodImgSrc = '';
          let musicImgSrc = '';
          let bookImgSrc = '';
  
          if (moodValue <= 20) {
              moodEmoji = '😞';  
              moodResponse = "Feeling low? Let's lift your spirits!";
              foodSuggestion = "Comforting Khichdi & Pakora";
              musicSuggestion = `<a href="https://www.youtube.com/watch?v=VY0K6vlrKXg" target="_blank">Relaxing Indian Classical Music</a>`;
              bookSuggestion = `<a href="https://www.amazon.in/Life-What-You-Make-Preeti/dp/8129119405" target="_blank">"Life is What You Make It"</a>`;
              
              foodImgSrc = "./images/kichidi.jpg";
              musicImgSrc = "./images/classical-music.jpg";
              bookImgSrc = "./images/Life_Is_What_Make_It.jpg";
  
  
          } else if (moodValue <= 40) {
              moodEmoji = '😕';
              moodResponse = "Feeling a bit off? Here's some comfort.";
              foodSuggestion = "Hot Chai with Biscuits";
              musicSuggestion = `<a href="https://www.youtube.com/watch?v=1b2f9DRvaFs" target="_blank">Jagjit Singh's Best Ghazals</a>`;
              bookSuggestion = `<a href="https://www.amazon.in/Monk-Who-Sold-His-Ferrari/dp/817992162X" target="_blank">"The Monk Who Sold His Ferrari"</a>`;
              
              foodImgSrc = "./images/chai.jpg";
              musicImgSrc = "./images/ghazals.jpg";
              bookImgSrc = "./images/JH-580.jpg";
  
          } else if (moodValue <= 60) {
              moodEmoji = '😐';
              moodResponse = "Feeling neutral? Let's keep things calm.";
              foodSuggestion = "Fresh Fruit Salad with Nuts";
              musicSuggestion = `<a href="https://www.youtube.com/watch?v=lTRiuFIWV54" target="_blank">Calm Lo-fi Beats</a>`;
              bookSuggestion = `<a href="https://www.amazon.in/Power-Now-Guide-Spiritual-Enlightenment/dp/8190105914" target="_blank">"The Power of Now"</a>`;
              
              foodImgSrc = encodeURI("https://res.cloudinary.com/drcjc86ft/image/upload/v1741860709/salad_jljrxf.jpg");
              musicImgSrc = "./images/lofi.jpg";
              bookImgSrc = "./images/TPON_Cover_LG.jpg";
  
          } else if (moodValue <= 80) {
              moodEmoji = '😊';
              moodResponse = "You're feeling great! Keep the vibe high.";
              foodSuggestion = "Mango Lassi & Masala Dosa";
              musicSuggestion = `<a href="https://www.youtube.com/watch?v=ZXID7h7TepU" target="_blank">Bollywood Party Playlist</a>`;
              bookSuggestion = `<a href="https://www.amazon.in/Atomic-Habits-James-Clear/dp/1847941834" target="_blank">"Atomic Habits"</a>`;
              
              foodImgSrc = "./images/Mango-Lassi-08589.jpg";
              musicImgSrc = "./images/bwood.jpg";
              bookImgSrc = "./images/atomic.jpeg";
  
          } else {
              moodEmoji = '😄';
              moodResponse = "You're feeling amazing! Spread the positivity.";
              foodSuggestion = "Ice Cream with Chocolate Toppings";
              musicSuggestion = `<a href="https://www.youtube.com/watch?v=ovFSE8iW0zE" target="_blank">Punjabi Dance Bangers</a>`;
              bookSuggestion = `<a href="https://www.amazon.in/Ikigai-Hector-Garcia/dp/178633089X" target="_blank">"Ikigai"</a>`;
              
              foodImgSrc = "./images/icecream.jpg";
              musicImgSrc = "./images/punjabi.jpg";
              bookImgSrc = "./images/ikitai.jpg";
          }
  
          emoji.textContent = moodEmoji;
          detailedRecommendations.innerHTML = `<p>${moodResponse}</p>`;
          
          foodContent.innerHTML = `<p>${foodSuggestion}</p>`;
          musicContent.innerHTML = `<p>${musicSuggestion}</p>`;
          bookContent.innerHTML = `<p>${bookSuggestion}</p>`;
  
          foodImage.src = foodImgSrc;
          musicImage.src = musicImgSrc;
          bookImage.src = bookImgSrc;
      });
  });
  
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
  
  
  function openDashboard() {
      window.open('dashboard.html', '_blank'); // Opens dashboard in new tab
  }
  function openChatBot() {
      window.open('chatbot.html', '_blank'); // Opens dashboard in new tab
  }
  
