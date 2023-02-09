'use strict'

let user_id;
let i;
let book_container = document.querySelector('.book-info');

function showTakenBooks() {
    user_id = document.getElementById('user-id').value;
    let all_books = localStorage.getItem(user_id);
    book_container.innerHTML = "";

    if (all_books) {
        console.log(all_books);
        let book_arr = all_books.split('|');
        console.log(book_arr);
        loadData(book_arr);
    }
    else {
        let no_checkin = document.createElement('div');
        no_checkin.innerHTML = `
            <div class="d-flex justify-content-center" style="color: green; font-weight: 700; font-size: 25px;">
                No Books To Check In !!!
            </div>`;

        book_container.appendChild(no_checkin);
    }
}


// load data from api
async function loadData(book_arr) {
    try {
        for (i = 0; i < book_arr.length; i++) {

            let book_id = book_arr[i];
            let response = await fetch(" https://www.googleapis.com/books/v1/volumes/" + book_id);
            let res_data = await response.json();

            if (!response.ok) throw new Error(res_data.message);

            let book_title = res_data.volumeInfo.title;
            let published_date = res_data.volumeInfo.publishedDate;
            let authors = res_data.volumeInfo.authors;
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
            let book_image;
            try {
                book_image = res_data.volumeInfo.imageLinks.thumbnail;
            }
            catch
            {
                book_image = "../img/no_image.png";
            }

            let book_info_html = document.createElement('div');
            book_info_html.innerHTML = `
                <div class="row mt-3">
                <div class="col-lg-2 d-flex justify-content-center">
                    <img src="${book_image}" alt="thumbnail" height="100px" class="pict">
                </div>
                <div class="col-lg-8">
                    <h4 class="book-title" id = "${book_id}">
                       ${book_title}
                    </h4>
                    <div class="book-description">
                        Author: ${all_authors} <br>
                        Published Date: ${published_date || 'unknown'}
                    </div>
                </div>
                <div class="col-lg-2 d-flex align-items-center justify-content-center">
                    <button type="button" class="btn btn-primary checkin-btn" id = "${book_id}">Check In</button>
                </div>
            </div>`;

            book_container.appendChild(book_info_html);

        }
        buttonEventHandle(book_arr);
    }
    catch (err) {
        console.error(err);
    }
}


function buttonEventHandle(book_arr)
{
    let checkinbtn = document.querySelectorAll('.checkin-btn');
    checkinbtn.forEach(btn => {
        btn.addEventListener('click', function handleClick(event) {
            console.log(book_arr.indexOf(event.target.id));
            let ind = book_arr.indexOf(event.target.id);
            book_arr.splice(ind,1);
            console.log(book_arr);

            let new_books = book_arr.join("|");
            console.log(new_books);
            localStorage.setItem(user_id,new_books);
            showTakenBooks();
        });
    });
}