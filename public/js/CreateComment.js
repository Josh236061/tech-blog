

const createCommentBtn=document.querySelector('.btn');

async function createComment(event){
    event.preventDefault();
    const comment=this.previousElementSibling.value;
    const post_id=this.parentElement.getAttribute('data-post');

    /* To log/test post id's and comments code via api
    
    console.log(post_id, comment); COMMENTED OUT */

    const response=await fetch('/api/post/addComment',{
    
        method: 'POST',
        body: JSON.stringify({comment,post_id}),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok){

        document.location.replace(`/post/${post_id}`);
    }

}

createCommentBtn.addEventListener('click',createComment);