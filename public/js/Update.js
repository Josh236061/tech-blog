/* button for 'Update Post' */

const updateBtn=document.querySelector('#update-btn');

updateBtn.addEventListener('click',updatePost);

async function updatePost(event){

    event.preventDefault();

    const title=document.querySelector('#post-title').value;
    const content=document.querySelector('#post-content').value;
    const postId=document.querySelector('.container').dataset.postid;


   const response= await fetch(`/api/post/edit`,{
     
        method: 'POST',
        body: JSON.stringify({ postId,title,content}),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok){

        document.location.replace('/dashboard');
    }
    

}