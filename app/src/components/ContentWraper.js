import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    wraper: {
        display: 'inline-block',
        marginLeft: '15px',
        marginBottom:'5px',
        position: 'relative',
        border: '1px solid lightgray'
    },
    removeButton: {
        position: 'absolute',
        right: '0',
        zIndex: 1,
        padding: '1px'
    }
}));

export default function ContentWraper(props) {
    const classes = useStyles();
    return (
        <span className={classes.wraper}>
            {props.hideRemoveButton ? null :
                <IconButton onClick={() => props.removeItem()} className={classes.removeButton}>
                    <HighlightOffIcon />
                </IconButton>}
            {props.children}
        </span>
    );
};

ContentWraper.propTypes = {
    children: PropTypes.node.isRequired
};