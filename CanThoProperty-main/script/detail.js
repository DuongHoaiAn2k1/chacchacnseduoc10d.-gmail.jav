

fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
        fetch('./content.json')
            .then((response) => response.json())
            .then((content) => render(data, content))
    });

let render = (data, content) => {
    console.log(content)
    let id = getID();
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            for (let j = 0; j < data[i].img.length; j++) {
                let stBtn = `
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${j}" ${(j == 0) ? `class="active"
                aria-current="true"`: ``} aria-label="Slide ${j}"></button>`;
                let st = `
                <div class="carousel-item ${(j == 0) ? `active` : ``}" data-bs-interval="10000">
                    <img src="${data[i].img[j]}" width="740px" class="d-block w-100 mx-auto" alt="...">
                </div>`;
                $('#btn-root').append(stBtn);
                $('#img-root').append(st);
            }
            let element = data[i];
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
            let hehe = `
                <div class="row">
                    <div class="card mb-3 p-0" id="${element.id}">
                    <div class="card-body">
                        <h5 class="card-title" style="color: #2e5fab;">${element.name}</h5>
                        <div class="card-text">
                        <table>
                            <tr class="my-2">
                            <td><i class="fas fa-landmark"></i></td>
                            <td>Loại: ${element.loai}</td>
                            </tr>
                            <tr class="my-2">
                            <td><i class="fas fa-money-check-alt"></i></td>
                            <td>Hình thức: ${element.hinhthuc}</td>
                            </tr>
                            <tr class="my-2">
                            <td><i class="fas fa-dollar-sign"></i></td>
                            <td>Giá: ${gia}</td>
                            </tr>
                            <tr class="my-2">
                            <td><i class="fas fa-expand-arrows-alt"></i></td>
                            <td>Diện tích: ${element.square} m<sup>2</sup></td>
                            </tr>
                            <tr class="my-2">
                            <td><i class="fas fa-map-marker-alt"></i></td>
                            <td>Khu vực: ${element.area}</td>
                            </tr>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>`
            $('#detail').append(hehe)
            break;
        }
    }
    for (let i = 0; i < content.length; i++) {
        if (content[i].id == id) {
            $('#content').append(content[i].content)
        }
    }
}

let getID = () => {
    var url_string = location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("id");
    return c;
}

getID()