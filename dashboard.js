document.getElementById('dashboard-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const friendContact = document.getElementById('friend-contact').value;

    const mentalScore = Math.floor(Math.random() * 100); // Random score for testing
    document.getElementById('mental-score').textContent = mentalScore;

    const graphCanvas = document.getElementById('mental-health-graph');
    clearCanvas(graphCanvas);  // Clear the previous graph before drawing a new one
    renderMentalHealthGraph(graphCanvas, mentalScore);

    const tips = getIndianWellnessTips(mentalScore);
    displayRecommendations(tips);  // Show tips directly on the same page

    if (mentalScore < 40) {
        sendAlertNotification(friendContact, name);
    }

    document.getElementById('show-wellness-btn').addEventListener('click', function () {
        localStorage.setItem('mentalScore', mentalScore);
        window.location.href = 'ai_dashboard.html';
    });
});

// Clear previous graph data before rendering new one
function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getIndianWellnessTips(score) {
    if (score >= 80) return ["Surya Namaskar", "Mindfulness meditation", "Healthy diet"];
    if (score >= 60) return ["Balasana (Child's Pose)", "Gratitude journaling", "Tulsi tea"];
    if (score >= 40) return ["Breathing exercises", "Guided meditation", "Positive affirmations"];
    return ["Emergency helplines", "Shavasana relaxation", "Seek support from loved ones"];
}

function displayRecommendations(tips) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = `<h4>Recommended Wellness Tips:</h4><ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
}

function sendAlertNotification(contact, username) {
    alert(`🚨 Alert sent to ${contact}: "${username} is feeling sad, please check in with them."`);
}

function renderMentalHealthGraph(canvas, score) {
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Good', 'Average', 'Poor'],
            datasets: [{
                data: [score, 100 - score, 0],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
            }]
        },
        options: {
            plugins: {
                legend: { display: true }
            }
        }
    });
}
