let Saturation = document.getElementById("Saturation");
let Contrast = document.getElementById("Contrast");
let Brightness = document.getElementById("Brightness");
let Blur = document.getElementById("Blur");
let Sepia = document.getElementById("Sepia");
let GrayScale = document.getElementById("GrayScale");
let HueRotate = document.getElementById("HueRotate");

let img = document.getElementById("img");
let imgchange = document.getElementById("imgchange");
let download = document.getElementById("download");
let reset = document.getElementById("reset");
let img_box = document.getElementById("img_box");

const canvas = document.getElementById("canvas");
// setting the canvas (دالة داخل الكانفس لرسم الصور ثنانيه)
const ctx = canvas.getContext("2d");

window.onload = function () {
    download.style.display = 'none'
    reset.style.display = 'none'
    img_box.style.display = 'none';
}
imgchange.onchange = function () {
    img_box.style.display = 'block';
    download.style.display = 'block'
    reset.style.display = 'block'
    // FileReader class to read the image
    let file = new FileReader();
    // readAsDataURL method to read the image
    file.readAsDataURL(imgchange.files[0]);
    file.onload = function () {
        img.src = file.result;
    }
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = "none"
    }
}

function removeFilter() {
    img.style.filter = "none"
}

document.querySelectorAll("ul li input").forEach((input) => {
    input.addEventListener("input", () => {
        removeFilter()
        ctx.filter = `
        saturate(${Saturation.value}%)
        contrast(${Contrast.value}%)
        brightness(${Brightness.value}%) 
        blur(${Blur.value}px) 
        sepia(${Sepia.value}%) 
        grayscale(${GrayScale.value}) 
        hue-rotate(${HueRotate.value}deg)`
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    })
})

reset.addEventListener("click", () => {
    removeFilter()
    Saturation.value = 100
    Contrast.value = 100
    Brightness.value = 100
    Blur.value = 0
    Sepia.value = 0
    GrayScale.value = 0
    HueRotate.value = 0
})

download.addEventListener("click", () => {
    download.href = canvas.toDataURL();
})