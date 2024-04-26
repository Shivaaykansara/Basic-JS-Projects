setInterval(()=>{
    let he = document.querySelector(".hr");
let me = document.querySelector(".min");
let se = document.querySelector(".sec");
let ap = document.querySelector(".ampm");

let hr = new Date().getHours();
let min = new Date().getMinutes();
let sec = new Date().getSeconds();
let ampm = hr >=12 ?"PM":"AM";

if(hr>12){
    hr = hr-12;
}

hr = (hr<10)?"0" + hr :hr;
min = (min<10)?"0" + min :min;
sec = (sec<10)?"0" + sec :sec;

he.innerHTML = hr;
me.innerHTML = min;
se.innerHTML = sec;
ap.innerHTML = ampm;

})

let mins = 0o0;
let secs = 0o0;
let milsecs = 0o0;

let m = document.querySelector('.minutes');
let s = document.querySelector('.seconds');
let ms = document.querySelector('.milliseconds');

let btnStart = document.querySelector('.start')
let btnStop = document.querySelector('.stop');
let btnReset = document.querySelector('.reset');

let interval;
btnStop.addEventListener('click',()=>{
    clearInterval(interval);
})

btnStart.addEventListener('click',()=>{
    interval = setInterval(startWatch,10);
});



btnReset.addEventListener('click',()=>{
    mins = 0o0;
    secs= 0o0;
    milsecs=0o0;
    clearInterval(interval)
    m.innerHTML='0'+mins;
    s.innerHTML='0'+secs;
    ms.innerHTML='0'+milsecs;
})

startWatch=()=>{
    milsecs++;
    if(milsecs<=9){
        ms.innerHTML='0'+milsecs;
    }
    if(milsecs>9){
        ms.innerHTML=milsecs;
    }
    if(milsecs>99){
        secs++;
        s.innerHTML='0'+secs;
        milsecs = 0;
        ms.innerHTML = '0'+0;
    }
    if (secs >9) {
        s.innerHTML = secs;
    }
    if(secs>59){
        mins++;
        m.innerHTML='0'+mins;
        secs=0;
        s.innerHTML='0'+0;
    }
    if(mins>9){
        m.innerHTML=mins;
    }
}

