import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = {
  root: {
    background: '#fff',
    border: '1px solid #F06F38',
    textTransform: 'none',
    borderRadius: 3,
    color: '#F06F38',
    padding: '0 30px',
    "&:hover":{
      background:'grey',
      color:'#fff',
      border: '1px solid #fff',
    },
    '&:active':{
      background:'grey',
    }
  },
  smallDevices: {
      padding:0
  }
};

function UnstyledComponent(props) {
  const { classes } = props;
  const matches = useMediaQuery('(max-width:400px)');
return <Button 
className={clsx(classes.root, matches && classes.smallDevices)}
onClick={props.click}
>{props.Label}</Button>;
}

UnstyledComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UnstyledComponent);
