'use strict'

let search_button = document.querySelector('.search-button');

//console.log(search_button);

search_button.addEventListener('click', fetchData);

let user_id, i;



async function fetchData() {

    try {
        let search_data = document.getElementById('checkout-search').value;

        //console.log(search_data);
        let response = await fetch(" https://www.googleapis.com/books/v1/volumes?q=" + search_data);
        let res_data = await response.json();

        if (!response.ok) throw new Error(res_data.message);

        console.log(res_data);

        let book_container = document.querySelector('.book-info');
        book_container.innerHTML = "";

        console.log(book_container.innerHTML);

        for (i = 0; i < res_data.items.length; i++) {
            let titlebook = res_data.items[i].volumeInfo.title;
            let book_id = res_data.items[i].id;
            let book_image;
            try {
                book_image = res_data.items[i].volumeInfo.imageLinks.thumbnail;
            }
            catch
            {
                book_image = "../img/no_image.png";
            }

            let authors = res_data.items[i].volumeInfo.authors;
            let all_authors = "unknown";

            if (authors) {
                all_authors = "";
                for (let j = 0; j < authors.length; j++) {
                    //console.log(authors[j]);
                    all_authors += authors[j];
                    if (j != authors.length - 1) {
                        all_authors += ', ';
                    }
                }
            }

            let published_date = res_data.items[i].volumeInfo.publishedDate;
            let rating = res_data.items[i].volumeInfo.averageRating;
            let is_available;

            if (!localStorage.getItem(book_id)) {
                is_available = "Available";
            }
            else {
                is_available = "Stock Out";
            }

            let acheNaki = document.createElement('div');

            

            let book_info_html = document.createElement('div');

                        
            if(is_available==="Stock Out")
            {
                book_info_html.innerHTML = `
                <div class="row mt-3">
                <div class="col-lg-2 d-flex justify-content-center">
                    <img src="${book_image}" alt="thumbnail" height="100px" class="pict">
                </div>
                <div class="col-lg-8">
                    <h4 class="book-title" id = "${book_id}">
                       ${titlebook}
                    </h4>
                    <div class="book-description">
                        Author: ${all_authors} <br>
                        Published Date: ${published_date || 'unknown'}
                    </div>
                </div>
                <div class="col-lg-2 d-flex align-items-center">
                    <div>
                        Rating: ${rating || 'none'} 
                        <span id= "book-stock" style="display: block; color: red; font-weight: 700;">${is_available}</span>
                    </div>
                </div>
            </div>`;
            }
            else
            {
                book_info_html.innerHTML = `
                <div class="row mt-3">
                <div class="col-lg-2 d-flex justify-content-center">
                    <img src="${book_image}" alt="thumbnail" height="100px" class="pict">
                </div>
                <div class="col-lg-8">
                    <h4 class="book-title" id = "${book_id}">
                       ${titlebook}
                    </h4>
                    <div class="book-description">
                        Author: ${all_authors} <br>
                        Published Date: ${published_date || 'unknown'}
                    </div>
                </div>
                <div class="col-lg-2 d-flex align-items-center">
                    <div>
                        Rating: ${rating || 'none'} 
                        <span id= "book-stock" style="display: block; color: green; font-weight: 700;">${is_available}</span>
                    </div>
                </div>
            </div>`;
            }


            book_container.appendChild(book_info_html);
        }
        modifyURL();
    }
    catch (err) {
        console.error(err);
    }
}



function showBookSearch() {
    //let book_search = document.querySelector('.book-search');
    let book_search = document.getElementById('book-search');
    user_id = document.getElementById('user-id').value;
    if (user_id != "") {
        book_search.style.display = 'block';
        console.log(user_id);
    }
}


function modifyURL() {
    const title_clicked = document.querySelectorAll('.book-title');

    title_clicked.forEach(title => {
        title.addEventListener('click', function handleClick(event) {
            location.href = "book_details.html?#" + event.target.id + "|" + document.getElementById('user-id').value;;
        });
    });
}

