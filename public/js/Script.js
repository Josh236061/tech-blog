
const createPostBtn=document.querySelector('#create-post-btn');

function redirectToPostHandler(){

   document.location.replace('/newpost');

}

createPostBtn.addEventListener('click',redirectToPostHandler);

