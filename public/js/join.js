
function joinPageFunctionality (){
    const common = document.querySelector('.common').scrollWidth
    const userDetails = document.querySelector('.user-details')
    const menu = document.querySelector('.menu')
    const toggle = document.querySelector('.show-and-hide')

    
    if(common <= 680){
        userDetails.style.display = 'none'
        menu.style.display = 'block'
    }else{
        userDetails.style.display = 'flex'
        menu.style.display = 'none'
    }
    
    toggle.style.display = 'none'
        let clicked = true
    
        menu.addEventListener('click',() => {
            if(clicked){
                toggle.style.display = 'flex'
                clicked = false
            }else{
                toggle.style.display = 'none'
                clicked=true
            }
        })   
    
        window.addEventListener('mouseup',(e) => {
            if(e.target != menu){
                toggle.style.display = 'none'
            }
        })
}

joinPageFunctionality()

function inputValidator(){

    function ValidateName(nameInput){

        const nameError = document.querySelector('.name-error')
        let nameformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let successMessage = "Name Valid"
        let errorMessage = "Name must letters 4 - 35 character"

        if(nameInput.length <= 3 ||  nameInput.length > 50 || nameInput.match(nameformat) || nameInput.match(/[0-9]/)){
            nameError.style.display = 'block'
            nameError.style.color = 'red'
            nameError.innerText = errorMessage
            setTimeout(() => {
                nameError.style.display = 'none'
            },4000)
        }else{
            nameError.style.display = 'block'
            nameError.style.color = 'green'
            nameError.innerText = successMessage
            setTimeout(() => {
                nameError.style.display = 'none'
            },4000)
            return nameInput
        }
    }

    function ValidateEmail(emailInput){
        const emailError = document.querySelector('.email-error')
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let successMessage = "Email Valid"
        let failedMessage = "Enter Valid Email"

        if(emailInput.match(mailformat)){
            emailError.style.display = 'block'
            emailError.style.color = 'green'
            emailError.innerText = successMessage
            setTimeout(() => {
                emailError.style.display = 'none'
            },4000)  
            return emailInput;
        }
        else{
            emailError.style.display = 'block'
            emailError.style.color = 'red'
            emailError.innerText = failedMessage
            setTimeout(() => {
                emailError.style.display = 'none'
            },4000)  
        }
    }

    function ValidatePassword(passwordInput){
        const passwordError = document.querySelector('.password-error')
        let successMessage = "Password Valid"
        let failedMessage = "Include All Types of Character length 10 - 30> "

        if(passwordInput.match(/[^A-Z]/) && passwordInput.match(/[^a-z]/) && passwordInput.match(/[^0-9]/) && passwordInput.length >= 10 && passwordInput.length <= 25){
            passwordError.style.display = 'block'
            passwordError.style.color = 'green'
            passwordError.innerText = successMessage
            setTimeout(() => {
                passwordError.style.display = 'none'
            },4000)  
            return passwordInput;
        }
        else{
            passwordError.style.display = 'block'
            passwordError.style.color = 'red'
            passwordError.innerText = failedMessage
            setTimeout(() => {
                passwordError.style.display = 'none'
            },4000)  
        }
    }


    const form = document.querySelector('#join')

    form.addEventListener('submit',(e) => {

        e.preventDefault()

        const name = document.querySelector('#name').value
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value

        let verifyedName = ValidateName(name)
        let verifyedEmail = ValidateEmail(email)
        let verifyedPassword = ValidatePassword(password)

        if(verifyedName && verifyedEmail && verifyedPassword){
            fetch("http://localhost:5000/join.html", {
            
                method: "POST",
                
                body: JSON.stringify({
                    name: verifyedName,
                    email: verifyedEmail,
                    password: verifyedPassword
                }),
                
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => {
                if(json.sucess === true){
                    alert(`Hi ${json.data.name} Account created! Check your mail to Login`)
                    return
                }

                if(json.sucess === false){
                    alert('somthing went wrong')
                    return
                }

                if(json.sucess === 11000){
                    alert('Email already exist!')
                    return
                }

                if(json.status === 500){
                    alert('Internal server Error try later')
                    return
                }
            });
        }
    })
}
inputValidator()

