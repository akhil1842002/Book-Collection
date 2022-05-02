function singlebookFunctionality(){

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

singlebookFunctionality()

const fullUrl =  window.location.href
const Id = fullUrl.split('=')[1]

const request = () => {
    fetch(`http://localhost:5000/singlebook/:${Id}`)
    .then(response => 
        response.json()
    .then(data => {
        const user = data.user
        const bookContainer = document.querySelector('.single-book')
        let {userId,post_id,author,description,image,link,page,review,title,year} = data.data
        bookContainer.innerHTML = `
        <div class="book">
            <div class="book-image-container">
                <img src="${image}"
                    alt="">
            </div>

            <div class="book-details">
                <div>
                    <p class="title">Title: <span>${title}</span></p>
                </div>
                <div>
                    <p class="author">Author: <span>${author}</span></p>
                </div>
                <div>
                    <p class="descrip">
                        Description: <span>
                            ${description}
                        </span>
                    </p>
                </div>
                <div>
                    <p>Publication Year: <span>${year}</span></p>
                </div>
                <div>
                    <p>Number of Pages: <span>${page}</span></p>
                </div>
            </div>
        </div>

        <div class="recommendation">
            <div>
                <p>Review: <span class="review">${review}</span></p>
            </div>
            <div class="link">
                <p>Link: <a class='download-link' href="${link}">Click Me To Buy Book</a></p>
            </div>
        </div>

        <div class="btns">
            <div>
                <a class="edit btn" href="/addbook.html?id=${post_id}">Edit</a>
            </div>
            <div>
                <a class="delete btn" href="/singlebook.html?id=${post_id}">Delete</a>
            </div>
        </div>
        
    `
        
        const btns = document.querySelector('.btns')
        if(user != userId){
            btns.style.display = 'none'
        }else{
            btns.style.display = 'flex'
        }

        const deleteBtn = document.querySelector('.delete')
        deleteBtn.addEventListener('click',(e) => {
            e.preventDefault()
            if (confirm("Are You sure? Want To Delete!")) {
                fetch(`http://localhost:5000/delete/singlebook/:${post_id}`,{
                    method:"DELETE"
                }).then(response => response.json())
                .then(data => {
                    if(data.success == true){
                        bookContainer.remove()
                        window.location.href = '/dashboard.html'
                        alert('Book deleted Successfully!')
                    }
                    if(data.success == false){
                        window.location.href = '/dashboard.html'
                        alert('Book not deleted! Try Later')
                    }
                })
            }else {
                txt = "You pressed Cancel!";
            }
        })
    })
    )}


    

request()

