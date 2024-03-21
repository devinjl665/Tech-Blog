const createBlogFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blogTitle').value.trim();
    const contents = document.querySelector('#blogContent').value.trim();

    if (title && contents) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post')
        }
    }
};

const delButtonClick = async (event) => {
    if (event.target.hasAttribute('dataId')) {
        const id = event.target.getAttribute('dataId');
        console.log(id);

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Unable to delete post')
        }
    }
};

document
    .querySelector('.blogForm')
    .addEventListener('submit', createBlogFormHandler)

document
    .querySelector('.blogList')
    .addEventListener('click', delButtonClick)