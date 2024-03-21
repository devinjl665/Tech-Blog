const editButtonClick = async (event) => {
    const contents = document.querySelector('#editBlogContent').value.trim();
    const id = event.target.getAttribute('dataId');
    const title = document.querySelector('#editBlogTitle').value.trim();

    const blogObject = { 
        contents: contents,
        blogId: id,
        blogTitle: title
    };

    if (contents && id && title) {
        const response = await fetch('/api/blogs/update', {
            method: 'PUT',
            body: JSON.stringify({ blogObject }),
            headers: {'Content-Type' : 'application/json'},
        });

        if (response.ok) {
            document.location.replace(`/blog/${id}`);
        } else {
            alert('Unable to update post')
        }
    }
};

document
    .querySelector('.editButt')
    .addEventListener('click', editButtonClick)