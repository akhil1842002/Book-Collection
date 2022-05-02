function loginPageFunctionality() {

    const common = document.querySelector('.common').scrollWidth
    const userDetails = document.querySelector('.user-details')
    const menu = document.querySelector('.menu')
    const toggle = document.querySelector('.show-and-hide')
    
    if (common <= 680) {
        userDetails.style.display = 'none'
        menu.style.display = 'block'
    } else {
        userDetails.style.display = 'flex'
        menu.style.display = 'none'
    }

    toggle.style.display = 'none'
    let clicked = true

    menu.addEventListener('click', () => {
        if (clicked) {
            toggle.style.display = 'flex'
            clicked = false
        } else {
            toggle.style.display = 'none'
            clicked = true
        }
    })

    window.addEventListener('mouseup', (e) => {
        if (e.target != menu) {
            toggle.style.display = 'none'
        }
    })
}

loginPageFunctionality()

function ValidateEmail(emailInput) {

    const emailError = document.querySelector('.email-error')
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let successMessage = "Email Valid"
    let failedMessage = "Enter Valid Email"

    if (emailInput.match(mailformat)) {
        emailError.style.display = 'block'
        emailError.style.color = 'green'
        emailError.innerText = successMessage
        setTimeout(() => {
            emailError.style.display = 'none'
        }, 4000)
        return emailInput;
    }
    else {
        emailError.style.display = 'block'
        emailError.style.color = 'red'
        emailError.innerText = failedMessage
        setTimeout(() => {
            emailError.style.display = 'none'
        }, 4000)
    }
}

function ValidatePassword(passwordInput) {
    const passwordError = document.querySelector('.password-error')
    let successMessage = "Password Valid"
    let failedMessage = "Include All Types of Character length 10 - 30> "

    if (passwordInput.match(/[^A-Z]/) && passwordInput.match(/[^a-z]/) && passwordInput.match(/[^0-9]/) && passwordInput.length >= 10 && passwordInput.length <= 25) {
        passwordError.style.display = 'block'
        passwordError.style.color = 'green'
        passwordError.innerText = successMessage
        setTimeout(() => {
            passwordError.style.display = 'none'
        }, 4000)
        return passwordInput;
    }
    else {
        passwordError.style.display = 'block'
        passwordError.style.color = 'red'
        passwordError.innerText = failedMessage
        setTimeout(() => {
            passwordError.style.display = 'none'
        }, 4000)
    }
}

function inputValidator() {

    const form = document.querySelector('#login')

    form.addEventListener('submit', (e) => {

        e.preventDefault()

        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value

        let verifyedEmail = ValidateEmail(email)
        let verifyedPassword = ValidatePassword(password)

        if (verifyedEmail && verifyedPassword) {
            fetch("http://localhost:5000/login.html", {

                method: "POST",
                body: JSON.stringify({
                    email: verifyedEmail,
                    password: verifyedPassword
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if(data.success === true){
                        alert(`Welcome ${data.data.name}`)
                        window.location.href = '/allbook.html'
                    }
                    if (data.status === 401) {
                        alert('Click verifiacation Link From mail')
                    }

                    if (data.success === 'error') {
                        alert('Internal server error')
                    }
                    if(data.status === 400){
                        alert('User Not Exist')
                    }
                    if(data.status === 'new'){
                        alert('New User! Sign Up first')
                    }
                })
        }
    })
}

inputValidator()




