
/* login functionality */

const signupLink=document.querySelector('#signup-link');
const loginForm=document.querySelector('#login-form');

function redirectHandler(event){

    document.location.redirect('/signup');
}

signupLink.addEventListener('click',redirectHandler);


const validateUsername=(username)=>{
    return username.match(/^[a-zA-Z0-9]$/);
}


async function loginHandler(event){

    event.preventDefault();

    const username=document.querySelector('#username').value.trim();
    const password=document.querySelector('#password').value.trim();
    const error_message=document.querySelector('.error-message');

    let validInput=true;
    error_message.innerHTML=``;


    if(username.length<=0 || validateUsername(username)){
      
        error_message.innerHTML+="Username is not valid.Please try again."+"\n";
        validInput=false;
    }

    if(password.length<8){
      
        error_message.innerHTML+=`Password is not valid(min length:8).Please try again.`;
        validInput=false;
    }
   
    if(validInput){
        try{
        const response=await fetch('/api/user/login',{
    
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        console.log(response);

        if(response.ok){
            document.location.replace('/home');
        }
        else {
            alert(response.statusText);
          }

         }
        catch(e){
            console.log(e);
        } 

      }
}


loginForm.addEventListener('submit',loginHandler);