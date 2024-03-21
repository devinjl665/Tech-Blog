// Define an asynchronous function to handle creating comments
const createCommentFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the textarea element for comment contents and its dataId attribute
    const textContents = document.querySelector('#commentContent');
    const contents = textContents.value.trim();
    const blogId = textContents.getAttribute('dataId');

    // Create an object with the comment contents and associated blogId
    const bodyObject = {
        contents: contents,
        blogId: blogId
    };

    // Check if the comment contents exist
    if (contents) {
        // Send a POST request to the server to create a new comment
        const response = await fetch('/api/blogs/comments', {
            method: 'POST',
            body: JSON.stringify({ bodyObject }), // Send the comment data in JSON format
            headers: {
                'Content-Type': 'application/json', // Set the content type header
            },
        });

        // Check if the response is successful
        if (response.ok) {
            // Redirect to the blog page after successfully creating the comment
            document.location.replace(`/blog/${blogId}`);
        } else {
            // Display an alert if creating the comment fails
            alert('Failed to create a post');
        }
    }
};

// Add an event listener to the comment form for form submission
document
    .querySelector('.commentForm')
    .addEventListener('submit', createCommentFormHandler);
