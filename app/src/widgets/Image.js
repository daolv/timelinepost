import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '150px',
        height: '150px',
        cursor:'pointer'
    }
}));

export default function ImageCard(props) {
    const classes = useStyles();
    return (
        <img className={classes.image} src={props.image.path} alt={props.image.name} />
    );
};

ImageCard.propTypes = {
    image: PropTypes.any.isRequired
};