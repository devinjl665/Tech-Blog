const loginForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
        const response = await fetch ('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/dashboard'); 
        } else {
            alert('Invalid login information')
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    
    
    if (email && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Sign up failed.');
            }
        };

};


document
    .querySelector('#login-form')
    .addEventListener('submit', loginForm);

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler); 
