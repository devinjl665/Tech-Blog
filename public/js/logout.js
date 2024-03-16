document.addEventListener('DOMContentLoaded', () => {
    const logoutRequest = async () => {
        const response = await fetch('/api/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        }
    };
    
    const logoutButton = document.querySelector('#logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', logoutRequest);
    }
});