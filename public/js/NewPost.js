
const createBtn=document.querySelector('#create-btn');


async function createNewPost(event){

    event.preventDefault();
 
    console.log("Inside create new post");
    const title=document.querySelector('#title').value.trim();
    const content=document.querySelector('#content').value.trim();
 
    const response=await fetch('/api/post/newpost',{
     
       method: 'POST',
       body: JSON.stringify({ title,content}),
       headers: { 'Content-Type': 'application/json' },
   });
 
   console.log(response);
 
   if(response.ok){
 
    document.location.replace('/dashboard');
 
   }
 }



createBtn.addEventListener('click',createNewPost);