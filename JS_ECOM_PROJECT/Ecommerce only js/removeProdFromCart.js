import { getCartProductFromLS } from "./getProduct"
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) =>{
    let cartProduct = getCartProductFromLS();
    cartProduct =cartProduct.filter((curProd)=>curProd.id !== id);

    localStorage.setItem('cartProductLS',JSON.stringify(cartProduct));

    let removediv = document.querySelector(`#card${id}`);

    if(removediv){
        removediv.remove();

        showToast("delete", id);
    }
    updateCartValue(cartProduct)
}
