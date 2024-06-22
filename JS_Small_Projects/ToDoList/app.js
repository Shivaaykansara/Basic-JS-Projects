const form = document.querySelector(".Todo-form");
const alert = document.querySelector(".alert");
const todo = document.getElementById("Todo");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".Todo-container");
const list = document.querySelector(".Todo-list");
const clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editId = "";

form.addEventListener("submit", addItem);
window.addEventListener("DOMContentLoaded", setup);
clearBtn.addEventListener('click',clearItem)



function addItem(e) {
  e.preventDefault();
  const value = todo.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("Todo-item");
    element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener('click',editItem);

    displayAlert("Task added in Todo list", "success")
    list.appendChild(element);
    container.classList.add("show-container");
    addToLocalStorage(id, value);

    setBackToDefault();
  }else if(value !== "" && editFlag){
    editElement.innerHTML = value;
    displayAlert("edit changed","success")

    editLocalStorage(editId,value)
    setBackToDefault()
  }
  else{
    displayAlert("Please enter value ","danger")
  }
}

function setBackToDefault() {
  todo.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent="submit"
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  console.log(list.children.length);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  setBackToDefault();
  removeLocalStorage(id);
  displayAlert("Task removed from Todo list", "danger")
  console.log(element, id);
}

function editItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;

  todo.value = editElement.innerHTML
  editFlag = true;
  editId = element.dataset.id
  submitBtn.textContent="edit"
}

function displayAlert(msg,action){
  alert.textContent = msg;
  alert.classList.add(`alert-${action}`)
  setTimeout(function () {
    alert.textContent="";
    alert.classList.remove(`alert-${action}`)
  },1000)
}

function clearItem(){
  const todos = document.querySelectorAll('Todo-items')

  if(todos.length>0){
    todos.forEach((item)=>{
      list.removeChild(item)
    })
  }
  container.classList.remove('show-container')
  setBackToDefault()
  displayAlert("Complete list is cleared","danger")
  localStorage.removeItem("list")
}

// SETUP ON WINDOWS LOAD

function setup() {
  const item = getLocalStorage();
  if (item.length > 0) {
    item.forEach((elem) => {
      createItemList(elem.id, elem.value);
    });
    container.classList.add("show-container");
  }
}

function createItemList(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("Todo-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener('click',editItem);
  list.append(element);
}

// LOCALSTORAGE ALL FUNCTIONALITY

function addToLocalStorage(id, value) {
  const todo = { id, value };
  const item = getLocalStorage();
  item.push(todo);
  localStorage.setItem("list", JSON.stringify(item));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("list")) || [];
}

function removeLocalStorage(id) {
  let item = getLocalStorage();
  item = item.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(item));
}
function editLocalStorage(id,value){
  let item = getLocalStorage();
  item = item.map((item)=>{
    if(item.id === id){
      item.value = value;
    }
    return item;
  })

  localStorage.setItem('list',JSON.stringify(item))
}