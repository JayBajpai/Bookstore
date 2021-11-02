import React from 'react';
import user_services from "../../Services/user_services";
import Image from '../../Assets/Image.png';

const CartDetails = (props) => {

    const [count, setCount] = React.useState([props.val.length]);

    const removeItem = (e) => {

        console.log("id ", e);
        user_services.deleteCartItem(e).then((data) => {
            console.log(data);
            props.get();
        }).catch(error => {
            console.log("error", error);
        })
    }



    const increase = (productid, quantity) => {
        let data = {
            "quantityToBuy": quantity + 1
        }
        if (data.quantityToBuy > 10) {
            console.log("quantity is full");
        }
        else {
            // console.log(data, productid);
            user_services.cartQuantity(data, productid).then((res) => {
                console.log(res);
                props.get();
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const decrease = (productid, quantity) => {
        let data = {
            "quantityToBuy": quantity - 1
        }
        if (data.quantityToBuy < 1) {
            console.log("quantity is very less");
        }
        else {
            user_services.cartQuantity(data, productid).then((res) => {
                console.log(res);
                props.get();
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <>
            {props.val.map((value, index) =>
                <div className="main-cart">
                    <div>
                        <img className="img-book" src={Image} alt="lll" />
                    </div>
                    <div className="text-content">
                        <div className="bag-text">
                            <div className="cart-title">{value.product_id.bookName}</div>
                            <div className="cart-bookAuthor">by {value.product_id.author}</div>
                            <div className="price">Rs.{value.product_id.price}</div>
                        </div>
                        <div className="count-content">
                            <div className="minus" style={{ cursor: 'pointer' }} onClick={() => decrease(value._id, value.quantityToBuy)} >-</div>
                            <div className="count">{value.quantityToBuy}</div>
                            <div className="plus" style={{ cursor: 'pointer' }} onClick={() => increase(value._id, value.quantityToBuy)}>+</div>
                            <div className="remove" onClick={() => removeItem(value._id)}>Remove</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CartDetails;
