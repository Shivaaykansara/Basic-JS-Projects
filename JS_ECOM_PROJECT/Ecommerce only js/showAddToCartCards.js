import products from './api/products.json';
import { fetchQuantityFromCartLS } from './fetchQuantityFromCartLS';
import { getCartProductFromLS } from './getProduct';
import { incrementDecrement } from './incrementDecrement';
import { removeProdFromCart } from './removeProdFromCart';
import { updateCartTotal } from './updateCartTotal';

let cartProduct = getCartProductFromLS();

let filterProducts = products.filter((curProd)=>{
    return cartProduct.some((curElem)=>curElem.id === curProd.id)
})

const cartElement = document.querySelector('#productCartContainer');
const templateContainer = document.querySelector('#productCartTemplate');


const showCartProduct = () =>{
    filterProducts.forEach((curProd)=>{
        const {category,id,image,name,stock,price} = curProd;

        let productClone = document.importNode(templateContainer.content,true);

        const lsActualData = fetchQuantityFromCartLS(id, price)

        productClone.querySelector('#cardValue').setAttribute('id',`card${id}`);
        productClone.querySelector('.category').textContent = category;
        productClone.querySelector('.productImage').src = image;
        productClone.querySelector('.productName').textContent = name;
        productClone.querySelector('.productQuantity').textContent = lsActualData.quantity;
        productClone.querySelector('.productPrice').textContent = lsActualData.price;

        productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        incrementDecrement(event, id, stock, price);
      });

        productClone.querySelector('.remove-to-cart-button').addEventListener('click',()=>
            removeProdFromCart(id)
        )


        cartElement.appendChild(productClone)
    })
}


showCartProduct();
updateCartTotal();