import React, { Component } from 'react'
import './Wishlist.scss';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Redirect } from "react-router-dom";
import Header from '../../Components/Home/Header';
import Footer from '../../Pages/Footer/Footer';
import Button from '@material-ui/core/Button';
import Image from '../../Assets/Image.png';
import user_services from "../../Services/user_services";
import DeleteIcon from '@material-ui/icons/Delete';


export default class WishList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            redirect: null,
            openDropDown: false,
            openDetails: false,
            openDetailsSummary: false,
            FullName: '',
            Email: '',
            Password: '',
            Number: '',
            FullNameError: false,
            EmailError: false,
            PasswordError: false,
            NumberError: false
        }

    }

    componentDidMount() {
        this.getWishlistItem();
        this.getCartItem();
    }

    getWishlistItem = () => {
        user_services.getWishlist().then((data) => {
            console.log("whish list data -----", data.data.result);
            this.setState({ notes: data.data.result });
        }).catch(error => {
            console.log("error", error);
        })

    }

    getCartItem = () => {
        user_services.getCartItem().then((data) => {
            console.log("cart data -----", data.data.result);
            this.setState({ notes: data.data.result });
        }).catch(error => {
            console.log("error", error);
        })

    }


    moveToCart = (value) => {

        let Data = {
            isCart: true
        }
        console.log("product ID", value)
        user_services.addToCart(value, Data).then((data) => {
            console.log("add to wi", data);
            this.getCartItem();
            this.delete(value);
        }).catch(error => {
            console.log("error", error);
        })
    }

    delete(e) {

        console.log("id ", e);
        user_services.deleteWishlistItem(e).then((data) => {
            console.log(data);
            this.getWishlistItem();
        }).catch(error => {
            console.log("error", error);
        })
    }


    render() {


        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }
        console.log("bbbbbbbbbbbbbbbbbbb", this.state.notes.length)
        return (
            <div>
                <Header val={this.state.notes.length} />
                <div className="CartBag-frame1">
                    <div className="title1">Home/My Wishlist</div>
                    <div className="cartBag-content1">
                        <div className="heading-wishlist">My Whislist({this.state.notes.length}) </div>

                        {this.state.notes.map((value, index) =>
                            <div className="main-cart1">
                                <div>
                                    <img className="img-book" src={Image} alt="lll" />
                                </div>
                                <div className="text-content1">
                                    <div className="bag-text1">
                                        <div className="cart-title1">{value.product_id.bookName}</div>
                                        <div className="cart-bookAuthor1">by {value.product_id.author}</div>
                                        <div className="price1">Rs.{value.product_id.price}</div>
                                    </div>
                                    <div className="Delete-add-Button" style = {{display : 'flex'}}>
                                        <div className="delelte-content">
                                            <div style={{ cursor: "pointer", color: "grey" }} onClick={() => this.delete(value.product_id._id)}><DeleteIcon /></div>
                                            {/* <div className="remove" >Remove</div> */}
                                        </div>
                                        <div className="btn-content1">
                                            <Button variant="contained" className="btn-place1" onClick={() => this.moveToCart(value.product_id._id)} >
                                                <span className="btn-move"> Move to cart </span>
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        )}
                    </div  >
                </div>
                <Footer/>
            </div>
        )
    }
}