// Define an asynchronous function to handle creating a new blog post
const createBlogFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values of the title and contents input fields
    const title = document.querySelector('#blogTitle').value.trim();
    const contents = document.querySelector('#blogContent').value.trim();

    // Check if both title and contents are not empty
    if (title && contents) {
        // Send a POST request to the server to create a new blog post
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, contents }), // Send the blog data in JSON format
            headers: {
                'Content-Type': 'application/json', // Set the content type header
            },
        });

        // Check if the response is successful
        if (response.ok) {
            // Redirect to the dashboard after successfully creating the post
            document.location.replace('/dashboard');
        } else {
            // Display an alert if creating the post fails
            alert('Failed to create post');
        }
    }
};

// Define an asynchronous function to handle the delete button click event
const delButtonClick = async (event) => {
    if (event.target.hasAttribute('dataId')) { // Check if the clicked element has a dataId attribute
        const id = event.target.getAttribute('dataId'); // Get the value of the dataId attribute
        console.log(id);

        // Send a DELETE request to the server to delete the blog post with the specified id
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        // Check if the response is successful
        if (response.ok) {
            // Redirect to the dashboard after successfully deleting the post
            document.location.replace('/dashboard');
        } else {
            // Display an alert if deleting the post fails
            alert('Unable to delete post');
        }
    }
};

// Add an event listener to the blog form for form submission
document
    .querySelector('.blogForm')
    .addEventListener('submit', createBlogFormHandler);

// Add an event listener to the blog list for click events on delete buttons
document
    .querySelector('.blogList')
    .addEventListener('click', delButtonClick);
