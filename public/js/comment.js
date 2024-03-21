const createCommentFormHandler = async (event) => {
    event.preventDefault();

    const textContents = document.querySelector('#commentContent');

    const contents = textContents.value.trim();
    const blogId = textContents.getAttribute('dataId');

    const bodyObject = {
        contents: contents,
        blogId: blogId
    };

    if (contents) {
        const response = await fetch('/api/blogs/comments', {
            method: 'POST',
            body: JSON.stringify({ bodyObject }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/blog/${blogId}`);
        } else {
            alert('Failed to create a post');
        }
    }
};

document
    .querySelector('.commentForm')
    .addEventListener('submit', createCommentFormHandler);