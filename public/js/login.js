const login = async (event) => {
 
    event.preventDefault();
    
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    
        
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ 
                username.value, 
                password.value, 
            }),
            headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Log in failed.');
            }
        };
    
    document
        .querySelector('#login-form')
        .addEventListener('submit', login); 