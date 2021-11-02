import React, { Component } from 'react';
import Header from '../Home/Header';
import Footer from '../../Pages/Footer/Footer';
import Lastimage from '../../Assets/last.png';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import './Ordersucess.scss'

class Ordersucess extends Component {
    constructor(props) {
        super(props);
        this.state={
            redirect: "",
        }
    }
    
    componentDidMount(){
        console.log("book array",this.props.location.state.details)
    }
    continueShoping = () => {
        this.setState({ redirect: "/Dashboard" });
    }

    render() {
        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }

       
        return (
            <div>
                <Header />
             
                    
                <div className="Conatiner-last">
                    <div className="Lastimg">
                        <img className="Last-image" src={Lastimage} alt="Book" />
                    </div>
                    <div className="Last-Text">
                        hurray!!!! your order is confirmed
                        </div>
                        {this.props.location.state.details.map((value)=>
                    <div className="Last-Text">
                        the order id is {value._id}
                        </div>
                     )}
                    <div className="Last-Text">
                        save the order id for
                        </div>
                    <div className="Last-Text">
                        future communication
                    </div>
                    <div className="table">
                        <table>
                            <tr>
                                <th>Email us</th>
                                <th>Contact us</th>
                                <th>Address</th>
                            </tr>
                            <tr>
                                <td>admin@bookstore.com</td>
                                <td>#91 9172104669</td>
                                <td>Mumbai, India </td>
                            </tr>
                        </table>
                    </div>
                    <div className="Last-Button">
                        <Button className="buttonsize" onClick={this.continueShoping} fullWidth size="small" color="primary" variant="contained">
                            Continue Shopping
                    </Button>
                    </div>

                </div>
               
                <Footer />
            </div>
        );
    }
}

export default Ordersucess;
