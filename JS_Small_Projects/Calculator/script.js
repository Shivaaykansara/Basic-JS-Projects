let btn = document.querySelectorAll(".btn");
let dis = document.querySelector("#display");
let clr = document.querySelector(".clear");
let result = document.querySelector(".equal");
let history = document.querySelector("#history");
let list = document.querySelector(".list");
let hisBtn= document.querySelector('.hisBtn');
let status = 0;
let values = [];

hisBtn.addEventListener('click',()=>{
  if (status == 0) {
    history.classList.remove('none');
    status = 1;
  }
  else{
    history.classList.add('none');
    status=0;
  }
  
})


let remove = (e) => {
  
  let liToRemove = e.target;
  let liVal = liToRemove.parentNode;
  let liContent = liToRemove.previousElementSibling.innerText;
  
  updateValue = values.filter(
    
    (currValue) =>{return currValue !== liContent}
    
  );
  localStorage.setItem('history',JSON.stringify(updateValue))
  
  liVal.remove();
  liToRemove.remove();
  console.log(liContent)
  localStorage.removeItem(`${values[1]}`)
  
};




//get Local storage

let getLocal = () => {
  let values = JSON.parse(localStorage.getItem("history")) || [];
  return values;
};

let showLocal = () => {
  values = getLocal();
  values.forEach((currElem) => {
    let ulElement =document.createElement("ul");
    let liElement = document.createElement("li");
    ulElement.classList.add("space");
    let dBtn = document.createElement("button");
    dBtn.classList.add("dBtn");
    dBtn.innerHTML = "Remove";
    liElement.innerHTML = currElem;
    ulElement.appendChild(liElement);
    ulElement.appendChild(dBtn);
    list.appendChild(ulElement);

  });
};


showLocal();

let dBtn = document.querySelectorAll('.dBtn');
dBtn.forEach((curElem) => {
  curElem.addEventListener("click", (e) => {
    remove(e);
  });
});


//Local storage set

let addLocal = (values) => {
  console.log(values);
  return localStorage.setItem("history", JSON.stringify(values));
};

//operation performed

let operations = () => {
  try{
    let rst = dis.value;
    dis.value = eval(dis.value);
    let newarr = rst + "=" + eval(dis.value);
    values.push(newarr);

    values = [...new Set(values)]
    addLocal(values);
    let ulElement =document.createElement("ul");
    let liElement = document.createElement("li");
    ulElement.classList.add("space");
    let dBtn = document.createElement("button");
    dBtn.classList.add("dBtn");
    dBtn.innerHTML = "Remove";
    liElement.innerHTML = newarr;
    ulElement.appendChild(liElement);
    ulElement.appendChild(dBtn);
    list.appendChild(ulElement);
  }
  catch(error){
    dis.value = "Error";
    setTimeout(() => {
      dis.value=""
    }, 2000);
  }
};

//Number and Operation button pressed and displayed

let append = (input) => {
  dis.value += input;
};
btn.forEach((curElem) => {
  curElem.addEventListener("click", (e) => {
    append(e.target.innerHTML);
  });
});

//Clear display

clr.addEventListener("click", () => {
  dis.value = "";
});

//operation Performed

result.addEventListener("click", () => {
  operations();
});
