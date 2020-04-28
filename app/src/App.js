import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ContentEditor from './components/ContentEditor';
import { AppProvider } from './AppContext';
import api from './api/api';
import TimeLine from "./components/TimeLine";
import * as Constant from "./Constant";
import helper from "./Helper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  }
}));

export default function App() {
  const classes = useStyles(),
    [timelinePosts, setTimeLinePosts] = useState([]),
    [currentPost, setCurrentPost] = useState(helper.initializePost()),
    [submitButtonText, setSubmitButtonText] = useState("Post"),
    [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    api.getPosts().then((data) => {
      setTimeLinePosts(data);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  useEffect(() => {
    setDisableSubmit(!helper.validateData(currentPost));
    switch (currentPost.status) {
      case Constant.PostStatus.ADD:
        setSubmitButtonText(currentPost.publishNow ? "Post" : "Schedule");
        break;
      case Constant.PostStatus.EDIT:
        setSubmitButtonText("Update");
        break;
      default:
        break;
    }
  }, [currentPost]);

  const submitData = (post) => {
    setCurrentPost(helper.initializePost());
    switch (post.status) {
      case Constant.PostStatus.ADD:
        post.publishDate = new Date();
        api.addPost(post).then((result) => {
          setTimeLinePosts([result].concat(timelinePosts));
        }).catch((error) => {
          console.log(error);
        });
        break;
      case Constant.PostStatus.EDIT:
        api.updatePost(post).then((result) => {
          let index = timelinePosts.findIndex(s => s.id === result.id);
          timelinePosts[index] = result;
          setTimeLinePosts(timelinePosts);
        }).catch((error) => {
          console.log(error);
        });
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment >
      <AppProvider value={{ currentPost, setCurrentPost}}>
        <Grid container className={classes.root} spacing={4}>

          <Grid item xs={12}>
            <ContentEditor post={currentPost} />
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <Button disabled={disableSubmit} variant="contained" color="primary" onClick={() => submitData(currentPost)}>{submitButtonText}</Button>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <TimeLine posts={timelinePosts} />
          </Grid>
        </Grid>
      </AppProvider >
    </React.Fragment>
  );
}

