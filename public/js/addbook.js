function addbookPageFunctionality (){
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
addbookPageFunctionality()


function titleCheck(titleInput){
    const titleError = document.querySelector('.title-error')

    if(titleInput.length > 200 || titleInput == ""){
        titleError.style.display = 'block'
        titleError.style.color = 'red'
        titleError.innerText = " max 200 character"
        setTimeout(() => {
            titleError.style.display = 'none'
        },4000)
    }else{
        titleError.style.display = 'block'
        titleError.style.color = 'green'
        titleError.innerText = "Input Verified"
        setTimeout(() => {
            titleError.style.display = 'none'
        },4000)
        return titleInput
    }
}

function authorCheck(authorInput){
    const authorError = document.querySelector('.author-error')

    if(authorInput.length > 50 || authorInput == ""){
        authorError.style.display = 'block'
        authorError.style.color = 'red'
        authorError.innerText = "max 50 characters"
        setTimeout(() => {
            authorError.style.display = 'none'
        },4000)
    }else{
        authorError.style.display = 'block'
        authorError.style.color = 'green'
        authorError.innerText = "Input Verified"
        setTimeout(() => {
            authorError.style.display = 'none'
        },4000)
        return authorInput
    }
}

function descriptionCheck(descriptionInput){
    const descripitionError = document.querySelector('.description-error')

    if(descriptionInput.length > 300 || descriptionInput == ""){
        descripitionError.style.display = 'block'
        descripitionError.style.color = 'red'
        descripitionError.innerText = "max 300 characters"
        setTimeout(() => {
            descripitionError.style.display = 'none'
        },4000)
    }else{
        descripitionError.style.display = 'block'
        descripitionError.style.color = 'green'
        descripitionError.innerText = "Input Verified"
        setTimeout(() => {
            descripitionError.style.display = 'none'
        },4000)
        return descriptionInput
    }
}

function yearCheck(yearInput){
    const yearError = document.querySelector('.year-error')
    const conIntiString = yearInput.toString()

    if(yearInput.match(/[a-zA-Z\t\n ./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]/) || conIntiString.length != 4 || yearInput == ""){
        yearError.style.display = 'block'
        yearError.style.color = 'red'
        yearError.innerText = " 4 digits"
        setTimeout(() => {
            yearError.style.display = 'none'
        },4000)
    }else{
        yearError.style.display = 'block'
        yearError.style.color = 'green'
        yearError.innerText = "Input Verified"
        setTimeout(() => {
            yearError.style.display = 'none'
        },4000)
        return yearInput
    }
}

function pageCheck(pageInput){
    const pageError = document.querySelector('.page-error')
    const conIntiString = pageInput.toString()

    if(pageInput.match(/[a-zA-Z\t\n ./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]/) || pageInput == ''){
        pageError.style.display = 'block'
        pageError.style.color = 'red'
        pageError.innerText = "digits"
        setTimeout(() => {
            pageError.style.display = 'none'
        },4000)
    }else{
        pageError.style.display = 'block'
        pageError.style.color = 'green'
        pageError.innerText = "Input Verified"
        setTimeout(() => {
            pageError.style.display = 'none'
        },4000)
        return pageInput
    }
}

function reviewCheck(reviewInput){
    const reviewError = document.querySelector('.review-error')

    if(reviewInput.match(/\\t\n .\/<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]/) || reviewInput == '' || reviewInput == 300){
        reviewError.style.display = 'block'
        reviewError.style.color = 'red'
        reviewError.innerText = "max 300 characters"
        setTimeout(() => {
            reviewError.style.display = 'none'
        },4000)
    }else{
        reviewError.style.display = 'block'
        reviewError.style.color = 'green'
        reviewError.innerText = "Input Verified"
        setTimeout(() => {
            reviewError.style.display = 'none'
        },4000)
        return reviewInput
    }
}

function imageCheck(imageInput){
    const encode = btoa(imageInput)
    return encode
}
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function checkUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i'); 
    if(str.match(pattern)){
        return str
    }else{
        return '#'
    }
  }

