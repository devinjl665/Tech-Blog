const editHandler = async (event) => {
    const id = event.target.getAttribute('postId');
    const title = document.querySelector('#editBlogTitle').value.trim();
    const content = document.querySelector('#editBlogContent').value.trim();

    const postObject = {
        content: content,
        postId: id,
        postTitle: title
    };

    if (content && id && title) {
        const response = await fetch('/api/post/update', {
            method: 'PUT',
            body: JSON.stringify({ postObject }),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace(`/post/${id}`);
        } else {
            alert("Unable to post!");
        }
    }
};

document
    .querySelector('.editButt')
    .addEventListener('click', editHandler);