const questions = [
    { question: "How are you feeling today?", options: ["Good", "Bad", "Sad", "Depressed"] },
    { question: "What has been your primary stress relief method lately?", options: ["Meditation", "Yoga", "Talking to a friend", "Watching TV"] },
    { question: "How often do you exercise?", options: ["Daily", "Few times a week", "Rarely", "Never"] },
    { question: "Are you able to sleep peacefully at night?", options: ["Yes", "Sometimes", "Rarely", "Never"] },
    { question: "How often do you spend time outdoors?", options: ["Every day", "A few times a week", "Occasionally", "Never"] },
    { question: "Do you practice any mindfulness activities?", options: ["Yoga", "Meditation", "Deep breathing exercises", "None"] },
    { question: "How would you describe your social interactions lately?", options: ["Active and enjoyable", "Minimal but positive", "Rare and lonely", "Avoiding social interactions"] },
    { question: "How often do you engage in hobbies or activities you enjoy?", options: ["Daily", "Weekly", "Occasionally", "Rarely"] },
    { question: "Do you follow a healthy diet?", options: ["Balanced with fresh foods", "Mostly healthy", "Sometimes healthy", "Unhealthy"] },
    { question: "How would you rate your energy levels throughout the day?", options: ["Energized", "Average", "Tired but manageable", "Constantly drained"] }
];

let currentQuestion = 0;
let score = 0;
const answers = Array(questions.length).fill(null); // Store selected answers

function loadQuestion() {
    const surveyContainer = document.getElementById('survey-container');
    const current = questions[currentQuestion];

    surveyContainer.innerHTML = `
        <div class="question">${current.question}</div>
        ${current.options.map(option =>
            `<div class="option ${answers[currentQuestion] === option ? 'selected' : ''}" 
                onclick="selectOption(this, '${option}')">${option}</div>`
        ).join('')}
    `;
}

function selectOption(element, choice) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');

    // Store the selected answer
    answers[currentQuestion] = choice;

    // Calculate score based on selected option
    score += choice === "Good" || choice === "Daily" || choice === "Yes" || choice === "Active and enjoyable"
        ? 10
        : choice === "Few times a week" || choice === "Sometimes" || choice === "Mostly healthy"
        ? 5
        : choice === "Rarely" || choice === "Occasionally"
        ? 3
        : 1;
}

function nextQuestion() {
    if (answers[currentQuestion] === null) {
        alert("❗ Please select an option before moving to the next question.");
        return;  // Prevent moving to the next question
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        submitSurvey();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function submitSurvey() {
    if (answers.includes(null)) {
        alert("❗ Please answer all questions before submitting.");
        return;
    }

    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');

    const finalScore = Math.min(100, score);
    document.getElementById('score').innerText = finalScore;

    localStorage.setItem('mentalScore', finalScore);

    const previousResults = JSON.parse(localStorage.getItem('surveyResults')) || [];
    previousResults.push({
        score: finalScore,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('surveyResults', JSON.stringify(previousResults));

    renderMentalHealthGraph(finalScore);

    const recommendations = document.getElementById('recommendations');

    // 🌿 Enhanced Recommendations with Links, Images, and Effects
    if (finalScore > 70) {
        recommendations.innerHTML = `
        <div class="recommendation-card great">
            <h3>🌟 You're in a great mental state!</h3>
            <ul>
                <li>🧘 <b>Yoga Asanas:</b> <a href="https://www.artofliving.org/in-en/yoga/surya-namaskar" target="_blank">Surya Namaskar (Sun Salutation)</a></li>
                <img src="https://i.imgur.com/3jqcGQu.jpg" alt="Surya Namaskar" class="recommendation-img">
                <li>🌅 <b>Morning Rituals:</b> Start your day with <a href="https://ayurvedicoils.com/herbal-oils/tulsi-tea" target="_blank">Tulsi Tea</a> or warm lemon water.</li>
                <li>🎶 <b>Sound Healing:</b> Listen to <a href="https://youtu.be/-fZxZ8BMBRU" target="_blank">Raga Bhairavi</a> for peace.</li>
            </ul>
        </div>`;
    } else if (finalScore > 50) {
        recommendations.innerHTML = `
        <div class="recommendation-card good">
            <h3>😊 You're doing fairly well!</h3>
            <ul>
                <li>🧘 <b>Pranayama:</b> Practice <a href="https://www.yogajournal.com/poses/types/pranayama/nadi-shodhana/" target="_blank">Nadi Shodhana (Alternate Nostril Breathing)</a></li>
                <img src="https://i.imgur.com/Z6rCgTZ.jpg" alt="Nadi Shodhana" class="recommendation-img">
                <li>🍵 <b>Herbal Remedy:</b> Try <a href="https://healthline.com/nutrition/ashwagandha-benefits" target="_blank">Ashwagandha</a> for focus and calmness.</li>
                <li>📿 <b>Meditation:</b> Practice <a href="https://youtu.be/WB2S4MmM4KE" target="_blank">Om Chanting</a> for mindfulness.</li>
            </ul>
        </div>`;
    } else if (finalScore > 30) {
        recommendations.innerHTML = `
        <div class="recommendation-card average">
            <h3>😐 Feeling low? Try these techniques!</h3>
            <ul>
                <li>💤 <b>Sleep Tip:</b> Try <a href="https://www.artofliving.org/in-en/ayurveda/shirodhara" target="_blank">Shirodhara (Oil Therapy)</a> for improved sleep.</li>
                <img src="https://i.imgur.com/lP2UgRk.jpg" alt="Shirodhara Therapy" class="recommendation-img">
                <li>🍲 <b>Ayurvedic Diet:</b> Add <a href="https://en.wikipedia.org/wiki/Sattvic_diet" target="_blank">Sattvic Foods</a> like ghee, milk, and fresh fruits.</li>
                <li>💬 <b>Emotional Support:</b> Spend time with close friends or family members.</li>
            </ul>
        </div>`;
    } else {
        recommendations.innerHTML = `
        <div class="recommendation-card low">
            <h3>😟 Your mental well-being needs attention!</h3>
            <ul>
                <li>🧘 <b>Calming Yoga:</b> Practice <a href="https://www.yogajournal.com/poses/corpse-pose" target="_blank">Shavasana (Corpse Pose)</a> for deep relaxation.</li>
                <img src="https://i.imgur.com/PHqRi6x.jpg" alt="Shavasana" class="recommendation-img">
                <li>🌾 <b>Ayurvedic Herbs:</b> Include <a href="https://www.verywellhealth.com/brahmi-benefits-5192695" target="_blank">Brahmi</a> and <a href="https://pharmeasy.in/blog/ayurveda-uses-benefits-and-side-effects-of-guduchi/" target="_blank">Guduchi</a> in your diet.</li>
                <li>📞 <b>Emotional Support:</b> Connect with loved ones or a trusted friend.</li>
            </ul>
        </div>`;
    }

    score = 0;  // Reset score for future surveys
}


function renderMentalHealthGraph(finalScore) {
    const ctx = document.getElementById('mentalHealthGraph').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Good', 'Average', 'Poor'],
            datasets: [{
                data: [
                    finalScore,
                    100 - finalScore,
                    0
                ],
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



window.onload = loadQuestion;
