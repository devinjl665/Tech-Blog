const signupFormHandler = async (event) => {

    event.preventDefault();
  
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
        
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

    document
        .querySelector('#signup-form')
        .addEventListener('submit', signupFormHandler); 