import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import './Header.scss';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import book from "../../Assets/book.svg";
import { Redirect, useHistory } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import Popper from '@material-ui/core/Popper';
import { useEffect } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        backgroundColor: 'white',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        '@media(maxWidth: 600px)': {
            marginLeft: '12px',
        }
    },
    searchIcon: {
        color: 'grey',
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    pop: {
        zIndex: "10000"
    },
    paper: {
        borderRadius: '3px',
        maxWidth: '146px',
        display: 'flex',
        flexDirection: 'column',
        flexFlow: 'wrap',
        backgroundColor: 'white',
        border: '1px solid grey'
    },
    PopContent: {
      
        width: '81px',
        cursor: 'pointer',
        padding: '5px'
    },
    MuiToolbarRoot: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}));

export default function Home(props) {
    const classes = useStyles();

    const [redirect, setRedirect] = React.useState(null);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [searchData, setSearchData] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleProfile = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        console.log("book data", props.book)
    }, []);


    const searchBooks = (e) => {
        props.search(e)
    }

    const handleSearch = () => {
        setSearchOpen(false);
    }

    const redirectTo = () => {
        console.log("hellloooooo")
        setRedirect("/CartBag");
    }

    if (redirect) {
        return <Redirect to={{
            pathname: redirect
        }} />

    }
    else {
        return (
            <>
                <div className="root">
                    <AppBar className="app-header" position="fixed">
                        <Toolbar className={classes.MuiToolbarRoot}>
                            <Link style={{ textDecoration: "none" }} to={'/Dashboard'} >
                                <div className="header-title">
                                    <img className="img" src={book} alt="hii" />
                                    <div className="text">Bookstore</div>
                                </div>
                            </Link>
                            <div className="search-bar">
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <div>
                                        <InputBase
                                            className="search2"
                                            onChange={e => searchBooks(e)}
                                            placeholder="Search"
                                            inputProps={{ 'aria-label': 'search' }}
                                            className="input-search"

                                        />

                                    </div>

                                </div>

                            </div>
                            <div className="side-header">
                                {/* <div className="profile">
                                    <div className="profile-icon"> <PersonOutlineIcon onClick={handleProfile} /></div>
                                    <span className="profile-text">{localStorage.getItem('first')}</span>
                                    <Popper className={classes.pop} open={open} anchorEl={anchorEl} placement={'bottom-start'} transition>
                                        <div className={classes.paper}>
                                            <div className={classes.PopContent} onClick={() => setRedirect("/WishList")}>
                                                &#x2764; WishList
                                            </div>
                                            <div className="logout">
                                            <div><PersonIcon /></div>
                                            <div className={classes.PopContent} onClick={() => setRedirect("/")}>
                                                Logout
                                            </div>
                                        </div>
                                        </div>
                                    </Popper>
                            </div> */}
                            <div className="cart" >

                                <Badge badgeContent={props.val} color="primary" onClick={() => redirectTo()}>
                                    <ShoppingCartIcon />
                                </Badge>

                                <span className="cart">Cart</span>
                            </div>
                            </div>
                        </Toolbar>
                    </AppBar>
            </div>
            </>
        );
    }
}


