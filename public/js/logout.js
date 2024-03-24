// Async function to logout out of the application
const logout = async () => {
    console.log('clicked');
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// Add an event listener to the logout button for click events
document.querySelector('#logout').addEventListener('click', logout);
