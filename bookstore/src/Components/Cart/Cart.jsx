// import React from 'react';
// import Header from '../Home/Header';
// import './Cart.scss';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Image from '../../Assets/Image.png';
// import Button from '@material-ui/core/Button';
// import user_services from "../../Services/user_services";

// const useStyles = makeStyles({
//     rootCart: {
//         width: 310,
//         minHeight: 260,
//     },
//     contents: {
//         display: 'flex',
//         justifyContent: 'center',
//         height: 341,
//         border: '1px solid #c5c0c0'
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     imageCart: {
//         height: '344px',
//         width: '237px',
//     },
//     cartTxt: {
//         display: 'flex',
//         alignItems: 'flex-start',
//         flexDirection: 'column',
//         width: 258,
//         height: 142,
//     },
//     bookTitleCart: {
//         marginLeft: '8px',
//         fontWeight: '600',
//         fontSize: '32px'
//     },
//     bookAuthorCart: {
//         paddingTop: '3px',
//         fontSize: '20px',
//         height: '12px',
//         color: '#a49595',
//         fontWeight: '600'
//     },
//     bookRatingCart: {
//         fontSize: 'small',
//         display: 'flex',
//         justifyContent: 'center',
//         fontWeight: '600',
//         background: 'green',
//         width: '40px',
//         height: '20px',
//         marginTop: '20px',
//         color: 'white'
//     },
//     price:
//     {
//         fontSize: '23px',
//         fontWeight: '600',
//         marginTop: '18px'
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// });

// export default function Cart(props) {
//     const classes = useStyles();

    
    
//     return (
//         <>
//             <div>
//                 <Header />
//             </div>
//             <div className="cart-frame">
//                 <div className="img-crt-align">
//                     <img className="img-crt" src={Image} alt="" />
//                     <img className="img-crt" src={Image} alt="" />
//                 </div>
//                 <div className="cart-book-dtl">
//                     <div className="book-disp">
//                         <Card className={classes.rootCart}>
//                             <CardContent className={classes.contents}>
//                                 <img className={classes.imageCart} src={Image} alt="" />
//                             </CardContent>
//                         </Card>
//                         <div className="button">
//                             <Button variant="contained" color="secondary" className="btn1" onClick={addToCart}>
//                                 ADD TO BAG
//                             </Button>
//                             <Button variant="contained" color="secondary" className="btn2">
//                                 &#10084; WISHLIST
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="descp-disp">
//                         <CardActions className={classes.cartTxt}>
//                             <div className={classes.bookTitleCart}>{props.location.state.books.bookName}</div>
//                             <div className={classes.bookAuthorCart}>{props.location.state.books.author}</div>
//                             <div className={classes.bookRatingCart}>4.5 &#9733;</div>
//                             <div className={classes.price}>Rs.{props.location.state.books.price}</div>
//                         </CardActions>
//                         <div>
//                             <span class="dot"> <div>Book Details</div></span>
//                             <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
//                                 Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
//                                 Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

