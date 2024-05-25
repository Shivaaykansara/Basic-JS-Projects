import { getCartProductFromLS } from "./getProduct";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";


getCartProductFromLS()

export const addToCart = (event,id,stock)=>{

    let arrLocalStorageProduct = getCartProductFromLS();

    const cartElement = document.querySelector(`#card${id}`);
    let quantity = cartElement.querySelector('.productQuantity').innerText;
    let price = cartElement.querySelector('.productPrice').innerText;

    price = price.replace('₹','');

    let existingProd = arrLocalStorageProduct.find(
        (currProd)=> currProd.id === id
    );

    if(existingProd && quantity >1){
        quantity = Number(existingProd.quantity) +Number(quantity);
        price = Number(price*quantity);
        let updatedCart = {id, price, quantity};

        updatedCart = arrLocalStorageProduct.map((currProd)=>{
            return currProd.id === id?updatedCart:currProd;
        });

        localStorage.setItem('cartProductLS',JSON.stringify(updatedCart));

        showToast("add", id);

    }

    if(existingProd){
        return false;
    }


    price = Number(price*quantity);
    quantity = Number(quantity);
    
    arrLocalStorageProduct.push({id,price,quantity})
    localStorage.setItem('cartProductLS',JSON.stringify(arrLocalStorageProduct));

    updateCartValue(arrLocalStorageProduct)

    showToast("add", id);
}