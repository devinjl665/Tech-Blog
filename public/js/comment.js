const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#commentContent').value.trim();
    
    const content = textContent.value.trim();
    const postId = textContent.getAttribute();

    const bodyObject = {
        content: content,
        postId: postId
    };

    if (content) {
        const response = await fetch('/api/posts/comment', {
            method: 'POST',
            body: JSON.stringify({ bodyObject }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert('Post could not be created');
        }
    }
};

document.querySelector('.commentForm')
    .addEventListener('submit', commentFormHandler);
