import { getCartProductFromLS } from "./getProduct";
import { updateCartValue } from "./updateCartValue";


getCartProductFromLS()

export const addToCart = (event,id,stock)=>{

    let arrLocalStorageProduct = getCartProductFromLS();

    const cartElement = document.querySelector(`#card${id}`);
    let quantity = cartElement.querySelector('.productquantity').innerText;
    let price = cartElement.querySelector('.productprice').innerText;

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

        localStorage.setItem('cartProductsLS',JSON.stringify(updatedCart));

    }

    if(existingProd){
        return false;
    }


    price = Number(price*quantity);
    quantity = Number(quantity);
    
    arrLocalStorageProduct.push({id,price,quantity})
    localStorage.setItem('cartProductsLS',JSON.stringify(arrLocalStorageProduct));

    updateCartValue(arrLocalStorageProduct)
}