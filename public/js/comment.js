// Define an asynchronous function to handle creating comments
const postCommentFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the textarea element for comment contents and its dataId attribute
    const textContent = document.querySelector('#commentContent');
    const content = textContent.value.trim();
    const blogId = textContent.getAttribute('dataId');

    console.log('Comment: ' + content);
    console.log('ID is ' + blogId);

    // Create an object with the comment contents and associated blogId
    const bodyObject = {
        contents: content,
        blogId: blogId
    };

    // Check if the comment contents exist
    if (content) {
        const response = await fetch (`/api/blogs/comments`, {
            method: 'POST',
            body: JSON.stringify({ bodyObject }),
            header: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is successful
        if (response.ok) {
            // Redirect to the blog page after successfully creating the comment
            document.location.replace(`/blog/${blogId}`);
        } else {
            // Display an alert if creating the comment fails
            alert('Could not post comment');
        }
    }
};

// Add an event listener to the comment form for form submission
document.querySelector('.commentForm').addEventListener('submit', postCommentFormHandler);