import axios_service from './axios_services';
import {baseURL} from './environment'

class UserService{

    constructor(){
        this.axios_service = new axios_service();
    }

    login(data){
       let url = baseURL+'user/login';
       return this.axios_service.post(url,data);
    }

    register(data){
       let url = baseURL+'user/registration';
        return this.axios_service.post(url,data);
    }

    addToCart(id,data){
        let url = baseURL+`user/add_cart_item/${id}`;
        return this.axios_service.post(url,data);
    }

    addToWishList(id,data){
        let url = baseURL+`user/add_wish_list/${id}`;
        return this.axios_service.post(url,data);
    }

    OrderSucces(id,data){
        let url = baseURL+`user/add_cart_item/${id}`;
        return this.axios_service.post(url,data);
    }

    getCartItem(){
        let url = baseURL+`user/get_cart_items`;
        return this.axios_service.get(url);
    }

    getWishlist(){
        let url = baseURL+`user/get_wishlist_items`;
        return this.axios_service.get(url);
    }
    
    deleteCartItem(data){
        let url = baseURL+`user/remove_cart_item/${data}`;
        return this.axios_service.delete(url);
    }

    deleteWishlistItem(data){
        let url = baseURL+`user/remove_wishlist_item/${data}`;
        return this.axios_service.delete(url);
    }
   

    getAllBooks(){
        let url = baseURL+'user/get/book';
        return this.axios_service.get(url);
    }

    cartQuantity=(data,cartItem_id)=>{
        let url = baseURL+`user/cart_item_quantity/${cartItem_id}`;
        return this.axios_service.put(url,data); 
    }

    customerDetails=(data)=>{
        let url = baseURL+`user/edit_user`;
        return this.axios_service.put(url,data); 
    }
   

    orderItem=(data)=>{
        console.log(localStorage.getItem('usertoken'));
        let url = baseURL+`user/add/order`;
        return this.axios_service.post(url,data); 
    }
}
export default new UserService();