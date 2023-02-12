'use strict'

function updateInfo()
{
    let book_taker = document.querySelector('.book-taker');

    book_taker.innerHTML = '0';

    let book_taker_arr = localStorage.getItem('boi_nise');
    if(book_taker_arr)
    {
        book_taker_arr = book_taker_arr.split('|');
        book_taker.innerHTML = book_taker_arr.length;
    }

    let total_books = localStorage.getItem('total_books');

    //console.log(total_books);
    
    if(!total_books)
    {
        total_books='0';
        localStorage.setItem('total_books','0');
    }

    document.querySelector('.total-books').innerHTML = total_books;
}


let view_details = document.querySelector('.book-holder-details');
view_details.addEventListener('click', function()
{
    location.href = "peoplelist.html";
});