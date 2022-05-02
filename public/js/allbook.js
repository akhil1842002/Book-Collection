function allbookPageFunctionality(){
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

allbookPageFunctionality()

const request = () => {
    fetch('http://localhost:5000/books/allbook.html',{
        // method: "get",
        // headers: {
        //     "Content-type": "application/json; charset=UTF-8"
        // }
    })
    .then(response => response.json())
    .then(data => {
        const booksLength = data.data.length
        const bookUploadedStatus = document.querySelector('.book-uploaded-status')
        // if (booksLength == 0){
        //     bookUploadedStatus.style.display = 'flex'
        // }else{
        //     bookUploadedStatus.style.display = 'none'
        // }

        for(i=0;i<booksLength;i++){
            let {post_id,image,title,author} = data.data[i]
            const booksContainer = document.querySelector('.book-collections')
        
            if(title.length > 50){
                let subStrTitle = title.substring(0,50)
                title = subStrTitle + '...'
            }

            booksContainer.innerHTML += `
            <a class="book" href="/singlebook.html?id=${post_id}">
                <section>
                    <div class="img">
                        <img src="${image}" alt="">
                    </div>
                    <div class="book-detail">
                        <div>
                            <p class="book-title">${title}</p>
                        </div>
                        <div>
                            <p class="author-name">${author}</p>
                        </div>
                    </div>
                </section>
            </a>
            `
        //    if(!booksContainer.innerHTML){
        //        console.log('s');
        //    }
        }

        // if(data.data == false){
        //     alert('internal server Error')
        // }
    })
}

request()



