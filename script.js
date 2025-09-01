document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === "" || password === "") {
      alert("Please fill in both fields.");
      return;
  }

  // Sample login logic (to be replaced with actual database logic)
  if (username === "Mithra" && password === "Mithra@2006") {
      alert("Login successful! Welcome to ManoMitra.");
      window.location.href = "./homepage.html?user=" + encodeURIComponent(username);
 // Redirect after successful login
  } else {
      alert("Invalid username or password. Please try again.");
  }
});
