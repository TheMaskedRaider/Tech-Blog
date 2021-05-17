const postUpdateFormHandle = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const post_body = document.querySelector('#post-body').value.trim();
    const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
  
    if (title && post_body) {
      const response = await fetch('/api/posts/'+ id, {
        method: 'PUT',
        body: JSON.stringify({ title, post_body }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log("I've been clicked!")
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update.');
        console.log(title);
        console.log(post_body);
      }
    }
  };

  
  document
  .querySelector('.update-post-form')
  .addEventListener('submit', postUpdateFormHandle);