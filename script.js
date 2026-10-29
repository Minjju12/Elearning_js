function Check() {
    let ngay =Number(document.getElementById("day").value);
    let thang =Number(document.getElementById("month").value);
    let nam =Number(document.getElementById("year").value);
    let output =document.getElementById("output");
    if (!ngay || !thang || !nam || ngay < 1 || ngay > 31 || thang < 1 || thang > 12 || nam < 1) {
        alert("Ngày, tháng, năm không hợp lệ");
        return;
    }

    let can =["Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm"];
    let chi = ["Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất"];
    let thienCan =can[(nam + 7) % 10];
    let diaChi =chi[(nam + 9) % 12];
    let Can_Chi =thienCan + " " + diaChi;
    let cung ="";

    switch (thang) {
        case 1:
            cung = (ngay <= 19) ? "Ma Kết" : "Bảo Bình";
            break;
        case 2:
            cung = (ngay <= 18) ? "Bảo Bình" : "Song Ngư";
            break;
        case 3:
            cung = (ngay <= 20) ? "Song Ngư" : "Bạch Dương";
            break;
        case 4:
            cung = (ngay <= 19) ? "Bạch Dương" : "Kim Ngưu";
            break;
        case 5:
            cung = (ngay <= 20) ? "Kim Ngưu" : "Song Tử";
            break;
        case 6:
            cung = (ngay <= 20) ? "Song Tử" : "Cự Giải";
            break;
        case 7:
            cung = (ngay <= 22) ? "Cự Giải" : "Sư Tử";
            break;
        case 8:
            cung = (ngay <= 22) ? "Sư Tử" : "Xử Nữ";
            break;
        case 9:
            cung = (ngay <= 22) ? "Xử Nữ" : "Thiên Bình";
            break;
        case 10:
            cung = (ngay <= 22) ? "Thiên Bình" : "Thiên Yết";
            break;
        case 11:
            cung = (ngay <= 21) ? "Thiên Yết" : "Nhân Mã";
            break;
        case 12:
            cung = (ngay <= 21) ? "Nhân Mã" : "Ma Kết";
            break;
    }
    let ConGiap = {
        "Tý": "image/ty.png", "Sửu": "image/suu.png", "Dần": "image/dan.png", "Mão": "image/mao.png",
        "Thìn": "image/thin.png", "Tỵ": "image/ran.png", "Ngọ": "image/ngo.png", "Mùi": "image/mui.png",
        "Thân": "image/than.png", "Dậu": "image/dau.png", "Tuất": "image/tuat.png", "Hợi": "image/hoi.png"
    };
    let Cung = {
        "Bạch Dương": "image/bachduong.png", "Kim Ngưu": "image/kimnguu.png", "Song Tử": "image/songtu.png",
        "Cự Giải": "image/cugiai.png", "Sư Tử": "image/sutu.png", "Xử Nữ": "image/xunu.png",
        "Thiên Bình": "image/thienbinh.png", "Thiên Yết": "image/thienyet.png", "Nhân Mã": "image/nhanma.png",
        "Ma Kết": "image/maket.png", "Bảo Bình": "image/baobinh.png", "Song Ngư": "image/songngu.png"
    };
    output.innerHTML = `
        <div class="result">
            <p>Ngày sinh: <b>${ngay}/${thang}/${nam}</b></p>
            <div class="grid">
                <div class="item">
                    <p><b>${Can_Chi}</b></p>
                    <img src="${ConGiap[diaChi]}" class="img">
                </div>
                <div class="item">
                    <p><b>${cung}</b></p>
                    <img src="${Cung[cung]}" class="img">
                </div>
            </div>
        </div>
    `;
}
function user() {
    let Grid =document.getElementById("ds");
    fetch("https://randomuser.me/api/?results=10")
        .then(res => res.json())
        .then(data => {
            let html ="";
            data.results.forEach(item => {
                let ten =item.name.first + " " + item.name.last;
                html += "<div class='ngDung'>";
                html += "<img src='" + item.picture.medium + "'>";
                html += "<h4>" + ten + "</h4>";
                html += "<p>" + item.email + "</p>";
                html += "<p><b>" + item.location.country + "</b></p>";
                html += "</div>";
            });
            Grid.innerHTML = html;
        })
        .catch(err => {
            alert("Lỗi");
        });
}

async function Tinhthanh() {
    try {
        let res =await fetch("https://provinces.open-api.vn/api/p/");
        let data =await res.json();
        let selectTinh =document.getElementById("tinh");
        data.forEach(tinh => {
            let opt = document.createElement("option");
            opt.value = tinh.code;
            opt.textContent = tinh.name;
            selectTinh.appendChild(opt);
        });
    } catch (err) {
        console.log(err);
    }
}


async function chonTinh() {
    let code =document.getElementById("tinh").value;
    let selectXa =document.getElementById("xa");
    selectXa.innerHTML = "<option value=''>Chọn Xã/Phường</option>";
    if (!code) return;
    try {
        let res =await fetch("https://provinces.open-api.vn/api/p/" + code + "?depth=2");
        let data =await res.json();
        if (data.districts) {
            data.districts.forEach(d => {
                let opt = document.createElement("option");
                opt.value = d.code;
                opt.textContent = d.name;
                selectXa.appendChild(opt);
            });
        }
    } catch (err) {
        console.log(err);
    }
}


function dangKy() {
    let ten =document.getElementById("hoTen").value;
    let cccd =document.getElementById("cccd").value;
    let sdt =document.getElementById("sdt").value;
    let sTinh =document.getElementById("tinh");
    let sXa =document.getElementById("xa");
    let tinhText = sTinh.value ? sTinh.options[sTinh.selectedIndex].text : "";
    let xaText = sXa.value ? sXa.options[sXa.selectedIndex].text : "";
    let kq =document.getElementById("kqCuTru");

    if (!ten || !tinhText || !xaText) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    alert("Đăng ký thành công!");
    kq.innerText = "";
}
function timkiem(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .trim();
}


async function xemThoiTiet() {
    let tp =document.getElementById("tenTp").value.trim();
    let out =document.getElementById("weather");
    if (!tp) {
        alert("Vui lòng nhập tên thành phố!");
        return;
    }
    try {
        let apiKey ="be6f3710a31909844d952a96d29893cd";
        let search =timkiem(tp);
        if (search.toLowerCase() === "tphcm" || search.toLowerCase() === "tp hcm" || search.toLowerCase() === "sai gon") {
            search = "Ho Chi Minh";
        }
        let res =await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(search) + "&units=metric&appid=" + apiKey + "&lang=vi");
        if (!res.ok) {
            throw new Error("Không tìm thấy thông tin thành phố!");
        }
        let data =await res.json();
        out.innerHTML = `
            <div class="resultW">
                <h3>${data.name}, ${data.sys.country}</h3>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="50">
                <p>Nhiệt độ: <b>${Math.round(data.main.temp)}°C</b></p>
                <p>Độ ẩm: <b>${data.main.humidity}%</b></p>
                <p>Thời tiết: <b>${data.weather[0].description}</b></p>
            </div>
        `;
    } catch (err) {
        alert(err.message);
    }
}
window.onload = function() {
    user();
    Tinhthanh();
};
