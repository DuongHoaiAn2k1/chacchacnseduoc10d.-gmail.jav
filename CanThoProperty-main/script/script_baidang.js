  // Dang tin
  function dangtin(){
    var tieude = document.getElementById('tieude').value;
    var diachi = document.getElementById('diachi').value;
    var nhucau = document.getElementById('loaitin').value;
    var loaibds = document.getElementById('loaibds').value;
    var quan = document.getElementById('quan').value;
    var dientich = document.getElementById('dientich').value;
    var gia = document.getElementById('gia').value;
    var anh = document.getElementById('anh').value;
    var dienta = document.getElementById('mota').value;
    var listNhadat = localStorage.getItem("list-nhadat") ? JSON.parse(localStorage.getItem("list-nhadat")) : [];
    listNhadat.push({
      id: loaibds+dientich,
      name: tieude,
      diachi: diachi,
      hinhthuc: nhucau,
      loai: loaibds,
      area: quan,
      price: gia,
      square: dientich,
      img: anh
    });
    localStorage.setItem("list-nhadat", JSON.stringify(listNhadat));
  }

  function hienthiND(){
    let listNhadat = localStorage.getItem("list-nhadat") ? JSON.parse(localStorage.getItem("list-nhadat")) : [];
    let nhadat1 = `<tr>
      <th>STT</th>
      <th>  ID   </th>
      <th>Hình ảnh</th>
      <th>Tiêu đề</th>
      <th>Địa chỉ</th>
      <th>Diện tích</th>
      <th> Giá bán </th>
      <th>Xóa</th>
    </tr>`
    listNhadat.map((value, index)=>{
      let tmp = value.price;
      tmp = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tmp);
      nhadat1 += `<tr>
        <td>${index+1}</td>
        <td>${value.id}</td>
        <td>
          <img class="bd-img" src="${value.img}" alt="">
        </td>
        <td>
          <p>${value.name}</p>
        </td>
        <td>
          <p>Q.${value.area} - TP.Cần Thơ</p>
        </td>
        <td>
          <p>${value.square}m2</p>
        </td>
        <td id="LuuXoa${index}">
          <p ondblclick="hienEdit(${index});" >${tmp}</p>
        </td>
        <td>
          <i onclick="xoaBai(${index})" class="fas fa-solid fa-trash"></i>
        </td>
      </tr>`
    })
    document.getElementById("table1").innerHTML=nhadat1 ;
  }

  function xoaBai(index){
    let listNhadat = localStorage.getItem("list-nhadat") ? JSON.parse(localStorage.getItem("list-nhadat")) : [];
    listNhadat.splice(index,1);
    localStorage.setItem("list-nhadat", JSON.stringify(listNhadat));
    hienthiND();
  }

  function hienEdit(index){
    let id="LuuXoa"+index
    let tmp=`<p>
      <input type="text" id="newprice">
    </p>`
    tmp+=`<p>
      <input id="Luu" onclick="editPrice(${index});" type="button" value="Lưu">
      <input id="Huy" onclick="huyEdit(${index});" type="button" value="Hủy">    
    </p>`
    document.getElementById(id).innerHTML=tmp;
  }

  function huyEdit(index){
    let listNhadat = localStorage.getItem("list-nhadat") ? JSON.parse(localStorage.getItem("list-nhadat")) : [];
    let giacu = listNhadat[index].price

    giacu = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(giacu);

    let id="LuuXoa"+index
    localStorage.getItem("list-nhadat")
    let tmp=`<p ondblclick="hienEdit(${index});" >${giacu}</p>`
    document.getElementById(id).innerHTML=tmp;
  }

  function editPrice(index){
    let listNhadat = localStorage.getItem("list-nhadat") ? JSON.parse(localStorage.getItem("list-nhadat")) : [];
    listNhadat[index]={
      price: document.getElementById("newprice").value,
      id:  listNhadat[index].loai+ listNhadat[index].square,
      name: listNhadat[index].name,
      diachi:  listNhadat[index].diachi,
      hinhthuc:  listNhadat[index].hinhthuc,
      loai:  listNhadat[index].loai,
      area:  listNhadat[index].area,
      square: listNhadat[index].square,
      img:  listNhadat[index].img
    }
    localStorage.setItem("list-nhadat", JSON.stringify(listNhadat));
    hienthiND();
  }

  function hienPen(){
    console.log(1);
  }