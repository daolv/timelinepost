import React from 'react';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    linkIcon: {
         marginTop: '25px'
    },
    paper: {
        textAlign: 'center'
    }
}));

export default function LinkCard() {
    const classes = useStyles();
    return (
        <Grid item xs={12}  >
            <Paper elevation={0} className={classes.paper}>
                <LinkIcon className={classes.linkIcon} />
            </Paper>

        </Grid>
    );
}

