import React, { useContext, useEffect, useState } from "react";
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ImageSelector from './ImageSelector';
import IconButton from '@material-ui/core/IconButton';
import AppContext from '../AppContext';
import * as Constant from "../Constant";
import Link from "../widgets/Link";
import Button from '@material-ui/core/Button';
import ScheduleDialog from './ScheduleDialog';
import ScheduleIcon from '@material-ui/icons/Schedule';
import helper from "../Helper";

const useStyles = makeStyles((theme) => ({

    contentSelector: {
        border: '1px solid lightgray',
        minHeight: '150px'
    },
    childComponent: {
        minHeight: '100px'
    },
    scheduleLable: {
        fontSize: '13px'
    },
    ScheduleIcon: {
        marginBottom: '-5px',
        marginRight: '5px'
    },
    scheduleButton: {
        float: "right",
        marginTop: "10px"
    }
}));

export default function ContentEditor() {

    const classes = useStyles(),
        [showScheduleTimeDialog, setShowScheduleTimeDialog] = useState(false),
        [childComponent, setChildComponent] = useState(<ImageSelector />),
        { currentPost, setCurrentPost } = useContext(AppContext);

    const updateContentType = (value) => {
        if (value === currentPost.contentType) { return }
        currentPost.contentType = value;
        currentPost.contentData = helper.initContentDataByType(value);
        setCurrentPost(Object.assign({}, currentPost));
        setChildComponent(getChildComponent(currentPost.contentType));
    };

    const toggleScheduleTimeDialog = () => {
        setShowScheduleTimeDialog(!showScheduleTimeDialog);
    };

    const updateScheduleDate = (date) => {
        toggleScheduleTimeDialog();
        currentPost.publishDate = date.toUTCString();
        currentPost.publishNow = false;
        setCurrentPost(Object.assign({}, currentPost));
    };

    useEffect(() => {
        setChildComponent(getChildComponent(currentPost.contentType))
    }, [currentPost.contentType]);

    const getChildComponent = (type) => {
        switch (type) {
            case 0:
                return <ImageSelector />;
            case 1:
                return <Link />;
            default:
                break;
        }
    };
    return (
        <React.Fragment>
            <Grid container className={classes.contentSelector} spacing={3}>
                {currentPost.publishNow ? null :
                    <Grid item xs={12}>
                        <div>
                            <ScheduleIcon className={classes.ScheduleIcon} />
                            <span className={classes.scheduleLable}>
                                <i>{currentPost.status === Constant.PostStatus.ADD ? "Will send on " : "Published on "} {new Date(currentPost.publishDate).toLocaleString()}</i>
                            </span>
                        </div>
                    </Grid>}
                <Grid className={classes.childComponent} container>
                    {childComponent}
                </Grid>

                <Grid item xs={12}>
                    <IconButton aria-label="image"
                        color={currentPost.contentType === Constant.ContentType.IMAGE ? "primary" : "default"}
                        onClick={() => updateContentType(Constant.ContentType.IMAGE)}
                        className={classes.margin}>
                        <ImageIcon />
                    </IconButton>
                    <IconButton aria-label="link"
                        color={currentPost.contentType === Constant.ContentType.LINK ? "primary" : "default"}
                        onClick={() => updateContentType(Constant.ContentType.LINK)}
                        className={classes.margin}>
                        <LinkIcon />
                    </IconButton>
                    <Button variant="outlined"
                        disabled={currentPost.status !== Constant.PostStatus.ADD}
                        className={classes.scheduleButton}
                        size="small"
                        onClick={toggleScheduleTimeDialog}
                        startIcon={<ScheduleIcon />}>
                        Schedule
                    </Button>
                </Grid>
            </Grid>
            <ScheduleDialog open={showScheduleTimeDialog} closeDialog={toggleScheduleTimeDialog} updateScheduleDate={updateScheduleDate} currentDate={currentPost.publishDate} />
        </React.Fragment>
    );
}