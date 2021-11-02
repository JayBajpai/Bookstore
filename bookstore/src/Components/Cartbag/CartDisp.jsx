import React from 'react';
import CartDetails from './CartDetails';

const CartDisp = (props) => {

    const cartBagDetails=(cart)=>{
        return(<CartDetails value={cart} />)
    }

    return (
        <div>
            {props.val.map((cartBagDetails))}
        </div>
    );
}

export default CartDisp;
