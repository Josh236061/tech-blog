
/* button for 'Delete Post' */

const deleteBtn=document.querySelector('#delete-btn');

deleteBtn.addEventListener('click',deletePost);

async function deletePost(event){

    
    event.preventDefault();

    const postId=document.querySelector('.container').dataset.postid;


   const response= await fetch(`/api/post/delete/${postId}`,{
     
        method:'DELETE'
    });

    if(response.ok){

        document.location.replace('/dashboard');
    }
    

}