import React, { Component } from 'react';
import { useEffect } from 'react';
import Headers from '../../Components/Home/Header';
import './Cartbag.scss';

import Button from '@material-ui/core/Button';
import Footer from '../../Pages/Footer/Footer';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Redirect } from 'react-router';
import user_services from "../../Services/user_services";
import Image from '../../Assets/Image.png';
import CartDetails from './CartDetails';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

let Regex = RegExp('^[A-Z]{1}[a-z]{2,}$');
let MobilenoRegex = RegExp('/^[6-9]{1}[0-9]{9}$/');
let PinCodeREgex = RegExp('[1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3}');



const styles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'black',
      },
});


 class Cartbag extends Component {
    _isMounted = false;


    constructor(props) {
        super(props);
        this.state = {
            book: [],
            redirect: '',
            open: false,
            openCon: false,
            FullName: '',
            Number: '',
            PinCode: '',
            Locality: '',
            Address: '',
            City: '',
            State: '',
            FullNameError: false,
            NumberError: false,
            PinCodeError: false,
            LocalityError: false,
            AddressError: false,
            CityError: false,
            StateError: false,
            temp: false,
            details: [false],
            redirect: '',
            cartCount: [],
            openBackDrop: false

        }

    }



    componentDidMount() {
        this._isMounted = true;

        this.getCartItem();
    }


    validationTest = (test, val) => {
        if (test.test(val)) {
            console.log("Value", val);
            console.log("test result", test.test(val));

            return true
        }
        else {
            return false;
        }
    }


    change = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
            flag: 1,
        });
    }



    handleContinue = () => {
        this.setState({
            FullNameError: !this.validationTest(Regex, this.state.FullName),
            NumberError: this.validationTest(MobilenoRegex, this.state.Number),
            PinCodeError: !this.validationTest(PinCodeREgex, this.state.PinCode),
            LocalityError: !this.validationTest(Regex, this.state.Locality),
            AddressError: !this.validationTest(Regex, this.state.Address),
            CityError: !this.validationTest(Regex, this.state.City),
            StateError: !this.validationTest(Regex, this.state.State)
        });
     
        if (this.state.flag === 1
            && !this.state.FullNameError
            && !this.state.NumberError
            && !this.state.PinCodeError
            && !this.state.LocalityError
            && !this.state.AddressError
            && !this.state.CityError
            && !this.state.StateError) {
            {
              
                console.log("validation successfull");

                let userData = {
                    "addressType": "Home",
                    "fullAddress": `${this.state.FullName},${this.state.Address},${this.state.Locality},${this.state.PinCode},${this.state.Number}`,
                    "city": this.state.City,
                    "state": this.state.State
                }
                user_services.customerDetails(userData).then((data) => {
                    console.log('data customeer details', data);
                    this.setState({ openCon: true });


                })
                    .catch(error => {
                        console.log('Error', error);
                    });

            }
        }
    }



    handleClick = () => {
        this.setState({ open: true });
    }

    getCartItem = () => {
        user_services.getCartItem().then((data) => {
            console.log("cart data -----", data.data.result);
            this.setState({ book: data.data.result });
        }).catch(error => {
            console.log("error", error);
        })

    }

    sendCount = (count) => {
        this.setState({ cartCount: count });
    }

    OrderPlaced = () => {
        this.setState({ openBackDrop: true });
        let orderDetails = [];
        this.state.book.map((val) => {
            let arr = {
                "product_id": val.product_id._id,
                "product_name": val.product_id.bookName,
                "product_quantity": val.quantityToBuy,
                "product_price": val.product_id.price
            };
            orderDetails.push(arr);
        })

        let data = {
            orders: orderDetails,
        };
        console.log("DATA ORDER SUCCES", data);
        
        user_services.orderItem(data).then((res) => {
            
            console.log(res);
            for (let i = 0; i < this.state.book.length; i++) {
                this.removeItem(this.state.book[i]._id)
            }

            this.setState({ redirect: "/orderSucess" });
        }).catch((err) => {
            console.log(err);
        })

    }
     handleClose = () =>{
        this.setState({ openBackDrop: false });
    }

    removeItem = (e) => {

        console.log("id ", e);
        user_services.deleteCartItem(e).then((data) => {
            console.log(data);
            this.getCartItem();
        }).catch(error => {
            console.log("error", error);
        })

    }

    render() {
        const { classes } = this.props;
        console.log("book id ", this.state.book)
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.redirect,
                state: { details: this.state.book }
            }} />
        }
        let styles = {
            helperText: {

                color: 'red',
                fontWeight: 'bold',
                fontSize: '.8em',
                marginLeft: '1px',
            }
        }

        return (
            <div>
                <Headers val={this.state.book.length} />
                <div className="CartBag-frame">
                    <div className="title">Home/My Cart</div>
                    <div className="cartBag-content">
                        <div >My Cart ({this.state.book.length})</div>
                        <CartDetails val={this.state.book} get={this.getCartItem} />
                        <div className="btn-content">
                            <Button variant="contained" className="btn-place" onClick={this.handleClick} >
                                Place Order
                            </Button>
                        </div>
                    </div>
                    {this.state.open ?
                        <div className="address-frame-details">
                            <div className="customer-dtl">
                                <div className="header-detail">Customer Details</div>
                                <div className="dtl-btn">Edit</div>
                            </div>
                            <div className="custm-content-names">

                                <div className="city">
                                    <div><TextField
                                        error={this.state.FullNameError}
                                        disabled={this.state.temp}
                                        size="small"
                                        label="FullName"
                                        type="text"
                                        name="FullName"
                                        variant="outlined"
                                        onChange={e => this.change(e)}
                                        helperText={this.state.FullNameError ? "Enter FullName" : ''}
                                        FormHelperTextProps={{ style: styles.helperText }}
                                    />
                                    </div>
                                </div>
                                <div className="state">
                                    <div><TextField
                                        error={this.state.NumberError}
                                        disabled={this.state.temp}
                                        size="small"
                                        label="Phone Number"
                                        type="text"
                                        name="Number"
                                        variant="outlined"
                                        onChange={e => this.change(e)}
                                        helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                                        FormHelperTextProps={{ style: styles.helperText }}
                                    /></div>
                                </div>
                            </div>
                            <div className="custm-content-names">
                                <div className="InputFields">
                                    <TextField
                                        error={this.state.PinCodeError}
                                        disabled={this.state.temp}
                                        size="small"
                                        label="Pin Code"
                                        type="text"
                                        name="PinCode"
                                        variant="outlined"
                                        onChange={e => this.change(e)}
                                        helperText={this.state.PinCodeError ? "Enter Pincode " : ''}
                                        FormHelperTextProps={{ style: styles.helperText }}
                                    />
                                </div>
                                <div className="InputFields">
                                    <TextField
                                        error={this.state.LocalityError}
                                        disabled={this.state.temp}
                                        size="small"
                                        label="Locality"
                                        type="text"
                                        name="Locality"
                                        variant="outlined"
                                        onChange={e => this.change(e)}
                                        helperText={this.state.LocalityError ? "Enter Locality" : ''}
                                        FormHelperTextProps={{ style: styles.helperText }}
                                    />
                                </div>
                            </div>

                            <div className="address-feild"><TextField
                                error={this.state.AddressError}
                                disabled={this.state.temp}
                                label="Address"
                                type="text"
                                name="Address"
                                variant="outlined"
                                fullWidth
                                onChange={e => this.change(e)}
                                helperText={this.state.AddressError ? "Enter Address" : ''}
                                FormHelperTextProps={{ style: styles.helperText }}
                            /></div>


                            <div className="city-state">
                                <div className="city">
                                    <div><TextField
                                        error={this.state.CityError}
                                        disabled={this.state.temp}
                                        size="small"
                                        label="City"
                                        type="text"
                                        name="City"
                                        variant="outlined"
                                        onChange={e => this.change(e)}
                                        helperText={this.state.CityError ? "Enter City" : ''}
                                        FormHelperTextProps={{ style: styles.helperText }} /></div>
                                </div>
                                <div className="state">
                                    <div><TextField
                                        error={this.state.StateError}
                                        disabled={this.state.temp}
                                        size="small"
                                        label="LandMark"
                                        type="text"
                                        name="State"
                                        variant="outlined"
                                        onChange={e => this.change(e)}
                                        helperText={this.state.StateError ? "Enter LandMark" : ''}
                                        FormHelperTextProps={{ style: styles.helperText }}
                                    /></div>
                                </div>
                            </div>
                            <div className="heading">
                                <div className="work ">Type</div>
                            </div>
                            <div><FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={this.state.temp}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Home"
                            />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={this.state.temp}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Work"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={this.state.temp}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Other"
                                /> </div>

                            {this.state.openCon ? null :
                                <div className="btn-content">
                                    <Button variant="contained" className="btn-place" onClick={this.handleContinue}>
                                        Continue
                                    </Button>
                                </div>
                            }
                        </div>

                        :

                        <div className="address-frame">
                            Address Details
                        </div>

                    }


                    {this.state.openCon ?

                        <div className="order-content">

                            <div className="header-detail" >Order Summary</div>
                            <>{this.state.book.map((value, index) => {
                                return (
                                    <div>
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
                                            </div>
                                        </div>
                                        {this.state.book.length - 1 == index ?
                                            <div className="btn-content">
                                                <Button variant="contained" className="btn-place" onClick={this.OrderPlaced} >
                                                    Checkout
                                                </Button>
                                                <Backdrop className={classes.backdrop} open={this.state.openBackDrop} onClick={this.handleClose}>
                                                    <CircularProgress color="inherit" />
                                                </Backdrop>

                                            </div> : null}
                                    </div>


                                )
                            })
                            } </>
                        </div>
                        :
                        <div className="order-frame" >
                            Order Summery
                        </div>
                    }
                </div>
                <div className="footer-content"> <Footer /></div>
            </div >
        );
    }
}

export default withStyles(styles)(Cartbag);
