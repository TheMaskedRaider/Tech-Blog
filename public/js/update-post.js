const postUpdateFormHandle = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const post_body = document.querySelector('#post-body').value.trim();
    const post_id = document.querySelector('#custId').value.trim();
  
    if (title && post_body) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, post_body, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log("I've been clicked!")
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
        console.log(title);
        console.log(post_body);
      }
    }
  };

  
  document
  .querySelector('.new-post-form')
  .addEventListener('submit', postUpdateFormHandle);