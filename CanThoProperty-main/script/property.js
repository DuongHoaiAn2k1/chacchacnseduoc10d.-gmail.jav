
fetch('./data.json')
    .then((response) => response.json())
    .then((d) => run(d));

let run = (data) => {
    let render = (loai, hinhthuc, area, price, square) => {
        i = 0;
        data.forEach(element => {
            let gia = undefined
            if (element.price >= 1000000000) {
                gia = element.price / 1000000000 + ' tỷ'
            }
            else if (element.price >= 1000000) {
                gia = element.price / 1000000 + ' triệu'
            }
            else {
                gia = element.price
            }
            let keyWord = $('#search').val().toUpperCase();
            if ((keyWord == '' || element.name.toUpperCase().includes(keyWord)) && (loai == 'all' || loai == element.loai) && (hinhthuc == "all" || hinhthuc == element.hinhthuc) && (area == 'all' || area == element.area) && (price == 'all' || (element.price >= firstVal(price) && element.price < secondVal(price))) && (square == 'all' || (element.square >= firstVal(square) && element.square < secondVal(square)))) {
                let st = `<div class="row">
                        <div class="card mb-3 p-0 list-items" id="${element.id}">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${element.img[0]}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${element.name}</h5>
                                        <div class="card-text">
                                            <table>
                                                <tr>
                                                    <td><i class="fas fa-landmark"></i></td>
                                                    <td>Loại:  ${element.loai}</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="fas fa-money-check-alt"></i></td>
                                                    <td>Hình thức: ${element.hinhthuc}</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="fas fa-dollar-sign"></i></td>
                                                    <td>Giá: ${gia}</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="fas fa-expand-arrows-alt"></i></td>
                                                    <td>Diện tích: ${element.square} m<sup>2</sup></td>
                                                </tr>
                                                <tr>
                                                    <td><i class="fas fa-map-marker-alt"></i></td>
                                                    <td>Khu vực: ${element.area}</td>
                                                </tr>
                                            </table>
                                            <div class="d-flex justify-content-end save-item" onclick="changeState(event, ${element.id}, this)">${loadState(element.id)}</i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                $('#root-d').append(st);
                i++;
            }
        });
        if (i === 0) {
            let te = `<div>Không tìm thấy</div>`;
            $('#root-d').append(te);
        }
        else {
            let listItems = document.querySelectorAll('.list-items')
            listItems.forEach(element => {
                element.addEventListener('click', (event) => {
                    event.stopPropagation();
                    location.href = './detail.html' + '?id=' + element.id
                })
            })
        }
    }
    var url_string = location.href;
    var url = new URL(url_string);
    var loai = (url.searchParams.get("loai")) ? url.searchParams.get("loai") : 'all';
    loai = loai.replace("_", " ");
    $('#loai').val(loai);
    var hinhthuc = (url.searchParams.get("hinhthuc")) ? url.searchParams.get("hinhthuc") : 'all';
    $('#hinhthuc').val(hinhthuc);
    render(loai, hinhthuc, "all", "all", "all")

    let filter = document.querySelector('#filter');

    filter.onclick = (e) => {
        e.preventDefault();

        $('#root-d').text('');
        render($('#loai').val(), $('#hinhthuc').val(), $('#area').val(), $('#price').val(), $('#square').val());
    }

}

let firstVal = (s) => {
    return parseInt(s.split(':')[0])
}
let secondVal = (s) => {
    return (parseInt(s.split(':')[1]) != -1) ? parseInt(s.split(':')[1]) : Number.MAX_VALUE;
}

let saveItem = (event, st, ele) => {
    event.stopPropagation();
    console.log(st, ele);

}

let full_heart = `<i class="fas fa-heart red"></i>`;
let heart = `<i class="far fa-heart"></i>`;

let savedItems = localStorage.getItem('savedItems');
if (!savedItems) {
    savedItems = {};
}


let changeState = (event, st, element) => {
    event.stopPropagation();
    let savedItems = localStorage.getItem('savedItems');
    if (!savedItems) {
        savedItems = {};
    }
    else {
        savedItems = JSON.parse(savedItems);
    }
    let id = st.id;
    if (savedItems[id]) {
        delete savedItems[id];
        element.innerHTML = heart;
    }
    else {
        savedItems[id] = "true";
        element.innerHTML = full_heart;
    }
    localStorage.setItem("savedItems", JSON.stringify(savedItems))
}

let loadState = (id) => {
    let savedItems = localStorage.getItem('savedItems');
    if (!savedItems) {
        savedItems = {};
    }
    else {
        savedItems = JSON.parse(savedItems);
    }
    if (savedItems[id]) {
        return full_heart;
    }
    else {
        return heart;
    }
}

let searchBar = document.querySelector('#search');
searchBar.addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        document.querySelector('#filter').click()
    }
})

function changeAttribute () {
    window.location.href='property.html';
}
function goToUpNew() {
    window.location.href = 'dangtin.html';
}