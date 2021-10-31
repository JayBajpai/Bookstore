import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Image from '../../Assets/Image.png';
import { Redirect } from 'react-router';
import {
  Switch,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 230,
    minHeight: 260,
    margin:'10px',
  },
  content:{
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
    height:'155px', 
    width:'130px',
  },
  cardTxt:{
    display:'flex',
    alignItems:'flex-start',
    flexDirection:'column'
  },
  bookTitle:{
    marginLeft:'8px',
    fontWeight:'600',
  },
  bookAuthor:{
      paddingTop:'3px',
      fontSize:'x-small',
      height:'12px',
      color:'#a49595',
      fontWeight:'600'
  },
  bookRating:{
    fontSize: 'small',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '600',
    background: 'green',
    width: '40px',
    height: '20px',
    marginTop: '5px',
    color:'white'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

const redirectCart=()=>{
  <Redirect to='/Cart' books= {props.value}/>
}

  return (
    <Link to="/Cart" style={{textDecoration:'none'}}>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <img className={classes.image} src={Image} alt="" />
        </CardContent>
        <CardActions className={classes.cardTxt}>
          <div className={classes.bookTitle}>{props.value.bookName}</div>
          <div className={classes.bookAuthor}>by {props.value.author}</div>
          <div className={classes.bookRating}>4.5 &#9733;</div>
          <div>{props.value.price}</div>
        </CardActions>
      </Card>
    </Link>
  );
}