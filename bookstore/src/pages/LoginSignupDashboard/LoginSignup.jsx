import React, { Component } from 'react';
import Login from '../Login/Login';
import Signup from '../SignUp/Signup';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './LoginSignup.scss';
import loginImage from "../../Assets/cart.png";
import {Redirect} from "react-router-dom"

class LoginSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            opensign:false,
            redirect: null
        }
    }

    componentDidMount(){
        console.log("loginsign up")
    }

    Login = () =>{
        this.setState({
            open:true,
            opensign:false
        })
    }

    Signup = () =>{
        this.setState({
            open:false,
            opensign:true
        })
    }


    render() {
        
        return (
            <div className="reg-frame">
                <div className="reg-content">
                    <div className="reg-title">
                        <img className="img-disp" src={loginImage} alt="hii" />
                        <span style={{ marginTop: '16px' }}>Online Book Shopping</span>
                    </div>
                </div>

                <div className="main-frame">
                        <div className="main-title">
                        <Link style={{textDecoration:"none", color: this.state.open ? 'black' : 'grey' }} to={`/`} >
                        <span style={{ color: this.state.open ? 'black' : 'grey' }} onClick={this.Login} className="btn text1">LOGIN </span>
                        </Link>
                        <Link style={{textDecoration:"none",color:"black"}} to={`/SignUp`} >
                        <span style={{ color: this.state.opensign ? 'black' : 'grey' }} onClick={this.Signup}className="btn text2">SIGNUP </span>
                        </Link>
                        </div>
                        <div className="Login-box">
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact  path="/SignUp" component={Signup} />
                        </Switch>
                        </div>
                    </div>
            </div>
        );
    }
}

export default LoginSignup;