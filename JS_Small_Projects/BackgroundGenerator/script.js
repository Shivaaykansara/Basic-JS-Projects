let btn1 = document.querySelector('.myBtn1')
let btn2 = document.querySelector('.myBtn2')
let rgb1 = '#000'
let rgb2 = '#fff'
let copyCode = document.querySelector('.copyCode');
const hexValue = ()=>{
    let myHexaValues = '0123456789abcdef'
    let color = "#"
    for (let index = 0; index < 6; index++) {
        color = color +myHexaValues[Math.floor(Math.random()*16)];
    }
    return color;
}

const handleButton1 = () =>{
    rgb1 = hexValue();
    btn1.innerText = rgb1;
    document.body.style.backgroundImage=`linear-gradient(to right, ${rgb1},${rgb2})`;
    copyCode.innerHTML = `background-image: linear-gradient(to right,${rgb1}, ${rgb2})`
}
const handleButton2 = () =>{
    rgb2 = hexValue();
    btn2.innerText = rgb2;
    document.body.style.backgroundImage=`linear-gradient(to right, ${rgb1},${rgb2})`;
    copyCode.innerHTML = `background-image: linear-gradient(to right,${rgb1}, ${rgb2})`
}


copyCode.addEventListener('click',()=>{
    navigator.clipboard.writeText(copyCode.innerText);
})

btn1.addEventListener('click',handleButton1)
btn2.addEventListener('click',handleButton2)