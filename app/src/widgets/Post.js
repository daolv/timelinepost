import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ContentWraper from "../components/ContentWraper";
import Image from "./Image";
import { v4 as uuidv4 } from 'uuid';
import FaceIcon from '@material-ui/icons/Face';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import UndoIcon from '@material-ui/icons/Undo';
import AppContext from '../AppContext';
import Grid from '@material-ui/core/Grid';
import helper from "../Helper";
import * as Constant from "../Constant";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        border: '1px solid lightgray',
        marginBottom: '10px',
        borderRadius: '15px'
    },
    inEditing: {
        backgroundColor: 'aliceblue'
    },
    button: {
        float: 'right'
    },
    publishedTime: {
        fontSize: '14px',
        marginTop: '10px',
        marginLeft: '10px'
    },
    userImage: {
        marginBottom: '-5px',
        marginRight: '5px'
    }
}));

export default function PostCard(props) {
    const classes = useStyles(),
        [isEditing, setIsEditing] = useState(false),
        { currentPost, setCurrentPost } = useContext(AppContext);

    useEffect(() => {
        if (currentPost.status === Constant.PostStatus.ADD) {
            setIsEditing(false);
        }
    }, [currentPost]);

    const renderDataByContentType = (data) => {
        switch (data.contentType) {
            case Constant.ContentType.IMAGE:
                let images = data.contentData.images;
                return <div>
                    {images.map((image) => (
                        <ContentWraper key={uuidv4()} hideRemoveButton={true}>
                            <Image image={image} />
                        </ContentWraper>
                    ))}
                </div>;
            default: break;
        }
    };

    const editPost = (item) => {
        setIsEditing(true);
        item.status = Constant.PostStatus.EDIT;
        setCurrentPost(item);
    };

    const handleUndo = (item) => {
        setIsEditing(false);
        setCurrentPost(helper.initializePost());
    };

    return (
        <Grid container className={`${classes.root} ${isEditing ? classes.inEditing : ""}`} >
            <Grid container className={classes.postBar}>
                <Grid item xs={11}>
                    <div className={classes.publishedTime} >
                        < FaceIcon className={classes.userImage} />
                        <i>Published on {new Date(props.post.publishDate).toLocaleString()}</i>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    {
                        isEditing ? <IconButton className={classes.button} onClick={() => handleUndo()} aria-label="undo">
                            <UndoIcon />
                        </IconButton>
                            : <IconButton className={classes.button} onClick={() => editPost(props.post)} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                    }
                </Grid>
            </Grid>

            <Grid item xs={12}>
                {renderDataByContentType(props.post)}
            </Grid>
        </Grid>
    )
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired
};