const editButton = async (event) => {
    // Get the values of the edited blog content, ID, and title from the input fields
    const content = document.querySelector('#editBlogContent').value.trim();
    const id = event.target.getAttribute('dataId');
    const title = document.querySelector('#editBlogTitle').value.trim();

    // Check if the ID exists and the content, ID, and title are not empty
    if (id && content && title) {
        // Create an object to hold the updated blog data
        const blogObject = {
            contents: content,
            blogId: id,
            blogTitle: title
        };

        try {
            // Send a PUT request to update the blog data on the server
            const response = await fetch(`/api/blogs/update`, {
                method: 'PUT',
                body: JSON.stringify(blogObject), // Send the updated blog data directly
                headers: {
                    'Content-Type': 'application/json', // Set the content type header
                },
            });

            // Check if the response is successful
            if (response.ok) {
                // Redirect to the updated blog page after successful update
                document.location.replace(`/blog/${id}`);
            } else {
                // Display an alert if the update fails
                alert('Failed to update blog');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('An error occurred while updating the blog');
        }
    } else {
        alert('Please fill in all fields');
    }
};

// Add an event listener to the edit button for click events
document.querySelector('.editButton').addEv
