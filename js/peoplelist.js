'use strict'

let i;

function showPeopleList() {
    let people_list = localStorage.getItem('boi_nise');
    let book_container = document.querySelector('.book-takers');

    if (!people_list) {
        let user_info = document.createElement('div');
        user_info.innerHTML =
            `<div class="d-flex justify-content-center" style="color: green; font-weight: 700; font-size: 25px;">
                No Books Cheked Out !!!
            </div>`;
        book_container.appendChild(user_info);
    }
    else {
        people_list = people_list.split('|');
        console.log(people_list);

        for (i = 0; i < people_list.length; i++) {

            let book_taken = localStorage.getItem(people_list[i]);
            book_taken = book_taken.split('|');

            book_taken = book_taken.length;
            let num_book_str = "";
            if (book_taken == 1) {
                num_book_str = book_taken + " Book";
            }
            else {
                num_book_str = book_taken + " Books";
            }

            let user_info = document.createElement('div');
            user_info.innerHTML =
            `<div class="card border-left-success shadow h-100 py-2 mb-3">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                            User ID</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">${people_list[i]}</div>
                        </div>
                        <div class="col-auto">
                            
                            <div class="d-flex justify-content-center">${num_book_str}</div>

                            <div  id="${people_list[i]}" class="font-weight-bold text-success text-uppercase mb-1 mt-1 d-flex justify-content-center people-card" style="font-size: 15px;">
                            View Details</div>
                           
                        </div>
                    </div>
                </div>
            </div>`;
            book_container.appendChild(user_info);
        }
        clickEventAdd();
    }
}


function clickEventAdd() {
    let people_divs = document.querySelectorAll('.people-card');

    people_divs.forEach(eachdiv => {
        eachdiv.addEventListener('click',function handleClick(event) {
            console.log(event.target.id);
            localStorage.setItem('from_view_details',event.target.id);
            location.href = "../checkin.html";
        });
    });
}
