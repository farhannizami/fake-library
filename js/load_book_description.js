'use strict'


let book_title;
let book_subtitle;
let book_description;
let published_date;
let publisher;
let book_image;
let search_data;
let user_id;

let authors;
let all_authors = "unknown";

function gethash() {
    let hashval = window.location.hash;
    console.log(hashval);
    let [idv, us] = hashval.split('|');
    idv = idv.slice(1);
    //console.log(idv,us);

    return [idv, us];
}

async function getAPIData() {
    try {

        [search_data, user_id] = gethash();
        //console.log(search_data);
        console.log(search_data, user_id)
        let response = await fetch(" https://www.googleapis.com/books/v1/volumes/" + search_data);
        let res_data = await response.json();

        if (!response.ok) throw new Error(res_data.message);

        console.log(res_data);

        document.getElementById('user-id').value = user_id;


        authors = res_data.volumeInfo.authors;
        all_authors = "unknown";

        if (authors) {
            all_authors = "";
            for (let j = 0; j < authors.length; j++) {
                //console.log(authors[j]);
                all_authors += authors[j];
                if (j != authors.length - 1) {
                    all_authors += ', ';
                }
            }
            console.log(all_authors);

        }

        book_title = res_data.volumeInfo.title;
        book_subtitle = res_data.volumeInfo.subtitle;
        book_description = res_data.volumeInfo.description;
        published_date = res_data.volumeInfo.publishedDate;
        publisher = res_data.volumeInfo.publisher;
        book_image;
        try {
            book_image = res_data.volumeInfo.imageLinks.thumbnail;
        }
        catch
        {
            book_image = "../img/no_image.png";
        }


        let book_container = document.querySelector('.book-info');
        let book_info_html = document.createElement('div');
        book_info_html.innerHTML = `
            <h1>${book_title}</h1>
            <h3>${book_subtitle || ""}</h3>
            <div class="book-extra-details mt-5" style="text-justify: inter-word; text-align: justify;">
                <img src="${book_image}" alt="book cover" class="float-right ml-3 mb-3 mt-3" width = 300px>

                <p>Author: ${all_authors}</p>
                <p>Publisher: ${publisher || ""}</p>
                <p class="book-description">
                    Description: ${book_description || "Not Available"}

                </p>
                <p>Published Date: ${published_date || "unknown"}</p>
            </div>`;

        if (localStorage.getItem(search_data)) {
            book_info_html.innerHTML += `
                <p style="color: red; font-size: 20px;">Stock Out</p>

                <div class="d-flex justify-content-center mt-5">
                    <button type="button" class="btn btn-primary" disabled>Check Out</button>
                </div>`;
        }
        else {
            book_info_html.innerHTML += `
                <div class="d-flex justify-content-center mt-5">
                    <button type="button" class="btn btn-primary " onclick = "checkoutBook()" data-toggle="modal"
                    data-target="#staticBackdrop">Check Out</button>
                </div>`;
        }

        console.log(book_container);
        book_container.appendChild(book_info_html);

        document.getElementById('checkout-search').value = book_title;
        document.getElementById("checkout-search").disabled = true;
        document.getElementById("book-search-button").disabled = true;

    }
    catch (err) {
        console.error(err);
    }
}



function checkoutBook() {
    localStorage.setItem(search_data,'taken');
    let prev_data = localStorage.getItem(user_id);
    if(prev_data)
    {
        prev_data += "|"+search_data;
    }
    else
    {
        prev_data=search_data;
    }
    localStorage.setItem(user_id,prev_data);

    let boinise = localStorage.getItem('boi_nise');

    console.log(boinise);
    //let boinise = "abc|rrr|oops|sdf|abc";
    if(boinise)
    {
        let boinise_list = boinise.split('|');
        boinise_list = new Set(boinise_list);
        //console.log(boinise_list);
        if(!boinise_list.has(user_id))
        {
            boinise += "|"+user_id;
        }
    }
    else
    {
        boinise = user_id;

    }
    localStorage.setItem("boi_nise",boinise);
}


function clearstock()
{
    localStorage.removeItem(search_data);
    localStorage.removeItem(user_id);
    location.reload();
}