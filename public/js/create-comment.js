const commentFormHandle = async (event) => {
    event.preventDefault();
    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#custId').value.trim();
    console.log(post_id)
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log("I've been clicked!")
        document.location.replace('/');
      } else {
        alert('Failed to post comment.');
        console.log(comment_text);
      }
    }
  };

  
  document
  .querySelector('.new-comment-form')
  .addEventListener('submit', commentFormHandle);