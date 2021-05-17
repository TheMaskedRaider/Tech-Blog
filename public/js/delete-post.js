const deletePostFormHandle = async (event) => {
    event.preventDefault();
    
    const postId = document.querySelector('#custId').value.trim();
    console.log(postId)

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({
          post_id: postId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log("I've been clicked!")
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete.');
      }
    };
  

  
  document
  .querySelector('.delete-test')
  .addEventListener('submit', deletePostFormHandle);