function validateFormData(){

    const form = document.querySelector('#form')
    var imageConversion

    function changeEventHandler() {

        const imageFile = document.querySelector('#file')
        const detleteBtn = document.querySelector('#delete')
        detleteBtn.style.display = 'none'

        imageFile.addEventListener('change',async (event) => {
            const photoDisplay = document.querySelector('.photo-display')
            const selectImageTag = photoDisplay.querySelector('img')
            let imageUploaded = selectImageTag.src =  URL.createObjectURL(event.target.files[0])
            imageConversion = await toBase64(event.target.files[0])
            if(imageConversion){
                imageFile.setAttribute("disabled",'true')
                detleteBtn.style.display = 'block'
            }

            detleteBtn.addEventListener('click',() => {
                selectImageTag.src = ''
                imageFile.removeAttribute('disabled');
                detleteBtn.style.display = 'none'
                imageFile.value = ''
            })
        })
    }  
    changeEventHandler()  
    
    form.addEventListener('submit', e => {
        e.preventDefault()

        const image = document.querySelector('#file')
        const title = document.querySelector('#title').value
        const author = document.querySelector('#author').value
        const descripition = document.querySelector('#des').value
        const year = document.querySelector('#year').value
        const page = document.querySelector('#page').value
        const review = document.querySelector('#review').value
        const link = document.querySelector('#link').value

        // const checkedFile = 
        const checkedImage = imageConversion
        const checkedTitle = titleCheck(title)
        const checkedAuthor = authorCheck(author)
        const checkedDescription = descriptionCheck(descripition)
        const checkedYear = yearCheck(year)
        const checkedPage = pageCheck(page)
        const checkedReview = reviewCheck(review)
        let checkedLink = checkUrl(link)
        if(checkedLink){
            checkedLink = checkedLink
        }else{
            checkedLink = '#'
        }

        if (checkedImage && checkedTitle && checkedAuthor && checkedDescription && checkedYear && checkedPage && checkedReview && checkedLink) {
            fetch("http://localhost:5000/addbook.html", {
            
                method: "POST",
                
                body: JSON.stringify({
                    image:checkedImage,
                    title:checkedTitle,
                    author:checkedAuthor,
                    description:checkedDescription,
                    year:checkedYear,
                    page:checkedPage,
                    review:checkedReview,
                    link:checkedLink
                }),
                
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => 
                response.json()
            ).then(data => {

                if(data.success == true){
                   window.location.href = '/dashboard.html'
                }

                if(data.success == false){
                    alert('Internal server Error')
                }
            })
        }
    })

}
validateFormData()

const fullUrl =  window.location.href
const Id = fullUrl.split('=')[1]

const request = () => {
    fetch(`http://localhost:5000/edit/addbook/:${Id}`)
    .then(response => 
        response.json()
    .then(data => {
        let {image,author,description,title,year,page,review,link} = data.data
        if(title){
            title = `"${title}"`
        }
        if(author){
            author = `"${author}"`
        }
        if(review){
            review = `"${review}"`
        }
        const edit = document.querySelector('.edit')

        edit.innerHTML = `
        <div class="photo-display">
                <div>
                    <img id="image" src="${image}" alt="">
                </div>
                <div class="delete-btn">
                    <button id="delete" type="button">Delete Image</button>
                </div>
            </div>
            <form action="" method="" id="form">
                <div class="form-items">
                    <div class="left">
                        <div>
                            <label for="upload-file">Book Image:</label>
                            <input type="file" accept="image/*"  name="" id="file">
                            <div class="show-error-container">
                                <p class="file-error"></p>
                            </div>
                        </div>
        
                        <div>
                            <label for="book-title">Book Title:</label>
                            <input class="common-input" type="text" value=${title} id="title">
                            <div class="show-error-container">
                                <p class="title-error"></p>
                            </div>
                        </div>
        
                        <div>
                            <label for="author">Author:</label>
                            <input class="common-input" type="text" value=${author} id="author">
                            <div class="show-error-container">
                                <p class="author-error"></p>
                            </div>
                        </div>
        
                        <div>
                            <label for="description">Description:</label>
                            <textarea name="" id="des" cols="30" rows="10">${description}</textarea>
                            <div class="show-error-container">
                                <p class="description-error"></p>
                            </div>
                        </div>
                    </div>
                  
                    <div class="right">
                        <div>
                            <label for="publication">Publication Year:</label>
                            <input class="common-input" type="text" value=${year} id="year">
                            <div class="show-error-container">
                                <p class="year-error"></p>
                            </div>
                        </div>
        
                        <div>
                            <label for="pages">Number of Pages:</label>
                            <input class="common-input" value=${page} type="text" id="page">
                            <div class="show-error-container">
                                <p class="page-error"></p>
                            </div>
                        </div>
        
                        <div>
                            <label for="review">Your Review:</label>
                            <input class="common-input"  type="text" value=${review} id="review">
                            <div class="show-error-container">
                                <p class="review-error"></p>
                            </div>
                        </div>
                        
        
                        <div>
                            <label for="link">Book Download Link:</label>
                            <input class="common-input" placeholder="optional" type="text" value=${link} id="link">
                            <div class="show-error-container">
                                <p class="link-error"></p>
                            </div>
                        </div>
                       
                    </div>
                </div>
                
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        `  

        const form = document.querySelector('#form')
        const fileUpload = document.querySelector('#file')
        fileUpload.setAttribute('disabled','true')
        const deletebtn = document.querySelector('#delete')
        deletebtn.setAttribute('disabled','true')

        form.addEventListener('submit',(e) => {
            e.preventDefault()
            
            const title = document.querySelector('#title').value
            const author = document.querySelector('#author').value
            const descripition = document.querySelector('#des').value
            const year = document.querySelector('#year').value
            const page = document.querySelector('#page').value
            const review = document.querySelector('#review').value
            const link = document.querySelector('#link').value
    
            const checkedTitle = titleCheck(title)
            const checkedAuthor = authorCheck(author)
            const checkedDescription = descriptionCheck(descripition)
            const checkedYear = yearCheck(year)
            const checkedPage = pageCheck(page)
            const checkedReview = reviewCheck(review)
            let checkedLink = checkUrl(link)

            if(checkedLink){
                checkedLink = checkedLink
            }else{
                checkedLink = '#'
            }
            
            if(checkedTitle && checkedAuthor && checkedDescription && checkedYear && checkedPage && checkedReview && checkedLink){
                fetch(`http://localhost:5000/edit/data/addbook/:${Id}`,{
                method: "POST",
                    
                body: JSON.stringify({
                    title:checkedTitle,
                    author:checkedAuthor,
                    description:checkedDescription,
                    year:checkedYear,
                    page:checkedPage,
                    review:checkedReview,
                    link:checkedLink
                }),
                
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
                }).then(response => {
                    response.json()
                .then(data => {
                    if(data.success == true){
                        window.location.href = "/dashboard.html"
                        return
                    }
                    if(data.success == false){
                        alert('Data not updated try again later')
                        return
                    }
                })
            }
        )}
                  
        })
    })
)}
request()


 
