import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
    paper: {
      borderRadius:'3px',
      maxWidth:'146px',
      display:'flex',
      flexDirection:'row',
      flexFlow:'wrap',
      padding: theme.spacing(1),
      backgroundColor:'white'
    },
    pop:{
        zIndex: "10000"
    }
  }));
  
  
  
  export default function SimplePopper(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
  
  
        return (
            <>
            <Popper className={classes.pop} open={open} anchorEl={anchorEl} placement={'top-start'} transition>
              
            </Popper>
          </>
        );
    }


// export default popper;
