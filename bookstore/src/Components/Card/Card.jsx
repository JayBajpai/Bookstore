import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Image from '../../Assets/Image.png';
import user_services from "../../Services/user_services";

import '../Card/Card.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 230,
    minHeight: 260,
    margin: '10px',
    position: 'relative'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    background: '#F5F5F5',
    height: 155
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  image: {
    height: '155px',
    width: '130px',
  },
  cardTxt: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  bookTitle: {
    marginLeft: '8px',
    fontWeight: '600',
  },
  bookAuthor: {
    paddingTop: '3px',
    fontSize: 'x-small',
    height: '12px',
    color: '#a49595',
    fontWeight: '600'
  },
  bookRating: {
    fontSize: 'small',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '600',
    background: 'green',
    width: '40px',
    height: '20px',
    marginTop: '5px',
    color: 'white'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  buttonCard: {
    width: '224px',
    height: '36px',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  btn1Card: {
    width: '89px',
    fontSize: '8px',
    fontWeight: 'bold',
    backgroundColor: '#A03037',
  },
  btn2Card: {
    width: '89px',
    fontSize: '9px',
    fontWeight: 'bold',
    backgroundColor: '#333333 ',
  },
  btn3Card: {
    backgroundColor: '#3371B5 ',
    width: '88%',
    height: '39px',
    color: 'white',
  },
  paper: {
    padding: theme.spacing(1),
    paddingBottom: "0px",
    textAlign: 'left',
    border: "1px solid #e0e0e0",
    boxShadow: "none",
    borderRadius: "8px",
    width: "235px",
    height: "275px",
    padding: "0",
    color: theme.palette.text.secondary,
},
  pop: {
    zIndex: "10000",
    pointerEvents: 'none',
    position: 'absolute'
  },
  
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'black',
  },
  
  popover: {
    pointerEvents: 'none',
  },
  typography: {
    padding: theme.spacing(2),
  },

}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [addCart, setAdd] = React.useState([]);
  const [displayCart, setDisplayCart,] = React.useState(false);
  const [abcd, abcdSet] = React.useState(false);
  const [openButton, setOpenButton] = React.useState(true);
  const [state, setState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openpop = Boolean(anchorEl);
  const id = openpop ? 'transitions-popper' : undefined;


  const ButtonClick = () => {
    setDisplayCart(true);
    setOpenButton(true);
  }



  const addToCart = (value) => {

    setState(true);
    let Data = {
      isCart: true
    }
    user_services.addToCart(value._id, Data).then((data) => {

      console.log("add to cart ", data);
      props.getCard();
      setDisplayCart(true);


      ButtonClick(value.bookName);
    }).catch(error => {
      console.log("error", error);
    })
  }

  const handleClose = () => {
    setState(false);
  };

  const wishListToCart = (value, Transition) => {

    setState(true);
    let Data = {
      isCart: true
    }
    user_services.addToWishList(value._id, Data).then((data) => {
      console.log("wishlist ", data);
      props.getCard();
      setOpenButton(false)

    }).catch(error => {
      console.log("error", error);
    })
  }

  const openPopper = Boolean(anchorEl);




  return (
    <>
    <div className="disp">
      <Card className={classes.root} aria-describedby={id} onClick={handleClick}>
       
        <CardContent className={classes.content}>
          <div>
          <img className={classes.image} src={Image} alt=""  /></div>
          
         
        </CardContent>
        <CardActions className={classes.cardTxt}>
          <div className={classes.bookTitle}>{props.value.bookName}</div>
          <div className={classes.bookAuthor}>by {props.value.author}</div>
          <div className={classes.bookRating}>4.5 &#9733;</div>
          <div>Rs.{props.value.price}</div>
        </CardActions>
        <div className={classes.buttonCard} >
          {openButton
            ?
            <>
              {displayCart ?
                <>
                  <Button variant="contained" fullwidth className={classes.btn3Card}  >
                    ADDED TO BAG
                  </Button>

                </>
                :
                <>
                  <Button
                    onClick={ButtonClick}
                    variant="contained"
                    id={props.value._id}
                    className={classes.btn1Card}
                    style={{ display: props.value.quantity > 1 ? 'block' : 'none' }}
                    onClick={() => { addToCart(props.value) }} >
                    ADD TO BAG
                  </Button>
                  <Button
                    variant="contained"
                    id={props.value._id}
                    className={classes.btn1Card}
                    style={{ display: props.value.quantity <= 1 ? 'block' : 'none' }}>
                    ADD TO BAG
                  </Button>


                  <Button variant="contained" className={classes.btn2Card} onClick={ButtonClick, () => { wishListToCart(props.value) }}>
                    &#10084; WISHLIST
                  </Button>

                </>

              }
            </>
            :
            <Button variant="contained" fullwidth color="secondary" className={classes.btn3Card}  >
              WishList ADDED
            </Button>

          }

        </div>

      </Card>

  </div>
    </>
  );
}

