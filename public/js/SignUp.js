
const signupBtn=document.querySelector('#signup-btn');

const signupForm=document.querySelector('#signup-form');
const error_message=document.querySelector('.error-message');


const validateUsername=(username)=>{
    return username.match(/^[a-zA-Z0-9]$/);
}

async function signUpHandler(event){

    const username=document.querySelector('#signup-username').value.trim();
    const password=document.querySelector('#signup-password').value.trim();

    

    event.preventDefault();


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
        const response=await fetch('/api/user/signup',{
    
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
    console.log(response,response.ok);
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



signupForm.addEventListener('submit',signUpHandler);