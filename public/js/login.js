// Define an asynchronous function to handle the login form submission
const loginHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values of the email and password input fields
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Check if both email and password are not empty
    if (email && password) {
        // Send a POST request to the server to log in the user
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }), // Send the login data in JSON format
            headers: { 'Content-Type': 'application/json' }, // Set the content type header
        });

        // Check if the response is successful
        if (response.ok) {
            // Redirect to the dashboard after successful login
            document.location.replace('/dashboard');
        } else {
            // Display an alert with the status text if login fails
            alert(response.statusText);
        }
    };
}

// Define an asynchronous function to handle the signup form submission
const signupHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values of the name, email, and password input fields
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Send a POST request to the server to sign up the user
    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }), // Send the signup data in JSON format
            headers: { 'Content-Type': 'application/json'}, // Set the content type header
        });

        // Check if the response is successful
        if (response.ok) {
            // Redirect to the dashboard after successful signup
            document.location.replace('/dashboard');
        } else {
            // Display an alert with the status text if signup fails
            alert(response.statusText);
        }
    }
};

// Add an event listener to the login form for form submission
document.querySelector('.loginForm').addEventListener('submit', loginHandler);

// Add an event listener to the signup form for form submission
document.querySelector('.signupForm').addEventListener('submit', signupHandler);