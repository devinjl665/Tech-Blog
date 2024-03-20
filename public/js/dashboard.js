const newpostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blogTitle');
    const content = document.querySelector('#blogContent').value;

    if (title && content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Could not add post!');
        }
    }
};


const deleteHandler = async (event) => {
    if (event.targer.hasAttribute('postId')) {
        const id = event.target.getAttribute('postId')
        console.log(id);

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Unable to delete');
        }
    }
};

document
    .querySelector('.blogForm')
    .addEventListener('submit', newpostFormHandler)

document
    .querySelector('#newpost-form')
    .addEventListener('click', deleteHandler)