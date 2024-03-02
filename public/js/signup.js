const signupFormHandler = async (event) => {

    event.preventDefault();
  

    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (username && password) {

      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Sign up failed.');
      }
    }
  };

  //Create a listener to trigger the logout handler on click
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler); 