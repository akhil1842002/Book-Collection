// const logoutBtn = document.querySelector('#logout')

// logoutBtn.addEventListener('click',() => {
   
// })
fetch('http://localhost:5000/user/logout.html',{
    method:'GET',
})
.then(response => response.json())


