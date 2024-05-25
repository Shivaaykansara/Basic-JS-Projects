import { updateCartValue } from "./updateCartValue";

export const getCartProductFromLS = ()=>{
    let cartProduct = localStorage.getItem('cartProductLS')

    
    if(!cartProduct){
        return [];
    }
    cartProduct = JSON.parse(cartProduct);

    updateCartValue(cartProduct)
    return cartProduct;
}