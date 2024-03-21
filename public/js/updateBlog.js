// Define an asynchronous function to handle the edit button click event
const editButtonClick = async (event) => {
    // Get the values of the edited blog content, ID, and title from the input fields
    const contents = document.querySelector('#editBlogContent').value.trim();
    const id = event.target.getAttribute('dataId');
    const title = document.querySelector('#editBlogTitle').value.trim();

    // Create an object to hold the updated blog data
    const blogObject = { 
        contents: contents,
        blogId: id,
        blogTitle: title
    };

    // Check if the content, ID, and title are not empty
    if (contents && id && title) {
        // Send a PUT request to update the blog data on the server
        const response = await fetch('/api/blogs/update', {
            method: 'PUT',
            body: JSON.stringify({ blogObject }), // Send the updated blog data in JSON format
            headers: {'Content-Type' : 'application/json'}, // Set the content type header
        });

        // Check if the response is successful
        if (response.ok) {
            // Redirect to the updated blog page after successful update
            document.location.replace(`/blog/${id}`);
        } else {
            // Display an alert if the update fails
            alert('Unable to update post');
        }
    }
};

// Add an event listener to the edit button for click events
document
    .querySelector('.editButt')
    .addEventListener('click', editButtonClick);
